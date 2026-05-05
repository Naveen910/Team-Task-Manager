// pages/ProjectsPage.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import ProjectCard from "../components/projects/ProjectCard";
import CreateProjectModal from "../components/projects/CreateProjectModal";
import { useAuth } from "../context/AuthContext";

export default function ProjectsPage() {
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Projects
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your projects and team members
            </p>
          </div>

          {/* Admin Button */}
          {user?.role === "Admin" && (
            <button
              onClick={() => setOpenModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition"
            >
              + Create Project
            </button>
          )}
        </div>

        {/* Content Wrapper */}
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[300px]">

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500 animate-pulse">
                Loading projects...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="text-center text-red-500">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
              <p className="text-lg">No projects found</p>

              {user?.role === "Admin" && (
                <p className="text-sm mt-2">
                  Create your first project to get started
                </p>
              )}
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && projects.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <ProjectCard
                  key={proj._id}
                  project={proj}
                  refresh={fetchProjects}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {openModal && (
          <CreateProjectModal
            close={() => setOpenModal(false)}
            refresh={fetchProjects}
          />
        )}
      </div>
    </div>
  );
}