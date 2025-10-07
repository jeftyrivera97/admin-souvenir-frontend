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
  ComprasService,
  ProveedoresService,
  CategoriasComprasService,
} from "@/services";
import { useEffect, useState } from "react";
import type { ProveedorData } from "@/interfaces/Proveedor";
import type { CategoriaCompraData } from "@/interfaces/CategoriaCompra";
import type { TipoOperacionData } from "@/interfaces/TipoOperacion";
import { tiposOperacionesService } from "@/services/tipos-operaciones/tiposOperaciones.service";

interface EditCompraFormProps {
  compraId: string;
}

export function EditCompraForm({ compraId }: EditCompraFormProps) {
  const initialFormData = {
    codigo_compra: "",
    fecha: "",
    descripcion: "",
    id_categoria: "",
    id_proveedor: "",
    id_tipo_operacion: "", 
    fecha_pago: "",
    gravado15: 0,
    gravado18: 0,
    impuesto15: 0,
    impuesto18: 0,
    exento: 0,
    exonerado: 0,
    total: '',
  };

  const [proveedores, setProveedores] = useState<ProveedorData[]>([]);
  const [categorias, setCategorias] = useState<CategoriaCompraData[]>([]);
  const [tiposOperaciones, setTiposOperaciones] = useState<TipoOperacionData[]>([]);
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
        const [proveedoresData, categoriasData, tiposOperacionesData ] = await Promise.all([
          ProveedoresService.getProveedores(1, 100),
          CategoriasComprasService.getCategoriasCompras(1, 100),
          tiposOperacionesService.getTiposOperaciones(),
        ]);
        
        setProveedores(proveedoresData.data);
        setCategorias(categoriasData.data);
        setTiposOperaciones(tiposOperacionesData.data);

        // Cargar datos de la compra específica
        const compraData = await ComprasService.getCompraById(compraId);
        console.log("📋 Datos de la compra cargada:", compraData);
        
        // Poblar el formulario con los datos de la compra
        if (compraData.data) {
          const compra = compraData.data; // ✅ Ahora es un objeto directo, no un array
          console.log("📝 Datos de la compra:", compra);
          console.log("🔍 id_tipo_operacion de la compra:", compra.id_tipo_operacion);
          
          setFormData({
            codigo_compra: compra.codigo_compra || "",
            fecha: compra.fecha ? compra.fecha.split('T')[0] : "", // Convertir ISO a YYYY-MM-DD
            descripcion: compra.descripcion || "",
            id_categoria: compra.id_categoria || "",
            id_proveedor: compra.id_proveedor || "",
            id_tipo_operacion: compra.id_tipo_operacion || "", // ✅ Mapeo directo sin cambio de nombre
            fecha_pago: compra.fecha_pago ? compra.fecha_pago.split('T')[0] : "",
            gravado15: compra.gravado15 || 0,
            gravado18: compra.gravado18 || 0,
            impuesto15: compra.impuesto15 || 0,
            impuesto18: compra.impuesto18 || 0,
            exento: compra.exento || 0,
            exonerado: compra.exonerado || 0,
            total: compra.total?.toString() || "",
          });
        } else {
          console.warn("⚠️ No se encontraron datos de la compra");
        }
        
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        toast.error("Error al cargar los datos de la compra");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [compraId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log("📝 Datos del formulario antes de enviar:", formData);
      const compraData = {
        codigo_compra: formData.codigo_compra,
        fecha: `${formData.fecha}T00:00:00.000Z`,
        descripcion: formData.descripcion,
        id_categoria: formData.id_categoria,
        id_proveedor: formData.id_proveedor,
        id_tipo_operacion: formData.id_tipo_operacion, // ✅ Mapeo directo
        fecha_pago: `${formData.fecha_pago}T00:00:00.000Z`,
        gravado15: Number(formData.gravado15) || 0,
        gravado18: Number(formData.gravado18) || 0,
        impuesto15: Number(formData.impuesto15) || 0,
        impuesto18: Number(formData.impuesto18) || 0,
        exento: Number(formData.exento) || 0,
        exonerado: Number(formData.exonerado) || 0,
        total: Number(formData.total) || 0,
      };
      console.log("🔄 Datos mapeados para actualizar:", compraData);
      
      // Actualizar en lugar de crear
      const compraActualizada = await ComprasService.updateCompra(compraId, compraData);
      console.log("✅ Compra actualizada:", compraActualizada);
      toast.success("Compra actualizada exitosamente!");
      
    } catch (error: unknown) {
      console.error("❌ Error al actualizar compra:", error);
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
        "Error al actualizar la compra. Revisa la consola para más detalles."
      );
    } finally {
      setSubmitting(false);
    }
  };

  console.log("Me regenero:");

  if (loading) {
    return (
      <div className="flex justify-center p-8">Cargando datos de la compra...</div>
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
            <CardTitle>Editar compra</CardTitle>
            <CardDescription>
              Modifica los detalles de la compra seleccionada
            </CardDescription>
            <CardAction>
              <BackButton url="/compras" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {/* Columna 1 */}
              <div className="grid gap-2">
                <Label htmlFor="codigo_compra">Código Factura</Label>
                <Input
                  id="codigo_compra"
                  type="text"
                  placeholder="Ingrese el código de la compra"
                  value={formData.codigo_compra}
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
                <Label htmlFor="id_proveedor">Proveedor</Label>
                <Select
                  name="id_proveedor"
                  value={formData.id_proveedor}
                  onValueChange={(value) =>
                    handleSelectChange("id_proveedor", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Proveedores</SelectLabel>
                      {proveedores.map((proveedor) => (
                        <SelectItem key={proveedor.id} value={proveedor.id}>
                          {proveedor.descripcion}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
                    <SelectValue placeholder="Seleccione un tipo de operación" />
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
              <div className="grid gap-2">
                <Label htmlFor="fecha_pago">Fecha de Pago</Label>
                <Input
                  id="fecha_pago"
                  type="date"
                  value={formData.fecha_pago}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Columna 2 */}
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
              <div className="grid gap-2">
                <Label htmlFor="gravado18">Gravado 18%</Label>
                <Input
                  id="gravado18"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.gravado18}
                  onChange={handleInputChange}
                  required
                />
              </div>
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
              <div className="grid gap-2">
                <Label htmlFor="exonerado">Exonerado</Label>
                <Input
                  id="exonerado"
                  type="number"
                  step="0.01"
                 
                  value={formData.exonerado}
                  onChange={handleInputChange}
                />
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
              {submitting ? "Actualizando..." : "Actualizar Compra"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
