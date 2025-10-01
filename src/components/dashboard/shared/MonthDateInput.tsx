import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCcwDot } from "lucide-react"


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
        Filtrar:
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
            variant="link"
            onClick={handleClearFilter}
          >
           <RefreshCcwDot />
          </Button>
        )}
      </div>
    </div>
  );
};
