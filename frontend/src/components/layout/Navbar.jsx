// components/layout/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="flex gap-6 items-center">
        <h1 className="font-bold text-lg">TaskManager</h1>

        <Link to="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>

        <Link to="/projects" className="hover:text-gray-300">
          Projects
        </Link>

        {user?.role === "Admin" && (
          <Link to="/admin" className="hover:text-gray-300">
            Admin
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm">
          {user?.name} ({user?.role})
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}