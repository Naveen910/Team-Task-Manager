// components/layout/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-white"
      : "text-gray-400 hover:text-white";

  return (
    <div className="bg-gray-900 border-b border-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-sm">

      {/* Left Section */}
      <div className="flex items-center gap-8">

        {/* Logo */}
        <h1 className="font-semibold text-xl tracking-wide">
          TaskManager
        </h1>

        {/* Navigation */}
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>

          <Link to="/projects" className={isActive("/projects")}>
            Projects
          </Link>

            <Link to="/tasks" className={isActive("/tasks")}>
              Tasks
            </Link>

          {user?.role === "Admin" && (
            <Link to="/admin" className={isActive("/admin") }>
              Admin
            </Link>
          )}

          
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* User Info */}
        <div className="text-right">
          <p className="text-sm font-medium text-white">
            {user?.name}
          </p>
          <p className="text-xs text-gray-400">
            {user?.role}
          </p>
        </div>

       

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}