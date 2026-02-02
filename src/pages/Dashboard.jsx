import { useEffect, useState } from "react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  const isAdmin = user?.role === "admin";

  const loadTickets = async () => {
    try {
      setError("");
      const url = isAdmin ? "/api/tickets/admin/all" : "/api/tickets";
      const res = await client.get(url);
      setTickets(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tickets");
    }
  };

  useEffect(() => {
    if (user) loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h2>Dashboard</h2>
          <p>
            Signed in as <b>{user?.name}</b> ({user?.role})
          </p>
        </div>
        <button onClick={logout} style={{ height: 40 }}>
          Logout
        </button>
      </div>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <h3 style={{ marginTop: 20 }}>
        {isAdmin ? "All Tickets" : "My Tickets"}
      </h3>

      {tickets.length === 0 ? (
        <p>No tickets yet.</p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {tickets.map((t) => (
            <div
              key={t._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b>{t.title}</b>
                <span>{t.status}</span>
              </div>
              <p style={{ margin: "6px 0" }}>{t.description}</p>
              <small>
                Priority: {t.priority} | Created:{" "}
                {new Date(t.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
