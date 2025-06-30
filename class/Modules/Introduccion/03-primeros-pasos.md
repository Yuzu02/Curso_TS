# 🚀 1.3 Primeros Pasos

> **Duración:** 1 hora | **Nivel:** Principiante

## 📋 Objetivos de la Lección

Al finalizar esta lección, podrás:

- ✅ Compilar y ejecutar código TypeScript con Bun
- ✅ Realizar debugging básico en VSCode
- ✅ Organizar la estructura de proyectos TypeScript
- ✅ Usar el workflow básico de desarrollo

---

## ⚡ Compilación y Ejecución con Bun

### 🚀 Ejecución Directa

Con Bun, puedes ejecutar TypeScript directamente sin compilación previa:

```bash
# Ejecutar archivo TypeScript directamente
bun run src/index.ts

# Con argumentos
bun run src/index.ts --env=development

# Con variables de entorno
PORT=3000 bun run src/index.ts
```

### 🔄 Modo Watch (Desarrollo)

```bash
# Watch mode - recarga automáticamente al cambiar archivos
bun run --watch src/index.ts

# Watch con hot reload
bun run --hot src/index.ts
```

### 🏗️ Compilación para Producción

```bash
# Compilar con TypeScript compiler
bunx tsc

# Build optimizado con Bun
bun build src/index.ts --outdir dist --target node

# Build con minificación
bun build src/index.ts --outdir dist --minify --target node
```

---

## 🐛 Debugging Básico

### 🔧 Configuración en VSCode

Crear `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug TypeScript with Bun",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/index.ts",
      "runtime": "bun",
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Debug Current File",
      "type": "node",
      "request": "launch",
      "program": "${file}",
      "runtime": "bun",
      "console": "integratedTerminal"
    }
  ]
}
```

### 🎯 Breakpoints y Debugging

```typescript
// src/debug-example.ts
interface User {
  id: number;
  name: string;
  email: string;
}

function processUsers(users: User[]): User[] {
  console.log('🔍 Starting user processing...');
  
  const processedUsers = users.map(user => {
    // 🔴 Breakpoint aquí - F9 en VSCode
    console.log(`Processing user: ${user.name}`);
    
    return {
      ...user,
      email: user.email.toLowerCase()
    };
  });
  
  console.log('✅ User processing completed');
  return processedUsers;
}

// Datos de prueba
const users: User[] = [
  { id: 1, name: 'Ana', email: 'ANA@EMAIL.COM' },
  { id: 2, name: 'Luis', email: 'LUIS@EMAIL.COM' }
];

const result = processUsers(users);
console.log('Final result:', result);
```

### 🛠️ Debugging en Terminal

```bash
# Debugging con inspect flag
bun run --inspect src/debug-example.ts

# Debugging con breakpoint automático
bun run --inspect-brk src/debug-example.ts
```

---

## 📁 Estructura de Proyectos TypeScript

### 🏗️ Estructura Básica

```text
mi-proyecto-ts/
├── 📄 package.json           # Configuración del proyecto
├── 📄 tsconfig.json          # Configuración TypeScript
├── 📄 biome.jsonc           # Linting y formatting
├── 📄 bun.lock              # Lock de dependencias
├── 📄 .gitignore            # Archivos a ignorar en Git
├── 📁 src/                  # Código fuente
│   ├── 📄 index.ts          # Punto de entrada
│   ├── 📁 components/       # Componentes/módulos
│   ├── 📁 utils/            # Funciones utilitarias
│   ├── 📁 types/            # Definiciones de tipos
│   └── 📁 config/           # Configuraciones
├── 📁 dist/                 # Código compilado
├── 📁 tests/                # Tests
└── 📁 docs/                 # Documentación
```

### 📋 Ejemplo de .gitignore

```gitignore
# Dependencies
node_modules/
bun.lock

# Build outputs
dist/
build/

# TypeScript
*.tsbuildinfo

# Logs
*.log
logs/

# Environment
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

### 📝 Estructura de src/

```text
src/
├── 📄 index.ts              # Punto de entrada principal
├── 📄 app.ts                # Configuración de la aplicación
├── 📁 components/           # Componentes reutilizables
│   ├── 📄 Button.ts
│   └── 📄 Modal.ts
├── 📁 services/             # Lógica de negocio
│   ├── 📄 UserService.ts
│   └── 📄 ApiService.ts
├── 📁 utils/                # Funciones auxiliares
│   ├── 📄 validation.ts
│   ├── 📄 formatting.ts
│   └── 📄 constants.ts
├── 📁 types/                # Tipos TypeScript
│   ├── 📄 User.ts
│   ├── 📄 Api.ts
│   └── 📄 global.d.ts
└── 📁 config/               # Configuraciones
    ├── 📄 database.ts
    └── 📄 environment.ts
```

---

## 🎮 Ejemplo Práctico: Primer Proyecto

### 🎯 Crear Proyecto desde Cero

```bash
# 1. Crear directorio y entrar
mkdir mi-primer-ts && cd mi-primer-ts

# 2. Inicializar proyecto
bun init -y

# 3. Instalar TypeScript
bun add -d typescript @types/bun

# 4. Crear estructura
mkdir src tests
touch src/index.ts src/types.ts src/utils.ts
```

### 📝 Código de Ejemplo

**src/types.ts:**

```typescript
// Tipos para nuestro proyecto
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export type TaskStatus = 'pending' | 'completed' | 'all';
```

**src/utils.ts:**

```typescript
import type { Task, TaskStatus } from './types';

