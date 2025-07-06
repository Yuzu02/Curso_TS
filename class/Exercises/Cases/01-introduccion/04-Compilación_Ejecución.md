# ⚙️ Ejercicio 4: Compilación y Ejecución

> **Módulo:** Introducción a TypeScript  
> **Dificultad:** 🟢 Fácil  
> **Tiempo estimado:** 30 minutos

---

## 🎯 Objetivo

Dominar el workflow de desarrollo con TypeScript, incluyendo diferentes métodos de compilación, watch mode, y configuración de scripts para un flujo de trabajo eficiente.

## 📋 Requisitos

Al completar este ejercicio, deberás haber:

- ✅ Configurado diferentes métodos de compilación
- ✅ Utilizado watch mode para desarrollo
- ✅ Creado scripts personalizados
- ✅ Experimentado con diferentes configuraciones de build
- ✅ Configurado un workflow de desarrollo completo

## 🚀 Instrucciones

### Parte 1: Métodos de Compilación

1. **Crea el archivo `src/demo-app.ts`:**

   ```typescript
   interface Task {
     id: number;
     title: string;
     completed: boolean;
     createdAt: Date;
   }

   class TaskManager {
     private tasks: Task[] = [];
     private nextId = 1;

     addTask(title: string): Task {
       const task: Task = {
         id: this.nextId++,
         title,
         completed: false,
         createdAt: new Date()
       };
       this.tasks.push(task);
       return task;
     }

     toggleTask(id: number): boolean {
       const task = this.tasks.find(t => t.id === id);
       if (task) {
         task.completed = !task.completed;
         return true;
       }
       return false;
     }

     listTasks(): Task[] {
       return [...this.tasks];
     }

     getStats(): { total: number; completed: number; pending: number } {
       const total = this.tasks.length;
       const completed = this.tasks.filter(t => t.completed).length;
       const pending = total - completed;
       return { total, completed, pending };
     }
   }

   // Uso de la clase
   const manager = new TaskManager();
   manager.addTask("Aprender TypeScript");
   manager.addTask("Configurar entorno");
   manager.addTask("Crear primera aplicación");

   console.log("Tareas:", manager.listTasks());
   console.log("Estadísticas:", manager.getStats());

   manager.toggleTask(1);
   console.log("Después de completar tarea 1:", manager.getStats());
   ```

### Parte 2: Configuración de Scripts

2. **Actualiza tu `package.json` con scripts completos:**

   ```json
   {
     "name": "typescript-workshop",
     "scripts": {
       "dev": "bun run --watch src/demo-app.ts",
       "build": "tsc",
       "build:watch": "tsc --watch",
       "start": "node dist/demo-app.js",
       "clean": "rm -rf dist",
       "rebuild": "bun run clean && bun run build",
       "dev:node": "tsx watch src/demo-app.ts",
       "compile": "tsc src/demo-app.ts --outDir dist",
       "lint": "biome lint src/",
       "format": "biome format src/ --write",
       "check": "biome check src/ --apply",
       "full-check": "bun run lint && bun run build && bun run start"
     }
   }
   ```

### Parte 3: Configuraciones de TypeScript

3. **Crea `tsconfig.dev.json` para desarrollo:**

   ```json
   {
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "sourceMap": true,
       "removeComments": false,
       "noEmitOnError": false,
       "incremental": true,
       "tsBuildInfoFile": "./dist/.tsbuildinfo"
     },
     "watchOptions": {
       "watchFile": "useFsEvents",
       "watchDirectory": "useFsEvents",
       "fallbackPolling": "dynamicPriority"
     }
   }
   ```

4. **Crea `tsconfig.prod.json` para producción:**

   ```json
   {
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "sourceMap": false,
       "removeComments": true,
       "noEmitOnError": true,
       "declaration": true,
       "declarationMap": true
     }
   }
   ```

### Parte 4: Scripts de Build Avanzados

