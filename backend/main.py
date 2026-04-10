from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from models.task import Task
from deps import get_db
from schemas.task import TaskCreate

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "API running"}


# 🔹 Smart Priority Function
def get_priority(text: str) -> str:
    text = text.lower()

    if any(word in text for word in ["urgent", "asap", "immediately", "today"]):
        return "high"
    elif any(word in text for word in ["later", "whenever", "low"]):
        return "low"
    else:
        return "medium"


# ✅ CREATE TASK
@app.post("/tasks")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    combined_text = task.title + " " + task.description
    smart_priority = get_priority(combined_text)

    new_task = Task(
        title=task.title,
        description=task.description,
        priority=smart_priority,
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return {
        "success": True,
        "data": new_task
    }


# ✅ GET ALL TASKS
@app.get("/tasks")
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()

    return {
        "success": True,
        "data": tasks
    }


# ✅ UPDATE (TOGGLE COMPLETE) → PATCH
@app.patch("/tasks/{task_id}")
def update_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.completed = not task.completed

    db.commit()
    db.refresh(task)

    return {
        "success": True,
        "data": task
    }


# ✅ DELETE TASK
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {
        "success": True,
        "message": "Task deleted"
    }