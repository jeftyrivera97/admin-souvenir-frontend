import api from "@/api/api";
import type { CategoriaCompraType } from "@/interfaces/CategoriaCompra";
import type { TipoOperacionData } from "@/interfaces/TipoOperacion";

/**
 * Servicio para manejar todas las operaciones relacionadas con tipos de operaciones
 */
export class tiposOperacionesService {
  /**
   * Obtener todos los tipos de operaciones
   */
  static getTiposOperaciones = async (): Promise<CategoriaCompraType> => {
    try {
      const response = await api.get<CategoriaCompraType>("/tiposOperaciones");

      console.log("✅ Tipos operaciones obtenidos:", response.data.data.length, "registros");
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener tipos operaciones:", error);
      throw error;
    }
  };

  /**
   * Obtener un tipo de operación específico por ID
   */
  static getTipoOperacionById = async (id: string | number): Promise<{ data: TipoOperacionData }> => {
    try {
      console.log(`🆔 Obteniendo tipo de operación por ID: ${id}`);

      const response = await api.get<{ data: TipoOperacionData }>(`/tiposOperaciones/${id}`);

      console.log("✅ Tipo de operación obtenido:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener tipo de operación por ID:", error);
      throw error;
    }
  };
}