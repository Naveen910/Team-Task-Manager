// components/projects/MemberSelector.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";

export default function MemberSelector({ selected, setSelected }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/users")
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((m) => m !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="border rounded-xl max-h-48 overflow-y-auto bg-gray-50">

      {/* Loading */}
      {loading && (
        <p className="text-sm text-gray-500 p-3 text-center">
          Loading users...
        </p>
      )}

      {/* Empty */}
      {!loading && users.length === 0 && (
        <p className="text-sm text-gray-400 p-3 text-center">
          No users found
        </p>
      )}

      {/* Users */}
      {!loading && users.length > 0 && (
        <div className="divide-y">
          {users.map((u) => {
            const isSelected = selected.includes(u._id);

            return (
              <div
                key={u._id}
                onClick={() => toggle(u._id)}
                className={`flex justify-between items-center px-3 py-2 cursor-pointer transition
                  ${isSelected ? "bg-blue-50" : "hover:bg-gray-100"}
                `}
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {u.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {u.role}
                  </p>
                </div>

                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggle(u._id)}
                  onClick={(e) => e.stopPropagation()} // prevent double toggle
                  className="w-4 h-4 accent-blue-600"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}