import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import client from "./api/client";

/* ---------- LOGIN ---------- */
function Login() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch {
      setError("Invalid email or password");
    }
  };

  if (user) return <Navigate to="/tickets" />;

  return (
    <div className="container">
      <h2>Login</h2>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: 10 }}>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

/* ---------- REGISTER ---------- */
function Register() {
  const { register, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(name, email, password);
    } catch {
      setError("Registration failed");
    }
  };

  if (user) return <Navigate to="/tickets" />;

  return (
    <div className="container">
      <h2>Register</h2>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>

      <p style={{ marginTop: 10 }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

/* ---------- TICKETS ---------- */
function Tickets() {
  const { logout } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tickets, setTickets] = useState([]);

  const loadTickets = async () => {
    const res = await client.get("/api/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const createTicket = async (e) => {
    e.preventDefault();
    await client.post("/api/tickets", { title, description });
    setTitle("");
    setDescription("");
    loadTickets();
  };

  return (
    <div className="container">
      <div className="header">
        <h2>My Tickets</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <h3>Create Ticket</h3>

      <form onSubmit={createTicket}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Create Ticket</button>
      </form>

      <hr />

      {tickets.map((t) => (
        <div key={t._id} className="ticket">
          <strong>{t.title}</strong>
          <p>{t.description}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- PROTECTED ---------- */
function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

/* ---------- APP ---------- */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tickets"
            element={
              <Protected>
                <Tickets />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
