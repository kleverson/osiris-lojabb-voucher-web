import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8585/api/v1",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
