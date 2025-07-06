# 🔧 Ejercicio 1: Configuración del Entorno

> **Módulo:** Introducción a TypeScript  
> **Dificultad:** 🟢 Fácil  
> **Tiempo estimado:** 30 minutos

---

## 🎯 Objetivo

Configurar un entorno de desarrollo TypeScript moderno utilizando las herramientas más actuales del ecosistema, incluyendo **Bun** como runtime y **Biome** como linter/formatter.

## 📋 Requisitos

Al completar este ejercicio, deberás tener:

- ✅ **Bun** instalado y funcionando
- ✅ **TypeScript** configurado globalmente
- ✅ **Visual Studio Code** con extensiones necesarias
- ✅ Un proyecto TypeScript inicializado
- ✅ **Biome** configurado para linting y formatting

## 🚀 Instrucciones

### Paso 1: Instalación de Bun

1. **Instala Bun** (si no lo tienes):

   ```bash
   # Windows (PowerShell)
   powershell -c "irm bun.sh/install.ps1 | iex"
   
   # Alternativamente con npm
   npm install -g bun
   ```

2. **Verifica la instalación:**

   ```bash
   bun --version
   ```

### Paso 2: Configuración del Proyecto

1. **Crea un nuevo directorio para tu proyecto:**

   ```bash
   mkdir mi-proyecto-typescript
   cd mi-proyecto-typescript
   ```

2. **Inicializa el proyecto:**

   ```bash
   bun init
   ```

3. **Instala TypeScript:**

   ```bash
   bun add -D typescript @types/node
   ```

### Paso 3: Configuración de Biome

1. **Instala Biome:**

   ```bash
   bun add -D @biomejs/biome
   ```

2. **Inicializa Biome:**

   ```bash
   bunx @biomejs/biome init
   ```

3. **Configura Biome** editando `biome.json`:

   ```json
   {
     "$schema": "https://biomejs.dev/schemas/1.4.1/schema.json",
     "organizeImports": {
       "enabled": true
     },
     "linter": {
       "enabled": true,
       "rules": {
         "recommended": true
       }
     },
     "formatter": {
       "enabled": true,
       "indentStyle": "tab",
       "indentWidth": 2
     }
   }
   ```

### Paso 4: Configuración de TypeScript

1. **Genera tsconfig.json:**

   ```bash
   bunx tsc --init
   ```

2. **Configura tsconfig.json** básico:

   ```json
   {
     "compilerOptions": {
       "target": "ES2022",
       "module": "ESNext",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist"]
   }
   ```

### Paso 5: Configuración de VS Code

1. **Instala las extensiones recomendadas:**
   - Biome (biomejs.biome)

2. **Crea `.vscode/settings.json`:**

   ```json
   {
     "editor.defaultFormatter": "biomejs.biome",
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "quickfix.biome": "explicit",
       "source.organizeImports.biome": "explicit"
     }
   }
   ```

### Paso 6: Scripts de Desarrollo

1. **Configura scripts en package.json:**

   ```json
   {
     "scripts": {
       "dev": "bun run --watch src/index.ts",
       "build": "tsc",
       "lint": "biome lint src/",
       "format": "biome format src/ --write",
       "check": "biome check src/ --apply"
     }
   }
   ```

## 🧪 Verificación

### Prueba tu configuración

1. **Crea `src/index.ts`:**

   ```typescript
   function saludar(nombre: string): string {
     return `¡Hola, ${nombre}!`;
   }

   const mensaje = saludar("TypeScript");
   console.log(mensaje);
   ```

2. **Ejecuta el código:**

   ```bash
   bun run dev
   ```

3. **Prueba el linting:**

   ```bash
   bun run lint
   ```

4. **Prueba el formatting:**

   ```bash
   bun run format
   ```

## ✅ Criterios de Éxito

- [ ] Bun instalado y funcionando
- [ ] Proyecto TypeScript inicializado
- [ ] Biome configurado y funcionando
- [ ] VS Code con extensiones instaladas
- [ ] Archivo de prueba ejecutándose correctamente
- [ ] Linting y formatting funcionando

## 🔗 Enlaces Útiles

- [📚 Documentación de Bun](https://bun.sh/docs)
- [🔧 Documentación de Biome](https://biomejs.dev/)
- [📖 Documentación de TypeScript](https://www.typescriptlang.org/docs/)

## 🤝 Contribuir

¿Encontraste una mejor forma de configurar el entorno? ¡Comparte tu solución!

- [✅ Ver soluciones](../../../Solutions/01-introduccion/)
- [🏠 Volver al módulo](./README.md)

---

**💡 Tip:** Una vez que tengas este entorno configurado, podrás usarlo como base para todos los proyectos TypeScript del curso.
