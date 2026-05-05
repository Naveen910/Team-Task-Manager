// components/projects/TeamModal.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";
import MemberSelector from "./MemberSelector";
import { useAuth } from "../../context/AuthContext";

export default function TeamModal({ project, close, refresh }) {
  const { user } = useAuth();

  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState([]); // ✅ always array
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
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-hidden">
    {/* Modal */}
    <div className="bg-white w-[450px] max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden will-change-transform">
      
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 flex-shrink-0">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
          <p className="text-sm text-gray-500 mt-0.5">{project.name}</p>
        </div>

        <button
          onClick={close}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Scrollable Body */}
      <div 
        className="flex-1 p-6 overflow-y-auto custom-scroll"
        style={{ scrollbarGutter: 'stable both-edges' }}
      >
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">Loading members...</p>
          </div>
        ) : (
          <>
            {/* Current Members */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Current Members</h3>

              {members.length === 0 ? (
                <p className="text-sm text-gray-400 py-8 text-center">
                  No members in this project
                </p>
              ) : (
                <div className="space-y-3">
                  {members.map((m) => (
                    <div
                      key={m._id}
                      className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{m.name}</p>
                        <p className="text-xs text-gray-500">{m.email} • {m.role}</p>
                      </div>

                      {user?.role === "Admin" && (
                        <button
                          onClick={() => handleRemove(m._id)}
                          className="text-red-500 hover:text-red-600 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
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
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Members</h3>
                <MemberSelector selected={selected} setSelected={setSelected} />
                
                <button
                  onClick={handleAddMembers}
                  disabled={selected.length === 0}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  Add Selected Members
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
        <button
          onClick={close}
          className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);
}