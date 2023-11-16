from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
import requests
import json

app = FastAPI()

class Item(BaseModel):
    name: str
    code: Optional[str] = None


@app.post("/send_request")
async def send_request(item: Item):
    json_name, json_code = json_to_code(item.code)
    # file_name = find_public_class(json_code)
    # code_to_file(file_name, json_code)
    # average_time1 = runtime(file_name, "java", 20)
    # combined_data = f"{item.name} - {item.description}"
    return {"message": "요청이 성공적으로 처리되었습니다!"}
    # return {"message": "요청이 성공적으로 처리되었습니다!", "name": json_name, "걸린 시간": average_time1}


def json_to_code(json_string):
    # json받아서 string으로 변환
    # json_string = json.dumps(data)

    # json_string받아서 dict로 변환
    json_dict = json.loads(json_string)

    # dict에서 코드와 이름 발췌
    json_code = json_dict['code']
    json_name = json_dict['name']
    return json_name, json_code

def find_public_class(code):
    # 정규 표현식을 사용하여 'public class' 선언을 찾음
    match = re.search(r'public\s+class\s+(\w+)', code)
    
    if match:
        return match.group(1)
    else:
        return None
    
def code_to_file(name, code):
    file_object = open(f"{name}.java","w+")
    file_object.write(code)
    file_object.close()

def java_compile_runner(name, file_extension):
    if file_extension == "java":
        # Java 파일 컴파일
        subprocess.run(["javac", f"{name}.java"])
        # 컴파일된 Java 파일 실행
        subprocess.run(["java", f"{name}"])
    elif file_extension == "jar":
        subprocess.run(["java", "-jar", f"{name}.jar"])

def runtime(name, file_extension, iteration):
    # 한번 실행마다 시간 측정
    total_time = 0
    for i in range(iteration):
        start = time.time()
        java_compile_runner(name, file_extension)
        end = time.time()
        total_time += (end - start)
    
    # 전체 실행 시간 측정
    start = time.time()
    for i in range(iteration):
        java_compile_runner(name, file_extension)
    end = time.time()
    
    
    average_time1 = total_time / iteration
    average_time2 = (end - start) / iteration
    
    return average_time1