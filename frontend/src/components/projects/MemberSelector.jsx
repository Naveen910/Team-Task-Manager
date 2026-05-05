// components/projects/MemberSelector.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";

export default function MemberSelector({ selected, setSelected }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users").then((res) => setUsers(res.data));
  }, []);

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((m) => m !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="max-h-40 overflow-y-auto border p-2 rounded">
      {users.map((u) => (
        <label key={u._id} className="block text-sm mb-1">
          <input
            type="checkbox"
            checked={selected.includes(u._id)}
            onChange={() => toggle(u._id)}
          />
          <span className="ml-2">
            {u.name} ({u.role})
          </span>
        </label>
      ))}
    </div>
  );
}