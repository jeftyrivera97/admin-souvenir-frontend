"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useIngresoStore } from "@/store/ingreso"
import { useCompraStore } from "@/store/compra"
import { useGastoStore } from "@/store/gasto"

export const description = "Comparación de totales por categoría"

const chartConfig = {
  ingresos: {
    label: "Ingresos",
   color: "var(--chart-1)",
  },
  compras: {
    label: "Compras", 
    color: "var(--chart-1)",
  },
  gastos: {
    label: "Gastos",
   color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function BarChartByCategoryComponent() {
  // Obtener datos de los stores
  const ingresoStatistics = useIngresoStore(state => state.statistics)
  const compraStatistics = useCompraStore(state => state.statistics)
  const gastoStatistics = useGastoStore(state => state.statistics)

  // Crear los datos para el gráfico
  const chartData = [
    {
      ingresos: ingresoStatistics?.totalMonth || 0,
      compras: compraStatistics?.totalMonth || 0,
      gastos: gastoStatistics?.totalMonth || 0,
    }
  ]

  console.log('Chart Data:', chartData)

  // Calcular el total general
  const totalGeneral = chartData[0].ingresos + chartData[0].compras + chartData[0].gastos
  const hasData = totalGeneral > 0
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparación Financiera</CardTitle>
        <CardDescription>Totales del mes actual por Ingresos/Egresos</CardDescription>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ChartContainer config={chartConfig}>
            <BarChart 
              accessibilityLayer 
              data={chartData}
            
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="ingresos" fill="#117024" />
              <Bar dataKey="compras" fill="#C4750E" />
              <Bar dataKey="gastos" fill="#9C1B05" />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-medium">No hay datos disponibles</p>
              <p className="text-sm">Verifica que existan registros para el mes actual</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {hasData && (
          <>
            <div className="flex gap-2 leading-none font-medium">
              Total general: L.{totalGeneral.toFixed(2)} <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Mostrando totales financieros del mes actual
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
