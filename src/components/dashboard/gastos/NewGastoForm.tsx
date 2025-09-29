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
import { GastosService, CategoriasGastosService } from "@/services";
import { useEffect, useState } from "react";

import type { CategoriaGastoData } from "@/interfaces/CategoriaGasto";

export function NewGastoForm() {
  const initialFormData = {
    codigo_gasto: "",
    fecha: "",
    descripcion: "", 
    id_categoria: "",
    total: "",
  };

  const [categorias, setCategorias] = useState<CategoriaGastoData[]>([]);
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
          await CategoriasGastosService.getCategoriasGastos(1, 100);
        setCategorias(categoriasData.data);
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
      
      const gastoData = {
        codigo_gasto: formData.codigo_gasto,
        fecha: `${formData.fecha}T00:00:00.000Z`,
        descripcion: formData.descripcion, 
        id_categoria: formData.id_categoria,
        total: Number(formData.total) || 0,
      };
      console.log(" Datos mapeados para el backend:", gastoData);
      const nuevaGasto = await GastosService.createGasto(gastoData);
      console.log("Gasto creado:", nuevaGasto);
      toast.success("Gasto creado exitosamente!");
      setFormData(initialFormData);
    } catch (error: unknown) {
      console.error("❌ Error al crear gasto:", error);
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
        "Error al crear la gasto. Revisa la consola para más detalles."
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
            <CardTitle>Crear nuevo gasto</CardTitle>
            <CardDescription>
              Ingresa los detalles del nuevo gasto a continuación
            </CardDescription>
            <CardAction>
              <BackButton url="/gastos" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {/* Columna 1 */}
              <div className="grid gap-2">
                <Label htmlFor="codigo_gasto">Código Factura/Ref</Label>
                <Input
                  id="codigo_gasto"
                  type="text"
                  placeholder="Ingrese el código del gasto"
                  value={formData.codigo_gasto}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  id="descripcion"
                  type="text"
                  placeholder="Ingrese la descripción del gasto"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="fecha">Fecha</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="id_categoria">Categoria</Label>
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
                <Label htmlFor="total">Total</Label>
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
              {submitting ? "Creando..." : "Crear Gasto"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
