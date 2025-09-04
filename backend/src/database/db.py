from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from . import models

#these are functions to query information from the database models
def get_challenge_quota(db: Session, user_id: str):
    return db.query(models.ChallengeQuota).filter(models.ChallengeQuota.user_id == user_id).first()

#creates an instance of the ChallengeQuota model
def create_challenge_quota(db: Session, user_id: str):
    db_quota = models.ChallengeQuota(user_id=user_id)
    db.add(db_quota)
    db.commit()
    db.refresh(db_quota)
    return db_quota

#resets users quota count if 24 hours have passed
def reset_quota_if_needed(db: Session, quota: models.ChallengeQuota):
    now=datetime.now()
    if now - quota.last_reset_date>timedelta(hours=24):
        quota.remaining_quota = 10
        quota.last_reset_date = now
        db.commit()
        db.refresh(quota)
    return quota

#creates a new challenge record in the database Challenge model
def create_challenge(
    #parameters are all the column values of the Challenge model
    db: Session,
    difficulty: str,
    created_by: str,
    title: str,
    options: str,
    correct_answer_id: int,
    explanation: str
):
    #creates a new Challenge model instance/row for the new data row
    db_challenge = models.Challenge(
        difficulty = difficulty, 
        created_by = created_by,
        title = title,
        options = options,
        correct_answer_id = correct_answer_id,
        explanation = explanation
    )
    db.add(db_challenge)
    db.commit()
    db.refresh(db_challenge)
    return db_challenge

#gets all the challenges createed a certain user
def get_user_challenges(db: Session, user_id: str):
    return db.query(models.Challenge).filter(models.Challenge.created_by == user_id).all()