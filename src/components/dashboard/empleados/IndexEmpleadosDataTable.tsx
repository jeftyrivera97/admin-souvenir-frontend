import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import type {
  EmpleadoData,
  Pagination as PaginationType,
} from "@/interfaces/Empleado";
import { PaginationComponent } from "../shared/PaginationComponent";
import { SearchItemInput } from "../shared/SearchItemInput";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PopcornIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { EmpleadosService } from "@/services/empleados/empleados.service";
import { empleadosColumnas } from "@/helpers/dashboard/shared/getColumns";
import { Link } from "react-router-dom";

export function IndexEmpleadosDataTable() {
  const [empleados, setEmpleados] = useState<EmpleadoData[]>([]);
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
    // Solo cargar todas las empleados si no estamos en modo búsqueda
    if (!searchMode) {
      const fetchEmpleados = async () => {
        try {
          setLoading(true);
          //  USANDO SERVICIO
          const response = await EmpleadosService.getEmpleados(
            pagination.page,
            pagination.limit
          );
          setEmpleados(response.data);
          setPagination(response.pagination);
        } catch (err) {
          console.error("Error al cargar empleados:", err);
          setError("Error al cargar las empleados");
        } finally {
          setLoading(false);
        }
      };
      fetchEmpleados();
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

      // ✅ USANDO NUEVO SERVICIO - Realizar búsqueda usando EmpleadosService
      console.log("🔍 Realizando búsqueda:", searchTerm);
      const response = await EmpleadosService.searchEmpleados(
        searchTerm,
        1,
        50
      ); // Máximo 50 resultados

      // Mostrar los resultados de la búsqueda
      setEmpleados(response.data);
      setSearchMode(true);

      // Actualizar paginación con los datos de la respuesta
      setPagination({
        page: response.pagination.page,
        limit: response.pagination.limit,
        total: response.pagination.total,
        pages: response.pagination.pages,
      });

      // Búsqueda general por código de empleado usando getEmpleadoBySearch
    } catch (err) {
      console.error("Error en búsqueda:", err);
      if (err instanceof Error && err.message.includes("404")) {
        setError("No se encontraron empleados que coincidan con la búsqueda");
      } else {
        setError("Error al realizar la búsqueda");
      }
      setEmpleados([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchMode(false);
    setError(null);
    setPagination((prev) => ({ ...prev, page: 1 }));
    // El useEffect se ejecutará automáticamente y cargará todas las empleados
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
        <TableCaption>Lista de empleados recientes</TableCaption>
        <TableHeader>
          <TableRow>
            {empleadosColumnas.map((columna) => (
              <TableHead key={columna}>{columna}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {empleados.length > 0 ? (
            empleados.map((empleado) => (
              <TableRow key={empleado.id}>
                <TableCell className="font-medium">
                  {empleado.codigo_empleado}
                </TableCell>
                <TableCell>{empleado.nombre}</TableCell>
                <TableCell>{empleado.apellido}</TableCell>

                <TableCell>
                  {empleado.categorias_empleados?.descripcion || ""}
                </TableCell>

                <TableCell>
                  L.{empleado.areas_empleados.descripcion || ""}
                </TableCell>
                <TableCell>L.{empleado.telefono || ""}</TableCell>

                <TableCell>
                  <Button variant={"destructive"}>
                    <Link to={`/empleados/${empleado.id}/edit`}>Editar</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={empleadosColumnas.length}
                className="text-center text-gray-500"
              >
                No hay empleados disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
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
