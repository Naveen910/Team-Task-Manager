// pages/Login.jsx
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
// ✅ Only store if exists
if (res.data.user) {
  localStorage.setItem("user", JSON.stringify(res.data.user));
} else {
  console.error("User missing in response");
}

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.msg || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[360px]">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-gray-500">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}