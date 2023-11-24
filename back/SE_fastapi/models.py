from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship

from database import Base

class Experiment(Base):
    __tablename__ = "experiments"
    
    id = Column(Integer, primary_key=True)
    session_key = Column(String)
    title = Column(String)
    code_path = Column(String)
    footprint = Column(String)    
    run_time = Column(Float)
    create_time = Column(DateTime)
    
    class Config:
        orm_mode = True