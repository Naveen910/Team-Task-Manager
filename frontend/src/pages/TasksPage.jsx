// pages/TasksPage.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import TaskColumn from "../components/tasks/TaskColumn";
import CreateTaskModal from "../components/tasks/CreateTaskModal";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (id, status) => {
    await API.patch(`/tasks/${id}`, { status });
    fetchTasks();
  };

  const columns = {
    Todo: tasks.filter(t => t.status === "Todo"),
    "In Progress": tasks.filter(t => t.status === "In Progress"),
    Review: tasks.filter(t => t.status === "Review"),
    Done: tasks.filter(t => t.status === "Done"),
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + Create Task
          </button>
        </div>

        {/* Kanban */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(columns).map(status => (
            <TaskColumn
              key={status}
              title={status}
              tasks={columns[status]}
              updateStatus={updateStatus}
            />
          ))}
        </div>
      </div>

      {open && (
        <CreateTaskModal close={() => setOpen(false)} refresh={fetchTasks} />
      )}
    </div>
  );
}