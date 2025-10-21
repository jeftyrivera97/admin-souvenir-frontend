import { EditComprobanteForm } from "@/components";
import { useParams } from "react-router";

export const EditComprobantePage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-500">ID de comprobante no válido</p>
      </div>
    );
  }

  return (
    <>
      <EditComprobanteForm comprobanteId={id} />
    </>
  );
};
