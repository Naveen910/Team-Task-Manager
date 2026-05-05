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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Overview of your tasks and progress
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500 animate-pulse">
              Loading dashboard...
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card title="Total Tasks" value={total} color="blue" />
              <Card title="Completed" value={completed} color="green" />
              <Card title="In Progress" value={inProgress} color="yellow" />
              <Card title="Overdue" value={overdue} color="red" />
            </div>

            {/* Recent Tasks */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Recent Tasks
              </h2>

              {tasks.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No tasks found
                </p>
              ) : (
                <div className="space-y-3">
                  {tasks.slice(0, 5).map(task => (
                    <div
                      key={task._id}
                      className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Due: {task.dueDate?.slice(0, 10)}
                        </p>
                      </div>

                      <StatusBadge status={task.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Stat Card ---------- */
function Card({ title, value, color }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700"
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">
          {value}
        </h2>
      </div>

      <div className={`px-3 py-2 rounded-lg text-sm font-semibold ${colorMap[color]}`}>
        {value}
      </div>
    </div>
  );
}

/* ---------- Status Badge ---------- */
function StatusBadge({ status }) {
  const styles = {
    Done: "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Pending: "bg-gray-200 text-gray-700"
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
}