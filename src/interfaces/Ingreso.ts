export interface IngresoType {
    data:       IngresoData[];
    pagination: Pagination;
}

export interface IngresoData {
    id:                  string;
    codigo_ingreso:      string;
    fecha:               string;
    descripcion:         string;
    id_categoria:        string;
    total:               number;
    id_estado:           string;
    id_usuario:          string;
    created_at:          string;
    updated_at:          string;
    deleted_at:          null;
    categorias_ingresos: CategoriasIngresos;
    estados:             IngresosEstados;
}

export interface CategoriasIngresos {
    id:          string;
    descripcion: string;
    id_tipo:     string;
    id_estado:   string;
    id_usuario:  string;
    created_at:  string;
    updated_at:  string;
    deleted_at:  null;
}

export interface IngresosEstados {
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
