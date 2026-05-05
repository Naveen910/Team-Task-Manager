// components/projects/TeamModal.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";
import MemberSelector from "./MemberSelector";
import { useAuth } from "../../context/AuthContext";

export default function TeamModal({ project, close, refresh }) {
  const { user } = useAuth();

  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const res = await API.get(`/users/project/${project._id}`);
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ➕ Add Members
  const handleAddMembers = async () => {
    try {
      await API.post(`/projects/${project._id}/members`, {
        members: selected
      });

      setSelected([]);
      fetchMembers();
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  // ➖ Remove Member
  const handleRemove = async (userId) => {
    try {
      await API.delete(`/projects/${project._id}/members/${userId}`);
      fetchMembers();
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[420px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          Team - {project.name}
        </h2>

        {/* Loading */}
        {loading ? (
          <p className="text-gray-500">Loading members...</p>
        ) : (
          <>
            {/* Current Members */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Current Members</h3>

              {members.length === 0 && (
                <p className="text-sm text-gray-400">No members</p>
              )}

              {members.map((m) => (
                <div
                  key={m._id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-gray-500">
                      {m.email} • {m.role}
                    </p>
                  </div>

                  {user?.role === "Admin" && (
                    <button
                      onClick={() => handleRemove(m._id)}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Members (Admin only) */}
            {user?.role === "Admin" && (
              <>
                <div className="mb-3">
                  <h3 className="font-medium mb-2">Add Members</h3>

                  <MemberSelector
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>

                <button
                  onClick={handleAddMembers}
                  className="bg-green-600 text-white px-3 py-2 rounded w-full"
                >
                  Add Selected Members
                </button>
              </>
            )}
          </>
        )}

        <button
          onClick={close}
          className="mt-4 w-full bg-gray-800 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}