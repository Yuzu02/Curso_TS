# 🎯 Ejercicio 3.2.3: Utility Library

## 📋 Descripción

Desarrolla una librería de utilidades genéricas que implemente funciones de orden superior comunes (map, filter, reduce, etc.) con tipado avanzado y soporte para diferentes estructuras de datos.

## 🎯 Objetivos

- Implementar funciones genéricas de orden superior
- Crear utilidades para arrays, objetos y funciones
- Usar type inference y conditional types
- Implementar patterns funcionales avanzados

## 📊 Dificultad: 🔴 Avanzado

**Tiempo estimado:** 35 minutos

## 📝 Requisitos

### 1. Core Utility Types

```typescript
// Predicate functions
type Predicate<T> = (item: T) => boolean;
type AsyncPredicate<T> = (item: T) => Promise<boolean>;

// Transformation functions
type Mapper<T, R> = (item: T) => R;
type AsyncMapper<T, R> = (item: T) => Promise<R>;

// Reducer functions
type Reducer<T, R> = (accumulator: R, current: T, index: number) => R;
type AsyncReducer<T, R> = (accumulator: R, current: T, index: number) => Promise<R>;

// Comparator functions
type Comparator<T> = (a: T, b: T) => number;
type KeySelector<T, K> = (item: T) => K;

// Utility types for function composition
type Func<T, R> = (arg: T) => R;
type AsyncFunc<T, R> = (arg: T) => Promise<R>;
```

### 2. Array Utilities

```typescript
interface ArrayUtils {
  // Basic operations
  map<T, R>(array: T[], mapper: Mapper<T, R>): R[];
  filter<T>(array: T[], predicate: Predicate<T>): T[];
  reduce<T, R>(array: T[], reducer: Reducer<T, R>, initialValue: R): R;
  
  // Async operations
  mapAsync<T, R>(array: T[], mapper: AsyncMapper<T, R>): Promise<R[]>;
  filterAsync<T>(array: T[], predicate: AsyncPredicate<T>): Promise<T[]>;
  reduceAsync<T, R>(array: T[], reducer: AsyncReducer<T, R>, initialValue: R): Promise<R>;
  
  // Advanced operations
  flatMap<T, R>(array: T[], mapper: Mapper<T, R[]>): R[];
  partition<T>(array: T[], predicate: Predicate<T>): [T[], T[]];
  groupBy<T, K extends string | number | symbol>(
    array: T[], 
    keySelector: KeySelector<T, K>
  ): Record<K, T[]>;
  
  // Set operations
  unique<T>(array: T[]): T[];
  uniqueBy<T, K>(array: T[], keySelector: KeySelector<T, K>): T[];
  intersection<T>(arrays: T[][]): T[];
  difference<T>(array1: T[], array2: T[]): T[];
  
  // Sorting and ordering
  sortBy<T, K>(array: T[], keySelector: KeySelector<T, K>): T[];
  sortWith<T>(array: T[], comparator: Comparator<T>): T[];
  
  // Chunking and windowing
  chunk<T>(array: T[], size: number): T[][];
  window<T>(array: T[], size: number, step?: number): T[][];
  
  // Statistical operations
  sum(array: number[]): number;
  average(array: number[]): number;
  median(array: number[]): number;
  mode<T>(array: T[]): T[];
  
  // Utility checks
  isEmpty<T>(array: T[]): boolean;
  contains<T>(array: T[], item: T): boolean;
  containsBy<T, K>(array: T[], keySelector: KeySelector<T, K>, value: K): boolean;
}
```

### 3. Object Utilities

