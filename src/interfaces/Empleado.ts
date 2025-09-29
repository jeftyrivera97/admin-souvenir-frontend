export interface EmpleadoType {
  data: EmpleadoData[];
  pagination: Pagination;
}

export interface EmpleadoData {
  id: string;
  codigo_empleado: string;
  nombre: string;
  apellido: string;
  id_categoria: string;
  id_area: string;
  telefono: string;
  id_estado: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  categorias_empleados: CategoriaEmpleados;
  areas_empleados: CategoriaEmpleados;
  estados: EmpleadosEstados;
}

export interface CategoriaEmpleados {
  id: string;
  descripcion: string;
  id_estado: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  rango?: string;
}

export interface EmpleadosEstados {
  id: string;
  descripcion: string;
  deleted_at: null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}
