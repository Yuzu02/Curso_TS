# 3.2 Funciones de Orden Superior

## 🎯 Objetivos

- Crear callbacks tipados de manera segura
- Trabajar con Promises y async/await en TypeScript
- Implementar funciones genéricas básicas
- Desarrollar utility functions reutilizables

## 🧠 Fundamentos Teóricos

### ¿Qué son las Funciones de Orden Superior?

Una **función de orden superior** es aquella que:

1. **Recibe funciones como argumentos**, o
2. **Retorna funciones como resultado**, o
3. **Ambas cosas**

Este concepto es fundamental en programación funcional y permite crear abstracciones poderosas que encapsulan patrones comunes de comportamiento.

**¿Por qué son importantes en TypeScript?**

- **Abstracción**: Permiten extraer patrones comunes en funciones reutilizables
- **Composición**: Facilitan la composición de comportamientos complejos a partir de funciones simples
- **Type Safety**: TypeScript puede verificar que las funciones pasadas cumplan con contratos específicos
- **Flexibilidad**: Permiten personalizar comportamiento sin duplicar código

### El Problema que Resuelven

Sin funciones de orden superior, enfrentamos:

```typescript
// ❌ Código duplicado para cada transformación
function duplicarNumeros(nums: number[]): number[] {
  const resultado = [];
  for (const num of nums) {
    resultado.push(num * 2);
  }
  return resultado;
}

function convertirAStrings(nums: number[]): string[] {
  const resultado = [];
  for (const num of nums) {
    resultado.push(num.toString());
  }
  return resultado;
}
```

Con funciones de orden superior:

```typescript
// ✅ Una función genérica que encapsula el patrón
function mapear<T, U>(array: T[], transformar: (item: T) => U): U[] {
  const resultado = [];
  for (const item of array) {
    resultado.push(transformar(item));
  }
  return resultado;
}

// Ahora reutilizamos la lógica
const duplicados = mapear([1, 2, 3], n => n * 2);
const strings = mapear([1, 2, 3], n => n.toString());
```

## 📚 Contenido

### Secciones

Esta sección cubre conceptos avanzados de funciones que operan sobre otras funciones:

- **Callbacks con Tipos**: Funciones que reciben otras funciones como parámetros
- **Promises y Async/Await**: Manejo de operaciones asíncronas con tipos
- **Generic Functions**: Funciones que trabajan con tipos genéricos
- **Utility Functions**: Funciones de utilidad comunes y reutilizables

## 🔗 Navegación

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| [3.1.2 Overloads y Signatures](01-2-overloads-signatures.md) | **3.2 Funciones de Orden Superior** | [3.3 Métodos y This](03-metodos-this.md) |

### Callbacks con Tipos: La Base de la Programación Asíncrona

#### ¿Qué es un Callback y por qué tiparlo?

Un **callback** es una función que se pasa como argumento a otra función para ser ejecutada en un momento posterior. En JavaScript, los callbacks son fundamentales para el manejo de eventos, operaciones asíncronas y programación funcional.

**El problema sin tipos:**

```javascript
// JavaScript sin tipos - propenso a errores
function procesarDatos(datos, callback) {
  datos.forEach(callback); // ¿Qué recibe callback? ¿Qué retorna?
}
```

**La solución con TypeScript:**

```typescript
// TypeScript - contrato claro y verificable
type Callback<T> = (data: T) => void;
function procesarDatos<T>(datos: T[], callback: Callback<T>): void {
  datos.forEach(callback);
}
```

#### Callbacks Básicos: Fundamentos Type-Safe

```typescript
// Callback simple - define exactamente qué espera y qué hace
type Callback<T> = (data: T) => void;

function procesarDatos<T>(
  datos: T[],
  callback: Callback<T>
): void {
  datos.forEach(callback);
}

// Uso type-safe - TypeScript verifica que el callback sea compatible
procesarDatos([1, 2, 3], (num) => console.log(num * 2));        // ✅ num es number
procesarDatos(['a', 'b'], (str) => console.log(str.toUpperCase())); // ✅ str es string

// Callback con valor de retorno - para transformaciones
type Transformer<T, U> = (input: T) => U;

function mapear<T, U>(
  array: T[],
  transformer: Transformer<T, U>
): U[] {
  return array.map(transformer);
}

const numeros = [1, 2, 3];
const strings = mapear(numeros, (n) => n.toString());  // string[] - tipo inferido
const duplicados = mapear(numeros, (n) => n * 2);      // number[] - tipo inferido
```

#### Callbacks Avanzados: Manejo de Errores y Eventos

Los callbacks reales a menudo necesitan manejar múltiples parámetros, errores y diferentes tipos de eventos:

```typescript
// Event handlers tipados - específicos para cada tipo de evento
type EventHandler<T> = (event: T, target: HTMLElement) => void;

interface ClickEvent {
  type: 'click';
  x: number;
  y: number;
  timestamp: number;
}

interface KeyEvent {
  type: 'key';
  key: string;
  ctrlKey: boolean;
  altKey: boolean;
}

// Uso específico para cada tipo de evento
const handleClick: EventHandler<ClickEvent> = (event, target) => {
  console.log(`Click en (${event.x}, ${event.y}) en`, target);
};

const handleKey: EventHandler<KeyEvent> = (event, target) => {
  if (event.ctrlKey && event.key === 's') {
    console.log('Guardar archivo');
  }
};

// Callback con error handling - patrón Node.js
type AsyncCallback<T, E = Error> = (error: E | null, result?: T) => void;

function leerArchivo(
  path: string,
  callback: AsyncCallback<string>
): void {
  // Simulación de operación asíncrona
  setTimeout(() => {
    if (path.endsWith('.txt')) {
      callback(null, 'Contenido del archivo'); // Éxito: error es null
    } else {
      callback(new Error('Formato no soportado')); // Error: result es undefined
    }
  }, 1000);
}

// Uso con manejo de errores elegante
leerArchivo('datos.txt', (error, contenido) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('Contenido:', contenido); // TypeScript sabe que contenido existe
});
```