```typescript
interface ObjectUtils {
  // Object transformation
  mapValues<T, R>(obj: Record<string, T>, mapper: Mapper<T, R>): Record<string, R>;
  mapKeys<T>(obj: Record<string, T>, mapper: Mapper<string, string>): Record<string, T>;
  filterEntries<T>(obj: Record<string, T>, predicate: (key: string, value: T) => boolean): Record<string, T>;
  
  // Object manipulation
  pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
  omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
  merge<T extends Record<string, any>>(...objects: Partial<T>[]): T;
  deepMerge<T extends Record<string, any>>(...objects: Partial<T>[]): T;
  
  // Path operations
  get<T, P extends Path<T>>(obj: T, path: P): PathValue<T, P>;
  set<T, P extends Path<T>>(obj: T, path: P, value: PathValue<T, P>): T;
  has<T, P extends Path<T>>(obj: T, path: P): boolean;
  
  // Object inspection
  keys<T>(obj: T): Array<keyof T>;
  values<T>(obj: Record<string, T>): T[];
  entries<T>(obj: Record<string, T>): Array<[string, T]>;
  
  // Validation
  isEmpty(obj: object): boolean;
  isEqual<T>(obj1: T, obj2: T): boolean;
  deepEqual<T>(obj1: T, obj2: T): boolean;
  
  // Transformation
  invert<T extends Record<string, string | number>>(obj: T): Record<T[keyof T], keyof T>;
  freeze<T>(obj: T): Readonly<T>;
  clone<T>(obj: T): T;
  deepClone<T>(obj: T): T;
}

// Helper types for path operations
type Path<T> = T extends object ? {
  [K in keyof T]: K extends string
    ? T[K] extends object
      ? K | `${K}.${Path<T[K]>}`
      : K
    : never;
}[keyof T] : never;

type PathValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<T[K]>
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;
```

### 4. Function Utilities

```typescript
interface FunctionUtils {
  // Function composition
  compose<T>(...functions: Function[]): (arg: T) => any;
  pipe<T>(...functions: Function[]): (arg: T) => any;
  
  // Function modification
  curry<T extends any[], R>(fn: (...args: T) => R): Curried<T, R>;
  partial<T extends any[], R>(fn: (...args: T) => R, ...args: Partial<T>): PartialFunction<T, R>;
  
  // Timing control
  debounce<T extends any[]>(fn: (...args: T) => void, delay: number): (...args: T) => void;
  throttle<T extends any[]>(fn: (...args: T) => void, interval: number): (...args: T) => void;
  
  // Error handling
  attempt<T extends any[], R>(fn: (...args: T) => R): (...args: T) => R | Error;
  retry<T extends any[], R>(fn: (...args: T) => Promise<R>, maxAttempts: number): (...args: T) => Promise<R>;
  
  // Memoization
  memoize<T extends any[], R>(fn: (...args: T) => R): (...args: T) => R;
  memoizeAsync<T extends any[], R>(fn: (...args: T) => Promise<R>): (...args: T) => Promise<R>;
  
  // Function utilities
  once<T extends any[], R>(fn: (...args: T) => R): (...args: T) => R;
  negate<T extends any[]>(predicate: (...args: T) => boolean): (...args: T) => boolean;
  constant<T>(value: T): () => T;
  identity<T>(value: T): T;
}

// Helper types for function utilities
type Curried<T extends any[], R> = T extends [infer First, ...infer Rest]
  ? (arg: First) => Rest extends []
    ? R
    : Curried<Rest, R>
  : () => R;

type PartialFunction<T extends any[], R> = (...args: any[]) => R;
```

### 5. Async Utilities

```typescript
interface AsyncUtils {
  // Parallel processing
  parallel<T, R>(tasks: Array<() => Promise<T>>, concurrency?: number): Promise<T[]>;
  sequence<T>(tasks: Array<() => Promise<T>>): Promise<T[]>;
  
  // Timing utilities
  delay(ms: number): Promise<void>;
  timeout<T>(promise: Promise<T>, ms: number): Promise<T>;
  
  // Result handling
  allSettled<T>(promises: Promise<T>[]): Promise<SettledResult<T>[]>;
  race<T>(promises: Promise<T>[]): Promise<T>;
  
  // Flow control
  until<T>(condition: () => boolean | Promise<boolean>, interval?: number): Promise<void>;
  whilst<T>(condition: () => boolean | Promise<boolean>, task: () => Promise<T>): Promise<void>;
  
  // Error handling
  catchAll<T>(promises: Promise<T>[]): Promise<Array<T | Error>>;
  retryWithBackoff<T>(
    task: () => Promise<T>, 
    maxAttempts: number, 
    baseDelay: number
  ): Promise<T>;
}

interface SettledResult<T> {
  status: 'fulfilled' | 'rejected';
  value?: T;
  reason?: any;
}
```

### 6. Type Guards and Validation

