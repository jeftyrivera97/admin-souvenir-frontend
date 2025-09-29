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
import { CategoriasPlanillasService, EmpleadosService } from "@/services";
import { useEffect, useState } from "react";
import type { CategoriaPlanillaData } from "@/interfaces/CategoriaPlanilla";
import type { EmpleadoData } from "@/interfaces/Empleado";
import { PlanillasService } from "@/services/planillas/planilla.service";

export function NewPlanillaForm() {
  const initialFormData = {
    codigo_planilla: "",
    fecha: "",
    descripcion: "",
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
        const categoriasData =
          await CategoriasPlanillasService.getCategoriasPlanillas(1, 100);
        setCategorias(categoriasData.data);

        const empleadosData = await EmpleadosService.getEmpleados(1, 100);
        setEmpleados(empleadosData.data);
      } catch (error) {
        console.error("Error al cargar la informacion del backend:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id_categoria.trim()) {
      toast.error("❌ Debes seleccionar una categoría");
      return;
    }

    if (!formData.id_empleado.trim()) {
      toast.error("❌ Debes seleccionar un empleado");
      return;
    }

    setSubmitting(true);

    try {
      console.log("📝 Datos del formulario antes de enviar:", formData);
      const planillaData = {
        codigo_planilla: formData.codigo_planilla,
        descripcion: formData.descripcion,
        fecha: `${formData.fecha}T00:00:00.000Z`,
        id_categoria: formData.id_categoria,
        id_empleado: formData.id_empleado,
        total: Number(formData.total) || 0,
      };

      console.log(" Datos mapeados para el backend:", planillaData);

      const nuevaPlanilla = await PlanillasService.createPlanilla(planillaData);
      console.log("Planilla creada:", nuevaPlanilla);
      toast.success("✅ Planilla creada exitosamente!");
      setFormData(initialFormData);
    } catch (error: unknown) {
      console.error("❌ Error al crear planilla:", error);
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response: { status: number; statusText: string; data: unknown };
        };
        console.error("📄 Detalles del error:", {
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
        });
      }
      toast.error(
        "Error al crear la planilla. Revisa la consola para más detalles."
      );
    } finally {
      setSubmitting(false);
    }
  };

  console.log("Me regenero:");

  if (loading) {
    return (
      <div className="flex justify-center p-8">Cargando proveedores...</div>
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
            <CardTitle>Crear nuevo pago de planilla</CardTitle>
            <CardDescription>
              Ingresa los detalles de la nueva planilla a continuación
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
              {submitting ? "Creando..." : "Crear Planilla"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
