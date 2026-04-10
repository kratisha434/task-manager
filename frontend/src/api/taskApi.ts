const BASE_URL = "http://127.0.0.1:8000";

//  GET TASKS 
export const getTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks`);
  const result = await res.json();

  return result.data; 
};


//  TOGGLE TASK (PUT → PATCH)
export const toggleTask = async (id: number) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PATCH", // 🔥 FIXED
  });

  return res.json();
};


// CREATE TASK 
export const createTask = async (task: {
  title: string;
  description: string;
}) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const result = await res.json();
  return result.data; //  CLEAN RETURN
};


//  DELETE TASK 
export const deleteTask = async (id: number) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  return res.json();
};