### Promises y Async/Await

#### Promises Tipadas

```typescript
// Promise básica
function obtenerUsuario(id: number): Promise<{ id: number; nombre: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, nombre: `Usuario ${id}` });
      } else {
        reject(new Error('ID inválido'));
      }
    }, 1000);
  });
}

// Promise con tipos más complejos
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      data,
      status: response.status,
      message: 'Success'
    };
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

// Uso con async/await
async function ejemploUso() {
  try {
    const usuario = await obtenerUsuario(1);
    console.log(usuario.nombre);
    
    const datos = await fetchData<{ posts: any[] }>('/api/posts');
    console.log(datos.data.posts.length);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

#### Promise Utilities

```typescript
// Promise.all tipado
async function cargarTodosDatos() {
  const [usuarios, posts, comentarios] = await Promise.all([
    fetchData<{ id: number; nombre: string }[]>('/api/usuarios'),
    fetchData<{ id: number; titulo: string }[]>('/api/posts'),
    fetchData<{ id: number; texto: string }[]>('/api/comentarios')
  ]);
  
  return {
    usuarios: usuarios.data,
    posts: posts.data,
    comentarios: comentarios.data
  };
}

// Promise con timeout
function conTimeout<T>(
  promise: Promise<T>,
  milliseconds: number
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), milliseconds)
    )
  ]);
}

// Retry function
async function reintentar<T>(
  fn: () => Promise<T>,
  intentos: number = 3
): Promise<T> {
  for (let i = 0; i < intentos; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === intentos - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  throw new Error('Máximo número de intentos alcanzado');
}
```

### Funciones Genéricas Básicas

#### Generics con Funciones

```typescript
// Función genérica simple
function identidad<T>(arg: T): T {
  return arg;
}

const numero = identidad(42); // number
const texto = identidad('hello'); // string

// Función genérica con restricciones
interface Longitud {
  length: number;
}

function logLongitud<T extends Longitud>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLongitud('hello'); // OK
logLongitud([1, 2, 3]); // OK
// logLongitud(123); // Error: number no tiene length

// Múltiples generics
function intercambiar<T, U>(tupla: [T, U]): [U, T] {
  return [tupla[1], tupla[0]];
}

const intercambiado = intercambiar(['hello', 42]); // [number, string]
```

#### Funciones de Array Genéricas

```typescript
// Filter tipado
function filtrar<T>(
  array: T[],
  predicado: (item: T) => boolean
): T[] {
  return array.filter(predicado);
}

// Find con tipo de retorno más específico
function encontrar<T>(
  array: T[],
  predicado: (item: T) => boolean
): T | undefined {
  return array.find(predicado);
}

// Reduce tipado
function reducir<T, U>(
  array: T[],
  fn: (acc: U, current: T, index: number) => U,
  inicial: U
): U {
  return array.reduce(fn, inicial);
}

// GroupBy genérico
function agruparPor<T, K extends string | number>(
  array: T[],
  selector: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const key = selector(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

// Ejemplo de uso
interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
}

const productos: Producto[] = [
  { id: 1, nombre: 'Laptop', categoria: 'tech', precio: 1000 },
  { id: 2, nombre: 'Mouse', categoria: 'tech', precio: 50 },
  { id: 3, nombre: 'Libro', categoria: 'edu', precio: 20 }
];

const porCategoria = agruparPor(productos, p => p.categoria);
// { tech: [Laptop, Mouse], edu: [Libro] }
```

### Utility Functions Comunes

#### Debounce y Throttle

```typescript
// Debounce tipado
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Throttle tipado
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Uso
const buscarDebounced = debounce((query: string) => {
  console.log('Buscando:', query);
}, 300);

const scrollThrottled = throttle((event: Event) => {
  console.log('Scroll event');
}, 100);
```

#### Memoización

```typescript
// Memoize genérico
function memoize<Args extends any[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const cache = new Map<string, Return>();
  
  return (...args: Args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Función costosa
const calcularFibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return calcularFibonacci(n - 1) + calcularFibonacci(n - 2);
});

// Pipe function
function pipe<T>(...functions: Array<(arg: T) => T>) {
  return (value: T): T => {
    return functions.reduce((acc, fn) => fn(acc), value);
  };
}

// Compose function
function compose<T>(...functions: Array<(arg: T) => T>) {
  return (value: T): T => {
    return functions.reduceRight((acc, fn) => fn(acc), value);
  };
}

// Uso de pipe y compose
const transformar = pipe(
  (str: string) => str.toLowerCase(),
  (str: string) => str.trim(),
  (str: string) => str.replace(/\s+/g, '-')
);

const resultado = transformar('  Hello World  '); // "hello-world"
```

## 💡 Conceptos Clave

1. **Type Safety en Callbacks**: Previene errores en funciones de orden superior
2. **Promise Types**: Manejo seguro de operaciones asíncronas
3. **Generic Functions**: Reutilización de código con tipos flexibles
4. **Utility Types**: `Parameters<T>`, `ReturnType<T>` para funciones avanzadas

## 🔍 Casos de Uso Comunes

- **Event Handling** en aplicaciones web
- **API calls** con manejo de errores tipado
- **Data transformation** pipelines
- **Performance optimization** con memoización y throttling

## ➡️ Siguiente Tema

Continúa con [3.3 Métodos y This](03-metodos-this.md) para dominar el contexto de ejecución en TypeScript.