```typescript
interface TypeUtils {
  // Type checking
  isString(value: any): value is string;
  isNumber(value: any): value is number;
  isBoolean(value: any): value is boolean;
  isArray<T>(value: any): value is T[];
  isObject(value: any): value is object;
  isFunction(value: any): value is Function;
  isPromise<T>(value: any): value is Promise<T>;
  
  // Advanced type checking
  isArrayOf<T>(value: any, guard: (item: any) => item is T): value is T[];
  isObjectWith<T>(value: any, schema: ObjectSchema<T>): value is T;
  
  // Validation
  validate<T>(value: any, validator: Validator<T>): ValidationResult<T>;
  validateAsync<T>(value: any, validator: AsyncValidator<T>): Promise<ValidationResult<T>>;
}

type ObjectSchema<T> = {
  [K in keyof T]: (value: any) => value is T[K];
};

type Validator<T> = (value: any) => value is T;
type AsyncValidator<T> = (value: any) => Promise<value is T>;

interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}
```

## 🧪 Casos de Prueba

### Caso 1: Array Operations

```typescript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const people = [
  { name: 'Alice', age: 30, city: 'New York' },
  { name: 'Bob', age: 25, city: 'Los Angeles' },
  { name: 'Charlie', age: 35, city: 'New York' },
];

// Basic operations
const doubled = ArrayUtils.map(numbers, x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

const evens = ArrayUtils.filter(numbers, x => x % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

const sum = ArrayUtils.reduce(numbers, (acc, curr) => acc + curr, 0);
console.log(sum); // 55

// Advanced operations
const [adults, minors] = ArrayUtils.partition(people, p => p.age >= 18);
console.log(adults.length); // 3

const byCity = ArrayUtils.groupBy(people, p => p.city);
console.log(byCity['New York'].length); // 2

const sortedByAge = ArrayUtils.sortBy(people, p => p.age);
console.log(sortedByAge[0].name); // 'Bob'

const chunks = ArrayUtils.chunk(numbers, 3);
console.log(chunks); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```

### Caso 2: Object Operations

```typescript
const user = {
  id: 1,
  profile: {
    name: 'John Doe',
    settings: {
      theme: 'dark',
      notifications: true
    }
  }
};

// Object transformation
const userWithUpperNames = ObjectUtils.mapValues(user.profile, value => 
  typeof value === 'string' ? value.toUpperCase() : value
);

// Path operations
const theme = ObjectUtils.get(user, 'profile.settings.theme');
console.log(theme); // 'dark'

const updatedUser = ObjectUtils.set(user, 'profile.settings.theme', 'light');
console.log(ObjectUtils.get(updatedUser, 'profile.settings.theme')); // 'light'

// Object manipulation
const userProfile = ObjectUtils.pick(user, ['id', 'profile']);
const userWithoutId = ObjectUtils.omit(user, ['id']);

// Deep operations
const clonedUser = ObjectUtils.deepClone(user);
const isEqual = ObjectUtils.deepEqual(user, clonedUser);
console.log(isEqual); // true
```

### Caso 3: Function Composition

```typescript
// Function composition
const addOne = (x: number) => x + 1;
const double = (x: number) => x * 2;
const square = (x: number) => x * x;

const composed = FunctionUtils.compose(square, double, addOne);
console.log(composed(3)); // ((3 + 1) * 2)² = 64

const piped = FunctionUtils.pipe(addOne, double, square);
console.log(piped(3)); // ((3 + 1) * 2)² = 64

// Currying
const add = (a: number, b: number, c: number) => a + b + c;
const curriedAdd = FunctionUtils.curry(add);
const add5 = curriedAdd(5);
const add5And3 = add5(3);
console.log(add5And3(2)); // 10

// Debouncing
const expensiveOperation = (value: string) => {
  console.log('Processing:', value);
};

const debouncedOperation = FunctionUtils.debounce(expensiveOperation, 1000);
debouncedOperation('a');
debouncedOperation('b');
debouncedOperation('c'); // Only this will execute after 1 second

// Memoization
const fibonacci = FunctionUtils.memoize((n: number): number => {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Fast due to memoization
```

### Caso 4: Async Operations

