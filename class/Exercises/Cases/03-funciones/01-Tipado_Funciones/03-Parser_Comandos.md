# 🎯 Ejercicio 3.1.3: Parser de Comandos

## 📋 Descripción

Crea un parser de línea de comandos (CLI) que utilice rest parameters, union types y tipado estricto para procesar comandos y argumentos de forma robusta y type-safe.

## 🎯 Objetivos

- Usar rest parameters para manejar argumentos variables
- Implementar pattern matching con union types
- Crear un sistema de comandos tipado y extensible
- Manejar flags y opciones de comando con validación

## 📊 Dificultad: 🟡 Intermedio

**Tiempo estimado:** 30 minutos

## 📝 Requisitos

### 1. Tipos Base

```typescript
interface CommandOption {
  name: string;
  alias?: string;
  type: 'string' | 'number' | 'boolean';
  required?: boolean;
  default?: string | number | boolean;
  description: string;
}

interface ParsedCommand {
  command: string;
  args: string[];
  options: Record<string, string | number | boolean>;
  flags: string[];
}

type CommandAction = 'help' | 'version' | 'build' | 'serve' | 'test' | 'deploy';

interface CommandDefinition {
  name: CommandAction;
  description: string;
  options: CommandOption[];
  minArgs?: number;
  maxArgs?: number;
}
```

### 2. Funciones de Parsing

```typescript
// Parser principal con rest parameters
function parseCommand(...args: string[]): ParsedCommand;

// Parsers específicos con overloads
function parseArgs(command: 'build', ...args: string[]): BuildCommand;
function parseArgs(command: 'serve', ...args: string[]): ServeCommand;
function parseArgs(command: 'test', ...args: string[]): TestCommand;
function parseArgs(command: CommandAction, ...args: string[]): ParsedCommand;

// Utilidades de parsing
function parseOptions(args: string[], options: CommandOption[]): Record<string, any>;
function parseFlags(...args: string[]): string[];
function validateCommand(parsed: ParsedCommand, definition: CommandDefinition): boolean;
```

### 3. Comandos Específicos

```typescript
interface BuildCommand extends ParsedCommand {
  command: 'build';
  options: {
    output?: string;
    mode: 'development' | 'production';
    watch?: boolean;
    minify?: boolean;
  };
}

interface ServeCommand extends ParsedCommand {
  command: 'serve';
  options: {
    port: number;
    host?: string;
    open?: boolean;
    ssl?: boolean;
  };
}

interface TestCommand extends ParsedCommand {
  command: 'test';
  options: {
    pattern?: string;
    coverage?: boolean;
    watch?: boolean;
    reporter: 'spec' | 'json' | 'html';
  };
}
```

### 4. Sistema de Ayuda

```typescript
// Funciones de ayuda
function showHelp(): void;
function showHelp(command: CommandAction): void;
function getCommandDefinition(command: CommandAction): CommandDefinition;
function formatHelp(definition: CommandDefinition): string;
```

## 💡 Estructura Base para Implementar

```typescript
// TODO: Implementa los tipos base
interface CommandOption {
  name: string;
  alias?: string;
  description: string;
  type: 'string' | 'number' | 'boolean';
}

interface ParsedCommand {
  command: string;
  args: string[];
  options: Record<string, any>;
  flags: string[];
}

type CommandAction = 'help' | 'version' | 'build' | 'serve' | 'test' | 'deploy';

// TODO: Implementa el parser principal con rest parameters
function parseCommand(...args: string[]): ParsedCommand {
  // TODO: Implementa la lógica de parsing
  // Tip: Primer argumento es el comando, resto son argumentos
  // Tip: Los argumentos que empiezan con -- son opciones/flags
}

// TODO: Implementa parsers específicos con overloads
function parseArgs(command: 'build', ...args: string[]): BuildCommand;
function parseArgs(command: 'serve', ...args: string[]): ServeCommand;
function parseArgs(command: 'test', ...args: string[]): TestCommand;
function parseArgs(command: CommandAction, ...args: string[]): ParsedCommand;
function parseArgs(command: CommandAction, ...args: string[]): ParsedCommand {
  // TODO: Implementa la lógica específica por comando
  // Tip: Usa switch/case para manejar diferentes comandos
}

// TODO: Implementa utilidades de parsing
function parseOptions(args: string[], options: CommandOption[]): Record<string, any> {
  // TODO: Parsea argumentos --key=value o --key value
}

function parseFlags(...args: string[]): string[] {
  // TODO: Parsea argumentos que son solo flags (--flag)
}

// TODO: Implementa validación
function validateCommand(parsed: ParsedCommand, definition: CommandDefinition): boolean {
  // TODO: Valida que el comando y argumentos sean válidos
}
```

