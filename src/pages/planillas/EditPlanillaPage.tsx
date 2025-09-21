import { EditPlanillaForm } from "@/components";
import { useParams } from "react-router";



export const EditPlanillaPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-500">ID de gasto no válido</p>
      </div>
    );
  }

  return (
    <>
      <EditPlanillaForm planillaId={id} />
    </>
  );
};
