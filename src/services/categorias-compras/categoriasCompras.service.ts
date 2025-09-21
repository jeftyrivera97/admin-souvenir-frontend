import api from "@/api/api";
import type { CategoriaCompraType, CategoriaCompraData } from "@/interfaces/CategoriaCompra";



/**
 * Servicio para manejar todas las operaciones relacionadas con proveedores
 */
export class CategoriasComprasService {
  /**
   * Obtener todos los proveedores con paginación
   */
  static getCategoriasCompras = async (
    page: number = 1,
    limit: number = 50,
  ): Promise<CategoriaCompraType> => {
    try {
      console.log(`📄 Obteniendo categorías de compras - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<CategoriaCompraType>("/categorias/compras", {
        params: { page, limit },
      });

      console.log("✅ Categorías de compras obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener categorías de compras:", error);
      throw error;
    }
  };

  /**
   * Buscar categorías de compras por término de búsqueda
   */
  static searchCategoriasCompras = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<CategoriaCompraType> => {
    try {
      console.log(`🔍 Buscando categorías de compras con término: "${searchTerm}"`);

      const response = await api.get<CategoriaCompraType>(`/categorias/compras`, {
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
      console.error("❌ Error al buscar categorías de compras:", error);
      throw error;
    }
  };

  /**
   * Obtener una categoría de compra específica por ID
   */
  static getCategoriaCompraById = async (id: string | number): Promise<{ data: CategoriaCompraData }> => {
    try {
      console.log(`🆔 Obteniendo categoría de compra por ID: ${id}`);

      const response = await api.get<{ data: CategoriaCompraData }>(`/categorias/compras/${id}`);

      console.log("✅ Categoría de compra obtenida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener categoría de compra por ID:", error);
      throw error;
    }
  };

  /**
   * Crear un nuevo proveedor
   */
}