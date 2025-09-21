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
  GastosService,
  CategoriasGastosService,
} from "@/services";
import { useEffect, useState } from "react";
import type { CategoriaGastoData } from "@/interfaces/CategoriaGasto";



interface EditGastoFormProps {
  gastoId: string;
}

export function EditGastoForm({ gastoId }: EditGastoFormProps) {
  const initialFormData = {
    codigo_gasto: "",
    descripcion: "", 
    fecha: "",
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
    const loadData = async () => {
      try {
        // Cargar datos básicos (proveedores, tipos operaciones y categorías)
        const [categoriasData] = await Promise.all([
          CategoriasGastosService.getCategoriasGastos(1, 100),
        ]);

        setCategorias(categoriasData.data);

        // Cargar datos de la gasto específica
        const gastoData = await GastosService.getGastoById(gastoId);
        console.log("📋 Datos de la gasto cargada:", gastoData);

        // Poblar el formulario con los datos de la gasto
        if (gastoData.data) {
          const gasto = gastoData.data; 
          console.log("📝 Datos de la gasto:", gasto);
         

          setFormData({
            codigo_gasto: gasto.codigo_gasto || "",
            fecha: gasto.fecha ? gasto.fecha.split("T")[0] : "", // Convertir ISO a YYYY-MM-DD
            id_categoria: gasto.id_categoria || "",
            descripcion: gasto.descripcion || "", //
            total: gasto.total?.toString() || "",
          });
        } else {
          console.warn("⚠️ No se encontraron datos de la gasto");
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        toast.error("Error al cargar los datos de la gasto");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [gastoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log(" Datos del formulario antes de enviar:", formData);
      const gastoData = {
        codigo_gasto: formData.codigo_gasto,
        fecha: `${formData.fecha}T00:00:00.000Z`,
        id_categoria: formData.id_categoria,
        total: Number(formData.total) || 0,
      };
      console.log("Datos mapeados para actualizar:", gastoData);

      // Actualizar en lugar de crear
      const gastoActualizada = await GastosService.updateGasto(
        gastoId,
        gastoData
      );
      console.log("Gasto actualizado:", gastoActualizada);
      toast.success("Gasto actualizado exitosamente!");
    } catch (error: unknown) {
      console.error("❌ Error al actualizar gasto:", error);
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
        "Error al actualizar la gasto. Revisa la consola para más detalles."
      );
    } finally {
      setSubmitting(false);
    }
  };

  console.log("Me regenero:");

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        Cargando datos de la gasto...
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
            <CardTitle>Editar gasto</CardTitle>
            <CardDescription>
              Modifica los detalles del gasto seleccionado
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
                  placeholder="Ingrese el código de la gasto"
                  value={formData.codigo_gasto}
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
                <Label htmlFor="descripcion">Descripcion</Label>
                <Input
                  id="descripcion"
                  type="text"
                  placeholder="Ingrese la descripcion del gasto"
                  value={formData.descripcion}
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
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={submitting}>
              <Save className="mr-2 h-4 w-4" />
              {submitting ? "Actualizando..." : "Actualizar Gasto"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
