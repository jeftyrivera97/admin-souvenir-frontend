import { useEffect } from "react";
import { useAuthStore } from "@/auth/hooks/useAuthStore";

/**
 * Hook para inicializar la autenticación cuando la app se carga
 * Verifica si hay un token guardado y si es válido
 */
export function useAuthInit() {
  const { checkAuthToken } = useAuthStore();
  
  useEffect(() => {
    // Verificar autenticación al cargar la app
    checkAuthToken();
  }, [checkAuthToken]);
}