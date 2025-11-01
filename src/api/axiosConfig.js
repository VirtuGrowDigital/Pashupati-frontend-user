import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://pashupatibackend1.onrender.com/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosConfig;
