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
import {
  EmpleadosService,
  CategoriasEmpleadosService,
  AreasEmpleadosService,
} from "@/services";
import { useEffect, useState } from "react";

import type { AreaEmpleadoData } from "@/interfaces/AreaEmpleado";
import type { CategoriaEmpleadoData } from "@/interfaces/CategoriaEmpleado";

export function NewEmpleadoForm() {
  const initialFormData = {
    codigo_empleado: "",
    nombre: "",
    apellido: "",
    id_categoria: "",
    id_area: "",
    telefono: "",
  };

  const [categorias, setCategorias] = useState<CategoriaEmpleadoData[]>([]);
  const [areas, setAreas] = useState<AreaEmpleadoData[]>([]);
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
    const loadProveedores = async () => {
      try {
        const categoriasData =
          await CategoriasEmpleadosService.getCategoriasEmpleados(1, 100);

        const areasData = await AreasEmpleadosService.getAreasEmpleados(1, 100);
        setCategorias(categoriasData.data);
        setAreas(areasData.data);
      } catch (error) {
        console.error("Error al cargar la informacion del backend:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProveedores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log("📝 Datos del formulario antes de enviar:", formData);

      const empleadoData = {
        codigo_empleado: formData.codigo_empleado,
        nombre: formData.nombre,
        apellido: formData.apellido,
        id_categoria: formData.id_categoria,
        id_area: formData.id_area,
        telefono: formData.telefono,
      };
      console.log(" Datos mapeados para el backend:", empleadoData);
      const nuevaEmpleado = await EmpleadosService.createEmpleado(empleadoData);
      console.log("Empleado creado:", nuevaEmpleado);
      toast.success("Empleado creado exitosamente!");
      setFormData(initialFormData);
    } catch (error: unknown) {
      console.error("❌ Error al crear empleado:", error);
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response: { status: number; statusText: string; data: unknown };
        };
        console.error("📄 Detalles del error:", {
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
        });
        
        // Log specific validation errors if available
        const errorData = axiosError.response?.data as { errors?: string[] };
        if (errorData?.errors) {
          console.error("🔍 Errores de validación específicos:", errorData.errors);
        }
      }
      toast.error(
        "Error al crear la empleado. Revisa la consola para más detalles."
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
            <CardTitle>Crear nuevo empleado</CardTitle>
            <CardDescription>
              Ingresa los detalles del nuevo empleado a continuación
            </CardDescription>
            <CardAction>
              <BackButton url="/empleados" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {/* Columna 1 */}
              <div className="grid gap-2">
                <Label htmlFor="codigo_empleado">*Codigo Empleado</Label>
                <Input
                  id="codigo_empleado"
                  type="text"
                  placeholder="Ingrese el código del empleado"
                  value={formData.codigo_empleado}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="nombre">*Nombre</Label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Ingrese el nombre del empleado"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="apellido">*Apellido</Label>
                <Input
                  id="apellido"
                  type="text"
                  placeholder="Ingrese el apellido del empleado"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="telefono">*Teléfono</Label>
                <Input
                  id="telefono"
                  type="text"
                  placeholder="Ingrese el teléfono del empleado"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="id_categoria">*Categoria</Label>
                <Select
                  name="id_categoria"
                  value={formData.id_categoria}
                  onValueChange={(value) =>
                    handleSelectChange("id_categoria", value)
                  }
                  required
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

              <div className="grid gap-2">
                <Label htmlFor="id_area">*Area</Label>
                <Select
                  name="id_area"
                  value={formData.id_area}
                  onValueChange={(value) =>
                    handleSelectChange("id_area", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Areas</SelectLabel>
                      {areas.map((area) => (
                        <SelectItem key={area.id} value={area.id}>
                          {area.descripcion}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={submitting}>
              <Save className="mr-2 h-4 w-4" />
              {submitting ? "Creando..." : "Crear Empleado"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
