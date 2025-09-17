# 🏗️ Arquitectura de Servicios - React Moderno

## 📁 Estructura Recomendada

```
src/
├── api/                    # Configuración de Axios e interceptores
│   └── api.ts
├── services/              # 🔥 NUEVO - Servicios de API (recomendado)
│   ├── index.ts          # Exportaciones principales
│   ├── compras/          # Servicios específicos de compras
│   │   ├── index.ts
│   │   └── compras.service.ts
│   └── shared/           # Servicios compartidos
├── helpers/              # ⚠️ DEPRECATED - Mantener para compatibilidad
│   └── ...
└── components/           # Componentes React
```

## 🚀 Mejores Prácticas

### ✅ Usar `src/services/` para nuevo código:
```typescript
import { ComprasService } from '@/services';

// Usar clase de servicio
const compras = await ComprasService.getCompras(1, 10);
const searchResult = await ComprasService.searchCompras('ABC123');
```

### ⚠️ Código legacy en `src/helpers/` (mantener por compatibilidad):
```typescript
import { getCompras, getCompraBySearch } from '@/helpers';
// Este código funciona pero está deprecated
```

## 📋 Servicios Disponibles

### ComprasService
- `getCompras(page, limit)` - Obtener todas las compras
- `searchCompras(term, page, limit)` - Buscar compras
- `getCompraById(id)` - Obtener compra específica
- `createCompra(data)` - Crear nueva compra
- `updateCompra(id, data)` - Actualizar compra
- `deleteCompra(id)` - Eliminar compra

## 🔄 Migración Gradual

1. **Nuevo código**: Usar `src/services/`
2. **Código existente**: Mantener `src/helpers/` hasta migrar
3. **Futuro**: Eliminar `src/helpers/` cuando todo esté migrado

## 💡 Beneficios de la Nueva Estructura

- ✅ **Mejor organización** por módulos
- ✅ **TypeScript fuerte** con clases tipadas
- ✅ **Métodos CRUD completos** por entidad
- ✅ **Fácil testing** con servicios aislados
- ✅ **Escalabilidad** para nuevos módulos
- ✅ **Compatibilidad** con código existente