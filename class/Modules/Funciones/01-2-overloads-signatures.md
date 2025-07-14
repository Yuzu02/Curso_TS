# 3.1.2 Overloads y Signatures

## 🎯 Objetivos

- Implementar function overloads para diferentes tipos de entrada
- Crear call signatures para funciones complejas
- Usar construct signatures para constructores tipados
- Aplicar index signatures en funciones extensibles

## 📚 Contenido

### Function Overloads

#### Overloads Básicos

```typescript
// Overloads para diferentes tipos de entrada
function procesar(input: string): string;
function procesar(input: number): number;
function procesar(input: boolean): boolean;
function procesar(input: string | number | boolean): string | number | boolean {
  if (typeof input === 'string') {
    return input.toUpperCase();
  }
  if (typeof input === 'number') {
    return input * 2;
  }
  return !input;
}

// Uso type-safe
const resultadoString = procesar('hello'); // string
const resultadoNumber = procesar(42); // number
const resultadoBoolean = procesar(true); // boolean
```

#### Overloads con Diferentes Aridades

```typescript
// Diferentes números de parámetros
function crear(): { id: number };
function crear(nombre: string): { id: number; nombre: string };
function crear(nombre: string, edad: number): { id: number; nombre: string; edad: number };
function crear(nombre?: string, edad?: number) {
  const base = { id: Math.random() };
  
  if (nombre && edad !== undefined) {
    return { ...base, nombre, edad };
  }
  
  if (nombre) {
    return { ...base, nombre };
  }
  
  return base;
}

// Uso
const obj1 = crear(); // { id: number }
const obj2 = crear('Juan'); // { id: number; nombre: string }
const obj3 = crear('Ana', 25); // { id: number; nombre: string; edad: number }
```

#### Overloads con Tipos de Retorno Diferentes

```typescript
// Array de elementos o elemento único
function obtener(indices: number[]): string[];
function obtener(indice: number): string;
function obtener(input: number | number[]): string | string[] {
  const datos = ['a', 'b', 'c', 'd', 'e'];
  
  if (Array.isArray(input)) {
    return input.map(i => datos[i] || '');
  }
  
  return datos[input] || '';
}

// Uso type-safe
const elemento = obtener(2); // string
const elementos = obtener([0, 2, 4]); // string[]
```

### Call Signatures

#### Call Signatures en Interfaces

```typescript
// Call signature básico
interface Formatter {
  (value: string): string;
  formato: 'uppercase' | 'lowercase';
  configurar(formato: 'uppercase' | 'lowercase'): void;
}

// Implementación
const formatter: Formatter = ((value: string) => {
  return formatter.formato === 'uppercase' 
    ? value.toUpperCase() 
    : value.toLowerCase();
}) as Formatter;

formatter.formato = 'uppercase';
formatter.configurar = function(formato) {
  this.formato = formato;
};

// Uso
formatter.configurar('lowercase');
console.log(formatter('Hello World')); // "hello world"
```

#### Call Signatures con Overloads

```typescript
// Parser con múltiples call signatures
interface Parser {
  (input: string): any;
  (input: string, formato: 'json'): object;
  (input: string, formato: 'number'): number;
  (input: string, formato: 'date'): Date;
}

const parser: Parser = (input: string, formato?: 'json' | 'number' | 'date') => {
  if (formato === 'json') {
    return JSON.parse(input);
  }
  if (formato === 'number') {
    return parseFloat(input);
  }
  if (formato === 'date') {
    return new Date(input);
  }
  return input;
};

// Uso type-safe
const obj = parser('{"name": "Juan"}', 'json'); // object
const num = parser('42.5', 'number'); // number
const date = parser('2023-01-01', 'date'); // Date
const str = parser('hello'); // any
```

#### Generic Call Signatures

```typescript
// Call signature genérico
interface Transform<T, U> {
  <V>(input: T, mapper: (value: T) => V): U;
  defaultMapper: (value: T) => U;
}

// Implementación para transformar arrays
const arrayTransform: Transform<any[], string> = <V>(
  input: any[],
  mapper: (value: any[]) => V
) => {
  return mapper(input) as unknown as string;
};

arrayTransform.defaultMapper = (arr) => arr.join(', ');

// Uso
const numbers = [1, 2, 3, 4];
const result = arrayTransform(numbers, arr => arr.map(x => x * 2).join('-'));
```

### Construct Signatures

#### Constructores Tipados

```typescript
// Construct signature para clases
interface Constructable {
  new (nombre: string): { nombre: string };
}

class Persona {
  constructor(public nombre: string) {}
  
  saludar(): string {
    return `Hola, soy ${this.nombre}`;
  }
}

class Animal {
  constructor(public nombre: string) {}
  
  hacerSonido(): string {
    return `${this.nombre} hace un sonido`;
  }
}

// Función que acepta cualquier constructor compatible
function crearInstancia<T>(
  Ctor: new (nombre: string) => T,
  nombre: string
): T {
  return new Ctor(nombre);
}

const persona = crearInstancia(Persona, 'Juan');
const animal = crearInstancia(Animal, 'Rex');
```

#### Factory Pattern con Construct Signatures

