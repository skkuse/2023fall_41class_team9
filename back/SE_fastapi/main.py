from typing import Optional, Annotated, List
from fastapi import FastAPI, status, Depends, HTTPException, Header, Request, Query
from fastapi.security import OAuth2PasswordBearer
from CodeModel import Code
from datetime import datetime
from pydantic import BaseModel
import time
import subprocess
from uuid import uuid4
import re
import requests
import secrets
import subprocess
import psutil
import numpy as np
import pandas as pd

from models import Base, Experiment
from crud import *
from database import SessionLocal, engine

Base.metadata.create_all(bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

TDP_cpu = pd.read_csv('TDP_cpu.csv')
TDP_cpu = TDP_cpu.rename(columns=TDP_cpu.iloc[0])
TDP_cpu = TDP_cpu.drop(TDP_cpu.index[0])

CI_aggregated = pd.read_csv('CI_aggregated.csv')
CI_aggregated = CI_aggregated.rename(columns=CI_aggregated.iloc[0])
CI_aggregated = CI_aggregated.drop(CI_aggregated.index[0])

MODEL = 'A8-7680'
MEMORY = {'nano':0.5, 'micro':1, 'small':2, 'medium':4}
REGION = 'KR'

class Item(BaseModel):
    title: str
    code: Optional[str] = None

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/")
def create_session_key(req: Request):
    if "Authorization" not in req.headers:
        session_key = str(uuid4())
        return {"session_key": session_key, "status" : "200 OK"}
    else:
        return {"session_key": req.headers["Authorization"], "status" : "400 Bad Request"}

@app.post("/exp")
def post_exp(item: Item, req: Request, db: Session = Depends(get_db)):
    
    title = item.title
    code = item.code
    iteration = 1

    file_name = find_public_class(code)
    code_to_file(file_name, code)
    
    run_time = java_process(file_name)

    footprint = cal_footprint(MODEL, MEMORY["micro"], REGION, run_time)

    car_index, plane_index, tree_index = footprint_transform(footprint)

    create_time = datetime.now()

    exp = Experiment(
        session_key = req.headers["Authorization"],
        title = title,
        code_path = "",
        footprint = footprint,
        run_time = run_time,
        create_time = create_time
    )
    experiment = db_create_experiment(db, exp)

    return {"id": experiment.id, "title": title, 
            "run_time": run_time, "footprint": footprint,
            "car_index": car_index, "plane_index":plane_index,
            "tree_index": tree_index, "create_time": datetime.now()}

@app.get("/history")
def get_history(req: Request, db: Session = Depends(get_db)):
    if "Authorization" not in req.headers:
        return {"history":[]}
    else:
        history = db_get_experiments(db, req.headers["Authorization"])
    
        return {"history" : history}
    
@app.get("/exp")
def get_exp(id_list: List[int] = Query(None, alias="id_list[]"), db: Session = Depends(get_db)):
    experiments = db_query_experiments(db, id_list)
    print(id_list)

    return {"experiments" : experiments}
    # return {"experiments" : id_list}

def footprint_transform(footprint):
    # TODO
    car_transform = 0.1
    plane_transform = 0.2
    tree_transform = 0.3

    car_index = footprint * car_transform
    plane_index = footprint * plane_transform
    tree_index = footprint * tree_transform

    return car_index, plane_index, tree_index
    
def find_public_class(code):
    # 정규 표현식을 사용하여 'public class' 선언을 찾음
    match = re.search(r'public\s+class\s+(\w+)', code)
    
    if match:
        return match.group(1)
    else:
        return None

def code_to_file(file_name, code):
    file_object = open(f"java_files/{file_name}.java","w+")
    file_object.write(code)
    file_object.close()

def execute_java_code(java_code, timeout_seconds):
    try:
        # 컴파일 및 실행, timeout 설정
        result = subprocess.run(['java', 'LongRunningTask'], input=java_code.encode(), text=True, capture_output=True, check=True, timeout=timeout_seconds)
        print("Execution successful. Output:")
        print(result.stdout)
    except subprocess.TimeoutExpired:
        print(f"Timeout of {timeout_seconds} seconds exceeded. Execution terminated.")
    except subprocess.CalledProcessError as e:
        print("Compilation or execution error:")
        print(e.stderr)

def java_process(file_name):
    # Compile the Java code
    # subprocess.run(["javac", "file_name.java"])

    # Run the Java program and track execution time
    start_time = 0
    end_time = 0
    try:
        start_time = time.time()
        # TODO subprocess.run 하면 컴파일 에러 뜬다.
        # result = subprocess.run(['java', 'file_name'], text=True, capture_output=True, check=True, timeout=10)
        process = subprocess.Popen(["java", "file_name"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        # stdout, stderr = process.communicate()
        end_time = time.time()
    except subprocess.TimeoutExpired:
        start_time = 0
        end_time = 0
        print("Runtime Error")
    except subprocess.CalledProcessError as e:
        start_time = 0
        end_time = 0
        print("Compile Error")
    # Run time
    run_time = (end_time - start_time)
    print(run_time)
    
    return run_time

def cal_footprint(model_name, memory, countryName, run_time):
    # TDP_per_core = TDP_cpu[TDP_cpu['model']==model_name]['TDP_per_core'].values[0]
    # number_of_cores = TDP_cpu[TDP_cpu['model']==model_name]['n_cores'].values[0]
    power_draw_for_cores = TDP_cpu[TDP_cpu['model']==model_name]['TDP'].values[0]
    power_draw_for_cores = float(power_draw_for_cores)

    power_draw_for_memory = memory*0.3725

    carbon_intensity = CI_aggregated[CI_aggregated['location']==countryName]['carbonIntensity'].values[0]
    carbon_intensity = float(carbon_intensity)

    footprint = run_time * (power_draw_for_cores*1+power_draw_for_memory)*1.2*1*carbon_intensity*0.001
    
    return footprint