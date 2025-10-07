import {
  IndexGastosStatisticsComponent,
  IndexGastosDataTable,
  MonthDateInput,
  NewItemButton,
} from "@/components";
import { useEffect } from "react";
import useGastoStore from "@/store/gasto";
import { useAuth } from "@/store/auth";

export const GastosPage = () => {
  const pagination = useGastoStore((s) => s.pagination);
  const fetchGastos = useGastoStore((s) => s.fetchGastos);
  const setSelectedMonth = useGastoStore((s) => s.setSelectedMonth);
  const user = useAuth((s) => s.user);
  const role = user?.role || "3";

  const getCurrentYearMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  // selectedMonth is kept in store meta; derive value for MonthDateInput
  const selectedMonth =
    useGastoStore((s) => s.meta.month) ?? getCurrentYearMonth();

  const handleMonthChange = (month: string) => {
    // update store -> store will fetch
    setSelectedMonth(month);
  };

  useEffect(() => {
    // on mount, initialize store with current month
    const month = getCurrentYearMonth();
    setSelectedMonth(month);
    // ensure data loaded
    fetchGastos(1, pagination.limit, month).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPrivileged = role === "1" || role === "2";

  const renderControls = () => (
    <div className="grid grid-cols-3 grid-rows-1 gap-4">
      <div>
        <MonthDateInput
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
        />
      </div>

      <div />

      <div>
        <NewItemButton placeholder="Nuevo Gasto" href="/gastos/new" />
      </div>
    </div>
  );

  return (
    <>
      {renderControls()}

      {isPrivileged && (
        <div className="grid grid-cols-1 grid-rows-1 gap-4">
          <IndexGastosStatisticsComponent />
        </div>
      )}

      <div className="grid grid-cols-1 grid-rows-1 gap-4">
        <IndexGastosDataTable />
      </div>
    </>
  );
};

