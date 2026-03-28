from sqlalchemy import Column, Integer, String, DateTime, Boolean # type: ignore
from datetime import datetime
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    priority = Column(String, default="medium")
    due_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed = Column(Boolean, default=False)