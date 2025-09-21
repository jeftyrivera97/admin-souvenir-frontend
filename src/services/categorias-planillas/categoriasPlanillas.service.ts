import api from "@/api/api";
import type { CategoriaPlanillaType, CategoriaPlanillaData } from "@/interfaces/CategoriaPlanilla";


/**
 * Servicio para manejar todas las operaciones relacionadas con categroías de planillas
 */
export class CategoriasPlanillasService {
  /**
   * Obtener todos los proveedores con paginación
   */
  static getCategoriasPlanillas = async (
    page: number = 1,
    limit: number = 50,
  ): Promise<CategoriaPlanillaType> => {
    try {
      console.log(`Obteniendo categorías de planillas - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<CategoriaPlanillaType>("/categorias/planillas", {
        params: { page, limit },
      });

      console.log("Categorías de planillas obtenidas:", response.data.data.length, "registros");
    
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener categorías de planillas:", error);
      throw error;
    }
  };

  /**
   * Buscar categorías de planillas por término de búsqueda
   */
  static searchCategoriasPlanillas = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<CategoriaPlanillaType> => {
    try {
      console.log(`🔍 Buscando categorías de planillas con término: "${searchTerm}"`);

      const response = await api.get<CategoriaPlanillaType>(`/categorias/planillas`, {
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
      console.error("❌ Error al buscar categorías de planillas:", error);
      throw error;
    }
  };

  /**
   * Obtener una categoría de planilla específica por ID
   */
  static getCategoriaPlanillaById = async (id: string | number): Promise<{ data: CategoriaPlanillaData }> => {
    try {
      console.log(`🆔 Obteniendo categoría de planilla por ID: ${id}`);

      const response = await api.get<{ data: CategoriaPlanillaData }>(`/categorias/planillas/${id}`);

      console.log("✅ Categoría de planilla obtenida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener categoría de planilla por ID:", error);
      throw error;
    }
  };

  /**
   * Crear un nuevo proveedor
   */
}