# 🔧 1.2.3 Configuración de TypeScript

> **Duración:** 1 hora | **Nivel:** Principiante-Intermedio

## 📋 Objetivos de la Lección

Al finalizar esta lección, podrás:

- ✅ Configurar tsconfig.json de forma detallada
- ✅ Entender las opciones del compilador más importantes
- ✅ Configurar TypeScript para diferentes entornos
- ✅ Usar paths y aliases para importaciones limpias
- ✅ Configurar target ES2024/ES2025

---

## 📝 Archivo tsconfig.json Detallado

### 🎯 Configuración Básica

El archivo `tsconfig.json` es el corazón de la configuración de TypeScript. Aquí está una configuración completa y explicada:

```json
{
  "compilerOptions": {
    // 🎯 Target y Module
    "target": "ES2024",                    // Versión de JavaScript de salida
    "lib": ["ES2024", "DOM"],              // Librerías disponibles
    "module": "ESNext",                    // Sistema de módulos
    "moduleResolution": "bundler",         // Resolución para bundlers modernos
    
    // 📁 Paths y Files
    "rootDir": "./src",                    // Directorio raíz del código
    "outDir": "./dist",                    // Directorio de salida
    "baseUrl": "./",                       // Base para rutas relativas
    "paths": {                             // Aliases para importaciones
      "@/*": ["src/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"]
    },
    
    // 🔍 Type Checking
    "strict": true,                        // Modo estricto (recomendado)
    "noImplicitAny": true,                 // Error en 'any' implícito
    "strictNullChecks": true,              // Checks estrictos de null/undefined
    "strictFunctionTypes": true,           // Checks estrictos en funciones
    "noImplicitReturns": true,             // Error si no todos los paths retornan
    "noUnusedLocals": true,                // Error en variables locales no usadas
    "noUnusedParameters": true,            // Error en parámetros no usados
    
    // 🔧 Module Resolution
    "esModuleInterop": true,               // Interop con CommonJS
    "allowSyntheticDefaultImports": true,  // Permite imports default sintéticos
    "forceConsistentCasingInFileNames": true, // Case-sensitive en nombres
    "resolveJsonModule": true,             // Permite importar archivos JSON
    
    // 📊 Source Maps y Debugging
    "sourceMap": true,                     // Generar source maps
    "inlineSourceMap": false,              // Source maps inline (no recomendado)
    "declaration": true,                   // Generar archivos .d.ts
    "declarationMap": true,                // Source maps para .d.ts
    
    // ⚡ Performance
    "skipLibCheck": true,                  // Saltar check de librerías
    "incremental": true,                   // Compilación incremental
    "tsBuildInfoFile": "./.tsbuildinfo",   // Cache de compilación
    
    // 🎨 Code Generation
    "removeComments": false,               // Mantener comentarios
    "importHelpers": true,                 // Usar helpers de tslib
    "downlevelIteration": true,            // Soporte para iteración en targets viejos
    
    // 🚫 Deprecated/Legacy (no usar)
    "experimentalDecorators": false,       // Usar decorators estándar
    "emitDecoratorMetadata": false         // No emitir metadata de decorators
  },
  
  "include": [
    "src/**/*",                            // Incluir todo en src/
    "types/**/*"                           // Incluir tipos globales
  ],
  
  "exclude": [
    "node_modules",                        // Excluir dependencias
    "dist",                                // Excluir output
    "**/*.test.ts",                        // Excluir tests (opcional)
    "**/*.spec.ts"
  ],
  
  "ts-node": {
    "esm": true                            // Soporte para ES modules en ts-node
  }
}
```

---

## ⚙️ Opciones del Compilador Más Importantes

### 🎯 Target y Module

| Opción | Recomendado | Descripción |
|--------|------------|-------------|
| `target` | `"ES2024"` | Versión de JS de salida |
| `module` | `"ESNext"` | Sistema de módulos |
| `lib` | `["ES2024", "DOM"]` | APIs disponibles |

```json
{
  "compilerOptions": {
    "target": "ES2024",        // Características modernas de JS
    "module": "ESNext",        // Módulos ES6+
    "lib": ["ES2024", "DOM"]   // APIs del navegador y modernas
  }
}
```

### 🔍 Type Checking Estricto

```json
{
  "compilerOptions": {
    "strict": true,                    // ✅ Activa todo lo siguiente
    "noImplicitAny": true,             // ✅ No 'any' implícito
    "strictNullChecks": true,          // ✅ null/undefined explícitos
    "strictFunctionTypes": true,       // ✅ Tipos de función estrictos
    "noImplicitReturns": true,         // ✅ Todos los paths deben retornar
    "noUnusedLocals": true,            // ✅ Variables no usadas = error
    "noUnusedParameters": true         // ✅ Parámetros no usados = error
  }
}
```

