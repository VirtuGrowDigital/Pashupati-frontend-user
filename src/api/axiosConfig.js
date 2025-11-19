import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://api.pashupatifood.com/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosConfig;
