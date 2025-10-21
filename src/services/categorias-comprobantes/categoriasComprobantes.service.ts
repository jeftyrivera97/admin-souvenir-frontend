import api from "@/api/api";
import type { CategoriaComprobanteType, CategoriaComprobanteData } from "@/interfaces/CategoriaComprobante";


/**
 * Servicio para manejar todas las operaciones relacionadas con categroías de comporbantes
 */
export class CategoriasComprobantesService {
  /**
   * Obtener todos los proveedores con paginación
   */
  static getCategoriasComprobantes = async (
    page: number = 1,
    limit: number = 50,
  ): Promise<CategoriaComprobanteType> => {
    try {
      console.log(`📄 Obteniendo categorías de comporbantes - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<CategoriaComprobanteType>("/categorias/comporbantes", {
        params: { page, limit },
      });

      console.log("✅ Categorías de comporbantes obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener categorías de comporbantes:", error);
      throw error;
    }
  };

  /**
   * Buscar categorías de comporbantes por término de búsqueda
   */
  static searchCategoriasComprobantes = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<CategoriaComprobanteType> => {
    try {
      console.log(`🔍 Buscando categorías de comporbantes con término: "${searchTerm}"`);

      const response = await api.get<CategoriaComprobanteType>(`/categorias/comporbantes`, {
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
      console.error("❌ Error al buscar categorías de comporbantes:", error);
      throw error;
    }
  };

  /**
   * Obtener una categoría de comporbante específica por ID
   */
  static getCategoriaComprobanteById = async (id: string | number): Promise<{ data: CategoriaComprobanteData }> => {
    try {
      console.log(`🆔 Obteniendo categoría de comporbante por ID: ${id}`);

      const response = await api.get<{ data: CategoriaComprobanteData }>(`/categorias/comporbantes/${id}`);

      console.log("✅ Categoría de comporbante obtenida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener categoría de comporbante por ID:", error);
      throw error;
    }
  };

  /**
   * Crear un nuevo proveedor
   */
}