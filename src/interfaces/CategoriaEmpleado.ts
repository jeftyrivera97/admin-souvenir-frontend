
export interface CategoriaEmpleadoType {
    data:       CategoriaEmpleadoData[];
    pagination: Pagination;
}

export interface CategoriaEmpleadoData {
    id:          string;
    descripcion: string;
    rango:       string;
    id_estado:   string;
    id_usuario:  string;
    created_at:  string;
    updated_at:  string;
    deleted_at:  null;
    users:       Users;
}


export interface Users {
    id:                string;
    name:              string;
    email:             string;
    email_verified_at: null;
    password:          string;
    remember_token:    null;
    created_at:        null;
    updated_at:        null;
}


export interface Pagination {
    page:  number;
    limit: number;
    total: number;
    pages: number;
}
