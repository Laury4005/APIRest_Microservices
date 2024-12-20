import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/comments", 
  timeout: 5000, // Tiempo de espera en milisegundos
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
