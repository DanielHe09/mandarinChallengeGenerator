from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware


#creating a new FastAPI web server
app = FastAPI()

#CORS=cross-origin resource sharing, allows frontend to talk to backend (they're different servers)
#allows requests from anywhere, any cookies/auth tokens, all HTTP methods, all request headers
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])