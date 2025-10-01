import { IndexIngresosStatisticsComponent, IndexIngresosDataTable, MonthDateInput, NewItemButton } from "@/components";
import { useEffect, useState } from "react";
import useIngresoStore from '@/store/ingreso'
import { useAuth } from "@/store/auth";


export const IngresosPage = () => {

  const pagination = useIngresoStore((s) => s.pagination)
  const fetchIngresos = useIngresoStore((s) => s.fetchIngresos)
  const setSelectedMonth = useIngresoStore((s) => s.setSelectedMonth)
  const user = useAuth((s) => s.user);

  const role = user?.role || '2';
  console.log("role: ", role);

  const getCurrentYearMonth = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    return `${year}-${month}`
  }

  // local date state only for calendar UI (keeps previous behavior)
  const [date, setDate] = useState<Date | undefined>(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  // selectedMonth is kept in store meta; derive value for MonthDateInput
  const selectedMonth = useIngresoStore((s) => s.meta.month) ?? getCurrentYearMonth()

  const handleMonthChange = (month: string) => {
    // update store -> store will fetch
    setSelectedMonth(month)
    // keep local calendar in sync
    const [y, m] = month.split('-')
    const d = new Date(Number(y), Number(m) - 1, 1)
    setDate(d)
  }

  useEffect(() => {
    // on mount, initialize store with current month
    const month = getCurrentYearMonth()
    setSelectedMonth(month)
    // ensure data loaded
    fetchIngresos(1, pagination.limit, month).catch(() => { })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  if (role === "1" || role === "3") {
    // privileged roles: show full dashboard (stats, categorias, table)
    return (
      <>
        <div className="grid grid-cols-3 grid-rows-1 gap-4">
          <div>
            <MonthDateInput selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
          </div>

          <div />

          <div>
            <NewItemButton placeholder="Nuevo Ingreso" />
          </div>
        </div>


        <div className="grid grid-cols-1 grid-rows-1 gap-4">
          <IndexIngresosStatisticsComponent />
        </div>
      


        <div className="grid grid-cols-1 grid-rows-1 gap-4">
          <IndexIngresosDataTable />
        </div>

      </>
    )
  }

  // non-privileged roles: render controls and just the table
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <div>
          <MonthDateInput selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
        </div>

        <div />

        <div>
          <NewItemButton placeholder="Nuevo Ingreso" />
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-1 gap-4">
        <IndexIngresosDataTable />
      </div>
    </>
  )




};
