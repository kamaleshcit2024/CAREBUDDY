from sqlalchemy import Column, Integer, String, JSON, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    persona = Column(String)  # Patient, Caregiver, etc.
    language = Column(String, default="English")
    zip_code = Column(String)
    
    intake_records = relationship("IntakeRecord", back_populates="user")
    posts = relationship("ForumPost", back_populates="author")

class IntakeRecord(Base):
    __tablename__ = "intake_records"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    cancer_type = Column(String)
    stage = Column(String)
    challenges = Column(JSON)  # List of strings
    detected_issues = Column(JSON) # AI analysis results
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="intake_records")

class ForumPost(Base):
    __tablename__ = "forum_posts"
    id = Column(Integer, primary_key=True, index=True)
    author_id = Column(Integer, ForeignKey("users.id"))
    category = Column(String)
    title = Column(String)
    content = Column(Text)
    replies_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    author = relationship("User", back_populates="posts")
