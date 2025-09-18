import axios from "axios";

const api = axios.create({
  baseURL: "https://apiresgate.osiris-tech.co/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
