import {
  IndexEmpleadosDataTable,
  NewItemButton,
} from "@/components";

//import { useAuth } from "@/store/auth";

export const EmpleadosPage = () => {
  //const user = useAuth((s) => s.user);
  //const role = user?.role || "3";

  const renderControls = () => (
    <div className="grid grid-cols-3 grid-rows-1 gap-4">
      <div>
       
      </div>

      <div />

      <div>
        <NewItemButton placeholder="Nuevo Empleado" href="/empleados/new" />
      </div>
    </div>
  );

  return (
    <>
      {renderControls()}

      <div className="grid grid-cols-1 grid-rows-1 gap-4">
        <IndexEmpleadosDataTable />
      </div>
    </>
  );
};
