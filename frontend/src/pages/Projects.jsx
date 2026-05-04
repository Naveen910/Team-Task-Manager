import { useState, useEffect } from "react";
import { Plus } from 'lucide-react';
import API from "../services/api";
import toast from 'react-hot-toast';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      toast.error("Failed to load projects");
    }
  };

  const createProject = async () => {
    try {
      await API.post("/projects", form);
      toast.success("Project created successfully!");
      setShowCreateModal(false);
      setForm({ name: "", description: "" });
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to create project");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Projects</h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 transition"
            >
              <Plus size={20} />
              New Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div
                key={project._id}
                onClick={() => window.location.href = `/projects/${project._id}`}
                className="bg-white border rounded-2xl p-6 hover:shadow-lg transition cursor-pointer"
              >
                <h3 className="font-semibold text-xl mb-2">{project.name}</h3>
                <p className="text-gray-600 line-clamp-2 mb-4">{project.description}</p>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {project.members?.length} members
                  </span>
                  <span className="text-emerald-600 font-medium">
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
            
            <input
              type="text"
              placeholder="Project Name"
              className="w-full border rounded-xl px-4 py-3 mb-4"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
            
            <textarea
              placeholder="Project Description"
              className="w-full border rounded-xl px-4 py-3 h-32 mb-6"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                className="flex-1 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}