from typing import Optional, Annotated
from fastapi import FastAPI, status, Depends, HTTPException, Header
from fastapi.security import OAuth2PasswordBearer
from CodeModel import Code
from datetime import datetime
from pydantic import BaseModel
import time
import subprocess
import uuid
import re
import requests
import secrets

app = FastAPI()

model_TDP = {'A8-7680':45,'A9-9425SoC':15,'AMD7552':200,'AMDEPYC7251':120,'AMDEPYC7343':190}
model_core = {'A8-7680':4,'A9-9425SoC':2,'AMD7552':48,'AMDEPYC7251':8,'AMDEPYC7343':16}
location_continent = {'TW':'Asia','IL':'Asia','ZA':'Africa','CN':'Asia','KR':'Asia'}
location_contry = {'TW':'China','IL':'Israel','ZA':'South Africa','CN':'China','KR':'Korea'}
location_carbonIntensity = {'TW':509,'IL':558,'ZA':900.6,'CN':537.4,'KR':600}

class Item(BaseModel):
    title: str
    code: Optional[str] = None

def generate_random_authorization():
    return secrets.token_hex(16)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# ------------------------------------------------------------

@app.post("/")
def create_session_key(session_key: str = Header(default=None)):
    # TODO DB에서 session_key들 가져오기
    session_keys = []
    if session_key not in session_keys:
        new_session_key = generate_random_authorization()
        return {"session_key": new_session_key, "status" : "200 OK"}
    return {"session_key": session_key, "status" : "400 Bad Request"}

@app.post("/exp")
def post_exp(item: Item, session_key: str = Header(default=None)):
    session_keys = []
    if session_key in session_keys:
        pass
    title = item.title
    code = item.code
    iteration = 1

    file_name = find_public_class(code)
    code_to_file(file_name, code)
    
    run_time = java_process(file_name)
    footprint = carbon('A8-7680', 100, 'KR', run_time)

    car_index, plane_index, tree_index = footprint_transform(footprint)

    return {"id": 1, "title": title, 
            "run_time": run_time, "footprint":footprint,
            "car_index":car_index, "plane_index":plane_index,
            "tree_index": tree_index, "create_time": datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

@app.get("/history")
def get_history(session_key: str = Header(default=None)):
    session_keys = []
    history = []
    if session_key not in session_keys:
        return {"history" : history}
    else:
        # history.append({
        #     "id" : 1,
        #     "title" : title,
        #     "run_time" : run_time,
        #     "footprint" : footprint,
        #     "create_time" : create_time
        # })
        return {"history" : history}
    
@app.get("exp")
def get_exp(list: list, session_key: str = Header(default=None)):
    experiments = []
    for i in list:
        # iteration마다 primary값이 있는지 요청
        pass

    return {"experiments" : experiments}
# ------------------------------------------------------------

def footprint_transform(footprint):
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

def java_process(file_name):
    # Compile the Java code
    subprocess.run(["javac", "file_name.java"])

    # Run the Java program and track execution time
    start_time = time.time()
    process = subprocess.Popen(["java", "file_name"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    stdout, stderr = process.communicate()
    end_time = time.time()

    # Run time
    run_time = (end_time - start_time)
    
    return run_time

def carbon(model_name, memory, countryName, run_time):
    
    num_of_cores = model_core[model_name]
    power_draw_for_cores = model_TDP[model_name]
    
    memory = 100
    power_draw_for_memory = memory*0.3725

    carbon_intensity = location_carbonIntensity[countryName]
    
    carbon = run_time * (power_draw_for_cores*1+power_draw_for_memory)*1.2*1*carbon_intensity*0.001
    
    return carbon