import api from "@/api/api";
import type { ProveedorData, ProveedorType } from "@/interfaces/Proveedor";

/**
 * Servicio para manejar todas las operaciones relacionadas con proveedores
 */
export class ProveedoresService {
  /**
   * Obtener todos los proveedores con paginación
   */
  static getProveedores = async (
    page: number = 1,
    limit: number = 50
  ): Promise<ProveedorType> => {
    try {
      console.log(`📄 Obteniendo proveedores - Página: ${page}, Límite: ${limit}`);

      const response = await api.get<ProveedorType>("/proveedores", {
        params: { page, limit },
      });

      console.log("✅ Proveedores obtenidos:", response.data.data.length, "registros");
      console.log("📄 Paginación:", response.data.pagination);

      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener proveedores:", error);
      throw error;
    }
  };

  /**
   * Buscar proveedores por término de búsqueda
   */
  static searchProveedores = async (
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ProveedorType> => {
    try {
      console.log(`🔍 Buscando proveedores con término: "${searchTerm}"`);

      const response = await api.get<ProveedorType>(`/proveedores`, {
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
      console.error("❌ Error al buscar proveedores:", error);
      throw error;
    }
  };

  /**
   * Obtener un proveedor específico por ID
   */
  static getProveedorById = async (id: string | number): Promise<ProveedorType> => {
    try {
      console.log(`🆔 Obteniendo proveedor por ID: ${id}`);

      const response = await api.get<ProveedorType>(`/proveedores`, {
        params: { search: id },
      });

      console.log("✅ Proveedor obtenido:", response.data.data.length, "resultados");
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener proveedor por ID:", error);
      throw error;
    }
  };

  /**
   * Crear un nuevo proveedor
   */
  static async createProveedor(
    proveedorData: Partial<ProveedorData>
  ): Promise<ProveedorData> {
    try {
      const response = await api.post<{ data: ProveedorData }>(
        "/proveedores",
        proveedorData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al crear proveedor:", error);
      throw error;
    }
  }

  /**
   * Actualizar un proveedor existente
   */
  static async updateProveedor(
    id: string,
    proveedorData: Partial<ProveedorData>
  ): Promise<ProveedorData> {
    try {
      const response = await api.put<{ data: ProveedorData }>(
        `/proveedores/${id}`,
        proveedorData
      );
      return response.data.data;
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
      throw error;
    }
  }

  /**
   * Eliminar un proveedor
   */
  static async deleteProveedor(id: string): Promise<void> {
    try {
      await api.delete(`/proveedores/${id}`);
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      throw error;
    }
  }
}
