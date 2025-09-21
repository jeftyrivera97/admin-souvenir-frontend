import api from "@/api/api";
import type { CategoriaGastoType, CategoriaGastoData } from "@/interfaces/CategoriaGasto";


/**
 * Servicio para manejar todas las operaciones relacionadas con categroías de gastos
 */
export class CategoriasGastosService {
  /**
   * Obtener todos los proveedores con paginación
   */
  static getCategoriasGastos = async (
    page: number = 1,
    limit: number = 50,
  ): Promise<CategoriaGastoType> => {
    try {
      console.log(`📄 Obteniendo categorías de gastos - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<CategoriaGastoType>("/categorias/gastos", {
        params: { page, limit },
      });

      console.log("✅ Categorías de gastos obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener categorías de gastos:", error);
      throw error;
    }
  };

  /**
   * Buscar categorías de gastos por término de búsqueda
   */
  static searchCategoriasGastos = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<CategoriaGastoType> => {
    try {
      console.log(`🔍 Buscando categorías de gastos con término: "${searchTerm}"`);

      const response = await api.get<CategoriaGastoType>(`/categorias/gastos`, {
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
      console.error("❌ Error al buscar categorías de gastos:", error);
      throw error;
    }
  };

  /**
   * Obtener una categoría de gasto específica por ID
   */
  static getCategoriaGastoById = async (id: string | number): Promise<{ data: CategoriaGastoData }> => {
    try {
      console.log(`🆔 Obteniendo categoría de gasto por ID: ${id}`);

      const response = await api.get<{ data: CategoriaGastoData }>(`/categorias/gastos/${id}`);

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