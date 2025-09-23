import { EditProveedorForm } from "@/components";
import { useParams } from "react-router";



export const EditProveedorPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-500">ID de proveedor no válido</p>
      </div>
    );
  }

  return (
    <>
      <EditProveedorForm proveedorId={id} />
    </>
  );
};
