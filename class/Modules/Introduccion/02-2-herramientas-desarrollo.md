# 🛠️ 1.2.2 Herramientas de Desarrollo

> **Duración:** 3 horas | **Nivel:** Intermedio

## 📋 Objetivos de la Lección

Al finalizar esta lección, podrás:

- ✅ Instalar y configurar Biome como herramienta todo-en-uno
- ✅ Configurar reglas de linting personalizadas
- ✅ Configurar formatting automático
- ✅ Integrar Biome con VSCode
- ✅ Comparar herramientas modernas vs legacy

---

## 🚀 Introducción a Biome

### 🤔 ¿Qué es Biome?

**Biome** es una toolchain moderna para desarrollo web que combina:

- 🔍 **Linter**: Análisis de código y detección de errores
- 🎨 **Formatter**: Formateo automático de código
- ⚡ **Performance**: Escrito en Rust, ultra-rápido
- 🔧 **Zero Config**: Funciona sin configuración compleja

### 📊 Comparación con Herramientas Legacy

| Característica | **ESLint + Prettier** | **Biome** |
|----------------|----------------------|-----------|
| **Velocidad** | ~8 segundos | ~1.2 segundos |
| **Configuración** | Múltiples archivos | Un solo archivo |
| **Conflictos** | Reglas que chocan | Sin conflictos |
| **Tamaño** | ~50MB node_modules | ~10MB |
| **Mantenimiento** | 2+ herramientas | 1 herramienta |

### 🎯 ¿Por qué Biome?

#### **Ventajas Principales**

1. **🚀 Ultra-rápido**: 15x más rápido que ESLint
2. **🎯 Consistente**: No hay conflictos entre linter y formatter
3. **🔧 Simple**: Una sola herramienta, una configuración
4. **🆕 Moderno**: Soporte nativo para TypeScript, JSX, JSON
5. **🛠️ Extensible**: Reglas personalizables y plugins

---

## 📦 Instalación de Biome

### 🔧 Instalación Básica

```bash
# Instalar Biome como dependencia de desarrollo
bun add -d -e @biomejs/biome

# Verificar instalación
bunx @biomejs/biome --version
```

### 🎨 Inicialización del Proyecto

```bash
# Crear configuración inicial
bunx @biomejs/biome init -jsonc

# Esto crea el archivo biome.json
```

## 🎯 Scripts de Package.json

### 📋 Scripts Básicos

Agregar estos scripts a tu `package.json`:

```json
{
  "scripts": {
    "watch" : "bun run --watch src/index.ts",
    "check": "biome check --write",
    "format": "biome format --write",
    "lint": "biome lint --write",
    "all": "bun run check && bun run format && bun run lint"
 },
}
```

### 🎮 Uso de Scripts

```bash
# Desarrollo diario
bun run check           # Lint + format + fix automático
bun run lint           # Solo verificar errores
bun run format        # Solo formatear
```

---

## 🎨 Integración con VSCode

### 🔧 Instalación de la Extensión

1. **Instalar la extensión oficial**:
   - Abrir VSCode
   - Ir a Extensions (Ctrl+Shift+X)
   - Buscar "Biome"
   - Instalar "Biome" por biomejs

2. **Configurar como formatter por defecto**:

### 📋 Configuración de VSCode

Crear/editar `.vscode/settings.json`:

```json
{
  // Configuración general
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.formatOnType": false,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  },
  
  // Configuración específica para TypeScript
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome",
    "editor.formatOnSave": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "biomejs.biome",
    "editor.formatOnSave": true
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  
  // Desactivar otros formatters para evitar conflictos
  "prettier.enable": false,
  "eslint.enable": false,
  
  // Configuración de Biome
  "biome.lspBin": "./node_modules/@biomejs/biome/bin/biome"
}
```

### 🔧 Configuración de Extensions

Crear `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "biomejs.biome",
    "ms-vscode.vscode-typescript-next"
  ],
  "unwantedRecommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
  ]
}
```

## 🎮 Ejercicio Práctico: Configurar tu Entorno

### 🎯 Objetivo

Configurar un entorno completo con Biome desde cero.

### 📝 Pasos

1. **Crear nuevo proyecto**

   ```bash
   mkdir biome-exercise
   cd biome-exercise
   bun init -y
   ```

2. **Instalar dependencias**

   ```bash
   bun add -d -e @biomejs/biome
   ```

3. **Configurar Biome**

   ```bash
   bunx @biomejs/biome init -jsonc
   ```

4. **Personalizar configuración**
   - Crear `biome.jsonc` con la configuración avanzada mostrada arriba

5. **Configurar scripts**
   - Agregar scripts de linting y formatting al `package.json`

6. **Configurar VSCode**
   - Crear `.vscode/settings.json`
   - Instalar extensión de Biome

7. **Crear código de prueba**
   - Crear `src/index.ts` con código problemático
   - Ejecutar `bun run check` y ver las correcciones

### ✅ Resultado Esperado

Un entorno completamente configurado donde:

- El código se formatea automáticamente al guardar
- Los errores de linting se muestran en tiempo real
- Las correcciones se aplican automáticamente
- El workflow de desarrollo es fluido y rápido

---

## 🔧 Integración con Git Hooks

### 📋 Pre-commit Hook

Crear `.git/hooks/pre-commit`:

```bash
#!/bin/sh
echo "🔍 Ejecutando verificaciones pre-commit..."

# Ejecutar Biome
bun run check:ci
if [ $? -ne 0 ]; then
  echo "❌ Errores de linting encontrados. Ejecuta 'bun run check' para corregir."
  exit 1
fi

# Verificar tipos
bun run type-check
if [ $? -ne 0 ]; then
  echo "❌ Errores de TypeScript encontrados."
  exit 1
fi

echo "✅ Todas las verificaciones pasaron!"
```

### 🔧 Usando Husky (Recomendado)

```bash
# Instalar husky
bun add -d husky

# Configurar husky
bunx husky install
bunx husky add .husky/pre-commit "bun run precommit"
```

**package.json:**

```json
{
  "scripts": {
    "precommit": "bun run check && bun run type-check",
    "prepare": "husky install"
  }
}
```

---

## ✅ Checklist de Verificación

Antes de completar esta lección, verifica:

- [ ] **Biome instalado** - Extensión VSCode funcionando
- [ ] **Configuración personalizada** - `biome.jsonc` configurado
- [ ] **Scripts funcionando** - `bun run check` ejecuta sin errores
- [ ] **VSCode integrado** - Format on save activado
- [ ] **Workflow eficiente** - Desarrollo fluido con correcciones automáticas

---

## 🎓 Resumen de la Lección

### 🎯 Lo que Aprendiste

1. **Instalación de Biome** - Herramienta todo-en-uno moderna
2. **Configuración avanzada** - Reglas personalizadas y overrides
3. **Integración con VSCode** - Experiencia de desarrollo optimizada
4. **Scripts automatizados** - Workflow eficiente de desarrollo
5. **Comparación con herramientas legacy** - Ventajas del stack moderno

### 🚀 Próximo Paso

¡Felicidades! Has completado la configuración del entorno de desarrollo TypeScript moderno. En el próximo módulo exploraremos los **tipos básicos y avanzados** de TypeScript.

---

[⬅️ Volver: Instalación y Setup](./02-1-instalacion-setup.md) | [➡️ Siguiente: Módulo 2 - Tipos](../Tipos/README.md)
