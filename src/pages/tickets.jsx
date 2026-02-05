import { useEffect, useState } from "react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Tickets() {
  const { logout } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await client.get("/api/tickets");
      setTickets(res.data);
    };

    fetchTickets();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await client.post("/api/tickets", { title, description });
    setTitle("");
    setDescription("");

    const res = await client.get("/api/tickets");
    setTickets(res.data);
  };

  return (
    <div>
      <h2>Tickets</h2>
      <button onClick={logout}>Logout</button>

      <form onSubmit={submit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Create Ticket</button>
      </form>

      <ul>
        {tickets.map((t) => (
          <li key={t._id}>
            <b>{t.title}</b> — {t.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
