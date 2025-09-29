import api from "@/api/api";
import type { CategoriaIngresoType, CategoriaIngresoData } from "@/interfaces/CategoriaIngreso";


/**
 * Servicio para manejar todas las operaciones relacionadas con categroías de ingresos
 */
export class CategoriasIngresosService {
  /**
   * Obtener todos los proveedores con paginación
   */
  static getCategoriasIngresos = async (
    page: number = 1,
    limit: number = 50,
  ): Promise<CategoriaIngresoType> => {
    try {
      console.log(`📄 Obteniendo categorías de ingresos - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<CategoriaIngresoType>("/categorias/ingresos", {
        params: { page, limit },
      });

      console.log("✅ Categorías de ingresos obtenidas:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener categorías de ingresos:", error);
      throw error;
    }
  };

  /**
   * Buscar categorías de ingresos por término de búsqueda
   */
  static searchCategoriasIngresos = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<CategoriaIngresoType> => {
    try {
      console.log(`🔍 Buscando categorías de ingresos con término: "${searchTerm}"`);

      const response = await api.get<CategoriaIngresoType>(`/categorias/ingresos`, {
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
      console.error("❌ Error al buscar categorías de ingresos:", error);
      throw error;
    }
  };

  /**
   * Obtener una categoría de gasto específica por ID
   */
  static getCategoriaIngresoById = async (id: string | number): Promise<{ data: CategoriaIngresoData }> => {
    try {
      console.log(`🆔 Obteniendo categoría de gasto por ID: ${id}`);

      const response = await api.get<{ data: CategoriaIngresoData }>(`/categorias/ingresos/${id}`);

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