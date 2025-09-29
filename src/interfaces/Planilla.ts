export interface PlanillaType {
  data: PlanillaData[];
  pagination: Pagination;
}

export interface PlanillaData {
  id: string;
  codigo_planilla: string;
  fecha: string;
  descripcion: string;
  id_categoria: string;
  id_empleado: string;
  total: number;
  id_estado: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  categorias_planillas: CategoriasPlanillas;
  estados: PlanillaEstados;
  empleados: PlanillaEmpleados;
}

export interface CategoriasPlanillas {
  id: string;
  descripcion: string;
  id_tipo: string;
  id_estado: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface PlanillaEmpleados {
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
  updated_at: null;
  deleted_at: null;
}

export interface PlanillaEstados {
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
