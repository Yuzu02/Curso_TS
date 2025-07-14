# 🚀 Curso de TypeScript Moderno

> Un curso completo y actualizado de TypeScript con las mejores prácticas y herramientas modernas del ecosistema

---

## 📋 Tabla de Contenidos

- [📖 Descripción del Curso](#-descripción-del-curso)
- [🎯 Objetivos](#-objetivos)
- [📚 Contenido del Curso](#-contenido-del-curso)
- [⚙️ Configuración del Entorno](#️-configuración-del-entorno)
- [🛠️ Herramientas Utilizadas](#️-herramientas-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🎯 Sistema de Ejercicios](#-sistema-de-ejercicios)
- [🚀 Cómo Empezar](#-cómo-empezar)
- [📝 Notas Importantes](#-notas-importantes)
- [🤝 Contribuciones](#-contribuciones)

---

## 📖 Descripción del Curso

Este curso de **TypeScript** está diseñado para llevarte desde los fundamentos hasta conceptos avanzados, utilizando las herramientas más modernas del ecosistema como **Bun** y **Biome**. Aprenderás a desarrollar aplicaciones robustas y escalables con TypeScript 5.8+.

## 🎯 Objetivos

- ✅ Dominar los fundamentos de TypeScript
- ✅ Configurar un entorno de desarrollo moderno
- ✅ Implementar mejores prácticas de desarrollo
- ✅ Utilizar herramientas de desarollo avanzadas
- ✅ Desarrollar aplicaciones escalables y mantenibles

---

## 📚 Contenido del Curso

### 📖 [Módulo 1: Fundamentos y Configuración del Entorno](./class/Modules/Introduccion/README.md)

> **Duración:** 8 horas | **Estado:** 🔄 En Progreso

**Temas principales:**

- 🎯 [1.1 Introducción a TypeScript](./class/Modules/Introduccion/01-introduccion-typescript.md)
- ⚙️ [1.2 Configuración del Entorno de Desarrollo](./class/Modules/Introduccion/02-configuracion-entorno.md)
  - 🔧 [1.2.1 Instalación y Setup Inicial](./class/Modules/Introduccion/02-1-instalacion-setup.md)
  - 🛠️ [1.2.2 Herramientas de Desarrollo](./class/Modules/Introduccion/02-2-herramientas-desarrollo.md)
  - 🔧 [1.2.3 Configuración de TypeScript](./class/Modules/Introduccion/02-3-configuracion-typescript.md)
- 🚀 [1.3 Primeros Pasos](./class/Modules/Introduccion/03-primeros-pasos.md)

**📋 Ejercicios:** [Ver ejercicios del módulo](./class/Exercises/Cases/01-introduccion/) | [Ver soluciones](./class/Exercises/Solutions/01-introduccion/)

### 🔧 [Módulo 2: Tipos Básicos y Fundamentales](./class/Modules/Tipos/README.md)

> **Duración:** 12 horas | **Estado:** 🔄 En Progreso

**Temas principales:**

- 🔧 [2.1 Sistema de Tipos de TypeScript](./class/Modules/Tipos/01-sistema-tipos.md)
  - 🎯 [2.1.1 Tipos Primitivos](./class/Modules/Tipos/01-1-tipos-primitivos.md)
  - 🔧 [2.1.2 Tipos Compuestos Básicos](./class/Modules/Tipos/01-2-tipos-compuestos.md)
- 🧠 [2.2 Inferencia de Tipos](./class/Modules/Tipos/02-inferencia-tipos.md)
- 📝 [2.3 Literales y Enums](./class/Modules/Tipos/03-literales-enums.md)
  - 🎨 [2.3.1 Literal Types](./class/Modules/Tipos/03-1-literal-types.md)
  - 🔢 [2.3.2 Enums](./class/Modules/Tipos/03-2-enums.md)
- 🎯 [2.4 Type Assertions y Narrowing](./class/Modules/Tipos/04-assertions-narrowing.md)

**📋 Ejercicios:** [Ver ejercicios del módulo](./class/Exercises/Cases/02-tipos-basicos/) | [Ver soluciones](./class/Exercises/Solutions/02-tipos-basicos/)

### ⚡ [Módulo 3: Funciones](./class/Modules/Funciones/README.md)

> **Duración:** 5 horas | **Estado:** ✅ Completado

**Temas principales:**

- 🔧 [3.1 Tipado de Funciones](./class/Modules/Funciones/01-tipado-funciones.md)
  - 📝 [3.1.1 Declaración y Expresiones](./class/Modules/Funciones/01-1-declaracion-expresiones.md)
  - 🔄 [3.1.2 Overloads y Signatures](./class/Modules/Funciones/01-2-overloads-signatures.md)
- 🚀 [3.2 Funciones de Orden Superior](./class/Modules/Funciones/02-funciones-orden-superior.md)
- 🎯 [3.3 Métodos y This](./class/Modules/Funciones/03-metodos-this.md)

**📋 Ejercicios:** [Ver ejercicios del módulo](./class/Exercises/Cases/03-funciones/) | [Ver soluciones](./class/Exercises/Solutions/03-funciones/)

---

## ⚙️ Configuración del Entorno

### 📋 Requisitos Previos

- **Node.js** 22+ (opcional, usaremos Bun)
- **Bun** runtime (recomendado)
- **VSCode** o editor compatible
- **Git** para control de versiones

### 🔧 Setup Inicial

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Yuzu02/Curso_TS
   cd Curso_TS
   ```

2. **Instalar dependencias**

   ```bash
   bun install
   ```

3. **Configurar VSCode**
   - Instalar extensión de Biome
   - Configurar formato automático al guardar

## 🛠️ Herramientas Utilizadas

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| **TypeScript** | 5.8+ | Lenguaje principal |
| **Bun** | Latest | Runtime y package manager |
| **Biome** | Latest | Linting y formatting |
| **VSCode** | Latest | Editor recomendado |

## 📁 Estructura del Proyecto

```text
Curso_TS/
├── 📄 README.md                 # Este archivo
├── 📄 package.json              # Configuración del proyecto
├── 📄 tsconfig.json             # Configuración de TypeScript
├── 📄 biome.jsonc              # Configuración de Biome
├── 📄 bun.lock                 # Lock file de dependencias
├── 📁 src/                     # Código fuente
│   └─ 📄index.ts             # Archivo principal
├── 📁 class/                   # Contenido del curso
│   ├── 📁 Modules/             # Módulos del curso
│   │   ├── 📁 Introduccion/    # Módulo 1: Introducción
│   │   │   └── 📄 README.md    # Docs del módulo
│   │   ├── 📁 Tipos/           # Módulo 2: Tipos Básicos
│   │   │   └── 📄 README.md    # Docs del módulo
│   │   └── 📁 Funciones/       # Módulo 3: Funciones
│   │       └── 📄 README.md    # Docs del módulo
│   └── 📁 Exercises/           # Sistema de ejercicios
│       ├── 📄 README.md        # Guía de ejercicios
│       ├── 📁 Cases/           # Casos de ejercicios
│       │   ├── 📄 README.md    # Índice de casos
│       │   ├── 📁 01-introduccion/  # Ejercicios Módulo 1
│       │   │   └── 📄 README.md     # Índice del módulo
│       │   ├── 📁 02-tipos-basicos/  # Ejercicios Módulo 2
│       │   │   └── 📄 README.md      # Índice del módulo
│       │   └── 📁 03-funciones/      # Ejercicios Módulo 3
│       │       └── 📄 README.md      # Índice del módulo
│       └── 📁 Solutions/       # Soluciones
│           ├── 📄 README.md    # Índice de soluciones
│           ├── 📁 01-introduccion/
│           │   ├── 📁 Yuzu/    # Soluciones del instructor
│           │   └── 📁 contributors/  # Soluciones de la comunidad
│           ├── 📁 02-tipos-basicos/
│           │   ├── 📁 Yuzu/
│           │   └── 📁 contributors/
│           └── 📁 03-funciones/
│               ├── 📁 Yuzu/
│               └── 📁 contributors/
```

## 🎯 Sistema de Ejercicios

Este curso incluye un **sistema completo de ejercicios prácticos** diseñado para reforzar cada concepto aprendido:

### 📋 Características del Sistema

- ✅ **Ejercicios por módulo** organizados por dificultad
- ✅ **Casos de estudio** con problemas reales
- ✅ **Soluciones múltiples** del instructor y la comunidad
- ✅ **Sistema de contribución** via Pull Requests
- ✅ **Criterios de evaluación** claros para cada ejercicio

### 🎯 Cómo Funciona

1. **Estudia el material** de cada módulo
2. **Resuelve los ejercicios** en [`class/Exercises/Cases/`](./class/Exercises/Cases/)
3. **Compara tu solución** con las de [`class/Exercises/Solutions/`](./class/Exercises/Solutions/)
4. **Contribuye** con tu propia solución via PR
5. **Aprende** de los diferentes enfoques de la comunidad

### 📚 Ejercicios Disponibles

| Módulo | Ejercicios | Dificultad | Tiempo Est. |
|--------|------------|------------|-------------|
| [Introducción](./class/Exercises/Cases/01-introduccion/) | 4 | 🟢 Principiante | 2.5h |
| [Tipos Básicos](./class/Exercises/Cases/02-tipos-basicos/) | 29 | 🟡 Intermedio | 22-25h |
| [Funciones](./class/Exercises/Cases/03-funciones/) | 15 | 🟡 Intermedio | 5h |

**[🎯 Ir al Sistema de Ejercicios](./class/Exercises/README.md)**

---

## 🚀 Cómo Empezar

1. **Ejecutar el proyecto**

   ```bash
   bun run watch
   ```

2. **Linting y formatting**

   ```bash
   bun run lint    # Verificar código
   bun run format  # Formatear código
   bun run check # Lint + Format + Fix 
   ```

## 📝 Notas Importantes

> 💡 **Tip:** Este curso utiliza las últimas características de TypeScript 5.8+ y herramientas modernas del ecosistema.

> ⚠️ **Advertencia:** Asegúrate de tener instalado Bun para aprovechar al máximo las optimizaciones de rendimiento.

> 📚 **Recursos:** Cada módulo incluye ejercicios prácticos y ejemplos de código real.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún error o tienes sugerencias:

1. 🍴 Fork el proyecto
2. 🌱 Crea una rama para tu feature
3. 💻 Realiza tus cambios
4. 📝 Commit tus cambios
5. 🚀 Push a la rama
6. 📬 Abre un Pull Request

---

<div align="center">

Desarrollado con ❤️ por Yuzu

</div>
