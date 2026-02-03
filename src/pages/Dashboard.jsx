import { useEffect, useState } from "react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [loadingTickets, setLoadingTickets] = useState(false);

  // create ticket form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createMsg, setCreateMsg] = useState("");

  const isAdmin = user?.role === "admin";

  const loadTickets = async () => {
    try {
      setError("");
      setLoadingTickets(true);

      const url = isAdmin ? "/api/tickets/admin/all" : "/api/tickets";
      const res = await client.get(url);

      setTickets(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tickets");
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    if (user) loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const resetCreateMessages = () => {
    setCreateError("");
    setCreateMsg("");
  };

  const onCreateTicket = async (e) => {
    e.preventDefault();
    resetCreateMessages();

    if (!title.trim() || !description.trim()) {
      setCreateError("Title and description are required.");
      return;
    }

    try {
      setCreating(true);

      await client.post("/api/tickets", {
        title: title.trim(),
        description: description.trim(),
        priority,
      });

      setCreateMsg("Ticket created.");
      setTitle("");
      setDescription("");
      setPriority("Low");

      await loadTickets();
    } catch (err) {
      setCreateError(err.response?.data?.message || "Failed to create ticket");
    } finally {
      setCreating(false);
    }
  };

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

      {/* Create Ticket (users only) */}
      {!isAdmin && (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 12,
            marginTop: 16,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Create Ticket</h3>

          {createError && <p style={{ color: "crimson" }}>{createError}</p>}
          {createMsg && <p style={{ color: "green" }}>{createMsg}</p>}

          <form onSubmit={onCreateTicket}>
            <label>Title</label>
            <input
              style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Laptop not turning on"
            />

            <label>Description</label>
            <textarea
              style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="The laptop does not power on at all."
            />

            <label>Priority</label>
            <select
              style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <button
              style={{ padding: "10px 14px" }}
              type="submit"
              disabled={creating}
            >
              {creating ? "Creating..." : "Submit Ticket"}
            </button>
          </form>
        </div>
      )}

      <h3 style={{ marginTop: 20 }}>{isAdmin ? "All Tickets" : "My Tickets"}</h3>

      {loadingTickets ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
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
