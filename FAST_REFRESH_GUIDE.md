# Guía de Fast Refresh para shadcn/ui

## Problema Resuelto

Los componentes de shadcn/ui originalmente exportan múltiples elementos desde un solo archivo (componentes, hooks, tipos, constantes), lo que causa problemas con Fast Refresh de React. El error típico es:

```
Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
```

## Soluciones Implementadas

### 1. Theme Provider ✅

**Antes:** Todo en `theme-provider.tsx`
```tsx
// ❌ Problema
export function ThemeProvider() { ... }
export const useTheme = () => { ... }
export type Theme = "dark" | "light" | "system"
```

**Después:** Separado en múltiples archivos
```
src/components/theme/
├── index.ts           # Exportaciones principales
├── theme-context.ts   # Contexto y tipos
└── theme-provider.tsx # Solo el componente
src/hooks/
└── use-theme.ts       # Solo el hook
```

### 2. Sidebar Components ✅

**Antes:** Todo en `sidebar.tsx`
```tsx
// ❌ Problema
export function Sidebar() { ... }
export const useSidebar = () => { ... }
const SIDEBAR_WIDTH = "16rem"
```

**Después:** Separado en múltiples archivos
```
src/components/ui/
├── sidebar.tsx         # Solo componentes
└── sidebar-context.ts  # Contexto, tipos y constantes
src/hooks/
└── use-sidebar.ts      # Solo el hook
```

## Configuración de Tema Oscuro por Defecto ✅

El `ThemeProvider` ahora usa modo oscuro como tema predeterminado:

```tsx
<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  {/* tu app */}
</ThemeProvider>
```

## Mejores Prácticas

### ✅ Estructura Recomendada para Componentes UI

```
src/components/ui/component-name/
├── index.ts                 # Exportaciones principales
├── component-name.tsx       # Solo componentes React
├── component-context.ts     # Contexto y tipos (si es necesario)
└── component-variants.ts    # Variantes con cva (si es necesario)

src/hooks/
└── use-component-name.ts    # Hooks personalizados
```

### ✅ Qué Separar

1. **Hooks personalizados** → `src/hooks/`
2. **Contextos y tipos** → archivos `*-context.ts`
3. **Constantes y configuraciones** → archivos separados
4. **Variantes de estilo** → archivos `*-variants.ts`

### ✅ Qué Mantener Junto

1. **Componentes React** pueden estar juntos en el mismo archivo
2. **PropTypes** del componente pueden estar en el mismo archivo
3. **Estilos CSS-in-JS** pueden estar en el mismo archivo del componente

### ❌ Qué Evitar

```tsx
// ❌ No hacer esto en un archivo de componente
export function MyComponent() { ... }
export const useMyComponent = () => { ... }  // Hook separado
export const MY_CONSTANT = "value"           // Constante separada
export type MyType = { ... }                 // Tipo separado
```

### ✅ Hacer esto en su lugar

```tsx
// ✅ component.tsx - Solo componentes
export function MyComponent() { ... }

// ✅ use-my-component.ts - Solo hook
export const useMyComponent = () => { ... }

// ✅ constants.ts - Solo constantes
export const MY_CONSTANT = "value"

// ✅ types.ts - Solo tipos
export type MyType = { ... }
```

## Importaciones Simplificadas

Usando archivos `index.ts`, puedes mantener importaciones limpias:

```tsx
// ✅ Importación limpia
import { ThemeProvider, useTheme } from "@/components/theme"
import { useSidebar } from "@/hooks/use-sidebar"

// En lugar de múltiples importaciones
import { ThemeProvider } from "@/components/theme/theme-provider"
import { useTheme } from "@/hooks/use-theme"
```

## Verificación

Después de aplicar estos cambios:

1. ✅ Fast Refresh funciona correctamente
2. ✅ No hay warnings en la consola de desarrollo
3. ✅ El proyecto compila sin errores
4. ✅ Tema oscuro está configurado por defecto
5. ✅ Todos los componentes mantienen su funcionalidad

## Comandos de Verificación

```bash
# Compilar y verificar errores
npm run build

# Ejecutar servidor de desarrollo
npm run dev

# El servidor debería iniciar sin warnings de Fast Refresh
```