import api from "@/api/api";
import type { ComprobanteType, ComprobanteData } from "@/interfaces/Comprobante";

/**
 * Servicio para manejar todas las operaciones relacionadas con comprobantes
 */
export class ComprobantesService {
  /**
   * Obtener todas las comprobantes con paginación
   */
  static getComprobantes = async (
    page: number = 1,
    limit: number = 10,
    month: string = "",
  ): Promise<ComprobanteType> => {
    try {
      console.log(`📄 Obteniendo comprobantes - Página: ${page}, Límite: ${limit}, Mes: ${month}`);

      const response = await api.get<ComprobanteType>("/comprobantes", {
        params: { page, limit, month },
      });

      console.log("✅ Comprobantes obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener ingresos:", error);
      throw error;
    }
  };

  /**
   * Buscar comprobantes por término de búsqueda
   */
  static searchComprobantes = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10,
     month: string = "",
  ): Promise<ComprobanteType> => {
    try {
      console.log(`🔍 Buscando comprobantes con término: "${searchTerm}"`);

      const response = await api.get<ComprobanteType>(`/comprobantes`, {
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
      console.error("❌ Error al buscar comprobantes:", error);
      throw error;
    }
  };

  /**
   * Obtener una comprobante específica por ID
   */
  static getComprobanteById = async (id: string | number): Promise<{ data: ComprobanteData }> => {
    try {
      console.log(`🆔 Obteniendo comprobante por ID: ${id}`);

      const response = await api.get<{ data: ComprobanteData }>(`/comprobantes/${id}`);

      console.log("✅ Comprobante obtenida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener comprobante por ID:", error);
      throw error;
    }
  };

  /**
   * Crear una nueva comprobante
   */
  static async createComprobante(
    comprobanteData: Partial<ComprobanteData>
  ): Promise<ComprobanteData> {
    try {
      const response = await api.post<{ data: ComprobanteData }>(
        "/comprobantes",
        comprobanteData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al crear comprobante:", error);
      throw error;
    }
  }

  /**
   * Actualizar una comprobante existente
   */
  static async updateComprobante(
    id: string,
    comprobanteData: Partial<ComprobanteData>
  ): Promise<ComprobanteData> {
    try {
      const response = await api.put<{ data: ComprobanteData }>(
        `/comprobantes/${id}`,
        comprobanteData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al actualizar comprobante:", error);
      throw error;
    }
  }

  /**
   * Eliminar una comprobante
   */
  static async deleteComprobante(id: string): Promise<void> {
    try {
      await api.delete(`/comprobantes/${id}`);
    } catch (error) {
      console.error("Error al eliminar comprobante:", error);
      throw error;
    }
  }
}
