"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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


const chartConfig = {
  total: {
    label: "Total",
  },
  ingresos: {
    label: "Ingresos",
    color: "#21924A",
  },
  compras: {
    label: "Compras",
    color: "#10b981",
  },
  gastos: {
    label: "Gastos",
    color: "#B16F1E",
  },
} satisfies ChartConfig

export function PieCharDistributionComponent() {
  // Obtener datos de los stores
  const ingresoStatistics = useIngresoStore(state => state.statistics)
  const compraStatistics = useCompraStore(state => state.statistics)
  const gastoStatistics = useGastoStore(state => state.statistics)

  // Crear los datos para el pie chart
  const ingresos = ingresoStatistics?.totalMonth || 0
  const compras = compraStatistics?.totalMonth || 0
  const gastos = gastoStatistics?.totalMonth || 0

  const chartData = [
    { 
      category: "ingresos", 
      total: ingresos, 
      fill: "#117024",
      percentage: 0 
    },
    { 
      category: "compras", 
      total: compras, 
      fill: "#C4750E",
      percentage: 0 
    },
    { 
      category: "gastos", 
      total: gastos, 
      fill: "#9C1B05",
      percentage: 0 
    },
  ]

  // Calcular porcentajes
  const totalGeneral = ingresos + compras + gastos
  if (totalGeneral > 0) {
    chartData[0].percentage = (ingresos / totalGeneral) * 100
    chartData[1].percentage = (compras / totalGeneral) * 100
    chartData[2].percentage = (gastos / totalGeneral) * 100
  }

  // Filtrar datos con valores > 0
  const filteredData = chartData.filter(item => item.total > 0)
  const hasData = filteredData.length > 0
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribución Financiera</CardTitle>
        <CardDescription>Porcentaje por categoría del mes actual</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {hasData ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                  hideLabel 
                  formatter={(value, name) => [
                    `L.${Number(value).toFixed(2)}`,
                    chartConfig[name as keyof typeof chartConfig]?.label || name
                  ]}
                />}
              />
              <Pie 
                data={filteredData} 
                dataKey="total" 
                nameKey="category"
                cx="50%" 
                cy="50%" 
                outerRadius={80}
                label={({ percentage }) => `${percentage.toFixed(1)}%`}
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[250px] text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-medium">No hay datos disponibles</p>
              <p className="text-sm">Verifica que existan registros financieros</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {hasData && (
          <>
            <div className="flex items-center gap-2 leading-none font-medium">
              Total: L.{totalGeneral.toFixed(2)} <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Distribución de categorías financieras del mes
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
