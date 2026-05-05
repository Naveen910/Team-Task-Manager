// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Done").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const overdue = tasks.filter(
    t => new Date(t.dueDate) < new Date() && t.status !== "Done"
  ).length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card title="Total Tasks" value={total} />
            <Card title="Completed" value={completed} />
            <Card title="In Progress" value={inProgress} />
            <Card title="Overdue" value={overdue} />
          </div>

          {/* Recent Tasks */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Recent Tasks</h2>

            {tasks.slice(0, 5).map(task => (
              <div
                key={task._id}
                className="border p-3 rounded mb-2 flex justify-between"
              >
                <span>{task.title}</span>
                <span className="text-sm text-gray-500">
                  {task.status}
                </span>
              </div>
            ))}

            {tasks.length === 0 && (
              <p className="text-gray-500">No tasks found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Reusable stat card
function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded p-4 text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}