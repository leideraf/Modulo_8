import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Obtener token del localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Manejo de errores centralizado
const handleError = (error) => {
  const errorMessage =
    error.response?.data?.detail ||
    error.response?.data?.error ||
    error.message ||
    'Ha ocurrido un error en el consumo de la API';
  throw new Error(errorMessage);
};

// Cliente API con interceptores
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL: this.baseURL,
      headers: { 'Content-Type': 'application/json' }
    });

    // Interceptor de solicitud
    this.instance.interceptors.request.use(
      (config) => {
        const authHeaders = getAuthHeaders();
        config.headers = { ...config.headers, ...authHeaders };
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor de respuesta
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Aquí se agregará la lógica de refresh token cuando implementemos JWT
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url, config = {}) {
    try {
      const response = await this.instance.get(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async post(url, data = {}, config = {}) {
    try {
      const response = await this.instance.post(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async put(url, data = {}, config = {}) {
    try {
      const response = await this.instance.put(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async delete(url, config = {}) {
    try {
      const response = await this.instance.delete(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
}

const apiClient = new ApiClient(API_URL);

// Servicio de Autenticación (Se activará cuando implementemos JWT)
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      if (response.data.tokens?.access) {
        localStorage.setItem('access_token', response.data.tokens.access);
      }
      if (response.data.tokens?.refresh) {
        localStorage.setItem('refresh_token', response.data.tokens.refresh);
      }
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);

      if (response.data.tokens?.access) {
        localStorage.setItem('access_token', response.data.tokens.access);
      }
      if (response.data.tokens?.refresh) {
        localStorage.setItem('refresh_token', response.data.tokens.refresh);
      }
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

// Servicio de Notas
export const noteAPI = {
  getNotes: async () => {
    return apiClient.get('/notes/');
  },

  createNote: async (noteData) => {
    return apiClient.post('/notes/', noteData);
  },

  updateNote: async (noteId, noteData) => {
    return apiClient.put(`/notes/${noteId}/`, noteData);
  },

  deleteNote: async (noteId) => {
    return apiClient.delete(`/notes/${noteId}/`);
  },

  getNotesByCategory: async (category) => {
    return apiClient.get(`/notes/?category=${category}`);
  }
};

export default apiClient;