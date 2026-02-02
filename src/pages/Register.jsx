import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    try {
      await register(name, email, password);
      setMsg("Registration successful. Please login.");
      setTimeout(() => navigate("/login"), 700);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h2>Register</h2>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {msg && <p style={{ color: "green" }}>{msg}</p>}

      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input
          style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        <label>Password</label>
        <input
          style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        <button style={{ padding: "10px 14px" }} type="submit">
          Create account
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
