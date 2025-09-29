import api from "@/api/api";
import type { PlanillaType, PlanillaData } from "@/interfaces/Planilla";


/**
 * Servicio para manejar todas las operaciones relacionadas con planillas
 */
export class PlanillasService {
  /**
   * Obtener todas las planillas con paginación
   */
  static getPlanillas = async (
    page: number = 1,
    limit: number = 10
  ): Promise<PlanillaType> => {
    try {
      console.log(`📄 Obteniendo planillas - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<PlanillaType>("/planillas", {
        params: { page, limit },
      });

      console.log("✅ Planillas obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener planillas:", error);
      throw error;
    }
  };

  /**
   * Buscar planillas por término de búsqueda
   */
  static searchPlanillas = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PlanillaType> => {
    try {
      console.log(`🔍 Buscando planillas con término: "${searchTerm}"`);

      const response = await api.get<PlanillaType>(`/planillas`, {
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
      console.error("❌ Error al buscar planillas:", error);
      throw error;
    }
  };

  /**
   * Obtener una planilla específica por ID
   */
  static getPlanillaById = async (id: string | number): Promise<{ data: PlanillaData }> => {
    try {
      console.log(`🆔 Obteniendo planilla por ID: ${id}`);

      const response = await api.get<{ data: PlanillaData }>(`/planillas/${id}`);

      console.log("✅ Planilla obtenida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener planilla por ID:", error);
      throw error;
    }
  };

  /**
   * Crear una nueva planilla
   */
  static async createPlanilla(
    planillaData: Partial<PlanillaData>
  ): Promise<PlanillaData> {
    try {
      const response = await api.post<{ data: PlanillaData }>(
        "/planillas",
        planillaData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al crear planilla:", error);
      throw error;
    }
  }

  /**
   * Actualizar una planilla existente
   */
  static async updatePlanilla(
    id: string,
    planillaData: Partial<PlanillaData>
  ): Promise<PlanillaData> {
    try {
      const response = await api.put<{ data: PlanillaData }>(
        `/planillas/${id}`,
        planillaData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al actualizar planilla:", error);
      throw error;
    }
  }

  /**
   * Eliminar una planilla
   */
  static async deletePlanilla(id: string): Promise<void> {
    try {
      await api.delete(`/planillas/${id}`);
    } catch (error) {
      console.error("Error al eliminar planilla:", error);
      throw error;
    }
  }
}
