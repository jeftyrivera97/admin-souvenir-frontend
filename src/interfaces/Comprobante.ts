export interface ComprobanteType {
    data:       ComprobanteData[];
    statistics: Statistics;
    pagination: Pagination;
    meta:       Meta;
}

export interface ComprobanteData {
    id:                      string;
    codigo_comprobante:      string;
    fecha:                   string;
    fecha_hora:              string;
    fecha_vencimiento:       string;
    id_cliente:              string;
    gravado15:               number;
    gravado18:               number;
    impuesto15:              number;
    impuesto18:              number;
    exento:                  number;
    exonerado:               number;
    descuentos:              number;
    subtotal:                number;
    total:                   number;
    id_categoria:            string;
    id_tipo_operacion:       string;
    id_estado_comprobante:   string;
    id_estado:               string;
    id_usuario:              string;
    created_at:              string;
    updated_at:              string;
    deleted_at:              null;
    categorias_comprobantes: CategoriasComprobantes;
    estados:                 Estados;
    ventas:                  Venta[];
    clientes:                Clientes;
    comprobantes_detalles:   ComprobantesDetalle[];
    comprobantes_folios:     any[];
    tipos_operaciones:       CategoriasComprobantes;
    estados_comprobantes:    Estados;
    comprobantes_pagos:      ComprobantesPago[];
    users:                   Users;
}

export interface CategoriasComprobantes {
    id:          string;
    descripcion: string;
    id_tipo?:    string;
    id_estado:   string;
    id_usuario?: string;
    created_at:  string;
    updated_at:  string;
    deleted_at:  null;
}

export interface Clientes {
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

export interface ComprobantesDetalle {
    id:             string;
    linea:          number;
    id_comprobante: string;
    id_producto:    string;
    cantidad:       number;
    precio:         number;
    total_linea:    number;
    id_usuario:     string;
    created_at:     string;
    updated_at:     string;
    deleted_at:     null;
}

export interface ComprobantesPago {
    id:             string;
    id_comprobante: string;
    id_metodo_pago: string;
    fecha_hora:     string;
    referencia:     string;
    comentario:     string;
    created_at:     string;
    updated_at:     string;
    deleted_at:     null;
}

export interface Estados {
    id:          string;
    descripcion: string;
    deleted_at:  null;
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

export interface Venta {
    id:             string;
    codigo_venta:   string;
    fecha:          string;
    total:          number;
    id_movimiento:  string;
    id_comprobante: string;
    id_estado:      string;
    id_usuario:     string;
    created_at:     Date;
    updated_at:     Date;
    deleted_at:     null;
}

export interface Meta {
    month:     string;
    prevMonth: string;
}

export interface Pagination {
    page:  number;
    limit: number;
    total: number;
    pages: number;
}

export interface Statistics {
    totalRegistros:          number;
    totalMonth:              number;
    totalMonthPrev:          number;
    totalYear:               number;
    totalYearPrev:           number;
    diferenciaMensual:       number;
    diferenciaAnual:         number;
    porcentajeCambioMensual: number;
    porcentajeCambioAnual:   number;
    categorias:              Categoria[];
    tipos:                   Categoria[];
    totalsMonths:            TotalsMonth[];
}

export interface Categoria {
    id_categoria?: string;
    descripcion:   string;
    total:         number;
    percentage:    number;
    id_tipo?:      string;
}

export interface TotalsMonth {
    month:     string;
    monthName: string;
    total:     number;
}
