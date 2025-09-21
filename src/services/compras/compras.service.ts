import api from "@/api/api";
import type { CompraType, CompraData } from "@/interfaces/Compra";

/**
 * Servicio para manejar todas las operaciones relacionadas con compras
 */
export class ComprasService {
  /**
   * Obtener todas las compras con paginación
   */
  static getCompras = async (
    page: number = 1,
    limit: number = 10
  ): Promise<CompraType> => {
    try {
      console.log(`📄 Obteniendo compras - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<CompraType>("/compras", {
        params: { page, limit },
      });

      console.log("✅ Compras obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener compras:", error);
      throw error;
    }
  };

  /**
   * Buscar compras por término de búsqueda
   */
  static searchCompras = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<CompraType> => {
    try {
      console.log(`🔍 Buscando compras con término: "${searchTerm}"`);

      const response = await api.get<CompraType>(`/compras`, {
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
      console.error("❌ Error al buscar compras:", error);
      throw error;
    }
  };

  /**
   * Obtener una compra específica por ID
   */
  static getCompraById = async (id: string | number): Promise<{ data: CompraData }> => {
    try {
      console.log(`🆔 Obteniendo compra por ID: ${id}`);

      const response = await api.get<{ data: CompraData }>(`/compras/${id}`);

      console.log("✅ Compra obtenida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener compra por ID:", error);
      throw error;
    }
  };

  /**
   * Crear una nueva compra
   */
  static async createCompra(
    compraData: Partial<CompraData>
  ): Promise<CompraData> {
    try {
      const response = await api.post<{ data: CompraData }>(
        "/compras",
        compraData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al crear compra:", error);
      throw error;
    }
  }

  /**
   * Actualizar una compra existente
   */
  static async updateCompra(
    id: string,
    compraData: Partial<CompraData>
  ): Promise<CompraData> {
    try {
      const response = await api.put<{ data: CompraData }>(
        `/compras/${id}`,
        compraData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al actualizar compra:", error);
      throw error;
    }
  }

  /**
   * Eliminar una compra
   */
  static async deleteCompra(id: string): Promise<void> {
    try {
      await api.delete(`/compras/${id}`);
    } catch (error) {
      console.error("Error al eliminar compra:", error);
      throw error;
    }
  }
}
