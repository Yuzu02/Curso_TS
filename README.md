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

> **Duración:** 8 horas | **Estado:** ✅ Completado

**Temas principales:**

- 🎯 [1.1 Introducción a TypeScript](./class/Modules/Introduccion/01-introduccion-typescript.md)
- ⚙️ [1.2 Configuración del Entorno de Desarrollo](./class/Modules/Introduccion/02-configuracion-entorno.md)
  - 🔧 [1.2.1 Instalación y Setup Inicial](./class/Modules/Introduccion/02-1-instalacion-setup.md)
  - 🛠️ [1.2.2 Herramientas de Desarrollo](./class/Modules/Introduccion/02-2-herramientas-desarrollo.md)
  - � [1.2.3 Configuración de TypeScript](./class/Modules/Introduccion/02-3-configuracion-typescript.md)
- 🚀 [1.3 Primeros Pasos](./class/Modules/Introduccion/03-primeros-pasos.md)

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
└── 📁 class/                   # Contenido del curso
    └── 📁 Modules/             # Módulos del curso
        └── 📁 Introduccion/    # Módulo 1: Introducción
            ├── 📄 README.md    # Docs del módulo
            ├── 📄 01-introduccion-typescript.md
            ├── 📄 02-configuracion-entorno.md
            ├── 📄 02-1-instalacion-setup.md
            ├── 📄 02-2-herramientas-desarrollo.md
            ├── 📄 02-3-configuracion-typescript.md
            └── 📄 03-primeros-pasos.md
```

## 🚀 Cómo Empezar

1. **Ejecutar el proyecto**

   ```bash
   bun run src/index.ts
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
