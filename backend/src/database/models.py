from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

#creating a database connection engine, which connects connects you to SQLite and points to the database.db file in your directory (where your databases is stored)
engine = create_engine('sqlite:///database.db', echo=True)
Base = declarative_base()

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