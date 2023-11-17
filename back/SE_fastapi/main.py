from typing import Optional
from fastapi import FastAPI
from CodeModel import Code
from datetime import datetime
from pydantic import BaseModel
import time
import subprocess
import uuid
import re

app = FastAPI()

model_TDP = {'A8-7680':45,'A9-9425SoC':15,'AMD7552':200,'AMDEPYC7251':120,'AMDEPYC7343':190}
model_core = {'A8-7680':4,'A9-9425SoC':2,'AMD7552':48,'AMDEPYC7251':8,'AMDEPYC7343':16}
location_continent = {'TW':'Asia','IL':'Asia','ZA':'Africa','CN':'Asia','KR':'Asia'}
location_contry = {'TW':'China','IL':'Israel','ZA':'South Africa','CN':'China','KR':'Korea'}
location_carbonIntensity = {'TW':509,'IL':558,'ZA':900.6,'CN':537.4,'KR':600}

class Item(BaseModel):
    name: str
    code: Optional[str] = None


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/send_request")
def send_request(item: Item):
    name = item.name
    code = item.code
    iteration = 1
    
    file_name = find_public_class(code)
    code_to_file(file_name, code)
    time = run_file(file_name, "java", iteration)
    
    carbon1 = carbon('A8-7680', 100, 'KR', time)
    
    process_time = java_process(file_name)
    
    carbon2 = carbon('A8-7680', 100, 'KR', process_time)
    
    
    
    return {"message": name, "file_name": file_name, "time": time, "carbon1":carbon1 ,"process_time": process_time, "carbon2":carbon2 }

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

def run_file(file_name, file_extension, iteration):
    total_time = 0
    for i in range(iteration):
        start = time.time()
        java_compile_runner(file_name, file_extension)
        end = time.time()
        total_time += (end - start)
    
    average_time = total_time / iteration
    
    return average_time

def java_compile_runner(name, file_extension):
    if file_extension == "java":
        # Java 파일 컴파일
        subprocess.run(["javac", f"{name}.java"])
        # 컴파일된 Java 파일 실행
        subprocess.run(["java", f"{name}"])
    elif file_extension == "jar":
        subprocess.run(["java", "-jar", f"{name}.jar"])
# JSON 형태로 코드 넘겨줄 때, 한줄에 있어야하고, java코드에 ""가 있으면 안됨.

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




#     # - 실제 자바 파일 입력받기 - 중괄호 줄바꿈
#     # - 클래스명을 어떻게 할지
#     # 자바 실행 명령어
#     java_compile = ["javac", "./java_files/" + file_name]
#     subprocess.Popen(java_compile, cwd=None, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
#     java_command = ["java", "-cp", "./java_files", file_name[:-5]]

#     # 자바 프로세스 생성
#     start = time.time()
#     java_process = subprocess.Popen(java_command, cwd=None, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

#     # 자바 프로세스의 PID 가져오기
#     java_pid = java_process.pid
#     java_process.wait(timeout=None)
#     # 시간 측정
#     end = time.time()
#     output, error = java_process.communicate()
#     output_str = output.decode('utf-8')
#     print(f"{end - start:.5f} sec\n{output_str}")
#     runtime = end - start
    
#     result = {}
#     result['runtime'] = runtime
#     result['output'] = output_str
#     return result