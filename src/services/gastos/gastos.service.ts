import api from "@/api/api";
import type { GastoType, GastoData } from "@/interfaces/Gasto";

/**
 * Servicio para manejar todas las operaciones relacionadas con gastos
 */
export class GastosService {
  /**
   * Obtener todas las gastos con paginación
   */
  static getGastos = async (
    page: number = 1,
    limit: number = 10,
    month: string = "",
  ): Promise<GastoType> => {
    try {
      console.log(`📄 Obteniendo gastos - Página: ${page}, Límite: ${limit}, Mes: ${month}`);

      const response = await api.get<GastoType>("/gastos", {
        params: { page, limit, month },
      });

      console.log("✅ Gastos obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener ingresos:", error);
      throw error;
    }
  };

  /**
   * Buscar gastos por término de búsqueda
   */
  static searchGastos = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10,
     month: string = "",
  ): Promise<GastoType> => {
    try {
      console.log(`🔍 Buscando gastos con término: "${searchTerm}"`);

      const response = await api.get<GastoType>(`/gastos`, {
        params: {
          search: searchTerm,
          page,
          limit,
          month,
        },
      });

      console.log("✅ Búsqueda completada:", response.data.data.length, "resultados");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al buscar gastos:", error);
      throw error;
    }
  };

  /**
   * Obtener una gasto específica por ID
   */
  static getGastoById = async (id: string | number): Promise<{ data: GastoData }> => {
    try {
      console.log(`🆔 Obteniendo gasto por ID: ${id}`);

      const response = await api.get<{ data: GastoData }>(`/gastos/${id}`);

      console.log("✅ Gasto obtenida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener gasto por ID:", error);
      throw error;
    }
  };

  /**
   * Crear una nueva gasto
   */
  static async createGasto(
    gastoData: Partial<GastoData>
  ): Promise<GastoData> {
    try {
      const response = await api.post<{ data: GastoData }>(
        "/gastos",
        gastoData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al crear gasto:", error);
      throw error;
    }
  }

  /**
   * Actualizar una gasto existente
   */
  static async updateGasto(
    id: string,
    gastoData: Partial<GastoData>
  ): Promise<GastoData> {
    try {
      const response = await api.put<{ data: GastoData }>(
        `/gastos/${id}`,
        gastoData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al actualizar gasto:", error);
      throw error;
    }
  }

  /**
   * Eliminar una gasto
   */
  static async deleteGasto(id: string): Promise<void> {
    try {
      await api.delete(`/gastos/${id}`);
    } catch (error) {
      console.error("Error al eliminar gasto:", error);
      throw error;
    }
  }
}
