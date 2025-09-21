import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import toast, { Toaster } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackButton } from "../shared/BackButton";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import type { CategoriaPlanillaData } from "@/interfaces/CategoriaPlanilla";
import { PlanillasService } from '../../../services/planillas/planilla.service';
import { CategoriasPlanillasService } from '../../../services/categorias-planillas/categoriasPlanillas.service';
import type { EmpleadoData } from "@/interfaces/Empleado";
import { EmpleadosService } from "@/services";



interface EditPlanillaFormProps {
  planillaId: string;
}

export function EditPlanillaForm({ planillaId }: EditPlanillaFormProps) {
  const initialFormData = {
    codigo_planilla: "",
    descripcion: "", 
    fecha: "",
    id_empleado: "",
    id_categoria: "",
    total: "",
  };

  const [categorias, setCategorias] = useState<CategoriaPlanillaData[]>([]);
  const [empleados, setEmpleados] = useState<EmpleadoData[]>([]);
 
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  // Handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handler for select changes
  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar datos básicos (proveedores, tipos operaciones y categorías)
        const [categoriasData, empleadosData] = await Promise.all([
          CategoriasPlanillasService.getCategoriasPlanillas(1, 100),
          EmpleadosService.getEmpleados(1, 100),
        ]);

        setCategorias(categoriasData.data);
        setEmpleados(empleadosData.data);

        // Cargar datos de la planilla específica
        const planillaData = await PlanillasService.getPlanillaById(planillaId);
        console.log("📋 Datos de la planilla cargada:", planillaData);

        // Poblar el formulario con los datos de la planilla
        if (planillaData.data) {
          const planilla = planillaData.data; 
          console.log("📝 Datos de la planilla:", planilla);
         

          setFormData({
            codigo_planilla: planilla.codigo_planilla || "",
            fecha: planilla.fecha ? planilla.fecha.split("T")[0] : "", // Convertir ISO a YYYY-MM-DD
            id_categoria: planilla.id_categoria || "",
            id_empleado: planilla.id_empleado || "",
            descripcion: planilla.descripcion || "", //
            total: planilla.total?.toString() || "",
          });
        } else {
          console.warn("⚠️ No se encontraron datos de la planilla");
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        toast.error("Error al cargar los datos de la planilla");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [planillaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log(" Datos del formulario antes de enviar:", formData);
      const planillaData = {
        codigo_planilla: formData.codigo_planilla,
        fecha: `${formData.fecha}T00:00:00.000Z`,
        id_categoria: formData.id_categoria,
        total: Number(formData.total) || 0,
      };
      console.log("Datos mapeados para actualizar:", planillaData);

      // Actualizar en lugar de crear
      const planillaActualizada = await PlanillasService.updatePlanilla(
        planillaId,
        planillaData
      );
      console.log("Planilla actualizado:", planillaActualizada);
      toast.success("Planilla actualizado exitosamente!");
    } catch (error: unknown) {
      console.error("❌ Error al actualizar planilla:", error);
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response: { status: number; statusText: string; data: unknown };
        };
        console.error("Detalles del error:", {
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
        });
      }
      toast.error(
        "Error al actualizar la planilla. Revisa la consola para más detalles."
      );
    } finally {
      setSubmitting(false);
    }
  };

  console.log("Me regenero:");

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        Cargando datos de la planilla...
      </div>
    );
  }
  return (
    <>
      <div>
        <Toaster />
      </div>
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle>Editar pago de planilla</CardTitle>
            <CardDescription>
              Actualiza los detalles de la planilla a continuación
            </CardDescription>
            <CardAction>
              <BackButton url="/planillas" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {/* Columna 1 */}
              <div className="grid gap-2">
                <Label htmlFor="codigo_planilla">*Codigo/Ref Planilla</Label>
                <Input
                  id="codigo_planilla"
                  type="text"
                  placeholder="Ingrese el código de la planilla"
                  value={formData.codigo_planilla}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descripcion">*Descripcion</Label>
                <Input
                  id="descripcion"
                  type="text"
                  placeholder="Ingrese la descripción de la planilla"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fecha">*Fecha</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="id_categoria">*Categoria</Label>
                <Select
                  name="id_categoria"
                  required
                  value={formData.id_categoria}
                  onValueChange={(value) =>
                    handleSelectChange("id_categoria", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categorías</SelectLabel>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id}>
                          {categoria.descripcion}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* Columna 2 */}

              <div className="grid gap-2">
                <Label htmlFor="id_empleado">*Empleado</Label>
                <Select
                  name="id_empleado"
                  value={formData.id_empleado}
                  required
                  onValueChange={(value) =>
                    handleSelectChange("id_empleado", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Empleados</SelectLabel>
                      {empleados.map((empleado) => (
                        <SelectItem key={empleado.id} value={empleado.id}>
                          {empleado.nombre}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="total">*Total</Label>
                <Input
                  id="total"
                  type="number"
                  step="0.01"
                  value={formData.total}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={submitting}>
              <Save className="mr-2 h-4 w-4" />
              {submitting ? "Actualizando..." : "Actualizar Planilla"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
