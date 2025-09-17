
import type { Pagination as PaginationType } from "@/interfaces/Compra";

export interface PaginationComponentProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

