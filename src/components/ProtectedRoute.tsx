import { useEffect } from 'react';
import { useAuth } from "@/store/auth";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthInit } from "@/auth/hooks/useAuthInit";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, token, loading } = useAuth();
  const location = useLocation();
  
  // Inicializar autenticación
  useAuthInit();

  // Guardar la ruta actual para redirigir después del login
  useEffect(() => {
    if (!user && !token && location.pathname !== '/auth/login') {
      localStorage.setItem('lastVisitedPath', location.pathname);
    }
  }, [user, token, location.pathname]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Si no hay usuario autenticado, redirigir a login
  if (!user || !token) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <>{children}</>;
}

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = useAuth(state => state.isAuthenticated());
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}