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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackButton } from "../shared/BackButton";
import { Save } from "lucide-react";
import {
  ProveedoresService,
} from "@/services";
import { useEffect, useState } from "react";


interface EditProveedorFormProps {
  proveedorId: string;
}

export function EditProveedorForm({ proveedorId }: EditProveedorFormProps) {
  const initialFormData = {
    codigo_proveedor: "",
    descripcion: "", 
    categoria: "",
    contacto: "",
    telefono: "",
    correo: "",
  };
 
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  // Handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar datos del proveedor específica
        const proveedorData = await ProveedoresService.getProveedorById(proveedorId);
        console.log("📋 Datos del proveedor cargada:", proveedorData);

        // Poblar el formulario con los datos del proveedor
        if (proveedorData.data) {
          const proveedor = proveedorData.data; 
          console.log("📝 Datos del proveedor:", proveedor);
         

          setFormData({
            codigo_proveedor: proveedor.codigo_proveedor || "",
            descripcion: proveedor.descripcion || "",
            categoria: proveedor.categoria || "",
            contacto: proveedor.contacto || "",
            telefono: proveedor.telefono.toString() || "",
            correo: proveedor.correo || "",
          });
        } else {
          console.warn("⚠️ No se encontraron datos del proveedor");
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        toast.error("Error al cargar los datos del proveedor");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [proveedorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log(" Datos del formulario antes de enviar:", formData);
      const proveedorData = {
        codigo_proveedor: formData.codigo_proveedor,
        descripcion:  formData.descripcion,
        categoria: formData.categoria,
        contacto: formData.contacto,
        telefono: formData.telefono,
        correo: formData.correo,
      };
      console.log("Datos mapeados para actualizar:", proveedorData);

      // Actualizar en lugar de crear
      const proveedorActualizada = await ProveedoresService.updateProveedor(
        proveedorId,
        proveedorData
      );
      console.log("Proveedor actualizado:", proveedorActualizada);
      toast.success("Proveedor actualizado exitosamente!");
    } catch (error: unknown) {
      console.error("❌ Error al actualizar proveedor:", error);
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
        "Error al actualizar la proveedor. Revisa la consola para más detalles."
      );
    } finally {
      setSubmitting(false);
    }
  };

  console.log("Me regenero:");

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        Cargando datos del proveedor...
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
            <CardTitle>Editar proveedor</CardTitle>
            <CardDescription>
              Modifica los detalles del proveedor seleccionado
            </CardDescription>
            <CardAction>
              <BackButton url="/proveedores" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {/* Columna 1 */}
              <div className="grid gap-2">
                <Label htmlFor="codigo_proveedor">*Codigo Proveedor</Label>
                <Input
                  id="codigo_proveedor"
                  type="text"
                  placeholder="Ingrese el código del proveedor"
                  value={formData.codigo_proveedor}
                  onChange={handleInputChange}
                  required
                />
              </div>
             
              <div className="grid gap-2">
                <Label htmlFor="descripcion">Descripcion</Label>
                <Input
                  id="descripcion"
                  type="text"
                  placeholder="Ingrese la descripcion del proveedor"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Input
                  id="categoria"
                  type="text"
                  placeholder="Ingrese la categoria del proveedor"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  required
                />
              </div>
                <div className="grid gap-2">
                <Label htmlFor="contacto">Contacto</Label>
                <Input
                  id="contacto"
                  type="text"
                  placeholder="Ingrese el nombre del Vendedor"
                  value={formData.contacto}
                  onChange={handleInputChange}
                  required
                />
              </div>

               <div className="grid gap-2">
                <Label htmlFor="telefono">Telefono</Label>
                <Input
                  id="telefono"
                  type="text"
                  placeholder="Ingrese el numero telefonico"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="correo">Correo Electronico</Label>
                <Input
                  id="correo"
                  type="email"
                  placeholder="Ingrese el correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={submitting}>
              <Save className="mr-2 h-4 w-4" />
              {submitting ? "Actualizando..." : "Actualizar Proveedor"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
