from typing import Optional
from fastapi import FastAPI
from CodeModel import Code
from datetime import datetime
import time
import subprocess
import uuid

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

@app.post("/exp")
def submit_code(codeModel:Code):

    # 파일 저장하기
    now = datetime.now()
    file_name_exp = 'java_files/'+now.strftime('%Y-%m-%d-%H%M%S') + str(uuid.uuid4()) +'.java'   # uuid1은 시간기준, uuid4 랜덤
    file_name = 'Test.java'
    with open(file_name_exp, 'w') as file:
        file.write(codeModel.code)


    ##TODO
    # - 실제 자바 파일 입력받기 - 중괄호 줄바꿈
    # - 클래스명을 어떻게 할지
    # 자바 실행 명령어
    java_compile = ["javac", "./java_files/" + file_name]
    subprocess.Popen(java_compile, cwd=None, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    java_command = ["java", "-cp", "./java_files", file_name[:-5]]

    # 자바 프로세스 생성
    start = time.time()
    java_process = subprocess.Popen(java_command, cwd=None, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # 자바 프로세스의 PID 가져오기
    java_pid = java_process.pid
    java_process.wait(timeout=None)
    # 시간 측정
    end = time.time()
    output, error = java_process.communicate()
    output_str = output.decode('utf-8')
    print(f"{end - start:.5f} sec\n{output_str}")
    runtime = end - start
    
    result = {}
    result['runtime'] = runtime
    result['output'] = output_str
    return result