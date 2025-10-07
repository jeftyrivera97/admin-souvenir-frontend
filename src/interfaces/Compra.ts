export interface CompraType {
  data: CompraData[];
  statistics: Statistics;
  pagination: Pagination;
  meta: Meta;
}

export interface CompraData {
  id: string;
  codigo_compra: string;
  fecha: string;
  descripcion: string;
  id_categoria: string;
  id_proveedor: string;
  id_tipo_operacion: string;
  id_estado_operacion: string;
  fecha_pago: string;
  gravado15: number;
  gravado18: number;
  impuesto15: number;
  impuesto18: number;
  exento: number;
  exonerado: number;
  total: number;
  id_estado: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  categorias_compras: CategoriasCompras;
  estados: Estados;
  proveedores: Proveedores;
  tipos_operaciones: CategoriasCompras;
  estados_operaciones: Estados;
}

export interface CategoriasCompras {
  id: string;
  descripcion: string;
  id_tipo?: string;
  id_estado: string;
  id_usuario?: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface Estados {
  id: string;
  descripcion: string;
  deleted_at: null;
}

export interface Proveedores {
  id: string;
  codigo_proveedor: string;
  descripcion: string;
  categoria: string;
  contacto: string;
  telefono: string;
  correo: string;
  id_estado: string;
  id_usuario: string;
  created_at: Date;
  updated_at: Date;
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
  id_categoria: string;
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
