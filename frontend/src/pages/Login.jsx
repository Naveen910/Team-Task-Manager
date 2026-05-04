import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", form);
      
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err); // Helpful for debugging
      const message = err.response?.data?.msg || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Login</h2>
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={{ display: "block", margin: "10px 0", width: "100%", padding: "10px" }}
      />
      
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={{ display: "block", margin: "10px 0", width: "100%", padding: "10px" }}
      />

      <button 
        onClick={handleLogin} 
        disabled={loading}
        style={{ padding: "10px 20px", marginTop: "10px" }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p style={{ marginTop: "15px" }}>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}