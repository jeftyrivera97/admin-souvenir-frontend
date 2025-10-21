import {
  IndexProveedoresDataTable,
  NewItemButton,
} from "@/components";

//import { useAuth } from "@/store/auth";

export const ProveedoresPage = () => {
  //const user = useAuth((s) => s.user);
  //const role = user?.role || "3";

  const renderControls = () => (
    <div className="grid grid-cols-3 grid-rows-1 gap-4">
      <div>
       
      </div>

      <div />

      <div>
        <NewItemButton placeholder="Nuevo Proveedor" href="/proveedores/new" />
      </div>
    </div>
  );

  return (
    <>
      {renderControls()}

      <div className="grid grid-cols-1 grid-rows-1 gap-4">
        <IndexProveedoresDataTable />
      </div>
    </>
  );
};
