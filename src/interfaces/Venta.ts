export interface VentaType {
    data:       VentaData[];
    statistics: Statistics;
    pagination: Pagination;
    meta:       Meta;
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
    comprobantes:      Comprobantes;
    estados:           Estados;
    cajas_movimientos: CajasMovimientos;
    users:             Users;
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
    id_tipo_operacion:     string;
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
    categorias:              Categorias[];
    tipos:                   Categorias[];
    totalsMonths:            TotalsMonth[];
}


export interface Categorias {
  id: string;
  descripcion: string;
  id_tipo?: string;
  id_estado: string;
  id_usuario?: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface TotalsMonth {
    month:     string;
    monthName: string;
    total:     number;
}
