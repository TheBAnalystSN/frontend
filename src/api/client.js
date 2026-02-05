import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

client.interceptors.request.use((config) => {
  const stored = localStorage.getItem("auth");
  if (stored) {
    const auth = JSON.parse(stored);
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
  }
  return config;
});

export default client;