5. **Crea `build.js` para builds personalizados:**

   ```javascript
   const { execSync } = require('child_process');
   const fs = require('fs');
   const path = require('path');

   function run(command) {
     console.log(`🔧 Ejecutando: ${command}`);
     try {
       execSync(command, { stdio: 'inherit' });
       console.log('✅ Completado\n');
     } catch (error) {
       console.error('❌ Error:', error.message);
       process.exit(1);
     }
   }

   function clean() {
     console.log('🧹 Limpiando directorios...');
     if (fs.existsSync('dist')) {
       fs.rmSync('dist', { recursive: true });
     }
     console.log('✅ Limpieza completada\n');
   }

   function build(config = 'tsconfig.json') {
     console.log(`🏗️  Construyendo con ${config}...`);
     run(`tsc -p ${config}`);
   }

   function dev() {
     console.log('🚀 Iniciando modo desarrollo...');
     run('tsc -p tsconfig.dev.json --watch');
   }

   function prod() {
     console.log('📦 Construyendo para producción...');
     clean();
     build('tsconfig.prod.json');
     console.log('🎉 Build de producción completado!');
   }

   // Procesamiento de argumentos
   const command = process.argv[2];

   switch (command) {
     case 'dev':
       dev();
       break;
     case 'prod':
       prod();
       break;
     case 'clean':
       clean();
       break;
     case 'build':
       build();
       break;
     default:
       console.log('Comandos disponibles:');
       console.log('  node build.js dev    - Modo desarrollo');
       console.log('  node build.js prod   - Build producción');
       console.log('  node build.js clean  - Limpiar');
       console.log('  node build.js build  - Build estándar');
   }
   ```

### Parte 5: Watch Mode y Desarrollo

6. **Crea `watch.js` para configuración de watch personalizada:**

   ```javascript
   const chokidar = require('chokidar');
   const { execSync } = require('child_process');

   console.log('👁️  Iniciando watch mode personalizado...');

   const watcher = chokidar.watch('src/**/*.ts', {
     ignored: /(^|[\/\\])\../, // ignorar archivos ocultos
     persistent: true
   });

   let isCompiling = false;

   function compile() {
     if (isCompiling) return;
     
     isCompiling = true;
     console.log('🔄 Compilando...');
     
     try {
       execSync('tsc', { stdio: 'inherit' });
       console.log('✅ Compilación exitosa');
     } catch (error) {
       console.error('❌ Error de compilación');
     } finally {
       isCompiling = false;
     }
   }

   watcher
     .on('change', path => {
       console.log(`📝 Archivo modificado: ${path}`);
       compile();
     })
     .on('add', path => {
       console.log(`📄 Archivo agregado: ${path}`);
       compile();
     });

   console.log('🚀 Watching for changes...');
   compile(); // Compilación inicial
   ```

## 🧪 Verificación

### Prueba todos los métodos:

1. **Compilación básica:**

   ```bash
   bun run build
   ```

2. **Modo watch:**

   ```bash
   bun run build:watch
   ```

3. **Desarrollo con Bun:**

   ```bash
   bun run dev
   ```

4. **Build personalizado:**

   ```bash
   node build.js prod
   ```

5. **Watch personalizado:**

   ```bash
   node watch.js
   ```

## 🎯 Experimentos Adicionales

### Experimento 1: Comparación de Rendimiento

Mide el tiempo de compilación con diferentes configuraciones:

```bash
time bun run build
time tsc -p tsconfig.dev.json
time tsc -p tsconfig.prod.json
```

### Experimento 2: Configuración de Source Maps

Experimenta con diferentes opciones de source maps y verifica el debugging.

## ✅ Criterios de Éxito

- [ ] Configuraste múltiples métodos de compilación
- [ ] Creaste scripts personalizados funcionando
- [ ] Experimentaste con watch mode
- [ ] Configuraste builds para desarrollo y producción
- [ ] Entendiste las diferencias entre configuraciones

## 🔍 Conceptos Clave Aprendidos

- **Compilación:** Diferentes métodos y configuraciones
- **Watch mode:** Desarrollo automático con recompilación
- **Scripts:** Automatización de tareas comunes
- **Configuraciones:** Desarrollo vs producción
- **Source maps:** Debugging en código TypeScript

## 🤝 Contribuir

¿Tienes configuraciones de build interesantes? ¡Compártelas!

- [✅ Ver soluciones](../../../Solutions/01-introduccion/)
- [🏠 Volver al módulo](./README.md)

---

**💡 Tip:** Un buen workflow de desarrollo puede ahorrarte mucho tiempo. Experimenta con diferentes configuraciones hasta encontrar la que mejor se adapte a tu estilo.
