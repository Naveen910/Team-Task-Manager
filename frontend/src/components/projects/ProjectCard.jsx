// components/projects/ProjectCard.jsx
import { useState } from "react";
import TeamModal from "./TeamModal";
import { useAuth } from "../../context/AuthContext";

export default function ProjectCard({ project, refresh }) {
  const { user } = useAuth();
  const [openTeam, setOpenTeam] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">

      {/* Project Name */}
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        {project.name}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
        {project.description || "No description provided"}
      </p>

      {/* Divider */}
      <div className="border-t my-4"></div>

      {/* Members Count */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>
          👥 {project.members?.length || 0} Members
        </span>

        {/* Admin Badge */}
        {user?.role === "Admin" && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            Admin
          </span>
        )}
      </div>

      {/* Action */}
      <button
        onClick={() => setOpenTeam(true)}
        className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-2 rounded-lg transition"
      >
        Manage Team
      </button>

      {/* Modal */}
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