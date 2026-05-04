import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.patch(`/tasks/${id}`, { status });
    fetchTasks();
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Done").length;
  const pending = tasks.filter(t => t.status !== "Done").length;

  const overdue = tasks.filter(t => 
    t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done"
  ).length;

  if (!localStorage.getItem("token")) {
        return <h2>Please login</h2>;
    }

  return (
    <div>
      <h2>Dashboard</h2>

      <div>
        <p>Total: {total}</p>
        <p>Completed: {completed}</p>
        <p>Pending: {pending}</p>
        <p>Overdue: {overdue}</p>
      </div>

      <h3>My Tasks</h3>

      {tasks.map(task => (
        <div key={task._id}>
          <p>{task.title}</p>
          <p>{task.status}</p>

          <button onClick={()=>updateStatus(task._id,"In Progress")}>
            Start
          </button>

          <button onClick={()=>updateStatus(task._id,"Done")}>
            Done
          </button>
        </div>
      ))}
    </div>
  );
}