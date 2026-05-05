// pages/AdminPage.jsx
import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member"
  });

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    await API.post("/users", form);
    setForm({ name: "", email: "", password: "", role: "Member" });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  const changeRole = async (id, role) => {
    await API.patch(`/users/${id}/role`, { role });
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* Create User */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <h2 className="font-semibold mb-3">Create User</h2>

        <div className="grid grid-cols-4 gap-2">
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="border p-2 rounded"
          />

          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button
          onClick={createUser}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create User
        </button>
      </div>

      {/* User List */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="font-semibold mb-3">Users</h2>

        {users.map(user => (
          <div
            key={user._id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={user.role}
                onChange={(e) =>
                  changeRole(user._id, e.target.value)
                }
                className="border p-1 rounded text-sm"
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>

              <button
                onClick={() => deleteUser(user._id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <p className="text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
}