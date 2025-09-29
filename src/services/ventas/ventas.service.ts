import api from "@/api/api";
import type { VentaType, VentaData } from "@/interfaces/Venta";


/**
 * Servicio para manejar todas las operaciones relacionadas con ventas
 */
export class VentasService {
  /**
   * Obtener todas las ventas con paginación
   */
  static getVentas = async (
    page: number = 1,
    limit: number = 10
  ): Promise<VentaType> => {
    try {
      console.log(`📄 Obteniendo ventas - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<VentaType>("/ventas", {
        params: { page, limit },
      });

      console.log("✅ Ventas obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener ventas:", error);
      throw error;
    }
  };

  /**
   * Buscar ventas por término de búsqueda
   */
  static searchVentas = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<VentaType> => {
    try {
      console.log(`🔍 Buscando ventas con término: "${searchTerm}"`);

      const response = await api.get<VentaType>(`/ventas`, {
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
      console.error("❌ Error al buscar ventas:", error);
      throw error;
    }
  };

  /**
   * Obtener una venta específica por ID
   */
  static getVentaById = async (id: string | number): Promise<{ data: VentaData }> => {
    try {
      console.log(`🆔 Obteniendo venta por ID: ${id}`);

      const response = await api.get<{ data: VentaData }>(`/ventas/${id}`);

      console.log("✅ Venta obtenida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener venta por ID:", error);
      throw error;
    }
  };

  /**
   * Crear una nueva venta
   */
  static async createVenta(
    ventaData: Partial<VentaData>
  ): Promise<VentaData> {
    try {
      const response = await api.post<{ data: VentaData }>(
        "/ventas",
        ventaData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al crear venta:", error);
      throw error;
    }
  }

  /**
   * Actualizar una venta existente
   */
  static async updateVenta(
    id: string,
    ventaData: Partial<VentaData>
  ): Promise<VentaData> {
    try {
      const response = await api.put<{ data: VentaData }>(
        `/ventas/${id}`,
        ventaData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al actualizar venta:", error);
      throw error;
    }
  }

  /**
   * Eliminar una venta
   */
  static async deleteVenta(id: string): Promise<void> {
    try {
      await api.delete(`/ventas/${id}`);
    } catch (error) {
      console.error("Error al eliminar venta:", error);
      throw error;
    }
  }
}
