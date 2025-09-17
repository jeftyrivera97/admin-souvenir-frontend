import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { PaginationComponentProps } from "@/interfaces/Pagination";


export const PaginationComponent = ({ 
  pagination, 
  onPageChange, 
  onLimitChange 
}: PaginationComponentProps) => {
  return (
    <>
      {/* Controles de Paginación con Shadcn */}
      {pagination.pages >= 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando {((pagination.page - 1) * pagination.limit) + 1} a{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} de{' '}
            {pagination.total} registros
          </div>
          
          <Pagination>
            <PaginationContent>
              {/* Botón Anterior */}
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.page > 1) {
                      onPageChange(pagination.page - 1);
                    }
                  }}
                  className={pagination.page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {/* Números de página */}
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((pageNum) => {
                // Mostrar solo algunas páginas para evitar que sea muy largo
                if (
                  pageNum === 1 || 
                  pageNum === pagination.pages || 
                  Math.abs(pageNum - pagination.page) <= 1
                ) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(pageNum);
                        }}
                        isActive={pageNum === pagination.page}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  pageNum === pagination.page - 2 ||
                  pageNum === pagination.page + 2
                ) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}
              
              {/* Botón Siguiente */}
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.page < pagination.pages) {
                      onPageChange(pagination.page + 1);
                    }
                  }}
                  className={pagination.page >= pagination.pages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
          {/* Selector de registros por página */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Por página:</span>
            <select
              value={pagination.limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};
