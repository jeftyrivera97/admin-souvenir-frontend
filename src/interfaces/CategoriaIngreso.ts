export interface CategoriaIngresoType {
    data:       CategoriaIngresoData[];
    pagination: IngresoPagination;
}

export interface CategoriaIngresoData {
    id:          string;
    descripcion: string;
    id_tipo:     string;
    id_estado:   string;
    id_usuario:  string;
    created_at:  string;
    updated_at:  string;
    deleted_at:  null;
    users:       IngresoUsers;
}

export interface IngresoUsers {
    id:                string;
    name:              string;
    email:             string;
    email_verified_at: null;
    password:          string;
    remember_token:    null;
    created_at:        null;
    updated_at:        null;
}


export interface IngresoPagination {
    page:  number;
    limit: number;
    total: number;
    pages: number;
}
