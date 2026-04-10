# Task Manager Application

A simple full-stack Task Manager application that allows users to create, view, update, and delete tasks. Built to demonstrate core frontend and backend development skills with clean structure and API integration.

---

## 🚀 Features

* Create new tasks
* View all tasks
* Mark tasks as completed
* Delete tasks
* Priority-based task classification (smart detection)
* Responsive and clean UI
* Loading and basic error handling

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* TypeScript

### Backend

* FastAPI (Python)
* SQLAlchemy

---

## 📦 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/kratisha434/task-manager.git
cd task-manager
```

---

### 2. Backend Setup

```bash
cd backend
pip install fastapi uvicorn sqlalchemy
uvicorn main:app --reload
```

Backend runs on:
👉 http://127.0.0.1:8000

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
👉 http://localhost:5173

---

## 🔗 API Endpoints

| Method | Endpoint    | Description            |
| ------ | ----------- | ---------------------- |
| GET    | /tasks      | Get all tasks          |
| POST   | /tasks      | Create a new task      |
| PATCH  | /tasks/{id} | Toggle task completion |
| DELETE | /tasks/{id} | Delete a task          |

---

## 📄 Task Data Model

Each task contains:

* `id` → Unique identifier
* `title` → Task title
* `description` → Task description
* `priority` → high / medium / low
* `completed` → Boolean status
* `created_at` → Timestamp

---

## ⚖️ Assumptions & Trade-offs

* Used a simple database setup with SQLAlchemy for persistence
* Focused on functionality and API correctness over advanced UI design
* No authentication implemented to keep scope small

---

## 🔮 Future Improvements

* Task editing
* Filters (completed / pending)
* Authentication & user-specific tasks
* Due dates & reminders
* Persistent cloud database

---

## 👩‍💻 Author

**Kratisha**

---
