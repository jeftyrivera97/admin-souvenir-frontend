export interface StatisticsGraphProps {
  totalRegistros: number;
  totalMonth: number;
  totalMonthPrev: number;
  totalYear: number;
  totalYearPrev: number;
  diferenciaMensual: number;
  diferenciaAnual: number;
  porcentajeCambioMensual: number;
  porcentajeCambioAnual: number;
  categorias: CategoriaGraphProps[];
  tipos: CategoriaGraphProps[];
  totalsMonths: TotalsByMonthGraphProps[];
}

export interface CategoriaGraphProps {
  id_categoria: string;
  descripcion: string;
  total: number;
  percentage: number;
  id_tipo?: string;
}

export interface TotalsByMonthGraphProps {
  month: string;
  monthName: string;
  total: number;
}