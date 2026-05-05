// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProjectsPage from "./pages/ProjectsPage";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";

// Layout (optional but recommended)
import Navbar from "./components/layout/Navbar";

// 🔐 Protected Route
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

// 👑 Admin Route
function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;
  if (user.role !== "Admin") return <Navigate to="/dashboard" />;

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <ProjectsPage />
              </>
            </PrivateRoute>
          }
        />

        {/* Admin Only */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <>
                <Navbar />
                <AdminPage />
              </>
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}