import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Categories {
  id: string;
  id_categoria: string;
  descripcion: string;
  percentage: number;
  total: number;
  categoria?: string;
}

export const IndexCategoriasDataTableComponent = ({
  categorias = [],
  title,
}: {
  categorias?: Categories[];
  title: string;
}) => {
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
            {categorias.map((categoria) => (
              <TableRow key={categoria.id ?? categoria.id_categoria}>
                <TableCell className="font-medium">
                  {categoria.descripcion}
                </TableCell>
                <TableCell className="font-medium">
                  {categoria.percentage} %
                </TableCell>
                <TableCell className="text-right">
                  L. {categoria.total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                L.
                {categorias
                  .reduce((acc, categoria) => acc + (categoria.total ?? 0), 0)
                  .toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </div>
  );
};
