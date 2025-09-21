import { EditCompraForm } from "@/components";
import { useParams } from "react-router";

export const EditCompraPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-500">ID de compra no válido</p>
      </div>
    );
  }

  return (
    <>
      <EditCompraForm compraId={id} />
    </>
  );
};
