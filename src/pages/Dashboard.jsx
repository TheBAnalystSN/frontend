import { useEffect, useState } from "react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllTickets = async () => {
      const res = await client.get("/api/tickets/admin/all");
      setTickets(res.data);
      setLoading(false);
    };
    loadAllTickets();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Admin Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        tickets.map((t) => (
          <div
            key={t._id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              marginBottom: 10,
            }}
          >
            <b>{t.title}</b>
            <p>{t.description}</p>
            <small>
              {t.priority} | {t.status}
            </small>
          </div>
        ))
      )}
    </div>
  );
}
