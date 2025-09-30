import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MonthDateInputProps {
  selectedMonth: string; //  Recibe el valor del padre
  onMonthChange: (selectedMonth: string) => void; //  Callback para cambios
}

export const MonthDateInput = ({
  selectedMonth,
  onMonthChange,
}: MonthDateInputProps) => {
  const getCurrentYearMonth = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("📅 Mes seleccionado:", value);
    onMonthChange(value); // Solo notifica al padre
  };

  const handleClearFilter = () => {
    const currentMonth = getCurrentYearMonth();
    onMonthChange(currentMonth); // Solo notifica al padre
  };

  return (
    <div className="flex items-center gap-4 mb-4 ml-2">
      <span className="text-base-content font-medium">
        Filtrar por período:
      </span>
      <div className="flex items-center gap-2">
        <Input
          type="month"
          value={selectedMonth} // Valor controlado por el padre
          onChange={handleMonthChange}
          className="input input-bordered input-sm w-auto"
          placeholder="Seleccionar mes"
          lang="es"
        />
        {selectedMonth && selectedMonth !== getCurrentYearMonth() && (
          <Button
            className="btn btn-ghost btn-sm text-error"
            onClick={handleClearFilter}
            title="Volver al mes actual"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
};
