// pages/Signup.jsx
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");

      await API.post("/auth/signup", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[360px]">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Role */}
        <select
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>

        {/* Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}