export class TaskManager {
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
    console.log(`✅ Task added: ${title}`);
    return task;
  }

  completeTask(id: number): boolean {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
      console.log(`🎉 Task completed: ${task.title}`);
      return true;
    }
    return false;
  }

  getTasks(status: TaskStatus = 'all'): Task[] {
    switch (status) {
      case 'pending':
        return this.tasks.filter(t => !t.completed);
      case 'completed':
        return this.tasks.filter(t => t.completed);
      default:
        return this.tasks;
    }
  }

  showSummary(): void {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;

    console.log('\n📊 Task Summary:');
    console.log(`📝 Total: ${total}`);
    console.log(`✅ Completed: ${completed}`);
    console.log(`⏳ Pending: ${pending}`);
  }
}
```

**src/index.ts:**

```typescript
import { TaskManager } from './utils';

async function main(): Promise<void> {
  console.log('🚀 Task Manager TypeScript Demo');
  
  const taskManager = new TaskManager();

  // Agregar algunas tareas
  taskManager.addTask('Aprender TypeScript');
  taskManager.addTask('Configurar Bun');
  taskManager.addTask('Crear primer proyecto');

  // Completar una tarea
  taskManager.completeTask(1);

  // Mostrar tareas pendientes
  console.log('\n⏳ Pending tasks:');
  taskManager.getTasks('pending').forEach(task => {
    console.log(`- ${task.title}`);
  });

  // Mostrar resumen
  taskManager.showSummary();
}

// Ejecutar aplicación
main().catch(error => {
  console.error('💥 Error:', error);
  process.exit(1);
});
```

### 🎮 Ejecutar el Proyecto

```bash
# Ejecutar en modo desarrollo
bun run src/index.ts

# Ejecutar con watch
bun run --watch src/index.ts
```

**Salida esperada:**

```plaintext
🚀 Task Manager TypeScript Demo
✅ Task added: Aprender TypeScript
✅ Task added: Configurar Bun
✅ Task added: Crear primer proyecto
🎉 Task completed: Aprender TypeScript

⏳ Pending tasks:
- Configurar Bun
- Crear primer proyecto

📊 Task Summary:
📝 Total: 3
✅ Completed: 1
⏳ Pending: 2
```

---

## 🔄 Workflow Básico de Desarrollo

### 📋 Ciclo de Desarrollo Diario

```bash
# 1. Iniciar el día
bun install                    # Instalar/actualizar dependencias
bun run check                  # Verificar linting y tipos

# 2. Desarrollo
bun run --watch src/index.ts   # Modo desarrollo con watch

# 3. Verificaciones
bun run type-check             # Solo verificar tipos
bun run lint                   # Verificar estilo de código

# 4. Build
bun run build                  # Compilar para producción

# 5. Testing (cuando tengas tests)
bun test                       # Ejecutar tests
```

### 🎯 Scripts Recomendados para package.json

```json
{
  "scripts": {
    "watch": "bun run --watch src/index.ts",
    "build": "bun build src/index.ts --outdir dist --target node",
    "start": "bun run dist/index.js",
    "check": "biome check --apply src/ && tsc --noEmit",
    "type-check": "tsc --noEmit",
    "lint": "biome check src/",
    "format": "biome format --write src/",
    "clean": "rm -rf dist .tsbuildinfo"
  }
}
```

---

## 🛠️ Herramientas de Desarrollo Útiles

### 🔍 Verificación de Tipos en Tiempo Real

```bash
# TypeScript compiler en modo watch
bunx tsc --noEmit --watch
```

### 📊 Análisis de Bundle

```bash
# Analizar tamaño del bundle
bun build src/index.ts --outdir dist --analyze
```

### 🧹 Limpieza de Proyecto

```bash
# Script de limpieza completa
bun run clean && bun install
```

---

## ✅ Checklist de Primer Proyecto

Verifica que tu proyecto tenga:

- [ ] **Ejecutar código TS** - `bun run src/index.ts` funciona
- [ ] **Watch mode** - `bun run --watch` funciona
- [ ] **Debugging** - Breakpoints en VSCode funcionan
- [ ] **Type checking** - `tsc --noEmit` sin errores
- [ ] **Linting** - `biome check` sin errores
- [ ] **Build** - `bun build` genera archivos en dist/
- [ ] **Estructura clara** - Directorios organizados

---

## 🎓 Resumen de la Lección

### 🎯 Lo que Aprendiste

1. **Ejecución directa** de TypeScript con Bun
2. **Debugging básico** en VSCode con breakpoints
3. **Estructura de proyecto** profesional
4. **Workflow de desarrollo** eficiente
5. **Primer proyecto funcional** con tipos y lógica

### 🚀 Próximo Paso

¡Felicidades! Has completado el **Módulo 1**. Ahora tienes un entorno de desarrollo TypeScript moderno completamente funcional. En el próximo módulo exploraremos los **tipos básicos y avanzados** de TypeScript.

---

## 🔗 Enlaces Útiles

- 📚 [Documentación de Bun](https://bun.sh/docs)
- 🐛 [Debugging en VSCode](https://code.visualstudio.com/docs/editor/debugging)
- 🏗️ [TypeScript Project Structure](https://typescript-lang.org/docs/handbook/project-structure.html)

---

[⬅️ Volver: Configuración TypeScript](./02-3-configuracion-typescript.md) | [➡️ Siguiente: Módulo 2](../Tipos/README.md)
