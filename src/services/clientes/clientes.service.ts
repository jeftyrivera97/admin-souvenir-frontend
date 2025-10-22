import api from "@/api/api";
import type { ClienteType, ClienteData } from "@/interfaces/Cliente";

/**
 * Servicio para manejar todas las operaciones relacionadas con clientes
 */
export class ClientesService {
  /**
   * Obtener todos los clientes con paginación
   */
  static getClientes = async (
    page: number = 1,
    limit: number = 100,
  ): Promise<ClienteType> => {
    try {
      console.log(`📄 Obteniendo clientes - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<ClienteType>("/clientes", {
        params: { page, limit },
      });

      console.log("✅ Clientes obtenidos:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener clientes:", error);
      throw error;
    }
  };

  /**
   * Buscar clientes por término de búsqueda
   */
  static searchClientes = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ClienteType> => {
    try {
      console.log(`🔍 Buscando clientes con término: "${searchTerm}"`);

      const response = await api.get<ClienteType>(`/clientes`, {
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
      console.error("❌ Error al buscar clientes:", error);
      throw error;
    }
  };

  /**
   * Obtener un cliente específico por ID
   */
  static getClienteById = async (id: string | number): Promise<{ data: ClienteData }> => {
    try {
      console.log(`🆔 Obteniendo cliente por ID: ${id}`);

      const response = await api.get<{ data: ClienteData }>(`/clientes/${id}`);

      console.log("✅ Cliente obtenido:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener cliente por ID:", error);
      throw error;
    }
  };
}
