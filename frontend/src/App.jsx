// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProjectsPage from "./pages/ProjectsPage";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import TasksPage from "./pages/TasksPage";

// Layout
import Navbar from "./components/layout/Navbar";

/* ---------- Layout Wrapper ---------- */
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

/* ---------- Protected Route ---------- */
function PrivateRoute() {
  const { user } = useAuth();
  return user ? <Layout /> : <Navigate to="/" />;
}

/* ---------- Admin Route ---------- */
function AdminRoute() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;
  if (user.role !== "Admin") return <Navigate to="/dashboard" />;

  return <Layout />;
}

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Layout Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Route>

        {/* Admin Only */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}