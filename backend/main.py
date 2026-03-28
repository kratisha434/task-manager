from fastapi import FastAPI, Depends # type: ignore
from sqlalchemy.orm import Session # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore

from database import engine, Base
from models.task import Task
from deps import get_db
from schemas.task import TaskCreate

app = FastAPI()

# ✅ CORS (important)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ create tables
Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "API running"}


# 🧠 SMART PRIORITY FUNCTION (FREE AI)
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
        "message": "Task created",
        "priority": smart_priority,
        "task_id": new_task.id
    }


# ✅ GET TASKS
@app.get("/tasks")
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks

@app.put("/tasks/{task_id}")
def update_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        return {"error": "Task not found"}

    # toggle completed
    task.completed = not getattr(task, "completed", False)

    db.commit()
    db.refresh(task)

    return task