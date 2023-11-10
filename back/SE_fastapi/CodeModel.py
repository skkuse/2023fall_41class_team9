from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel

class Code(BaseModel):
    code:str