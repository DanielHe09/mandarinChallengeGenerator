from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database.db import (
    get_challenge_quota,
    create_challenge,
    create_challenge_quota,
    reset_quota_if_needed,
    get_user_challenges
)

from ..utils import authenticate_and_get_user_details
from ..database.models import get_db
import json
from datetime import datetime

#router is just the middleman that routes specific URLS to a specific backend function
#we need 3 main routes for frontend -> backend: 1. getting history 2. creating a challenge 3. getting current quota count
router = APIRouter()

#schema is something that FastAPI can use to validate the structure of incoming request data is correct
class ChallengeRequest(BaseModel):
    #request must include a difficulty field that is a string
    difficulty: str

    #only use is contains configuration settings for schema, purely for automatic API documentation, not necessary with first line
    class Config:
        json_schema_extra = {"example": {"difficulty": "easy"}}

#post request for posting a challenge to the frontend
@router.post("/generate_challenge")


#router functions handle HTTP requests, which are inherently asynchronous
#this is because making them async allows server to handle other requests while waiting (ex. for database to load in function)
@router.get("/my-history")
async def my_history(request: Request, db:Session = Depends(get_db)):
    #authenticate user and get their details
    user_details = authenticate_and_get_user_details(request)
    user_id = user_details.get("user_id")

    challenges = get_user_challenges(db, user_id)
    return {"challenges": challenges}

@router.get("/quota")
async def get_quota(request: Request, db: Session = Depends(get_db)):
    #authenticate user and get their details
    user_details = authenticate_and_get_user_details(request)
    user_id = user_details.get("user_id")

    #call database function to see how many quota the user currently has
    quota = get_challenge_quota(db, user_id)
    if not quota: 
        return {
            "user_id": user_id,
            "quota_remaining": 0,
            "last_reset_date": datetime.now()
        }
    quota = reset_quota_if_needed(db, quota)
    return quota
