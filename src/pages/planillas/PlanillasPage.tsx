import {
  IndexPlanillasStatisticsComponent,
  IndexPlanillasDataTable,
  MonthDateInput,
  NewItemButton,
} from "@/components";
import { useEffect } from "react";
import usePlanillaStore from "@/store/planilla";
import { useAuth } from "@/store/auth";

export const PlanillasPage = () => {
  const pagination = usePlanillaStore((s) => s.pagination);
  const fetchPlanillas = usePlanillaStore((s) => s.fetchPlanillas);
  const setSelectedMonth = usePlanillaStore((s) => s.setSelectedMonth);
  const user = useAuth((s) => s.user);
  const role = user?.role || "2";

  const getCurrentYearMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  // selectedMonth is kept in store meta; derive value for MonthDateInput
  const selectedMonth =
    usePlanillaStore((s) => s.meta.month) ?? getCurrentYearMonth();

  const handleMonthChange = (month: string) => {
    // update store -> store will fetch
    setSelectedMonth(month);
  };

  useEffect(() => {
    // on mount, initialize store with current month
    const month = getCurrentYearMonth();
    setSelectedMonth(month);
    // ensure data loaded
    fetchPlanillas(1, pagination.limit, month).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPrivileged = role === "1" || role === "3";

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
        <NewItemButton placeholder="Nuevo Planilla" href="/planillas/new" />
      </div>
    </div>
  );

  return (
    <>
      {renderControls()}

      {isPrivileged && (
        <div className="grid grid-cols-1 grid-rows-1 gap-4">
          <IndexPlanillasStatisticsComponent />
        </div>
      )}

      <div className="grid grid-cols-1 grid-rows-1 gap-4">
        <IndexPlanillasDataTable />
      </div>
    </>
  );
};

