from typing import Optional, Annotated, List
from fastapi import FastAPI, status, Depends, HTTPException, Header, Request, Query, Response
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
import uuid

from models import Base, Experiment
from crud import *
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()
origins=["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    code  = item.code

    # public class name 가져오기
    public_class = find_public_class(code)
    if public_class == None:
        return {"error" : "퍼블릭 클래스 없음"}
    
    # java 파일 만들고 code_path 가져오기
    # TODO 중복 방지를 위한 uuid
    code_path, public_class = code_to_file(public_class, code)

    run_time = java_process(public_class, code_path)
    if run_time < 0:
        if run_time == -1:
            return {"error" : "컴파일 에러"}
        if run_time == -2:
            return {"error" : "실행 에러"}
        if run_time == -3:
            return {"error" : "타임 아웃"}

    carbonEmissions = calculate_carbonEmissions(MODEL, MEMORY["micro"], REGION, run_time)

    car_index, plane_index, tree_index = transform_carbonEmissions(carbonEmissions)

    created_at = datetime.now()

    exp = Experiment(
        session_key = req.headers["Authorization"],
        title       = title,
        code_path   = code_path,
        footprint   = carbonEmissions,
        run_time    = run_time,
        create_time = created_at
    )
    experiment = db_create_experiment(db, exp)

    return {"id": experiment.id, "title": title, 
            "run_time": run_time, "footprint": exp.footprint,
            "car_index": car_index, "plane_index":plane_index,
            "tree_index": tree_index, "create_time": created_at}

@app.get("/history")
def get_history(req: Request, db: Session = Depends(get_db)):
    if "Authorization" not in req.headers:
        return {"history":[]}
    else:
        history = db_get_experiments(db, req.headers["Authorization"])
    
        return {"history" : history}
    
@app.get("/exp")
def get_exp(req: Request, resp: Response, id_list: List[int] = Query(None, alias="id_list[]"), db: Session = Depends(get_db)):
    if "Authorization" not in req.headers:
        resp.status_code = status.HTTP_401_UNAUTHORIZED
        return {"experiments":[], "message" : "header에 Authorization 필드가 비어 있습니다."}
    session_key = req.headers["Authorization"]
    result = []
    experiments = db_query_experiments(db, id_list)
    for e in experiments:
        if e.session_key != session_key:
            resp.status_code = status.HTTP_400_BAD_REQUEST
            return {"experiments":[], "message" : "유효하지 않은 exp_id입니다."}
        exp = {'id' : e.id, 
               'session_key': session_key, 
               'title' : e.title, 
               'footprint' :e.footprint, 
               'run_time' : e.run_time, 
               'create_time' : e.create_time}
        car_index, plane_index, tree_index = transform_carbonEmissions(float(e.footprint))
        exp['car_index'] = car_index
        exp['plane_index'] = plane_index
        exp['tree_index'] = tree_index
        with open(e.code_path, 'r') as file:
            exp['code'] = file.read()
        result.append(exp)
        

    return {"experiments" : result}

def transform_carbonEmissions(carbonEmissions):
    passengerCar_EU_perkm = 175
    flight_NY_SF = 570000
    treeYear = 11000

    car_index = carbonEmissions / passengerCar_EU_perkm
    plane_index = carbonEmissions / flight_NY_SF
    tree_index = carbonEmissions / treeYear * 12

    return car_index, plane_index, tree_index
    
def find_public_class(code):
    # 정규 표현식을 사용하여 'public class' 선언을 찾음
    match = re.search(r'public\s+class\s+(\w+)', code)
    
    if match:
        return match.group(1)
    else:
        return None

def code_to_file(public_class, code:str):
    now = datetime.now()
    new_class_name = now.strftime('GA%Y%m%d_%H%M%S_') + str(uuid.uuid4().hex)  # uuid1은 시간기준, uuid4 랜덤
    
    file_object = open(f"java_files/{new_class_name}.java","w+")
    file_object.write(code.replace(f'public class {public_class}', f'public class {new_class_name}'))
    file_object.close()
    return f"java_files/{new_class_name}.java", new_class_name

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

def java_process(file_name, code_path):
    # 컴파일
    process = subprocess.Popen(["javac", code_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    compile_output, compile_error = process.communicate()

    # 0 success 1 error
    compile_return_code = process.returncode
    
    if compile_return_code == 0:
        try:
            start_time = time.time()
            execute_process = subprocess.run(["java", "-cp", "java_files", file_name], capture_output=True, text=True, timeout=5)
            # execute_process.stdout, execute_process.stderr
            end_time = time.time()

            # 0 success 1 error
            execute_return_code = execute_process.returncode

            if execute_return_code == 0:
                return end_time - start_time
            else:
                # 실행 에러
                print("실행 에러")
                return -2
        except subprocess.TimeoutExpired as e:
            print("10초 경과!")
            print(e.stderr)
            return -3
    else:
        # 컴파일 에러
        print("컴파일 에러")
        return -1

def calculate_carbonEmissions(model_name, memory, countryName, run_time):
    PUE_used = 1
    PSF_used = 1.2
    memoryPower = 0.3725
    powerNeeded_GPU = 0

    powerNeeded_CPU  = TDP_cpu[TDP_cpu['model']==model_name]['TDP'].values[0]
    carbon_intensity = CI_aggregated[CI_aggregated['location']==countryName]['carbonIntensity'].values[0]

    powerNeeded_core   = float(powerNeeded_CPU) + float(powerNeeded_GPU)
    powerNeeded_memory = PUE_used * (memory * memoryPower)
    carbonIntensity    = float(carbon_intensity)

    powerNeeded  = powerNeeded_core + powerNeeded_memory
    energyNeeded = run_time * powerNeeded * PSF_used * 0.001
    
    carbonEmissions = energyNeeded * carbonIntensity

    return carbonEmissions