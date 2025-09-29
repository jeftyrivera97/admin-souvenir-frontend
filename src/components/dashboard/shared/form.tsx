import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export function NewCompraForm() {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Crear nueva compra</CardTitle>
        <CardDescription>
          Ingresa los detalles de la nueva compra a continuación
        </CardDescription>
        <CardAction>
          <BackButton url="/compras" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-2 gap-6">
            {/* Columna 1 */}
            <div className="grid gap-2">
              <Label htmlFor="codigo_compra">Código Factura</Label>
              <Input
                id="codigo_compra"
                type="text"
                placeholder="Ingrese el código de la compra"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input id="fecha" type="date" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fecha">Categoria de Compra</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="codigo_compra">Tipo de Pago</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="id_proveedor">Proveedor</Label>
              <Input
                id="id_proveedor"
                type="text"
                placeholder="Seleccione proveedor"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fecha_pago">Fecha de Pago</Label>
              <Input id="fecha_pago" type="date" required />
            </div>

            {/* Columna 2 */}
            <div className="grid gap-2">
              <Label htmlFor="gravado15">Gravado 15%</Label>
              <Input
                id="gravado15"
                type="number"
                step="0.01"
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gravado18">Gravado 18%</Label>
              <Input
                id="gravado18"
                type="number"
                step="0.01"
                placeholder="0.00"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="impuesto15">Impuesto 15%</Label>
              <Input
                id="impuesto15"
                type="number"
                step="0.01"
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="impuesto18">Impuesto 18%</Label>
              <Input
                id="impuesto18"
                type="number"
                step="0.01"
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="exento">Exento</Label>
              <Input id="exento" type="number" step="0.01" placeholder="0.00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="total">Total</Label>
              <Input
                id="total"
                type="number"
                step="0.01"
                placeholder="0.00"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          <Save />
          Crear Compra
        </Button>
      </CardFooter>
    </Card>
  );
}
