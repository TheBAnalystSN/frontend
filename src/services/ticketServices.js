import axios from "axios";

const API_URL = "http://localhost:5000/api/tickets";

export const deleteTicket = async (ticketId, token) => {
  const response = await axios.delete(`${API_URL}/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
