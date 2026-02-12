import axios from "axios";

/**
 * ====================================================
 * AXIOS CLIENT CENTRALIZADO
 * ====================================================
 * - Configura baseURL
 * - Agrega automáticamente el JWT al header
 * - Maneja errores globales
 * - Mantiene el código limpio y reutilizable
 */

const axiosClient = axios.create({
  baseURL: "http://localhost:3001", // json-server
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// ====================================================
// 🔐 INTERCEPTOR DE REQUEST
// Agrega el token automáticamente si existe
// ====================================================
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ====================================================
// 🚨 INTERCEPTOR DE RESPONSE
// Manejo global de errores
// ====================================================
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Error del servidor
      console.error("Error de servidor:", error.response.data);

      if (error.response.status === 401) {
        // Token inválido o expirado
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } else if (error.request) {
      console.error("No hubo respuesta del servidor.");
    } else {
      console.error("Error en la configuración:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

