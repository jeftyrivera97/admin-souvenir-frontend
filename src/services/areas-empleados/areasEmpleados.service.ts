import api from "@/api/api";
import type { AreaEmpleadoType, AreaEmpleadoData } from "@/interfaces/AreaEmpleado";


/**
 * Servicio para manejar todas las operaciones relacionadas con categroías de empleados
 */
export class AreasEmpleadosService {
  /**
   * Obtener todos los proveedores con paginación
   */
  static getAreasEmpleados = async (
    page: number = 1,
    limit: number = 50,
  ): Promise<AreaEmpleadoType> => {
    try {
      console.log(`📄 Obteniendo categorías de empleados - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<AreaEmpleadoType>("/areas/empleados", {
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
  static searchAreasEmpleados = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<AreaEmpleadoType> => {
    try {
      console.log(`🔍 Buscando categorías de empleados con término: "${searchTerm}"`);

      const response = await api.get<AreaEmpleadoType>(`/areas/empleados`, {
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
   * Obtener una categoría de gasto específica por ID
   */
  static getAreaEmpleadoById = async (id: string | number): Promise<{ data: AreaEmpleadoData }> => {
    try {
      console.log(`🆔 Obteniendo categoría de gasto por ID: ${id}`);

      const response = await api.get<{ data: AreaEmpleadoData }>(`/areas/empleados/${id}`);

      console.log("✅ Categoría de gasto obtenida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener categoría de gasto por ID:", error);
      throw error;
    }
  };

  /**
   * Crear un nuevo proveedor
   */
}