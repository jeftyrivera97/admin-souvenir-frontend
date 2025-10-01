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

import { useState } from "react";
import useIngresoStore from '@/store/ingreso'
import { PaginationComponent } from "../shared/PaginationComponent";
import { SearchItemInput } from "../shared/SearchItemInput";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PopcornIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { ingresosColumnas } from "@/helpers/dashboard/shared/getColumns";
import { Link } from "react-router-dom";

export function IndexIngresosDataTable() {
  const ingresos = useIngresoStore(s => s.data)
  const pagination = useIngresoStore(s => s.pagination)
  const loading = useIngresoStore(s => s.loading)
  const error = useIngresoStore(s => s.error)
  const meta = useIngresoStore(s => s.meta)
  const fetchIngresos = useIngresoStore(s => s.fetchIngresos)
  const searchIngresos = useIngresoStore(s => s.searchIngresos)
  const setPage = useIngresoStore(s => s.setPage)
  const setLimit = useIngresoStore(s => s.setLimit)
  
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchMode, setSearchMode] = useState(false)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
  };

  const handleSearch = async (searchTerm: string) => {
    // Si el término está vacío, limpiar la búsqueda
    if (!searchTerm.trim()) {
      handleClearSearch();
      return;
    }

    try {
      setSearchLoading(true);
      // delegar en la store
      await searchIngresos(searchTerm)
      setSearchMode(true)
      // store actualiza data y paginación

      
    } catch (err) {
      console.error("Error en búsqueda:", err);
      // store handles error state; nothing else to do here
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchMode(false);
    setSearchLoading(false)
    // reload page 1
    fetchIngresos(1, pagination.limit).catch(() => {})
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="space-y-4 mt-2">
      {/* Buscador */}
      <div className="flex items-center gap-4">
        <SearchItemInput
          placeholder="Buscar por codigo, fecha..."
          onSearch={handleSearch}
          loading={searchLoading}
        />
        {searchMode && (
          <Button
            onClick={handleClearSearch}
            variant="outline"
            size="sm"
            className="mt-6"
          >
            <X />
          </Button>
        )}
      </div>

      {/* Indicador de modo búsqueda */}
      {searchMode && (
        <div className="grid w-full max-w-xl items-start gap-4">
          <Alert>
            <PopcornIcon />
            <AlertTitle>
              Mostrando resultados de búsqueda
              {meta.month && ` para el mes ${meta.month}`}
            </AlertTitle>
          </Alert>
        </div>
      )}

      <Table>
        <TableCaption>Lista de Ingresos</TableCaption>
        <TableHeader>
          <TableRow>
            {ingresosColumnas.map((columna) => (
              <TableHead key={columna}>{columna}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingresos.length > 0 ? (
            ingresos.map((ingreso) => (
              <TableRow key={ingreso.id}>
                <TableCell className="font-medium">
                  {ingreso.codigo_ingreso}
                </TableCell>
                <TableCell>{ingreso.fecha}</TableCell>
                <TableCell>{ingreso.descripcion}</TableCell>

                <TableCell>
                  {ingreso.categorias_ingresos.descripcion}
                </TableCell>

                <TableCell>L.{ingreso.total.toFixed(2)}</TableCell>

                <TableCell>
                  <Button variant={"destructive"}>
                    <Link to={`/ingresos/${ingreso.id}/edit`}>Editar</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={ingresosColumnas.length}
                className="text-center text-gray-500"
              >
                No hay ingresos disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={ingresosColumnas.length - 1}>Total</TableCell>
            <TableCell className="text-right">
              L.
              {ingresos.reduce((sum, ingreso) => sum + ingreso.total, 0).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Paginación - Mostrar siempre excepto cuando hay solo 1 resultado */}
      {pagination.pages > 1 && (
        <PaginationComponent
          pagination={pagination}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      )}
    </div>
  );
}
