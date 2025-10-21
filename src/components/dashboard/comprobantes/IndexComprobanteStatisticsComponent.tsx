import useComprobanteStore from "@/store/comprobante";
import { IndexEstadisticasSection } from "../shared/IndexEstadisticasComponent";
import { IndexCategoriasDataTableComponent } from "../shared/IndexCategoriasDataTableComponent";
import { IndexTipoDataTableComponent } from "../shared/IndexTipoDataTableComponent";
import {
  AnualMonthlyBarChartComponent,
  MonthCategoryPieChartComponent,
  MonthTiposPieChartComponent,
} from "@/components";

export const IndexComprobantesStatisticsComponent = () => {

  
  // the backend data is stored in the store under `totals` (statistics)
  const statistics = useComprobanteStore((s) => s.statistics);
  const meta = useComprobanteStore((s) => s.meta);

  const categorias = statistics?.categorias ?? [];
  const tipos = statistics?.tipos ?? [];

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-1 gap-4">
        <div>
          <IndexEstadisticasSection data={statistics ?? {}} meta={meta} />
        </div>
      </div>

      <div className="grid grid-cols-2 grid-rows-1 gap-4">
        <div>
          <MonthCategoryPieChartComponent
            data={statistics?.categorias ?? []}
            statistics={statistics}
            title="Comprobantes por Categoria"
            descripcion="Categorias"
          />
        </div>
        <div>
          <MonthTiposPieChartComponent
            data={statistics?.tipos ?? []}
            statistics={statistics}
            title="Comprobantes por Tipo"
            descripcion="Tipos"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 grid-rows-1 gap-4">
        <div>
          <IndexCategoriasDataTableComponent
            categorias={categorias}
            title="Lista de Categorias"
          />
        </div>

        <div>
          <IndexTipoDataTableComponent tipos={tipos} title="Lista de Tipos" />
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-1 gap-4">
        <div>
          <AnualMonthlyBarChartComponent
            data={statistics?.totalsMonths ?? []}
            statistics={statistics ?? {}}
            title="Comprobantes por Mes"
          />
        </div>
      </div>
    </>
  );
};

