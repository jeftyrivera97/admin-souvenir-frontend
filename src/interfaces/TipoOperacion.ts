export interface TipoOperacionType {
    data: TipoOperacionData[];
}

export interface TipoOperacionData {
    id:          string;
    descripcion: string;
    id_estado:   string;
    created_at:  string;
    updated_at:  string;
    deleted_at:  null;
}
