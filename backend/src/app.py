from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from clerk_backend_api import Clerk 
import os

#reading the clerk secret key from .env to create a clerk SDK instance for authentication
clerk_sdk = Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY"))

#creating a new FastAPI web server
app = FastAPI()

#CORS=cross-origin resource sharing, allows frontend to talk to backend (they're different servers)
#allows requests from anywhere, any cookies/auth tokens, all HTTP methods, all request headers
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])