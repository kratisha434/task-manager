
export const getTasks = async () => {
  const res = await fetch("http://127.0.0.1:8000/tasks");
  return res.json();
};

export const toggleTask = async (id: number) => {
  const res = await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
    method: "PUT",
  });
  return res.json();
};

export const createTask = async (task: {
  title: string;
  description: string;
}) => {
  const res = await fetch("http://127.0.0.1:8000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return res.json();
};