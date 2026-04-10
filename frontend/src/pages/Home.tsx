import { useEffect, useState } from "react";
import { getTasks, toggleTask, deleteTask } from "../api/taskApi";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed?: boolean;
};

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      alert("Error fetching tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggle = async (id: number) => {
    try {
      await toggleTask(id);
      fetchTasks();
    } catch (err) {
      alert("Error updating task");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      alert("Error deleting task");
    }
  };

  const getColor = (priority: string) => {
    if (priority === "high") return "#ff4d4f";
    if (priority === "medium") return "#faad14";
    return "#52c41a";
  };

  return (
    <div style={{ padding: "30px", background: "#f0f2f5", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>📋 Your Tasks</h2>
      <p style={{ textAlign: "center", color: "gray" }}>
        Manage your daily work efficiently
      </p>

      <a
        href="/create"
        style={{
          display: "block",
          margin: "20px auto",
          width: "200px",
          textAlign: "center",
          padding: "10px",
          background: "#1890ff",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        + Create Task
      </a>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {!loading && tasks.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px", opacity: 0.7 }}>
          <h3>No tasks yet 💤</h3>
          <p>Create your first task to get started</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h3
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </h3>

              <p>{task.description}</p>

              <span
                style={{
                  background: getColor(task.priority),
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
              >
                {task.priority}
              </span>

              {/* Toggle Button */}
              <button
                onClick={() => handleToggle(task.id)}
                style={{
                  marginTop: "10px",
                  padding: "6px 10px",
                  background: task.completed ? "gray" : "#52c41a",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {task.completed ? "Completed" : "Mark Complete"}
              </button>

              {/* DELETE BUTTON (NEW) */}
              <button
                onClick={() => handleDelete(task.id)}
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  padding: "6px 10px",
                  background: "#ff4d4f",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;