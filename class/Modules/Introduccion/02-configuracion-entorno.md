# ⚙️ 1.2 Configuración del Entorno de Desarrollo

> **Duración:** 6 horas | **Nivel:** Principiante-Intermedio

## 📋 Objetivos de la Lección

Al finalizar esta lección, podrás:

- ✅ Configurar un entorno de desarrollo TypeScript moderno
- ✅ Instalar y configurar Bun como runtime principal
- ✅ Configurar TypeScript 5.8+ en tu proyecto
- ✅ Integrar Biome para linting y formatting
- ✅ Optimizar VSCode para desarrollo TypeScript

---

## 🎯 Introducción al Entorno Moderno

En esta lección configuraremos un entorno de desarrollo que incluye las herramientas más modernas y eficientes del ecosistema TypeScript 2024:

### 🛠️ Stack de Herramientas

| Herramienta | Propósito | ¿Por qué esta herramienta? |
|-------------|-----------|---------------------------|
| **Bun** | Runtime & Package Manager | 🚀 Ultra-rápido, soporte nativo TS |
| **TypeScript 5.8+** | Lenguaje principal | 🔥 Últimas características |
| **Biome** | Linting & Formatting | ⚡ Más rápido que ESLint+Prettier |
| **VSCode** | Editor | 🎯 Mejor integración con TS |

### 🔄 Comparación con Enfoques Legacy

| Aspecto | **Enfoque Legacy** | **Enfoque Moderno** |
|---------|-------------------|-------------------|
| Runtime | Node.js + npm | Bun |
| Transpilación | webpack/rollup | Bun nativo |
| Linting | ESLint | Biome |
| Formatting | Prettier | Biome |
| Speed | ~30s build | ~3s build |

---

## 📚 Contenido de la Lección

Esta lección se divide en dos partes principales:

### 🔧 [1.2.1 Instalación y Setup Inicial](./02-1-instalacion-setup.md)

**Duración:** 3 horas

- Instalación de Bun como runtime
- Configuración de TypeScript 5.8+
- Setup del workspace con Bun
- Comandos básicos y workflow

### 🛠️ [1.2.2 Herramientas de Desarrollo](./02-2-herramientas-desarrollo.md)

**Duración:** 3 horas

- Instalación y configuración de Biome
- Configuración del formatter y linter
- Reglas personalizadas
- Integración con VSCode
- Alternativas modernas vs herramientas legacy

---

## 🚀 Preview del Resultado Final

Al final de esta lección tendrás un entorno como este:

```text
my-typescript-project/
├── 📄 package.json          # Configuración del proyecto
├── 📄 tsconfig.json         # Configuración de TypeScript
├── 📄 biome.jsonc          # Configuración de Biome
├── 📄 bun.lock             # Lock file de dependencias
├── 📁 src/                 # Código fuente
│   ├── 📄 index.ts         # Archivo principal
│   └── 📁 utils/           # Utilidades
└── 📁 dist/                # Código compilado
```

### ⚡ Comandos Principales

```bash
bun run src/index.ts

# Linting y formatting
bun run lint
bun run format
bun run check

# Instalar dependencias
bun install
```

---

## 🎯 ¿Por qué Este Stack?

### 🚀 **Bun vs Node.js**

```bash
# Velocidad de instalación
npm install express    # ~5-10 segundos
bun add express       # ~0.5-1 segundo

# Ejecución de TypeScript
node -r ts-node index.ts    # Requiere transpilación
bun run index.ts           # Ejecución directa
```

### ⚡ **Biome vs ESLint + Prettier**

```bash
# Setup tradicional
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier
# + configuración compleja en múltiples archivos

# Setup moderno
bun add -D -E @biomejs/biome
bunx @biomejs/biome init
# + configuración simple en un archivo
```

### 📊 **Métricas de Performance**

| Métrica | Legacy Stack | Modern Stack | Mejora |
|---------|-------------|-------------|--------|
| **Tiempo de instalación** | 45s | 8s | 5.6x más rápido |
| **Tiempo de build** | 12s | 2s | 6x más rápido |
| **Tiempo de linting** | 8s | 1.2s | 6.7x más rápido |
| **Tamaño node_modules** | 400MB | 80MB | 5x más pequeño |

---

## 🎓 Metodología de Aprendizaje

### 1. **Teoría + Práctica**

Cada concepto incluye explicación teórica seguida de implementación práctica

### 2. **Comparaciones**

Entenderás por qué elegimos cada herramienta comparándola con alternativas

### 3. **Ejercicios Progresivos**

Construiremos el entorno paso a paso, desde cero hasta un setup profesional

### 4. **Troubleshooting**

Cubriremos problemas comunes y cómo resolverlos

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener:

### 💻 **Software Base**

- **Sistema Operativo**: Windows 10+, macOS 10.15+, o Linux
- **Editor**: VSCode (recomendado) o tu editor preferido
- **Git**: Para control de versiones
- **Terminal**: PowerShell (Windows), Terminal (macOS), o Bash (Linux)

### 🧠 **Conocimientos**

- Conocimientos básicos de JavaScript
- Familiaridad con la línea de comandos
- Conceptos básicos de npm/package.json

### ⚠️ **Notas Importantes**

- **No necesitas Node.js**: Usaremos Bun como runtime principal
- **Desinstala herramientas legacy**: Si tienes ESLint/Prettier globales, considera desinstalarlos
- **Espacio en disco**: ~2GB para todas las herramientas

---

## 🚀 ¡Comencemos

Ahora que tienes una visión general de lo que lograremos, es hora de comenzar con la configuración práctica.

**¿Listo para configurar tu entorno de desarrollo TypeScript moderno?**

---

[⬅️ Volver: Introducción TS](./01-introduccion-typescript.md) | [➡️ Siguiente: Instalación y Setup](./02-1-instalacion-setup.md)
