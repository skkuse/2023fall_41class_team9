from database import SessionLocal, engine
from models import Base, Experiment
from crud import *
from datetime import datetime
from sqlalchemy.orm import scoped_session

Base.metadata.create_all(bind=engine)

db = scoped_session(SessionLocal)
session_key = "1234"
exp1 = Experiment(
    session_key = session_key,
    title = "first exp",
    code_path = "./java_code/test1.java",
    footprint = 3.223,
    run_time = 3.44,
    create_time =datetime(2023,11,23,12,34,22)
)
exp2 = Experiment(
    session_key = session_key,
    title = "second exp",
    code_path = "./java_code/test2.java",
    footprint = 5.223,
    run_time = 5.44,
    create_time =datetime(2023,11,23,12,36,22)
)
db_create_experiment(db, exp1)
db_create_experiment(db, exp2)

for e in db_get_experiments(db, session_key):
    print(e.id, e.title, e.run_time)
    
for e in db_query_experiments(db, [1,2]):
    print(e.id, e.title, e.run_time)

