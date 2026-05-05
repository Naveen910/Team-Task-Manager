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
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-gray-500">
            Manage your projects and team members
          </p>
        </div>

        {/* Only Admin can create project */}
        {user?.role === "Admin" && (
          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            + Create Project
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500 mt-10">
          Loading projects...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-500 mt-10">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && projects.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No projects found.
          {user?.role === "Admin" && (
            <div className="mt-2">
              Create your first project to get started.
            </div>
          )}
        </div>
      )}

      {/* Projects Grid */}
      {!loading && !error && projects.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((proj) => (
            <ProjectCard
              key={proj._id}
              project={proj}
              refresh={fetchProjects} // 🔥 important for member updates
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      {openModal && (
        <CreateProjectModal
          close={() => setOpenModal(false)}
          refresh={fetchProjects}
        />
      )}
    </div>
  );
}