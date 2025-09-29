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

import { useEffect, useState } from "react";
import type {
  GastoData,
  Pagination as PaginationType,
} from "@/interfaces/Gasto";
import { PaginationComponent } from "../shared/PaginationComponent";
import { SearchItemInput } from "../shared/SearchItemInput";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PopcornIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { GastosService } from "@/services/gastos/gastos.service";
import { gastosColumnas } from "@/helpers/dashboard/shared/getColumns";
import { Link } from "react-router-dom";

export function IndexGastosDataTable() {
  const [gastos, setGastos] = useState<GastoData[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    // Solo cargar todas las gastos si no estamos en modo búsqueda
    if (!searchMode) {
      const fetchGastos = async () => {
        try {
          setLoading(true);
          //  USANDO SERVICIO
          const response = await GastosService.getGastos(
            pagination.page,
            pagination.limit
          );
          setGastos(response.data);
          setPagination(response.pagination);
        } catch (err) {
          console.error("Error al cargar gastos:", err);
          setError("Error al cargar las gastos");
        } finally {
          setLoading(false);
        }
      };
      fetchGastos();
    }
  }, [pagination.page, pagination.limit, searchMode]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit: number) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  };

  const handleSearch = async (searchTerm: string) => {
    // Si el término está vacío, limpiar la búsqueda
    if (!searchTerm.trim()) {
      handleClearSearch();
      return;
    }

    try {
      setSearchLoading(true);
      setError(null);

      // ✅ USANDO NUEVO SERVICIO - Realizar búsqueda usando GastosService
      console.log("🔍 Realizando búsqueda:", searchTerm);
      const response = await GastosService.searchGastos(searchTerm, 1, 50); // Máximo 50 resultados

      // Mostrar los resultados de la búsqueda
      setGastos(response.data);
      setSearchMode(true);

      // Actualizar paginación con los datos de la respuesta
      setPagination({
        page: response.pagination.page,
        limit: response.pagination.limit,
        total: response.pagination.total,
        pages: response.pagination.pages,
      });

      // Búsqueda general por código de gasto usando getGastoBySearch
    } catch (err) {
      console.error("Error en búsqueda:", err);
      if (err instanceof Error && err.message.includes("404")) {
        setError("No se encontraron gastos que coincidan con la búsqueda");
      } else {
        setError("Error al realizar la búsqueda");
      }
      setGastos([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchMode(false);
    setError(null);
    setPagination((prev) => ({ ...prev, page: 1 }));
    // El useEffect se ejecutará automáticamente y cargará todas las gastos
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
            <AlertTitle>Mostrando resultados de búsqueda</AlertTitle>
          </Alert>
        </div>
      )}

      <Table>
        <TableCaption>Lista de gastos recientes</TableCaption>
        <TableHeader>
          <TableRow>
            {gastosColumnas.map((columna) => (
              <TableHead key={columna}>{columna}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {gastos.length > 0 ? (
            gastos.map((gasto) => (
              <TableRow key={gasto.id}>
                <TableCell className="font-medium">
                  {gasto.codigo_gasto}
                </TableCell>
                <TableCell>{gasto.fecha}</TableCell>

                <TableCell>
                  {gasto.categorias_gastos?.descripcion || ""}
                </TableCell>

                <TableCell>L.{gasto.total.toFixed(2)}</TableCell>

                <TableCell>
                  <Button variant={"destructive"}>
                    <Link to={`/gastos/${gasto.id}/edit`}>Editar</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={gastosColumnas.length}
                className="text-center text-gray-500"
              >
                No hay gastos disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={gastosColumnas.length - 1}>Total</TableCell>
            <TableCell className="text-right">
              L.
              {gastos.reduce((sum, gasto) => sum + gasto.total, 0).toFixed(2)}
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
