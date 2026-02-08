import axios from "axios";

/**
 * Cliente Axios centralizado
 * Maneja JWT desde localStorage
 */
const axiosClient = axios.create({
  baseURL: "https://api.fake-notes.com", // Simulado (no backend real)
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Interceptor: añade JWT automáticamente
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
