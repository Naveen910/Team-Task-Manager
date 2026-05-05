// components/tasks/CreateTaskModal.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";

export default function CreateTaskModal({ close, refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    dueDate: "",
    priority: "Medium"
  });

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/users").then(res => setUsers(res.data));
    API.get("/projects").then(res => setProjects(res.data));
  }, []);

  const handleCreate = async () => {
    await API.post("/tasks", form);
    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl w-[420px]">

        <h2 className="text-lg font-semibold mb-4">Create Task</h2>

        <input
          placeholder="Title"
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Project */}
        <select
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) => setForm({ ...form, projectId: e.target.value })}
        >
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* User */}
        <select
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        >
          <option value="">Assign User</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Priority */}
        <select
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <button
          onClick={handleCreate}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Create Task
        </button>

        <button
          onClick={close}
          className="mt-2 w-full bg-gray-800 text-white py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}