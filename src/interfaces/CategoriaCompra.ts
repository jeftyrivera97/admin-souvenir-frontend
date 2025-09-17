export interface CategoriaCompraType {
    data:       CategoriaCompraData[];
    pagination: Pagination;
}

export interface CategoriaCompraData {
    id:          string;
    descripcion: string;
    id_tipo:     string;
    id_estado:   string;
    id_usuario:  string;
    created_at:  Date;
    updated_at:  Date;
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
