// Servicios principales de la aplicación
export * from './compras/compras.service';
export * from './categorias-compras/categoriasCompras.service';

export * from './proveedores/proveedores.service';


export * from './gastos/gastos.service';

export * from './categorias-gastos/categoriasGastos.service';
export * from './categorias-planillas/categoriasPlanillas.service';

export * from './empleados/empleados.service';

export * from './empleados/empleados.service';
export * from './areas-empleados/areasEmpleados.service';
export * from './categorias-empleados/categoriasEmpleados.service';

// Re-exportar funciones legacy de helpers para compatibilidad
export * from '../helpers';