```typescript
// Parallel processing
const tasks = [
  () => fetch('/api/users').then(r => r.json()),
  () => fetch('/api/posts').then(r => r.json()),
  () => fetch('/api/comments').then(r => r.json()),
];

const results = await AsyncUtils.parallel(tasks, 2); // Max 2 concurrent
console.log('All data loaded:', results);

// Retry with backoff
const unreliableApi = async () => {
  if (Math.random() < 0.7) throw new Error('API Error');
  return 'Success';
};

const result = await AsyncUtils.retryWithBackoff(unreliableApi, 3, 1000);
console.log(result); // 'Success' after potential retries

// Flow control
await AsyncUtils.until(() => document.readyState === 'complete');
console.log('Page fully loaded');

// Promise utilities
const promises = [
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success')
];

const settled = await AsyncUtils.allSettled(promises);
console.log(settled);
// [
//   { status: 'fulfilled', value: 'success' },
//   { status: 'rejected', reason: 'error' },
//   { status: 'fulfilled', value: 'another success' }
// ]
```

### Caso 5: Type Validation

```typescript
// Type guards
const mixedArray: any[] = [1, 'hello', true, [1, 2, 3], { name: 'John' }];

const strings = mixedArray.filter(TypeUtils.isString);
console.log(strings); // ['hello'] - typed as string[]

const numbers = mixedArray.filter(TypeUtils.isNumber);
console.log(numbers); // [1] - typed as number[]

// Advanced validation
const isUser = (value: any): value is User => {
  return TypeUtils.isObject(value) &&
    TypeUtils.isString(value.name) &&
    TypeUtils.isNumber(value.age);
};

const userData: any = { name: 'John', age: 30 };
const validation = TypeUtils.validate(userData, isUser);

if (validation.success) {
  console.log('Valid user:', validation.data?.name); // Type-safe access
}

// Schema validation
const userSchema = {
  name: TypeUtils.isString,
  age: TypeUtils.isNumber,
  email: TypeUtils.isString
};

const isValidUser = TypeUtils.isObjectWith(userData, userSchema);
if (isValidUser) {
  console.log(userData.name); // Type-safe
}
```

### Caso 6: Complex Composition

```typescript
// Complex data processing pipeline
const rawData = [
  { id: 1, name: 'Product A', price: 100, category: 'Electronics' },
  { id: 2, name: 'Product B', price: 50, category: 'Books' },
  { id: 3, name: 'Product C', price: 200, category: 'Electronics' },
  { id: 4, name: 'Product D', price: 30, category: 'Books' },
];

// Functional pipeline
const processData = FunctionUtils.pipe(
  (data: typeof rawData) => ArrayUtils.filter(data, p => p.price > 40),
  (data) => ArrayUtils.groupBy(data, p => p.category),
  (grouped) => ObjectUtils.mapValues(grouped, products => ({
    count: products.length,
    averagePrice: ArrayUtils.average(products.map(p => p.price)),
    products: ArrayUtils.sortBy(products, p => p.price)
  }))
);

const result = processData(rawData);
console.log(result);
// {
//   Electronics: { count: 2, averagePrice: 150, products: [...] },
//   Books: { count: 1, averagePrice: 50, products: [...] }
// }
```

## ✅ Criterios de Evaluación

- [ ] **Generic functions**: Implementa funciones genéricas correctamente
- [ ] **Type safety**: Mantiene type safety en todas las operaciones
- [ ] **Function composition**: Compose y pipe funcionan correctamente
- [ ] **Async support**: Operaciones asíncronas implementadas
- [ ] **Performance**: Operaciones eficientes (memoization, lazy evaluation)
- [ ] **Error handling**: Manejo robusto de errores
- [ ] **Type inference**: TypeScript infiere tipos correctamente
- [ ] **Immutability**: Operaciones no mutan datos originales

## 🎁 Bonus

- Implementa lazy evaluation para operaciones en cadena
- Agrega soporte para streams y iterators
- Crea un sistema de plugins para extender utilidades
- Implementa benchmarking automático

## 💡 Pistas

1. Usa conditional types para type inference avanzada
2. Los generic constraints mejoran type safety
3. Template literal types para path operations
4. Usa `as const` para literal types
5. Implementa iterators para lazy evaluation

## 🔗 Conceptos Clave

- Generic functions
- Higher-order functions
- Function composition
- Type inference
- Conditional types
- Template literal types
- Immutability
- Lazy evaluation

---

**Anterior:** [API Client](./02-API_Client.md) | **Siguiente:** [State Manager](./04-State_Manager.md)
