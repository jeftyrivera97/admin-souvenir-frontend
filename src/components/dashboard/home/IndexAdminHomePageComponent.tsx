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
  Plus,
  Activity,
  ShoppingBasket,
  User,
  UserCog2,
  Car,
  CircleDollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlanillasService } from "@/services/planillas/planilla.service";
import { VentasService } from "@/services/ventas/ventas.service";
import { BarChartByCategoryComponent } from "./BarChartByCategoryComponent";
import { PieCharDistributionComponent } from "./PieCharDistributionComponent";
import { useIngresoStore } from "@/store/ingreso";
import { useCompraStore } from "@/store/compra";
import { useGastoStore } from "@/store/gasto";

export const IndexAdminHomePageComponent = () => {
  // Stores de Zustand
  const fetchIngresos = useIngresoStore((state) => state.fetchIngresos);
  const fetchCompras = useCompraStore((state) => state.fetchCompras);
  const fetchGastos = useGastoStore((state) => state.fetchGastos);

  // Leer datos de los stores para el dashboard
  const compraStats = useCompraStore((state) => state.statistics);
  const gastoStats = useGastoStore((state) => state.statistics);

  // Estados locales para datos que no están en stores
  const [ventas, setVentas] = useState({ total: 0, count: 0 });
  const [planillas, setPlanillas] = useState({ total: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  console.log("Loading dashboard:", loading);

  const compras = {
    total: compraStats?.totalMonth || 0,
    count: compraStats?.totalRegistros || 0,
  };

  const gastos = {
    total: gastoStats?.totalMonth || 0,
    count: gastoStats?.totalRegistros || 0,
  };
  const quickActions = [
    
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

  const getCurrentYearMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  useEffect(() => {
    const currentMonth = getCurrentYearMonth();

    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Cargar datos en los stores de Zustand
        await Promise.all([
          fetchIngresos(1, 10, currentMonth),
          fetchCompras(1, 10, currentMonth),
          fetchGastos(1, 10, currentMonth),
        ]);

        // Fetch datos que no están en stores (Ventas y Planillas)
        const [dataVentas, dataPlanillas] = await Promise.all([
          VentasService.getVentas(1, 10),
          PlanillasService.getPlanillas(1, 10, currentMonth),
        ]);

        setVentas({
          total: dataVentas.data.reduce(
            (sum, venta) => sum + (venta.total || 0),
            0
          ),
          count: dataVentas.data.length,
        });

        setPlanillas({
          total: dataPlanillas.statistics?.totalMonth || 0,
          count:
            dataPlanillas.statistics?.totalRegistros ||
            dataPlanillas.data.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [fetchIngresos, fetchCompras, fetchGastos]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
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
              <div className="p-2 bg-green-100 rounded-lg">
                <CircleDollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ventas</p>
                <p className="text-xl font-bold">L.{ventas.total.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  {ventas.count} registros
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Compras</p>
                <p className="text-xl font-bold">
                  L.{compras.total.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {compras.count} registros
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <ShoppingBasket className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gastos</p>
                <p className="text-xl font-bold">L.{gastos.total.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  {gastos.count} registros
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UserCog2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Planillas</p>
                <p className="text-xl font-bold">
                  L.{planillas.total.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {planillas.count} registros
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <BarChartByCategoryComponent />
        <PieCharDistributionComponent />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
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
                    <div className="font-semibold text-sm">{action.title} </div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
