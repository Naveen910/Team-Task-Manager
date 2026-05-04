import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from 'react-hot-toast';
import { Plus, Calendar, User, ArrowLeft } from 'lucide-react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    priority: "Medium"
  });

  useEffect(() => {
    fetchProjectData();
    fetchUsers();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([
        API.get(`/projects/${id}`),
        API.get(`/tasks/project/${id}`)
      ]);
      
      setProject(projectRes.data);
      setTasks(tasksRes.data);
    } catch (err) {
      toast.error("Failed to load project");
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createTask = async () => {
    try {
      await API.post("/tasks", { ...newTask, projectId: id });
      toast.success("Task created successfully!");
      setShowCreateTask(false);
      setNewTask({ title: "", description: "", assignedTo: "", dueDate: "", priority: "Medium" });
      fetchProjectData();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to create task");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await API.patch(`/tasks/${taskId}`, { status });
      toast.success("Task updated");
      fetchProjectData();
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/projects")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              Back to Projects
            </button>
            <h1 className="text-3xl font-bold">{project?.name}</h1>
            <span className="px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-full">
              {project?.status}
            </span>
          </div>

          <p className="text-gray-600 mb-8 max-w-2xl">{project?.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-10">
            <div className="bg-white p-4 rounded-2xl border">
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-3xl font-bold">{tasks.length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-3xl font-bold text-green-600">
                {tasks.filter(t => t.status === "Done").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl border">
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-3xl font-bold text-blue-600">
                {tasks.filter(t => t.status === "In Progress").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl border">
              <p className="text-sm text-gray-500">Members</p>
              <p className="text-3xl font-bold">{project?.members?.length}</p>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Tasks</h2>
            <button
              onClick={() => setShowCreateTask(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700"
            >
              <Plus size={20} />
              New Task
            </button>
          </div>

          <div className="bg-white rounded-2xl border">
            {tasks.length === 0 ? (
              <p className="text-center py-12 text-gray-500">No tasks yet. Create your first task!</p>
            ) : (
              tasks.map(task => (
                <div key={task._id} className="p-6 border-b last:border-0 flex items-center gap-6 hover:bg-gray-50">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{task.title}</h3>
                    {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}
                  </div>

                  <div className="flex items-center gap-4">
                    {task.assignedTo && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={16} />
                        {task.assignedTo.name}
                      </div>
                    )}

                    {task.dueDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}

                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Todo">Todo</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      {showCreateTask && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">Create New Task</h2>

            <input
              type="text"
              placeholder="Task Title"
              className="w-full border rounded-2xl px-4 py-3 mb-4"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="w-full border rounded-2xl px-4 py-3 h-28 mb-4"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Assign To</label>
                <select
                  className="w-full border rounded-2xl px-4 py-3"
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                >
                  <option value="">Select Member</option>
                  {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full border rounded-2xl px-4 py-3"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateTask(false)}
                className="flex-1 py-4 border rounded-2xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={createTask}
                className="flex-1 py-4 bg-purple-600 text-white rounded-2xl font-medium hover:bg-purple-700"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}