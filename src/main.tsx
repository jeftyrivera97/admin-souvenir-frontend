import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { LoginPage } from "./auth/index.ts";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { ComprasPage, IngresoPage, DashboardPage, EmpleadosPage, GastosPage, PlanillasPage, ProveedoresPage, VentasPage } from "./pages/index.ts";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta de autenticación - independiente */}
        <Route path="/auth/login" element={<LoginPage />} />

        {/* Rutas principales protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        >
          {/* Rutas anidadas dentro del layout de App */}
          <Route index element={<DashboardPage />} />{" "}
          <Route path="dashboard" element={<DashboardPage />} />  {/* Ruta por defecto "/" */}
          <Route path="compras" element={<ComprasPage />} />
          <Route path="gastos" element={<GastosPage />} />
          <Route path="ingresos" element={<IngresoPage />} />
          <Route path="empleados" element={<EmpleadosPage />} />
          <Route path="planillas" element={<PlanillasPage />} />
          <Route path="proveedores" element={<ProveedoresPage />} />
          <Route path="ventas" element={<VentasPage />} />
          {/* Las otras rutas */}
        
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
