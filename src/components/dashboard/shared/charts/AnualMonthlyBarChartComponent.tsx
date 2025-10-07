import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { StatisticsGraphProps, TotalsByMonthGraphProps } from "@/interfaces/Graphs";

const chartConfig = {} satisfies ChartConfig;

interface GraphDataProps {
  data?: TotalsByMonthGraphProps[];
  statistics: StatisticsGraphProps;
  title: string;
}

export const AnualMonthlyBarChartComponent = ({
  data,
  statistics,
  title,
}: GraphDataProps) => {
  // normalize incoming data to the shape Recharts expects
  const barData: TotalsByMonthGraphProps[] =
    data && Array.isArray(data) && data.length > 0
      ? data.map((d) => ({
          month: d.month ?? String(d.monthName ?? "").slice(0, 3),
          monthName: d.monthName ?? d.month,
          total: Number(d.total ?? 0),
        }))
      : [];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Enero {new Date().getFullYear()} - Diciembre{" "}
          {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {barData.length === 0 ? (
          <div className="flex h-48 w-full items-center justify-center text-sm text-muted-foreground">
            No hay datos para mostrar
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={barData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="monthName"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => String(value).slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="total" fill="var(--chart-1)" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {statistics.porcentajeCambioMensual > 0 ? (
            <>
              <span className="text-green-500">
                En tendencia de subida del {statistics?.porcentajeCambioMensual}
                % este mes
              </span>
              <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span className="text-red-500">
                En tendencia de bajada del{" "}
                {Math.abs(statistics?.porcentajeCambioMensual ?? 0)}% este mes
              </span>
              <TrendingDown className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="text-muted-foreground leading-none">
          Mostrando el total por mes de todo el año
        </div>
      </CardFooter>
    </Card>
  );
};
