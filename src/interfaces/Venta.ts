
export interface VentaType {
    data:       VentaData[];
    pagination: Pagination;
}

export interface VentaData {
    id:                string;
    codigo_venta:      string;
    fecha:             string;
    total:             number;
    id_movimiento:     string;
    id_comprobante:    string;
    id_estado:         string;
    id_usuario:        string;
    created_at:        string;
    updated_at:        string;
    deleted_at:        null;
    cajas_movimientos: CajasMovimientos;
    estados:           Estados;
    comprobantes:      Comprobantes;
}

export interface CajasMovimientos {
    id:           string;
    fecha:        string;
    id_sesion:    string;
    id_categoria: string;
    id_medio:     string;
    monto:        number;
    descripcion:  string;
    id_estado:    string;
    id_usuario:   string;
    created_at:   string;
    updated_at:   string;
    deleted_at:   null;
}

export interface Comprobantes {
    id:                    string;
    codigo_comprobante:    string;
    fecha:                 string;
    fecha_hora:            string;
    fecha_vencimiento:     string;
    id_cliente:            string;
    gravado15:             number;
    gravado18:             number;
    impuesto15:            number;
    impuesto18:            number;
    exento:                number;
    exonerado:             number;
    descuentos:            number;
    subtotal:              number;
    total:                 number;
    id_categoria:          string;
    id_tipo_comprobante:   string;
    id_estado_comprobante: string;
    id_estado:             string;
    id_usuario:            string;
    created_at:            string;
    updated_at:            string;
    deleted_at:            null;
}

export interface Estados {
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
