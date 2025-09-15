import axios from "axios"

// Obtener la URL base del backend desde las variables de entorno
const baseURL = import.meta.env.VITE_API_URL;

// Crear instancia de axios con configuración personalizada
const api = axios.create({
    baseURL: baseURL, // URL del backend desde .env
    withCredentials: true, // Incluir cookies en las peticiones
    timeout: 10000, // Timeout de 10 segundos
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor de solicitud (request)
// Se ejecuta antes de enviar cada petición
api.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Añadir token al header Authorization
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta (response)
// Se ejecuta después de recibir cada respuesta
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, simplemente la devolvemos
    return response;
  },
  (error) => {
    // Manejo de errores globales
    if (error.response?.status === 401) {
      // Si recibimos un 401 (No autorizado), limpiar el token
      localStorage.removeItem('token');
      localStorage.removeItem('expires');
      // Opcional: redirigir al login
      window.location.href = '/auth/login';
    }
    
    return Promise.reject(error);
  }
);

export default api
