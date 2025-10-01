export interface IngresoType {
    data: IngresoData[];
    statistics: Statistics;
    pagination: Pagination;
    meta: Meta;
}

export interface IngresoData {
    id: string;
    codigo_ingreso: string;
    fecha: string;
    descripcion: string;
    id_categoria: string;
    total: number;
    id_estado: string;
    id_usuario: string;
    created_at: string;
    upstringd_at: string;
    deleted_at: null;
    categorias_ingresos: CategoriasIngresos;
    estados: Estados;
}

export interface CategoriasIngresos {
    id: string;
    descripcion: string;
    id_tipo: string;
    id_estado: string;
    id_usuario: string;
    created_at: string;
    upstringd_at: string;
    deleted_at: null;
}

export interface Estados {
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
