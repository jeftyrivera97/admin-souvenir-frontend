export interface ClienteType {
    data:       ClienteData[];
    pagination: Pagination;
}

export interface ClienteData {
    id:             string;
    codigo_cliente: string;
    razon_social:   string;
    nombre:         string;
    apellido:       string;
    direccion:      string;
    telefono:       string;
    correo:         string;
    id_estado:      string;
    id_usuario:     string;
    created_at:     string;
    updated_at:     string;
    deleted_at:     null;
}

export interface Pagination {
    page:  number;
    limit: number;
    total: number;
    pages: number;
}
