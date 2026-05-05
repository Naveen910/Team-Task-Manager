// components/projects/ProjectCard.jsx
import { useState } from "react";
import TeamModal from "./TeamModal";
import { useAuth } from "../../context/AuthContext";

export default function ProjectCard({ project, refresh }) {
  const { user } = useAuth();
  const [openTeam, setOpenTeam] = useState(false);

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
      <h2 className="text-lg font-semibold">{project.name}</h2>

      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {project.description || "No description"}
      </p>

      <div className="mt-3 text-sm text-gray-500">
        Members: {project.members?.length || 0}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setOpenTeam(true)}
          className="text-blue-600 text-sm hover:underline"
        >
          View Team
        </button>

        {user?.role === "Admin" && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            Admin Access
          </span>
        )}
      </div>

      {openTeam && (
        <TeamModal
          project={project}
          close={() => setOpenTeam(false)}
          refresh={refresh}
        />
      )}
    </div>
  );
}