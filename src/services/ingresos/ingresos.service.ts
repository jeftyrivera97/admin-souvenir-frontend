import api from "@/api/api";
import type { IngresoType, IngresoData } from "@/interfaces/Ingreso";


/**
 * Servicio para manejar todas las operaciones relacionadas con ingresos
 */
export class IngresosService {
  /**
   * Obtener todas las ingresos con paginación
   */
  static getIngresos = async (
    page: number = 1,
    limit: number = 10
  ): Promise<IngresoType> => {
    try {
      console.log(`📄 Obteniendo ingresos - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<IngresoType>("/ingresos", {
        params: { page, limit },
      });

      console.log("✅ Ingresos obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener ingresos:", error);
      throw error;
    }
  };

    static getIngresosByMonth = async (
    month: string,
    year: string,
  
  ): Promise<IngresoType> => {
    try {
      console.log(`📄 Obteniendo ingresos - Mes: ${month}, Año: ${year}`);

      const response = await api.get<IngresoType>("/ingresos", {
        params: { month, year },
      });

      console.log("✅ Ingresos obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener ingresos:", error);
      throw error;
    }
  };

  /**
   * Buscar ingresos por término de búsqueda
   */
  static searchIngresos = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<IngresoType> => {
    try {
      console.log(`🔍 Buscando ingresos con término: "${searchTerm}"`);

      const response = await api.get<IngresoType>(`/ingresos`, {
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
      console.error("❌ Error al buscar ingresos:", error);
      throw error;
    }
  };

  /**
   * Obtener una ingreso específica por ID
   */
  static getIngresoById = async (id: string | number): Promise<{ data: IngresoData }> => {
    try {
      console.log(`🆔 Obteniendo ingreso por ID: ${id}`);

      const response = await api.get<{ data: IngresoData }>(`/ingresos/${id}`);

      console.log("✅ Ingreso obtenida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener ingreso por ID:", error);
      throw error;
    }
  };

  /**
   * Crear una nueva ingreso
   */
  static async createIngreso(
    ingresoData: Partial<IngresoData>
  ): Promise<IngresoData> {
    try {
      const response = await api.post<{ data: IngresoData }>(
        "/ingresos",
        ingresoData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al crear ingreso:", error);
      throw error;
    }
  }

  /**
   * Actualizar una ingreso existente
   */
  static async updateIngreso(
    id: string,
    ingresoData: Partial<IngresoData>
  ): Promise<IngresoData> {
    try {
      const response = await api.put<{ data: IngresoData }>(
        `/ingresos/${id}`,
        ingresoData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al actualizar ingreso:", error);
      throw error;
    }
  }

  /**
   * Eliminar una ingreso
   */
  static async deleteIngreso(id: string): Promise<void> {
    try {
      await api.delete(`/ingresos/${id}`);
    } catch (error) {
      console.error("Error al eliminar ingreso:", error);
      throw error;
    }
  }
}
