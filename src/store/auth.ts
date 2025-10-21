// src/stores/auth.ts
// Zustand es una librería de manejo de estado global ligera y simple
import { create } from "zustand";
// devtools: habilita integración con Redux DevTools para debugging
// persist: permite guardar el estado en localStorage automáticamente
import { devtools, persist } from "zustand/middleware";

// Definición de tipos para roles de usuario
// type Role = "admin" | "cashier" | "viewer";

// Estructura del objeto usuario
type User = {
  id: string;
  email: string;
  role?: string;
  name?: string; // El signo ? indica que es opcional
};

// Definición del estado global de autenticación
// En Zustand, esto es como el "contrato" de lo que puede hacer el store
type AuthState = {
  // ESTADO: Datos que se almacenan en el store
  user?: User; // Usuario actual (undefined si no está logueado)
  token?: string; // Token JWT de autenticación
  loading: boolean; // Indica si hay una operación en progreso
  error?: string; // Mensaje de error si algo sale mal

  // COMPUTED/DERIVED: Funciones que calculan valores basados en el estado
  isAuthenticated: () => boolean; // Devuelve true si el usuario está logueado

  // ACTIONS: Funciones que modifican solo el estado (sin lógica de API)
  setSession: (payload: { token?: string; user?: User }) => void; // Establece sesión manualmente
  clearSession: () => void; // Limpia toda la sesión
  setLoading: (loading: boolean) => void; // Controla estado de carga
  setError: (error: string) => void; // Establece mensaje de error
  clearError: () => void; // Limpia errores
  setUser: (user: User) => void; // Actualiza solo el usuario
  setToken: (token: string) => void; // Actualiza solo el token
};

// Creación del store de Zustand con middlewares
export const useAuth = create<AuthState>()(
  devtools(
    // Middleware para debugging con Redux DevTools
    persist(
      // Middleware para persistir datos en localStorage
      (set, get) => ({
        // VALORES INICIALES DEL ESTADO
        user: undefined, // No hay usuario al inicio
        token: undefined, // No hay token al inicio
        loading: false, // No hay operaciones en progreso
        error: undefined, // No hay errores al inicio

        // FUNCIÓN COMPUTED: Verifica si el usuario está autenticado
        // get() obtiene el estado actual del store
        isAuthenticated: () => Boolean(get().token && get().user),

        // ACCIÓN: Establece una sesión completa (token + usuario)
        setSession: ({ token, user }) => {
          const updates: Partial<AuthState> = {};
          if (token !== undefined) updates.token = token;
          if (user !== undefined) updates.user = user;
          set(updates);
        },

        // ACCIÓN: Limpia toda la sesión
        clearSession: () =>
          set({
            token: undefined,
            user: undefined,
            error: undefined,
          }),

        // ACCIÓN: Controla el estado de loading
        setLoading: (loading: boolean) => set({ loading }),

        // ACCIÓN: Establece un mensaje de error
        setError: (error: string) => set({ error }),

        // ACCIÓN: Limpia cualquier error existente
        clearError: () => set({ error: undefined }),

        // ACCIÓN: Actualiza solo el usuario
        setUser: (user: User) => set({ user }),

        // ACCIÓN: Actualiza solo el token
        setToken: (token: string) => set({ token }),
      }),
      {
        // CONFIGURACIÓN DE PERSISTENCIA
        name: "auth-storage", // Clave usada en localStorage

        // partialize: Especifica qué partes del estado se deben persistir
        // Solo persiste token y user, no loading ni error (que son temporales)
        partialize: (state) => ({ token: state.token, user: state.user }),
      }
    )
  )
);

/*
NUEVA ARQUITECTURA SEPARADA:

=== STORE (auth.ts) - Solo manejo de estado ===
- setSession(): Guarda token y usuario
- clearSession(): Limpia toda la sesión  
- setLoading(): Controla estados de carga
- setError(): Maneja mensajes de error
- setUser(): Actualiza solo el usuario
- setToken(): Actualiza solo el token

=== useAuthStore.ts - Lógica de API ===
- startLogin(): Hace login y actualiza el store
- startLogout(): Hace logout y limpia el store
- checkAuthToken(): Verifica y renueva tokens
- getCurrentUser(): Obtiene datos del usuario actual

=== Cómo usar en componentes ===

1. Para operaciones de API:
   const { startLogin, startLogout } = useAuthStore();

2. Para acceder al estado:
   const { user, loading, error, isAuthenticated } = useAuth();

3. Ejemplo en LoginForm:
   const { startLogin } = useAuthStore();
   const { loading, error } = useAuth();
   
   const handleLogin = async () => {
     await startLogin({ email, password });
   };

*/