```typescript
// Factory con construct signatures
interface EntityConstructor<T> {
  new (...args: any[]): T;
  readonly tipo: string;
}

interface Entity {
  id: number;
  tipo: string;
}

class Usuario implements Entity {
  static readonly tipo = 'usuario';
  
  constructor(
    public id: number,
    public nombre: string,
    public email: string
  ) {}
  
  get tipo(): string {
    return Usuario.tipo;
  }
}

class Producto implements Entity {
  static readonly tipo = 'producto';
  
  constructor(
    public id: number,
    public nombre: string,
    public precio: number
  ) {}
  
  get tipo(): string {
    return Producto.tipo;
  }
}

// Factory genérico
class EntityFactory {
  static crear<T extends Entity>(
    Constructor: EntityConstructor<T>,
    ...args: any[]
  ): T {
    return new Constructor(...args);
  }
}

// Uso
const usuario = EntityFactory.crear(Usuario, 1, 'Ana', 'ana@email.com');
const producto = EntityFactory.crear(Producto, 100, 'Laptop', 999.99);
```

### Index Signatures

#### Funciones con Propiedades Indexables

```typescript
// Función con propiedades indexables
interface FuncionExtendida {
  (x: number): number;
  [prop: string]: any;
}

const miFuncion: FuncionExtendida = (x: number) => x * 2;
miFuncion.descripcion = 'Multiplica por 2';
miFuncion.version = '1.0';
miFuncion.autor = { nombre: 'Juan', email: 'juan@email.com' };

// Uso
console.log(miFuncion(5)); // 10
console.log(miFuncion.descripcion); // "Multiplica por 2"
console.log(miFuncion.version); // "1.0"
```

#### Cache Function con Index Signature

```typescript
// Cache function avanzado
interface CacheFunction<T> {
  (key: string): T | undefined;
  clear(): void;
  set(key: string, value: T): void;
  delete(key: string): boolean;
  has(key: string): boolean;
  size: number;
  [key: string]: any;
}

function createCache<T>(): CacheFunction<T> {
  const cache: Record<string, T> = {};
  let cacheSize = 0;
  
  const fn = ((key: string) => cache[key]) as CacheFunction<T>;
  
  fn.clear = () => {
    Object.keys(cache).forEach(key => delete cache[key]);
    cacheSize = 0;
  };
  
  fn.set = (key: string, value: T) => {
    if (!(key in cache)) {
      cacheSize++;
    }
    cache[key] = value;
  };
  
  fn.delete = (key: string) => {
    if (key in cache) {
      delete cache[key];
      cacheSize--;
      return true;
    }
    return false;
  };
  
  fn.has = (key: string) => key in cache;
  
  Object.defineProperty(fn, 'size', {
    get: () => cacheSize
  });
  
  return fn;
}

// Uso
const cache = createCache<string>();
cache.set('user:1', 'Juan');
cache.set('user:2', 'Ana');

console.log(cache('user:1')); // "Juan"
console.log(cache.size); // 2
console.log(cache.has('user:3')); // false
```

#### Plugin System con Index Signatures

```typescript
// Sistema de plugins
interface PluginManager {
  (pluginName: string): Plugin | undefined;
  register(name: string, plugin: Plugin): void;
  unregister(name: string): boolean;
  list(): string[];
  [pluginName: string]: any;
}

interface Plugin {
  name: string;
  version: string;
  init(): void;
  destroy(): void;
}

function createPluginManager(): PluginManager {
  const plugins: Record<string, Plugin> = {};
  
  const manager = ((pluginName: string) => plugins[pluginName]) as PluginManager;
  
  manager.register = (name: string, plugin: Plugin) => {
    plugins[name] = plugin;
    plugin.init();
  };
  
  manager.unregister = (name: string) => {
    const plugin = plugins[name];
    if (plugin) {
      plugin.destroy();
      delete plugins[name];
      return true;
    }
    return false;
  };
  
  manager.list = () => Object.keys(plugins);
  
  return manager;
}

// Ejemplo de plugin
const loggerPlugin: Plugin = {
  name: 'logger',
  version: '1.0.0',
  init() {
    console.log('Logger plugin initialized');
  },
  destroy() {
    console.log('Logger plugin destroyed');
  }
};

// Uso
const pluginManager = createPluginManager();
pluginManager.register('logger', loggerPlugin);
pluginManager.customProperty = 'custom value';

console.log(pluginManager('logger')); // Plugin object
console.log(pluginManager.list()); // ['logger']
```

## 💡 Conceptos Clave

1. **Function Overloads**: Múltiples firmas para una sola implementación
2. **Call Signatures**: Funciones que también son objetos con propiedades
3. **Construct Signatures**: Tipado de constructores y factories
4. **Index Signatures**: Flexibilidad para propiedades dinámicas

## 🔍 Casos de Uso Comunes

- **APIs polimórficas** que manejan diferentes tipos de entrada
- **Factories y builders** con constructores tipados
- **Sistemas de plugins** extensibles
- **Cache y memoización** con funciones como objetos

## 🔗 Navegación

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| [3.1.1 Declaración y Expresiones](01-1-declaracion-expresiones.md) | **3.1.2 Overloads y Signatures** | [3.2 Funciones de Orden Superior](02-funciones-orden-superior.md) |

## ➡️ Siguiente Tema

Continúa con [3.2 Funciones de Orden Superior](02-funciones-orden-superior.md) para aprender sobre callbacks, Promises y funciones genéricas.
