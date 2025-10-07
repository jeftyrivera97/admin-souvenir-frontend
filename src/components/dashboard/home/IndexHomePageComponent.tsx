import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  ShoppingCart,
  DollarSign,
  ArrowRight,
  Activity,
  ShoppingBasket,
  User,
  UserCog2,
  Car,
} from "lucide-react";
import { Link } from "react-router-dom";


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



  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Principal</h2>
          <p className="text-muted-foreground">
          Lista de accesos rápidos para las acciones más comunes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            <Activity className="w-4 h-4 mr-1" />
            Sistema activo
          </Badge>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action, index) => (
          <Link key={index} to={action.href}>
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
