export interface CompraType {
    data:       CompraData[];
    pagination: Pagination;
}

export interface CompraData {
    id:                  string;
    codigo_compra:       string;
    fecha:               string;
    id_categoria:        string;
    id_proveedor:        string;
    id_tipo_operacion:   string;
    id_estado_operacion: string;
    fecha_pago:          string;
    gravado15:           number;
    gravado18:           number;
    impuesto15:          number;
    impuesto18:          number;
    exento:              number;
    exonerado:           number;
    total:               number;
    id_estado:           string;
    id_usuario:          string;
    created_at:          null;
    updated_at:          null;
    deleted_at:          null;
    categorias_compras:  CategoriasCompras;
    proveedores:         Proveedores;
    tipos_operaciones:   CategoriasCompras;
    estados_operaciones: EstadosOperaciones;
    users:               Users;
}

export interface CategoriasCompras {
    id:          string;
    descripcion: string;
    id_tipo?:    string;
    id_estado:   null | string;
    id_usuario?: string;
    created_at:  Date | null;
    updated_at:  Date | null;
    deleted_at:  null;
}

export interface EstadosOperaciones {
    id:          string;
    descripcion: string;
    deleted_at:  null;
}

export interface Proveedores {
    id:               string;
    codigo_proveedor: string;
    descripcion:      string;
    categoria:        string;
    contacto:         string;
    telefono:         string;
    id_estado:        string;
    id_usuario:       string;
    created_at:       null;
    updated_at:       null;
    deleted_at:       null;
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
