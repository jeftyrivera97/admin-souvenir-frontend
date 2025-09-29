import { EditEmpleadoComponent } from "@/components"
import { useParams } from "react-router";


export const EditEmpleadoPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-500">ID de gasto no válido</p>
      </div>
    );
  }
  return (
    <EditEmpleadoComponent empleadoId={id} />
  )
}