## 🧪 Casos de Prueba

### Caso 1: Comando Build

```typescript
// Comando básico
const buildCmd = parseCommand('build', 'src/index.ts', '--output', 'dist', '--mode', 'production');
console.log(buildCmd.command); // 'build'
console.log(buildCmd.args); // ['src/index.ts']
console.log(buildCmd.options.output); // 'dist'
console.log(buildCmd.options.mode); // 'production'

// Con flags
const buildWithFlags = parseCommand('build', '--watch', '--minify');
console.log(buildWithFlags.flags); // ['watch', 'minify']
```

### Caso 2: Comando Serve

```typescript
// Comando serve con opciones
const serveCmd = parseCommand('serve', '--port', '3000', '--host', 'localhost', '--open');
console.log(serveCmd.command); // 'serve'
console.log(serveCmd.options.port); // 3000
console.log(serveCmd.options.host); // 'localhost'
console.log(serveCmd.flags.includes('open')); // true

// Usando aliases
const serveAlias = parseCommand('serve', '-p', '8080', '-h', '0.0.0.0');
console.log(serveAlias.options.port); // 8080
console.log(serveAlias.options.host); // '0.0.0.0'
```

### Caso 3: Comando Test

```typescript
// Comando test con patrón
const testCmd = parseCommand('test', '--pattern', '*.spec.ts', '--coverage', '--reporter', 'json');
console.log(testCmd.options.pattern); // '*.spec.ts'
console.log(testCmd.options.coverage); // true
console.log(testCmd.options.reporter); // 'json'

// Solo flags
const testFlags = parseCommand('test', '--watch', '--coverage');
console.log(testFlags.flags); // ['watch', 'coverage']
```

### Caso 4: Validación y Errores

```typescript
// Comando inválido
try {
  const invalid = parseCommand('invalid-command');
} catch (error) {
  console.log(error.message); // "Unknown command: invalid-command"
}

// Argumentos insuficientes
try {
  const buildDefinition = getCommandDefinition('build');
  const buildCmd = parseCommand('build');
  const isValid = validateCommand(buildCmd, buildDefinition);
  console.log(isValid); // false
} catch (error) {
  console.log(error.message); // "Insufficient arguments for command: build"
}
```

### Caso 5: Sistema de Ayuda

```typescript
// Ayuda general
showHelp();
// Output: Lista todos los comandos disponibles

// Ayuda específica
showHelp('build');
// Output: Ayuda detallada del comando build

const helpText = formatHelp(getCommandDefinition('serve'));
console.log(helpText);
// Output: Formato de ayuda para comando serve
```

## ✅ Criterios de Evaluación

- [ ] **Rest Parameters**: Uso correcto de rest parameters para argumentos variables
- [ ] **Union Types**: Tipado apropiado de comandos con union types
- [ ] **Function Overloads**: Implementación de overloads para comandos específicos
- [ ] **Type Safety**: Tipos específicos y seguros para cada comando
- [ ] **Parsing Logic**: Procesamiento correcto de opciones, flags y argumentos
- [ ] **Validation**: Validación robusta de comandos y argumentos

## 🎓 Puntos de Aprendizaje

1. **Rest Parameters**: Manejo de argumentos variables con `...args`
2. **Union Types**: Tipos específicos para diferentes comandos
3. **Function Overloads**: Múltiples signatures para flexibilidad
4. **Pattern Matching**: Uso de switch/case para manejar comandos
5. **Command Line Parsing**: Técnicas de parsing de argumentos CLI

## 📚 Recursos

- [Rest Parameters](https://www.typescriptlang.org/docs/handbook/2/functions.html#rest-parameters-and-arguments)
- [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)

## 🗂️ Archivos a Crear

```text
03-Parser_Comandos/
├── solution.ts          # Tu implementación aquí
├── types.ts            # Tipos y interfaces
└── tests.ts            # Casos de prueba (opcional)
```

---

## 🧭 Navegación

[⬅️ Ejercicio Anterior](02-Validador_Formularios.md) | [📚 Índice](../README.md) | [➡️ Ejercicio Siguiente](04-Factory_Functions.md)

---

💡 **Tip**: Empieza implementando el parser básico que separe comando, argumentos y opciones. Luego agrega los overloads específicos.
