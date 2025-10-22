import useVentaStore from "@/store/venta";
import { IndexEstadisticasSection } from "../shared/IndexEstadisticasComponent";
import { AnualMonthlyBarChartComponent } from "@/components";

export const IndexVentasStatisticsComponent = () => {
  // the backend data is stored in the store under `totals` (statistics)
  const statistics = useVentaStore((s) => s.statistics);
  const meta = useVentaStore((s) => s.meta);

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-1 gap-4">
        <div>
          <IndexEstadisticasSection data={statistics ?? {}} meta={meta} />
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-1 gap-4">
        <div>
          <AnualMonthlyBarChartComponent
            data={statistics?.totalsMonths ?? []}
            statistics={statistics ?? {}}
            title="Ventas por Mes"
          />
        </div>
      </div>
    </>
  );
};
