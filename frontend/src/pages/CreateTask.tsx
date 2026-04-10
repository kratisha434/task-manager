import { useState } from "react";
import { createTask } from "../api/taskApi";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await createTask({ title, description });

      alert("Task created!");
      navigate("/"); // 🔥 redirect to home
    } catch (err) {
      alert("Error creating task");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          width: "320px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          Create Task
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#1890ff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateTask;