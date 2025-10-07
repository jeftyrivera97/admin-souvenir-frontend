
import {
    Card,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export interface Tipos {
  id: string;
  id_tipo: string;
  descripcion: string;
  percentage: number;
  total: number;
  categoria?: string;
}

export const IndexTipoDataTableComponent = ({ tipos = [], title }: { tipos?: Tipos[], title: string }) => {
    return (

        <div className="grid grid-cols-1 grid-rows-1 gap-4">
            <Card className="@container/card">
                <Table>
                    <TableCaption> {title}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Descripcion</TableHead>
                            <TableHead>Porcentaje</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tipos.map((tipo) => (
                            <TableRow key={tipo.id ?? tipo.id_tipo}>
                                <TableCell className="font-medium">{tipo.descripcion}</TableCell>
                                <TableCell className="font-medium">{tipo.percentage} %</TableCell>
                                <TableCell className="text-right">L. {tipo.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">L.{(tipos.reduce((acc, tipo) => acc + (tipo.total ?? 0), 0)).toFixed(2)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>


            </Card>

        </div>

    )
}