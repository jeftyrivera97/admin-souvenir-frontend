import { EditIngresoForm } from "@/components";
import { useParams } from "react-router";

export const EditIngresoPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-500">ID de ingreso no válido</p>
      </div>
    );
  }

  return (
    <>
      <EditIngresoForm ingresoId={id} />
    </>
  );
};
