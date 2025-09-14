from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime


DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///database.db")#second parameter is the fallback/backup
#creating a database connection engine, which connects connects you to SQLite and points to the database.db file in your directory (where your databases is stored)
engine = create_engine(DATABASE_URL, echo=True)
Base = declarative_base()

#this is one database model that will be the template for the database table containing all challenges generated
class Challenge(Base):
    __tablename__ = 'challenges'

    #creating the columns
    id = Column(Integer, primary_key=True)
    difficulty = Column(String, nullable=False)
    date_created = Column(DateTime, default=datetime.now)#if we don't set any value in this column, we put datetime.now for the default value
    created_by = Column(String, nullable=False)#the clerk ID of the user who created the challenge
    title = Column(String, nullable=False)
    options = Column(String, nullable=False)#values under this column will be like: 'option1, option2, ...'
    correct_answer_id = Column(Integer, nullable=False)
    explanation = Column(String, nullable=False)

#this database model will store how many quotas/challenges a user has
class ChallengeQuota(Base):
    __tablename__ = 'challenge_quotas'

    id = Column(Integer, primary_key=True)
    user_id = Column(String, nullable=False, unique=True)
    quota_remaining = Column(Integer, nullable=False, default=50)
    last_reset_date = Column(DateTime, default=datetime.now)

#utilizing the database connection engine to create all the 'base' database models we defined in SQL
Base.metadata.create_all(engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#yields/gives us the same database ssion so we don't create a new one repeatedly
def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()