import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Navigate to="/tickets" />;

  const submit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>

      <Link to="/register">Register</Link>
    </div>
  );
}
