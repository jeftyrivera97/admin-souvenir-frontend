export interface AreaEmpleadoType {
    data:       AreaEmpleadoData[];
    pagination: Pagination;
}

export interface AreaEmpleadoData {
    id:          string;
    descripcion: string;
    id_estado:   string;
    id_usuario:  string;
    created_at:  string;
    updated_at:  string;
    deleted_at:  null;
    users:       AreaEmpleadoUsers;
}

export interface AreaEmpleadoUsers {
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
