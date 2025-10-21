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
  ComprobanteData,
  Pagination as PaginationType,
} from "@/interfaces/Comprobante";
import { PaginationComponent } from "../shared/PaginationComponent";
import { SearchItemInput } from "../shared/SearchItemInput";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PopcornIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { ComprobantesService } from "@/services/comprobantes/comprobantes.service";
import { comprobantesColumnas } from "@/helpers/dashboard/shared/getColumns";
import { Link } from "react-router-dom";

export function IndexComprobantesDataTable() {
  const [comprobantes, setComprobantes] = useState<ComprobanteData[]>([]);
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
    // Solo cargar todas las comprobantes si no estamos en modo búsqueda
    if (!searchMode) {
      const fetchComprobantes = async () => {
        try {
          setLoading(true);
          //  USANDO SERVICIO
          const response = await ComprobantesService.getComprobantes(
            pagination.page,
            pagination.limit
          );
          setComprobantes(response.data);
          setPagination(response.pagination);
        } catch (err) {
          console.error("Error al cargar comprobantes:", err);
          setError("Error al cargar las comprobantes");
        } finally {
          setLoading(false);
        }
      };
      fetchComprobantes();
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

      // ✅ USANDO NUEVO SERVICIO - Realizar búsqueda usando ComprobantesService
      console.log("🔍 Realizando búsqueda:", searchTerm);
      const response = await ComprobantesService.searchComprobantes(searchTerm, 1, 50); // Máximo 50 resultados

      // Mostrar los resultados de la búsqueda
      setComprobantes(response.data);
      setSearchMode(true);

      // Actualizar paginación con los datos de la respuesta
      setPagination({
        page: response.pagination.page,
        limit: response.pagination.limit,
        total: response.pagination.total,
        pages: response.pagination.pages,
      });

      // Búsqueda general por código de comprobante usando getComprobanteBySearch
    } catch (err) {
      console.error("Error en búsqueda:", err);
      if (err instanceof Error && err.message.includes("404")) {
        setError("No se encontraron comprobantes que coincidan con la búsqueda");
      } else {
        setError("Error al realizar la búsqueda");
      }
      setComprobantes([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchMode(false);
    setError(null);
    setPagination((prev) => ({ ...prev, page: 1 }));
    // El useEffect se ejecutará automáticamente y cargará todas las comprobantes
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
        <TableCaption>Lista de comprobantes recientes</TableCaption>
        <TableHeader>
          <TableRow>
            {comprobantesColumnas.map((columna) => (
              <TableHead key={columna}>{columna}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {comprobantes.length > 0 ? (
            comprobantes.map((comprobante) => (
              <TableRow key={comprobante.id}>
                <TableCell className="font-medium">
                  {comprobante.codigo_comprobante}
                </TableCell>
                <TableCell>{comprobante.fecha}</TableCell>

                <TableCell>
                  {comprobante.clientes.razon_social || ""}
                </TableCell>

                <TableCell>L.{comprobante.total.toFixed(2)}</TableCell>

                <TableCell>
                  <Button variant={"destructive"}>
                    <Link to={`/comprobantes/${comprobante.id}/edit`}>Editar</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={comprobantesColumnas.length}
                className="text-center text-gray-500"
              >
                No hay comprobantes disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={comprobantesColumnas.length - 1}>Total</TableCell>
            <TableCell className="text-right">
              L.
              {comprobantes.reduce((sum, comprobante) => sum + comprobante.total, 0).toFixed(2)}
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
