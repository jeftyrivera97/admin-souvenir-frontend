import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface EstadisticasData {
  // Example properties - adjust based on your actual data structure
  porcentajeCambioMensual: number;
  totalMonthPrev: number;
  totalYear: number;
  porcentajeCambioAnual: number;
  totalYearPrev: number;
  totalMonth: number;
  totalRegistros: number;
  // Add other properties that your data contains
}

// Define the structure for metadata
export interface EstadisticasMeta {
  // Match actual store structure - all optional
  month?: string;
  prevMonth?: string;
}

export interface EstadisticasProps {
  data: EstadisticasData;
  meta: EstadisticasMeta;
}

export const IndexEstadisticasSection = ({ data, meta }: EstadisticasProps) => {
  return (
    <>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 mt-2">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Mes ({meta?.month ?? "—"})</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              L .{data.totalMonth}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {data.porcentajeCambioMensual > 0 ? (
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
                {data.porcentajeCambioMensual >= 0
                  ? `+${data.porcentajeCambioMensual}%`
                  : `${data.porcentajeCambioMensual}%`}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Mes anterior: L.{data.totalMonthPrev}
              {data.totalMonthPrev > data.totalMonth ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              Registros del mes: {data.totalRegistros}
            </div>
            <div className="text-muted-foreground">
              Totales del mes y comparación con el anterior
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Año</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              L. {data.totalYear}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {data.porcentajeCambioAnual > 0 ? (
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
                {data.porcentajeCambioAnual >= 0
                  ? `+${data.porcentajeCambioAnual}%`
                  : `${data.porcentajeCambioAnual}%`}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Año anterior: L.{data.totalYearPrev}
              {data.totalYearPrev > data.totalYear ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
            </div>
            <div className="text-muted-foreground">
              Totales acumulados en el año y comparación con el anterior
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Tasa de Crecimiento Anual</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {`${data.porcentajeCambioAnual}%`}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {data.porcentajeCambioAnual > 0 ? (
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
                {data.porcentajeCambioAnual >= 0
                  ? `+${data.porcentajeCambioAnual}%`
                  : `${data.porcentajeCambioAnual}%`}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Rendimiento respecto al año anterior
            </div>
            <div className="text-muted-foreground">
              Porcentaje de cambio mensual
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Tasa de Crecimiento Mensual</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {`${data.porcentajeCambioMensual}%`}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {data.porcentajeCambioMensual > 0 ? (
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
                {data.porcentajeCambioMensual >= 0
                  ? `+${data.porcentajeCambioMensual}%`
                  : `${data.porcentajeCambioMensual}%`}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Rendimiento respecto al mes anterior
            </div>
            <div className="text-muted-foreground">
              Porcentaje de cambio anual
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
