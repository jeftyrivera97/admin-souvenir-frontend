import api from "@/api/api";
import type { CategoriaEmpleadoType, CategoriaEmpleadoData } from "@/interfaces/CategoriaEmpleado";


/**
 * Servicio para manejar todas las operaciones relacionadas con categroías de empleados
 */
export class CategoriasEmpleadosService {
  /**
   * Obtener todos los proveedores con paginación
   */
  static getCategoriasEmpleados = async (
    page: number = 1,
    limit: number = 50,
  ): Promise<CategoriaEmpleadoType> => {
    try {
      console.log(`📄 Obteniendo categorías de empleados - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<CategoriaEmpleadoType>("/categorias/empleados", {
        params: { page, limit },
      });

      console.log("✅ Categorías de empleados obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener categorías de empleados:", error);
      throw error;
    }
  };

  /**
   * Buscar categorías de empleados por término de búsqueda
   */
  static searchCategoriasEmpleados = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<CategoriaEmpleadoType> => {
    try {
      console.log(`🔍 Buscando categorías de empleados con término: "${searchTerm}"`);

      const response = await api.get<CategoriaEmpleadoType>(`/categorias/empleados`, {
        params: {
          search: searchTerm,
          page,
          limit,
        },
      });

      console.log("✅ Búsqueda completada:", response.data.data.length, "resultados");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al buscar categorías de empleados:", error);
      throw error;
    }
  };

  /**
   * Obtener una categoría de empleado específica por ID
   */
  static getCategoriaEmpleadoById = async (id: string | number): Promise<{ data: CategoriaEmpleadoData }> => {
    try {
      console.log(`🆔 Obteniendo categoría de empleado por ID: ${id}`);

      const response = await api.get<{ data: CategoriaEmpleadoData }>(`/categorias/empleados/${id}`);

      console.log("✅ Categoría de empleado obtenida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener categoría de empleado por ID:", error);
      throw error;
    }
  };

  /**
   * Crear un nuevo proveedor
   */
}