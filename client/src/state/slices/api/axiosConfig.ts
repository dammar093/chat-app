import axios from "axios";

const api = axios.create({
  baseURL: "https://real-time-chat-api-bndl.onrender.com",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;