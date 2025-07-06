# 🔧 1.2.1 Instalación y Setup Inicial

> **Duración:** 3 horas | **Nivel:** Principiante-Intermedio

## 📋 Objetivos de la Lección

Al finalizar esta lección, podrás:

- ✅ Instalar Bun como runtime principal
- ✅ Configurar TypeScript 5.8+ en tu proyecto
- ✅ Crear un workspace TypeScript funcional
- ✅ Dominar los comandos básicos de Bun
- ✅ Configurar scripts de desarrollo y producción

---

## 🚀 Instalación de Bun

### 🤔 ¿Qué es Bun?

**Bun** es un runtime de JavaScript/TypeScript ultrarrápido que incluye:

- 🚀 **Runtime**: Ejecuta JavaScript y TypeScript directamente
- 📦 **Package Manager**: Reemplazo de npm con instalaciones ultra-rápidas
- 🔨 **Bundler**: Empaqueta aplicaciones sin configuración
- 🧪 **Test Runner**: Testing integrado y rápido

### 📊 Comparación de Performance

| Operación | npm | yarn | pnpm | **Bun** |
|-----------|-----|------|------|---------|
| Instalar Express | 8.2s | 6.1s | 4.3s | **0.8s** |
| Fresh install | 45s | 32s | 28s | **6s** |
| Ejecutar TS | N/A* | N/A* | N/A* | **Directo** |

*Requiere transpilación adicional

### 💻 Instalación por Sistema Operativo

#### **Windows (PowerShell)**

```powershell
# Opción 1: Usando Scoop (recomendado)
scoop install bun

# Opción 2: Usando el instalador oficial
powershell -c "irm bun.sh/install.ps1 | iex"

# Verificar instalación
bun --version
```

#### **macOS**

```bash
# Usando Homebrew (recomendado)
brew install bun

# O usando curl
curl -fsSL https://bun.sh/install | bash

# Verificar instalación
bun --version
```

#### **Linux**

```bash
# Instalación automática
curl -fsSL https://bun.sh/install | bash

# Recargar el shell
source ~/.bashrc  # o ~/.zshrc

# Verificar instalación
bun --version
```

### ✅ Verificación de la Instalación

```bash
# Verificar versión (debe ser 1.0+)
bun --version

# Verificar comandos disponibles
bun --help

# Test rápido
echo "console.log('¡Bun funcionando!')" > test.js
bun test.js
rm test.js
```

**Salida esperada:**

```plaintext
1.2.17
¡Bun funcionando!
```

---

## 🏗️ Creación del Proyecto TypeScript

### 📁 Estructura del Proyecto

Vamos a crear un proyecto TypeScript desde cero:

```bash
# Crear directorio del proyecto
mkdir mi-proyecto-typescript
cd mi-proyecto-typescript

# Inicializar proyecto con Bun
bun init -y
```

### 🚀 Próximo Paso

En la siguiente lección configuraremos **Biome** para linting y formatting, completando nuestro entorno de desarrollo moderno.

---

[⬅️ Volver: Configuración Entorno](./02-configuracion-entorno.md) | [➡️ Siguiente: Herramientas de Desarrollo](./02-2-herramientas-desarrollo.md)
