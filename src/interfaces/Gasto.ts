export interface GastoType {
    data:       GastoData[];
    pagination: Pagination;
}

export interface GastoData {
    id:                string;
    codigo_gasto:      string;
    fecha:             string;
    descripcion:       string;
    id_categoria:      string;
    total:             number;
    id_estado:         string;
    id_usuario:        string;
    created_at:        string;
    updated_at:        string;
    deleted_at:        null;
    categorias_gastos: CategoriasGastos;
    estados:           GastosEstados;
}

export interface CategoriasGastos {
    id:          string;
    descripcion: string;
    id_tipo:     string;
    id_estado:   string;
    id_usuario:  string;
    created_at:  string;
    updated_at:  string;
    deleted_at:  null;
}

export interface GastosEstados {
    id:          string;
    descripcion: string;
    deleted_at:  null;
}

export interface Pagination {
    page:  number;
    limit: number;
    total: number;
    pages: number;
}
