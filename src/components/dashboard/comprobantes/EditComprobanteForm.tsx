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
  ComprobantesService,
  CategoriasComprobantesService,
  ClientesService,
} from "@/services";
import { tiposOperacionesService } from "@/services/tipos-operaciones/tiposOperaciones.service";
import { useEffect, useState } from "react";
import type { CategoriaComprobanteData } from "@/interfaces/CategoriaComprobante";
import type { TipoOperacionData } from "@/interfaces/TipoOperacion";
import type { ClienteData } from "@/interfaces/Cliente";

interface EditComprobanteFormProps {
  comprobanteId: string;
}

export function EditComprobanteForm({ comprobanteId }: EditComprobanteFormProps) {
  const initialFormData = {
    codigo_comprobante: "",
    fecha: "",
    id_cliente: "",
    id_categoria: "",
    id_tipo_operacion: "",
    gravado15: "",
    gravado18: "",
    impuesto15: "",
    impuesto18: "",
    exento: "",
    descuentos: "",
    total: "",
  };

  const [categorias, setCategorias] = useState<CategoriaComprobanteData[]>([]);
  const [tiposOperaciones, setTiposOperaciones] = useState<TipoOperacionData[]>([]);
  const [clientes, setClientes] = useState<ClienteData[]>([]);
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
        // Cargar datos básicos (categorías, tipos de operación y clientes)
        const [categoriasData, tiposOperacionesData, clientesData] = await Promise.all([
          CategoriasComprobantesService.getCategoriasComprobantes(1, 100),
          tiposOperacionesService.getTiposOperaciones(),
          ClientesService.getClientes(1, 100),
        ]);

        setCategorias(categoriasData.data);
        setTiposOperaciones(tiposOperacionesData.data);
        setClientes(clientesData.data);

        // Cargar datos del comprobante específico
        const comprobanteData = await ComprobantesService.getComprobanteById(comprobanteId);
        console.log("📋 Datos del comprobante cargado:", comprobanteData);

        // Poblar el formulario con los datos del comprobante
        if (comprobanteData.data) {
          const comprobante = comprobanteData.data;
          console.log("📝 Datos del comprobante:", comprobante);

          setFormData({
            codigo_comprobante: comprobante.codigo_comprobante || "",
            fecha: comprobante.fecha ? comprobante.fecha.split("T")[0] : "",
            id_cliente: comprobante.id_cliente || "",
            id_categoria: comprobante.id_categoria || "",
            id_tipo_operacion: comprobante.id_tipo_operacion || "",
            gravado15: comprobante.gravado15?.toString() || "0",
            gravado18: comprobante.gravado18?.toString() || "0",
            impuesto15: comprobante.impuesto15?.toString() || "0",
            impuesto18: comprobante.impuesto18?.toString() || "0",
            exento: comprobante.exento?.toString() || "0",
            descuentos: comprobante.descuentos?.toString() || "0",
            total: comprobante.total?.toString() || "0",
          });
        } else {
          console.warn("⚠️ No se encontraron datos del comprobante");
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        toast.error("Error al cargar los datos del comprobante");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [comprobanteId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log("📤 Datos del formulario antes de enviar:", formData);
      const comprobanteData = {
        codigo_comprobante: formData.codigo_comprobante,
        fecha: `${formData.fecha}T00:00:00.000Z`,
        id_cliente: formData.id_cliente,
        id_categoria: formData.id_categoria,
        id_tipo_operacion: formData.id_tipo_operacion,
        gravado15: Number(formData.gravado15) || 0,
        gravado18: Number(formData.gravado18) || 0,
        impuesto15: Number(formData.impuesto15) || 0,
        impuesto18: Number(formData.impuesto18) || 0,
        exento: Number(formData.exento) || 0,
        descuentos: Number(formData.descuentos) || 0,
        total: Number(formData.total) || 0,
      };
      console.log("📦 Datos mapeados para actualizar:", comprobanteData);

      // Actualizar comprobante
      const comprobanteActualizado = await ComprobantesService.updateComprobante(
        comprobanteId,
        comprobanteData
      );
      console.log("✅ Comprobante actualizado:", comprobanteActualizado);
      toast.success("Comprobante actualizado exitosamente!");
    } catch (error: unknown) {
      console.error("❌ Error al actualizar comprobante:", error);
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
        "Error al actualizar el comprobante. Revisa la consola para más detalles."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        Cargando datos del comprobante...
      </div>
    );
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <CardTitle>Editar comprobante</CardTitle>
            <CardDescription>
              Modifica los detalles del comprobante seleccionado
            </CardDescription>
            <CardAction>
              <BackButton url="/comprobantes" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8">
              {/* Sección: Información General */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Información General</h3>
                <div className="grid grid-cols-3 gap-4">
                  {/* Código Comprobante */}
                  <div className="grid gap-2">
                    <Label htmlFor="codigo_comprobante">Código Factura/Ref</Label>
                    <Input
                      id="codigo_comprobante"
                      type="text"
                      placeholder="Ingrese el código"
                      value={formData.codigo_comprobante}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Fecha */}
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

                  {/* Cliente */}
                  <div className="grid gap-2">
                    <Label htmlFor="id_cliente">Cliente</Label>
                    <Select
                      name="id_cliente"
                      value={formData.id_cliente}
                      onValueChange={(value) =>
                        handleSelectChange("id_cliente", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Clientes</SelectLabel>
                          {clientes.map((cliente) => (
                            <SelectItem key={cliente.id} value={cliente.id}>
                              {cliente.nombre} {cliente.apellido} - {cliente.razon_social}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Categoría */}
                  <div className="grid gap-2">
                    <Label htmlFor="id_categoria">Categoría</Label>
                    <Select
                      name="id_categoria"
                      value={formData.id_categoria}
                      onValueChange={(value) =>
                        handleSelectChange("id_categoria", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una categoría" />
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

                  {/* Tipo de Operación */}
                  <div className="grid gap-2">
                    <Label htmlFor="id_tipo_operacion">Tipo de Operación</Label>
                    <Select
                      name="id_tipo_operacion"
                      value={formData.id_tipo_operacion}
                      onValueChange={(value) =>
                        handleSelectChange("id_tipo_operacion", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de operación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipos de Operación</SelectLabel>
                          {tiposOperaciones.map((tipo) => (
                            <SelectItem key={tipo.id} value={tipo.id}>
                              {tipo.descripcion}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Sección: Impuestos y Montos */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Impuestos y Montos</h3>
                <div className="grid grid-cols-3 gap-4">
                  {/* Gravado 15% */}
                  <div className="grid gap-2">
                    <Label htmlFor="gravado15">Gravado 15%</Label>
                    <Input
                      id="gravado15"
                      type="number"
                      step="0.01"
                      value={formData.gravado15}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Impuesto 15% */}
                  <div className="grid gap-2">
                    <Label htmlFor="impuesto15">Impuesto 15%</Label>
                    <Input
                      id="impuesto15"
                      type="number"
                      step="0.01"
                      value={formData.impuesto15}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Gravado 18% */}
                  <div className="grid gap-2">
                    <Label htmlFor="gravado18">Gravado 18%</Label>
                    <Input
                      id="gravado18"
                      type="number"
                      step="0.01"
                      value={formData.gravado18}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Impuesto 18% */}
                  <div className="grid gap-2">
                    <Label htmlFor="impuesto18">Impuesto 18%</Label>
                    <Input
                      id="impuesto18"
                      type="number"
                      step="0.01"
                      value={formData.impuesto18}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Exento */}
                  <div className="grid gap-2">
                    <Label htmlFor="exento">Exento</Label>
                    <Input
                      id="exento"
                      type="number"
                      step="0.01"
                      value={formData.exento}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Descuentos */}
                  <div className="grid gap-2">
                    <Label htmlFor="descuentos">Descuentos</Label>
                    <Input
                      id="descuentos"
                      type="number"
                      step="0.01"
                      value={formData.descuentos}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Total */}
                  <div className="grid gap-2">
                    <Label htmlFor="total" className="font-bold">Total</Label>
                    <Input
                      id="total"
                      type="number"
                      step="0.01"
                      value={formData.total}
                      onChange={handleInputChange}
                      required
                      className="font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={submitting}>
              <Save className="mr-2 h-4 w-4" />
              {submitting ? "Actualizando..." : "Actualizar Comprobante"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
