export interface CategoriaCompraType {
    data:       CategoriaCompraData[];
    pagination: CompraPagination;
}

export interface CategoriaCompraData {
    id:          string;
    descripcion: string;
    id_tipo:     string;
    id_estado:   string;
    id_usuario:  string;
    created_at:  string;
    updated_at:  string;
    deleted_at:  null;
    users:       CompraUsers;
}

export interface CompraUsers {
    id:                string;
    name:              string;
    email:             string;
    email_verified_at: null;
    password:          string;
    remember_token:    null;
    created_at:        null;
    updated_at:        null;
}


export interface CompraPagination {
    page:  number;
    limit: number;
    total: number;
    pages: number;
}
