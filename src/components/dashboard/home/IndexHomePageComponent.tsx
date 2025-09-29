import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  DollarSign,
  Plus,
  ArrowRight,
  Activity,
  ShoppingBasket,
  User,
  UserCog2,
  Car,
  CircleDollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IngresoData } from "@/interfaces/Ingreso";
import { ComprasService, GastosService, IngresosService } from "@/services";
import type { CompraData } from "@/interfaces/Compra";
import type { GastoData } from "@/interfaces/Gasto";
import type { PlanillaData } from "@/interfaces/Planilla";
import { PlanillasService } from "@/services/planillas/planilla.service";
import type { VentaData } from "@/interfaces/Venta";
import { VentasService } from "@/services/ventas/ventas.service";

export const IndexHomePageComponent = () => {
  const quickActions = [
    {
      title: "Nuevo Ingreso",
      description: "Registrar un nuevo ingreso",
      icon: DollarSign,
      href: "/ingresos/new",
      color: "bg-blue-500",
    },
    {
      title: "Nueva Compra",
      description: "Registrar una nueva compra",
      icon: ShoppingCart,
      href: "/compras/new",
      color: "bg-green-500",
    },
    {
      title: "Nuevo Gasto",
      description: "Registrar un nuevo gasto",
      icon: ShoppingBasket,
      href: "/gastos/new",
      color: "bg-red-500",
    },
    {
      title: "Nueva Pago de Planilla",
      description: "Crear pago de planilla",
      icon: User,
      href: "/planillas/new",
      color: "bg-purple-500",
    },
    {
      title: "Nuevo Empleado",
      description: "Registrar un nuevo empleado",
      icon: UserCog2,
      href: "/empleados/new",
      color: "bg-purple-500",
    },
    {
      title: "Nuevo Proveedor",
      description: "Registrar un nuevo proveedor",
      icon: Car,
      href: "/proveedores/new",
      color: "bg-purple-500",
    },
  ];

  const [ingresos, setIngresos] = useState<IngresoData[]>([]);
  const [ventas, setVentas] = useState<VentaData[]>([]);
  const [compras, setCompras] = useState<CompraData[]>([]);
  const [gastos, setGastos] = useState<GastoData[]>([]);
  const [planillas, setPlanillas] = useState<PlanillaData[]>([]);

  useEffect(() => {
    // Fetch ingresos data from API or other source
    const fetchIngresos = async () => {
      const dataIngresos = await IngresosService.getIngresos();
      setIngresos(dataIngresos.data);
    };

    const fetchCompras = async () => {
      const dataCompras = await ComprasService.getCompras();
      setCompras(dataCompras.data);
    };

    const fetchGastos = async () => {
      const dataGastos = await GastosService.getGastos();
      setGastos(dataGastos  .data);
    };

    const fetchPlanillas = async () => {
      const dataPlanillas = await PlanillasService.getPlanillas();
      setPlanillas(dataPlanillas.data);
    };

     const fetchVentas = async () => {
      const dataVentas = await VentasService.getVentas();
      setVentas(dataVentas.data);
    };

    

    fetchIngresos();
    fetchCompras();
    fetchPlanillas();
    fetchGastos();
    fetchVentas();


  }, []);

  console.log(ingresos);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Resumen general del sistema administrativo
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            <Activity className="w-4 h-4 mr-1" />
            Sistema activo
          </Badge>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del Mes</CardTitle>
          <CardDescription>
            Estadísticas generales del mes actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ingresos</p>
                <p className="text-2xl font-bold">{ingresos.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CircleDollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ventas</p>
                <p className="text-2xl font-bold">{ventas.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Compras</p>
                <p className="text-2xl font-bold">{compras.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingBasket className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gastos</p>
                <p className="text-2xl font-bold">{gastos.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCog2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Planillas</p>
                <p className="text-2xl font-bold">{planillas.length}</p>
              </div>
            </div>
            
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Acciones Rápidas
            </CardTitle>
            <CardDescription>
              Accede rápidamente a las funciones más utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 grid-cols-3">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex items-start gap-3 hover:shadow-md transition-all"
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
