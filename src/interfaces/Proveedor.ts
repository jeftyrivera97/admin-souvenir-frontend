export interface ProveedorType {
    data:       ProveedorData[];
    pagination: Pagination;
}

export interface ProveedorData {
    id:               string;
    codigo_proveedor: string;
    descripcion:      string;
    categoria:        string;
    contacto:         string;
    telefono:         string;
    id_estado:        string;
    id_usuario:       string;
    created_at:       string | null;
    updated_at:       string | null;
    deleted_at:       null;
    estados:          ProveedorEstados;
}

export interface ProveedorEstados {
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
