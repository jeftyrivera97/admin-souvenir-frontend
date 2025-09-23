import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { LoginPage } from "./auth/index.ts";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { ComprasPage, IngresosPage, NewIngresoPage, EditIngresoPage, EmpleadosPage, GastosPage, PlanillasPage, ProveedoresPage, HomePage, NewGastoPage, EditGastoPage, NewCompraPage, EditCompraPage, NewPlanillaPage, EditPlanillaPage, NewEmpleadoPage, EditEmpleadoPage, NewProveedorPage, EditProveedorPage } from "./pages/index.ts";




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
          <Route index element={<HomePage />} />{" "}
          <Route path="dashboard" element={<HomePage />} />  {/* Ruta por defecto "/" */}

          <Route path="compras" element={<ComprasPage />} />
          <Route path="compras/new" element={<NewCompraPage />} />
          <Route path="compras/:id/edit" element={<EditCompraPage />} />


          <Route path="gastos" element={<GastosPage />} />
          <Route path="gastos/new" element={<NewGastoPage />} />
          <Route path="gastos/:id/edit" element={<EditGastoPage />} />

           <Route path="planillas" element={<PlanillasPage />} />
          <Route path="planillas/new" element={<NewPlanillaPage />} />
          <Route path="planillas/:id/edit" element={<EditPlanillaPage />} />


          <Route path="ingresos" element={<IngresosPage />} />
          <Route path="ingresos/new" element={<NewIngresoPage />} />
          <Route path="ingresos/:id/edit" element={<EditIngresoPage />} />


          <Route path="empleados" element={<EmpleadosPage />} />
          <Route path="empleados/new" element={<NewEmpleadoPage />} />
          <Route path="empleados/:id/edit" element={<EditEmpleadoPage />} />
         
          <Route path="proveedores" element={<ProveedoresPage />} />
          <Route path="proveedores/new" element={<NewProveedorPage />} />
          <Route path="proveedores/:id/edit" element={<EditProveedorPage />} />

     
          {/* Las otras rutas */}
        
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
