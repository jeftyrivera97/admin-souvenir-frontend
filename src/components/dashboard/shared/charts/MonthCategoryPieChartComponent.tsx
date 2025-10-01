"use client"
import { TrendingDown, TrendingUp } from "lucide-react"
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
export const description = "A pie chart with a label"
const chartConfig = {
   
} satisfies ChartConfig


export interface CategoryDatum {
    id_categoria: string | number
    descripcion: string
    total: number
    percentage?: number
}

export interface MonthCategoryPieChartProps {
    data?: CategoryDatum[]
    title?: string
    description?: string
    statistics?: any
}

export const MonthCategoryPieChartComponent = ({
    data,
    title = 'Titulo del grafico',
    description = 'Descripción del grafico',
    statistics,
}: MonthCategoryPieChartProps) => {
    // assign a palette for fills — you can expand or replace with your own mapping
    const palette = [
        'var(--chart-1)',
        'var(--chart-2)',
        'var(--chart-3)',
        'var(--chart-4)',
        'var(--chart-5)',
    ]

    // normalize incoming prop shape -> recharts shape { descripcion, total, fill }
    const pieData = (Array.isArray(data) && data.length > 0)
        ? data.map((c, i) => ({
            descripcion: c.descripcion,
            total: Number(c.total ?? 0),
            fill: palette[i % palette.length],
            id: c.id_categoria,
            percentage: c.percentage,
        }))
        : []

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {pieData.length === 0 ? (
                    <div className="flex h-48 w-full items-center justify-center text-sm text-muted-foreground">
                        No hay datos para mostrar
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
                    >
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <Pie
                                data={pieData}
                                dataKey="total"
                                label
                                nameKey="descripcion"
                                // use id as key if available
                                outerRadius={80}
                            />
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
            {pieData.length > 0 && (
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 leading-none font-medium">
                        {statistics?.porcentajeCambioMensual > 0 ? (
                            <>
                                <span className="text-green-500">
                                    En tendencia de subida del {statistics?.porcentajeCambioMensual}% este mes
                                </span>
                                <TrendingUp className="h-4 w-4" />
                            </>
                        ) : (
                            <>
                                <span className="text-red-500">
                                    En tendencia de bajada del {Math.abs(statistics?.porcentajeCambioMensual ?? 0)}% este mes
                                </span>
                                <TrendingDown className="h-4 w-4" />
                            </>
                        )}
                    </div>
                    <div className="text-muted-foreground leading-none">
                        Mostrando el total por categoria/tipo este mes
                    </div>
                </CardFooter>
            )}



        </Card>
    )
}


