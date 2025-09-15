import { useAuth } from "@/store/auth";
import api from "@/api/api";
import { type ApiError } from "@/interfaces/ApiError";
import { AxiosError } from "axios";

const RENEW_MARGIN_SECONDS = 60;

// Tipos para las respuestas del backend
type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
  message?: string;
};

type UserResponse = {
  id: string;
  email: string;
  name?: string;
  role?: string;
};

export const useAuthStore = () => {
  // Obtener las acciones del store de Zustand
  const { setSession, clearError, setLoading, setError, clearSession } = useAuth();

  // FUNCIÓN: Login con email y password
  const startLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    // Activar loading y limpiar errores
    setLoading(true);
    clearError();
    
    try {
      // Petición al backend
      const { data }: { data: LoginResponse } = await api.post("/auth/login", { 
        email, 
        password 
      });
      
      console.log("Login exitoso:", data);
      
      // Mapear respuesta del backend al formato del store
      const user = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: (data.user.role as "admin" | "cashier" | "viewer") || "admin"
      };
      
      // Guardar en el store de Zustand
      setSession({ token: data.token, user });
      
      // También guardar datos adicionales para renovación de token
      localStorage.setItem("expires", new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()); // 7 días
      
      // Redirigir a la página original o dashboard
      const lastVisitedPath = localStorage.getItem('lastVisitedPath');
      localStorage.removeItem('lastVisitedPath');
      
      // Si hay una ruta guardada, redirigir ahí, sino al dashboard
      window.location.href = lastVisitedPath || '/';
      
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      
      // Manejar errores de axios
      let errorMessage = "Error de autenticación";
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosError<{ error?: string; message?: string }>;
        if (axiosError.response?.data?.error) {
          errorMessage = axiosError.response.data.error;
        } else if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.message) {
          errorMessage = axiosError.message;
        }
      }
      
      setError(errorMessage);
      localStorage.removeItem("token");
      localStorage.removeItem("expires");
    } finally {
      setLoading(false);
    }
  };

  // FUNCIÓN: Logout del usuario
  const startLogout = async () => {
    try {
      // Notificar al backend sobre el logout
      await api.post("/auth/logout");
    } catch (error) {
      console.warn("Error al hacer logout en el servidor:", error);
    } finally {
      // Limpiar el store y localStorage
      clearSession();
      localStorage.removeItem("expires");
      localStorage.removeItem("lastVisitedPath");
    }
  };

  // FUNCIÓN: Verificar y renovar token automáticamente
  const checkAuthToken = async (): Promise<UserResponse | null> => {
    const token = localStorage.getItem("token");
    const expires_at = localStorage.getItem("expires");
    
    if (!token) {
      return null;
    }
    
    try {
      if (expires_at) {
        const expiresDate = new Date(expires_at);
        const now = new Date();
        const secondsToExpire = (expiresDate.getTime() - now.getTime()) / 1000;

        if (secondsToExpire <= 0) {
          // Token ya expiró
          console.log("Token expirado");
          clearSession();
          localStorage.removeItem("expires");
          return null;
        }

        if (secondsToExpire <= RENEW_MARGIN_SECONDS) {
          // Renovar token automáticamente
          try {
            const { data } = await api.post("/auth/refresh"); // o /user/renew/token según tu backend
            
            // Actualizar token en el store
            const currentUser = useAuth.getState().user;
            setSession({ token: data.token, user: currentUser });
            
            localStorage.setItem("expires", data.expires_at || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString());
            console.log("Token renovado automáticamente");
          } catch (error) {
            const apiError = error as ApiError;
            console.error("Error al renovar el token:", apiError.message || apiError);
            clearSession();
            localStorage.removeItem("expires");
            return null;
          }
        }
      }

      // Obtener datos del usuario actual
      const { data }: { data: UserResponse } = await api.get("/auth/me"); // o /user según tu backend
      
      // Actualizar usuario en el store
      const user = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: (data.role as "admin" | "cashier" | "viewer") || "admin"
      };
      
      setSession({ user });
      
      return data;
      
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error al obtener el usuario:", apiError.message || apiError);
      clearSession();
      localStorage.clear();
      return null;
    }
  };

  // FUNCIÓN: Verificar si el usuario actual es válido
  const getCurrentUser = async (): Promise<UserResponse | null> => {
    try {
      const { data }: { data: UserResponse } = await api.get("/auth/me");
      
      const user = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: (data.role as "admin" | "cashier" | "viewer") || "admin"
      };
      
      setSession({ user });
      return data;
      
    } catch (error) {
      console.error("Error al obtener el usuario actual:", error);
      clearSession();
      return null;
    }
  };

  return {
    // Métodos de autenticación
    startLogin,
    startLogout,
    checkAuthToken,
    getCurrentUser,
  };
};
