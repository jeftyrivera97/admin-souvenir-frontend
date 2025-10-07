export interface PlanillaType {
  data: PlanillaData[];
  statistics: Statistics;
  pagination: Pagination;
  meta: Meta;
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

export interface Meta {
  month: string;
  prevMonth: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface Statistics {
  totalRegistros: number;
  totalMonth: number;
  totalMonthPrev: number;
  totalYear: number;
  totalYearPrev: number;
  diferenciaMensual: number;
  diferenciaAnual: number;
  porcentajeCambioMensual: number;
  porcentajeCambioAnual: number;
  categorias: Categoria[];
  tipos: Categoria[];
  totalsMonths: TotalsMonth[];
}

export interface Categoria {
  id_categoria?: string;
  descripcion: string;
  total: number;
  percentage: number;
  id_tipo?: string;
}

export interface TotalsMonth {
  month: string;
  monthName: string;
  total: number;
}