### 📁 Paths y Aliases

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"],
      "@config/*": ["src/config/*"]
    }
  }
}
```

**Uso en código:**

```typescript
// ❌ Antes (rutas relativas largas)
import { Button } from '../../../components/ui/Button';
import { formatDate } from '../../../../utils/date';

// ✅ Después (con aliases)
import { Button } from '@components/ui/Button';
import { formatDate } from '@utils/date';
```

---

## 🌍 Configuraciones para Diferentes Entornos

### 🖥️ Configuración para Node.js

**tsconfig.node.json:**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "target": "ES2024",
    "module": "ESNext",
    "lib": ["ES2024"],                 // Sin DOM
    "moduleResolution": "node",        // Resolución Node.js
    "types": ["node", "bun-types"]     // Tipos de Node/Bun
  },
  "include": ["src/**/*"],
  "exclude": ["src/**/*.test.ts"]
}
```

### 🌐 Configuración para Browser

**tsconfig.browser.json:**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "target": "ES2022",               // Compatibilidad navegadores
    "lib": ["ES2022", "DOM"],         // APIs del browser
    "moduleResolution": "bundler"     // Para webpack/vite
  }
}
```

### 🧪 Configuración para Testing

**tsconfig.test.json:**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["bun-types", "jest"],   // Tipos de testing
    "noUnusedLocals": false,          // Permitir variables no usadas en tests
    "noUnusedParameters": false       // Permitir parámetros no usados en tests
  },
  "include": [
    "src/**/*",
    "tests/**/*",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

---

## 🎯 Configuración de Target ES2024/ES2025

### 🚀 ES2024 Features

```json
{
  "compilerOptions": {
    "target": "ES2024",
    "lib": ["ES2024", "DOM"]
  }
}
```

**Características soportadas:**

```typescript
// Array.prototype.findLast() y findLastIndex()
const numbers = [1, 2, 3, 4, 5];
const lastEven = numbers.findLast(n => n % 2 === 0); // 4

// Object.hasOwn()
const obj = { name: 'TypeScript' };
console.log(Object.hasOwn(obj, 'name')); // true

// Array.prototype.toReversed()
const original = [1, 2, 3];
const reversed = original.toReversed(); // [3, 2, 1]
// original sigue siendo [1, 2, 3]

// Error.cause
throw new Error('Database connection failed', {
  cause: previousError
});
```

### 🔮 ES2025 (Experimental)

```json
{
  "compilerOptions": {
    "target": "ES2025",
    "lib": ["ES2025", "DOM"]
  }
}
```

---

## 📂 Estructura de Configuración Recomendada

### 📁 Proyecto con Múltiples Entornos

```text
proyecto/
├── tsconfig.json              # Configuración base
├── tsconfig.node.json         # Para Node.js/Backend
├── tsconfig.browser.json      # Para Frontend
├── tsconfig.test.json         # Para Testing
└── src/
    ├── server/               # Código Node.js
    ├── client/               # Código Browser
    └── shared/               # Código compartido
```

### 📋 Scripts de Package.json

```json
{
  "scripts": {
    "build": "tsc",
    "build:node": "tsc -p tsconfig.node.json",
    "build:browser": "tsc -p tsconfig.browser.json",
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch"
  }
}
```

---

## 🔧 Configuración Avanzada

### 🎯 Project References

Para proyectos grandes con múltiples packages:

**tsconfig.json (root):**

```json
{
  "files": [],
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/ui" },
    { "path": "./packages/utils" }
  ]
}
```

**packages/core/tsconfig.json:**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

### 🔍 Plugin Configuration

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-plugin-css-modules"
      }
    ]
  }
}
```

---

## ✅ Checklist de Configuración

Antes de continuar, verifica:

- [ ] **tsconfig.json creado** con configuración básica
- [ ] **Paths configurados** para importaciones limpias
- [ ] **Strict mode activado** para mayor seguridad
- [ ] **Target ES2024** para características modernas
- [ ] **Source maps habilitados** para debugging
- [ ] **Configuración probada** - `tsc --noEmit` sin errores

---

## 🎓 Resumen de la Lección

### 🎯 Puntos Clave

1. **tsconfig.json es fundamental** para el comportamiento de TypeScript
2. **Strict mode es recomendado** para proyectos serios
3. **Paths y aliases** mejoran la legibilidad del código
4. **Diferentes entornos** requieren configuraciones específicas
5. **ES2024 target** ofrece características modernas

### 🚀 Próximo Paso

En la siguiente lección aprenderemos los **primeros pasos** con TypeScript: compilación, ejecución y debugging básico.

---

[⬅️ Volver: Herramientas de Desarrollo](./02-2-herramientas-desarrollo.md) | [➡️ Siguiente: Primeros Pasos](./03-primeros-pasos.md)
