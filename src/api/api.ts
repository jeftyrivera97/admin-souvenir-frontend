import axios, { AxiosHeaders } from "axios"

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
    // Obtener token del auth-storage de Zustand
    let token = null;
    
    // Primero intentar obtener del auth-storage (Zustand persist)
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const parsedAuth = JSON.parse(authStorage);
        token = parsedAuth?.state?.token;
      } catch (e) {
        console.error('Error al parsear auth-storage:', e);
      }
    }
    
    // Fallback al token directo
    if (!token) {
      token = localStorage.getItem('token');
    }
    
    if (token) {
      // Asegurar que headers existe
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      // Añadir token al header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Error en interceptor de request:', error);
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
      console.log('🔴 Error 401: Token inválido o expirado');
      
      // Si recibimos un 401 (No autorizado), limpiar el token
      localStorage.removeItem('token');
      localStorage.removeItem('expires');
      localStorage.removeItem('auth-storage'); // También limpiar Zustand storage
      
      // Redirigir al login
      window.location.href = '/auth/login';
    }
    
    return Promise.reject(error);
  }
);

export default api
