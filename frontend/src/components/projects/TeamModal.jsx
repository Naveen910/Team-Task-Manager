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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      
      {/* Modal */}
      <div className="bg-white w-[450px] max-h-[85vh] rounded-2xl shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Team Members
            </h2>
            <p className="text-sm text-gray-500">
              {project.name}
            </p>
          </div>

          <button
            onClick={close}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1">

          {/* Loading */}
          {loading ? (
            <p className="text-gray-500 text-center">
              Loading members...
            </p>
          ) : (
            <>
              {/* Current Members */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Current Members
                </h3>

                {members.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No members in this project
                  </p>
                ) : (
                  <div className="space-y-3">
                    {members.map((m) => (
                      <div
                        key={m._id}
                        className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {m.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {m.email} • {m.role}
                          </p>
                        </div>

                        {user?.role === "Admin" && (
                          <button
                            onClick={() => handleRemove(m._id)}
                            className="text-red-500 text-xs hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Members */}
              {user?.role === "Admin" && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Add Members
                  </h3>

                  <MemberSelector
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <button
                    onClick={handleAddMembers}
                    disabled={selected.length === 0}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
                  >
                    Add Selected Members
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={close}
            className="w-full bg-gray-900 hover:bg-black text-white py-2 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}