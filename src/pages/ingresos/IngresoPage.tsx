import { IndexEstadisticasComponent, IndexIngresosComponent, IndexIngresosDataTable, MonthDateInput } from "@/components";

import { useEffect, useState } from "react";
import type {
  IngresoData,
  Pagination as PaginationType,
} from "@/interfaces/Ingreso";
import { IngresosService } from "@/services/ingresos/ingresos.service";


//import { useAuth } from "@/store/auth";

export const IngresosPage = () => {

  const [ingresos, setIngresos] = useState<IngresoData[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!searchMode) {
      const fetchIngresos = async () => {
        try {
          setLoading(true);
          //  USANDO SERVICIO
          const response = await IngresosService.getIngresos(
            pagination.page,
            pagination.limit
          );
          setIngresos(response.data);
          setPagination(response.pagination);
        } catch (err) {
          console.error("Error al cargar ingresos:", err);
          setError("Error al cargar las ingresos");
        } finally {
          setLoading(false);
        }
      };
      fetchIngresos();
    }
  }, [pagination.page, pagination.limit, searchMode]);

  const getCurrentYearMonth = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    return `${year}-${month}`
  }

  const [date, setDate] = useState<Date | undefined>(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  const [selectedMonth, setSelectedMonth] = useState<string>(() => getCurrentYearMonth())

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month)
    // sincronizar con el calendario: usar el primer día del mes
    const [y, m] = month.split('-')
    const d = new Date(Number(y), Number(m) - 1, 1)
    setDate(d)
  }

  // si el usuario selecciona una fecha en el calendario, sincronizamos el input de mes
  useEffect(() => {
    if (!date) return
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const month = `${y}-${m}`
    if (month !== selectedMonth) setSelectedMonth(month)
  }, [date])



  return (
    <>
      <div>
        <MonthDateInput selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
      </div>
      <IndexIngresosComponent />
      <IndexEstadisticasComponent ingresos={ingresos} />
      <IndexIngresosDataTable />
    </>
  );
};
