from pydantic import BaseModel # type: ignore
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    priority: Optional[str] = "medium"