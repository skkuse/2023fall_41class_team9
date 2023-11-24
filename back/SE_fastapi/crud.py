from sqlalchemy.orm import Session
from models import *


def db_create_experiment(db: Session, experiment: Experiment):
    db.add(experiment)
    db.commit()
    db.refresh(experiment)
    return experiment

def db_get_experiments(db: Session, session_key: String):
    return db.query(Experiment).filter(Experiment.session_key == session_key).all()

def db_query_experiments(db: Session, id_list: list):
    return db.query(Experiment).filter(Experiment.id.in_(id_list)).all()