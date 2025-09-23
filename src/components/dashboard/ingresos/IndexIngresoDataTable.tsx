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
  IngresoData,
  Pagination as PaginationType,
} from "@/interfaces/Ingreso";
import { PaginationComponent } from "../shared/PaginationComponent";
import { SearchItemInput } from "../shared/SearchItemInput";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PopcornIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { IngresosService } from "@/services/ingresos/ingresos.service";
import { ingresosColumnas } from "@/helpers/dashboard/shared/getColumns";
import { Link } from "react-router-dom";

export function IndexIngresosDataTable() {
  const [ingresos, setIngresos] = useState<IngresoData[]>([]);
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
    // Solo cargar todas las ingresos si no estamos en modo búsqueda
    if (!searchMode) {
      const fetchIngresos = async () => {
        try {
          setLoading(true);
          //  USANDO SERVICIO
          const response = await IngresosService.getIngresos(
            pagination.page,
            pagination.limit
          );
          setIngresos(response.data);
          setPagination(response.pagination);
        } catch (err) {
          console.error("Error al cargar ingresos:", err);
          setError("Error al cargar las ingresos");
        } finally {
          setLoading(false);
        }
      };
      fetchIngresos();
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

      // ✅ USANDO NUEVO SERVICIO - Realizar búsqueda usando IngresosService
      console.log(" Realizando búsqueda:", searchTerm);
      const response = await IngresosService.searchIngresos(searchTerm, 1, 50); // Máximo 50 resultados

      // Mostrar los resultados de la búsqueda
      setIngresos(response.data);
      setSearchMode(true);

      // Actualizar paginación con los datos de la respuesta
      setPagination({
        page: response.pagination.page,
        limit: response.pagination.limit,
        total: response.pagination.total,
        pages: response.pagination.pages,
      });

      // Búsqueda general por código de ingreso usando getIngresoBySearch
    } catch (err) {
      console.error("Error en búsqueda:", err);
      if (err instanceof Error && err.message.includes("404")) {
        setError("No se encontraron ingresos que coincidan con la búsqueda");
      } else {
        setError("Error al realizar la búsqueda");
      }
      setIngresos([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchMode(false);
    setError(null);
    setPagination((prev) => ({ ...prev, page: 1 }));
    // El useEffect se ejecutará automáticamente y cargará todas las ingresos
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
        <TableCaption>Lista de ingresos recientes</TableCaption>
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
