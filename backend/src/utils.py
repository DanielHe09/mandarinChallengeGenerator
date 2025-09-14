'''
frontend
- will authenticate with clerk
- Clerk will issue a javascript web token (JWT) each time a user logs in
- this token is sent to the backend
backend
- connect to clerk by using the secret key
- ask clerk if the JWTs are valid by using the public key in the .env file
- secret key is used by backend for server side clerk operations, and to make API calls to clerk from server
'''

from fastapi import HTTPException
from clerk_backend_api import Clerk, AuthenticateRequestOptions
import os
from dotenv import load_dotenv

#looking for prescence of a .env file and loading it into the environment
load_dotenv()

#reading the clerk secret key from .env to create a clerk SDK instance for authentication
clerk_sdk = Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY"))

#take in a fastapi request from frontend and returns user details if authenticated
def authenticate_and_get_user_details(request):
    try:
        #calls clerk's authentication method to try and authenticate the request and stores the result in request_state
        request_state = clerk_sdk.authenticate_request(
            #pass the fastapi request object to clerk
            request,

            #configures how clerk should authenticate the request
            AuthenticateRequestOptions(
                authorized_parties=["http://localhost:5173", "http://localhost:5174", "https://mandarin-challenge-generator-5hhj83zzy-danielhe09s-projects.vercel.app"], #tells clerk which frontend URLs are allowed to make requests
                jwt_key=os.getenv("JWT_KEY")
            )
        )

        #what to do if the request_state says they're not signed in
        if not request_state.is_signed_in:
            raise HTTPException(status_code=401, detail="Invalid token")

        #get the user id from the JWT token payload
        user_id = request_state.payload.get("sub")

        return {"user_id": user_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

'''
what a request state looks like: this is what is returned when you ask clerk to authenticate a request using clerk_sdk.authenticate_request

request_state = {
    # Boolean indicating if user is authenticated
    "is_signed_in": True,
    
    # User information from JWT token
    "payload": {
        "sub": "user_2abc123def456",  # User ID (subject)
        ...
    },
    
    # Session information
    "session": {
        "id": "sess_2abc123def456",
        ...
    },
    
    # Request context
    "request": {
        "method": "GET",
        ...
    }
}
'''