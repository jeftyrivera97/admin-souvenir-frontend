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
import { ProveedoresService } from "@/services";
import { useState } from "react";

export function NewProveedorForm() {
  const initialFormData = {
    codigo_proveedor: "",
    descripcion: "",
    categoria: "",
    contacto: "",
    telefono: "",
    correo: "",
  };

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  // Handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log("📝 Datos del formulario antes de enviar:", formData);

      const proveedorData = {
        codigo_proveedor: formData.codigo_proveedor || "",
        descripcion: formData.descripcion || "",
        categoria: formData.categoria || "",
        contacto: formData.contacto || "",
        telefono: formData.telefono.toString() || "",
        correo: formData.correo || "",
      };
      console.log(" Datos mapeados para el backend:", proveedorData);
      const nuevaProveedor = await ProveedoresService.createProveedor(proveedorData);
      console.log("Proveedor creado:", nuevaProveedor);
      toast.success("Proveedor creado exitosamente!");
      setFormData(initialFormData);
    } catch (error: unknown) {
      console.error("❌ Error al crear proveedor:", error);
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
        "Error al crear la proveedor. Revisa la consola para más detalles."
      );
    } finally {
      setSubmitting(false);
    }
  };

  console.log("Me regenero:");



  return (
    <>
      <div>
        <Toaster />
      </div>
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle>Crear nuevo proveedor</CardTitle>
            <CardDescription>
              Ingresa los detalles del nuevo proveedor a continuación
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
              {submitting ? "Creando..." : "Crear Proveedor"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
