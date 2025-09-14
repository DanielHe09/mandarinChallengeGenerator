from .routes import challenge
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware


#creating a new FastAPI web server
app = FastAPI()

#CORS=cross-origin resource sharing, allows frontend to talk to backend (they're different servers)
#allows requests from anywhere, any cookies/auth tokens, all HTTP methods, all request headers
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"]
)

#"add this collection of routes to the main app"
app.include_router(challenge.router, prefix="/api")
#adding the routes to the app is just means making the routes functional and callable