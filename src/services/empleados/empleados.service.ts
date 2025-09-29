import api from "@/api/api";
import type { EmpleadoType, EmpleadoData } from "@/interfaces/Empleado";


/**
 * Servicio para manejar todas las operaciones relacionadas con empleados
 */
export class EmpleadosService {
  /**
   * Obtener todas las empleados con paginación
   */
  static getEmpleados = async (
    page: number = 1,
    limit: number = 100
  ): Promise<EmpleadoType> => {
    try {
      console.log(`📄 Obteniendo empleados - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<EmpleadoType>("/empleados", {
        params: { page, limit },
      });

      console.log("✅ Empleados obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener empleados:", error);
      throw error;
    }
  };

  /**
   * Buscar empleados por término de búsqueda
   */
  static searchEmpleados = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<EmpleadoType> => {
    try {
      console.log(`🔍 Buscando empleados con término: "${searchTerm}"`);

      const response = await api.get<EmpleadoType>(`/empleados`, {
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
      console.error("❌ Error al buscar empleados:", error);
      throw error;
    }
  };

  /**
   * Obtener una empleado específica por ID
   */
  static getEmpleadoById = async (id: string | number): Promise<{ data: EmpleadoData }> => {
    try {
      console.log(`🆔 Obteniendo empleado por ID: ${id}`);

      const response = await api.get<{ data: EmpleadoData }>(`/empleados/${id}`);

      console.log("✅ Empleado obtenida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener empleado por ID:", error);
      throw error;
    }
  };

  /**
   * Crear una nueva empleado
   */
  static async createEmpleado(
    empleadoData: Partial<EmpleadoData>
  ): Promise<EmpleadoData> {
    try {
      const response = await api.post<{ data: EmpleadoData }>(
        "/empleados",
        empleadoData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al crear empleado:", error);
      throw error;
    }
  }

  /**
   * Actualizar una empleado existente
   */
  static async updateEmpleado(
    id: string,
    empleadoData: Partial<EmpleadoData>
  ): Promise<EmpleadoData> {
    try {
      const response = await api.put<{ data: EmpleadoData }>(
        `/empleados/${id}`,
        empleadoData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      throw error;
    }
  }

  /**
   * Eliminar una empleado
   */
  static async deleteEmpleado(id: string): Promise<void> {
    try {
      await api.delete(`/empleados/${id}`);
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
      throw error;
    }
  }
}
