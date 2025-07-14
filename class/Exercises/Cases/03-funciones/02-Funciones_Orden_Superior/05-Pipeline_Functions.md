# 🎯 Ejercicio 3.2.5: Pipeline Functions

## 📋 Descripción

Desarrolla un sistema de pipeline para transformación de datos que utilice función composition, lazy evaluation y type inference para crear flujos de procesamiento eficientes y tipados.

## 🎯 Objetivos

- Implementar function composition con pipelines
- Crear lazy evaluation para optimización
- Usar type inference avanzada
- Manejar transformaciones de datos complejas

## 📊 Dificultad: 🟡 Intermedio

**Tiempo estimado:** 25 minutos

## 📝 Requisitos

### 1. Core Pipeline Types

```typescript
// Pipeline step function
type PipelineStep<TInput, TOutput> = (input: TInput) => TOutput;
type AsyncPipelineStep<TInput, TOutput> = (input: TInput) => Promise<TOutput>;

// Pipeline builder
interface Pipeline<TInput, TOutput = TInput> {
  // Transformation steps
  map<TResult>(fn: (input: TOutput) => TResult): Pipeline<TInput, TResult>;
  filter(predicate: (input: TOutput) => boolean): Pipeline<TInput, TOutput>;
  flatMap<TResult>(fn: (input: TOutput) => TResult[]): Pipeline<TInput, TResult>;
  
  // Async transformations
  mapAsync<TResult>(fn: (input: TOutput) => Promise<TResult>): AsyncPipeline<TInput, TResult>;
  filterAsync(predicate: (input: TOutput) => Promise<boolean>): AsyncPipeline<TInput, TOutput>;
  
  // Conditional operations
  when(condition: (input: TOutput) => boolean, pipeline: Pipeline<TOutput, TOutput>): Pipeline<TInput, TOutput>;
  unless(condition: (input: TOutput) => boolean, pipeline: Pipeline<TOutput, TOutput>): Pipeline<TInput, TOutput>;
  
  // Grouping and aggregation
  groupBy<TKey extends string | number | symbol>(
    keySelector: (input: TOutput) => TKey
  ): Pipeline<TInput, Record<TKey, TOutput[]>>;
  
  reduce<TResult>(
    reducer: (accumulator: TResult, current: TOutput, index: number) => TResult,
    initialValue: TResult
  ): Pipeline<TInput, TResult>;
  
  // Utility operations
  tap(fn: (input: TOutput) => void): Pipeline<TInput, TOutput>;
  catch<TFallback>(handler: (error: Error, input: TInput) => TFallback): Pipeline<TInput, TOutput | TFallback>;
  
  // Execution
  execute(input: TInput): TOutput;
  executeAll(inputs: TInput[]): TOutput[];
  
  // Composition
  pipe<TResult>(pipeline: Pipeline<TOutput, TResult>): Pipeline<TInput, TResult>;
  compose<TResult>(fn: PipelineStep<TOutput, TResult>): Pipeline<TInput, TResult>;
  
  // Introspection
  steps(): PipelineStepInfo[];
  toString(): string;
}

// Async pipeline
interface AsyncPipeline<TInput, TOutput = TInput> {
  // All synchronous methods return AsyncPipeline
  map<TResult>(fn: (input: TOutput) => TResult): AsyncPipeline<TInput, TResult>;
  mapAsync<TResult>(fn: (input: TOutput) => Promise<TResult>): AsyncPipeline<TInput, TResult>;
  filter(predicate: (input: TOutput) => boolean): AsyncPipeline<TInput, TOutput>;
  filterAsync(predicate: (input: TOutput) => Promise<boolean>): AsyncPipeline<TInput, TOutput>;
  
  // Async-specific operations
  parallel(concurrency?: number): AsyncPipeline<TInput, TOutput>;
  sequential(): AsyncPipeline<TInput, TOutput>;
  batch(size: number): AsyncPipeline<TInput, TOutput[]>;
  
  // Execution
  execute(input: TInput): Promise<TOutput>;
  executeAll(inputs: TInput[]): Promise<TOutput[]>;
  
  // Convert to sync (if possible)
  toSync(): Pipeline<TInput, TOutput>;
}
```

### 2. Pipeline Factory

```typescript
interface PipelineFactory {
  // Create pipelines
  create<T>(): Pipeline<T, T>;
  from<T>(step: PipelineStep<T, any>): Pipeline<T, ReturnType<typeof step>>;
  fromAsync<T>(step: AsyncPipelineStep<T, any>): AsyncPipeline<T, Awaited<ReturnType<typeof step>>>;
  
  // Pre-built pipelines
  identity<T>(): Pipeline<T, T>;
  constant<T, R>(value: R): Pipeline<T, R>;
  
  // Utility pipelines
  validate<T>(validator: (input: T) => boolean, error?: string): Pipeline<T, T>;
  transform<T, R>(transformer: (input: T) => R): Pipeline<T, R>;
  
  // Combinators
  merge<T>(...pipelines: Pipeline<T, any>[]): Pipeline<T, any[]>;
  race<T, R>(...pipelines: AsyncPipeline<T, R>[]): AsyncPipeline<T, R>;
  all<T, R>(...pipelines: AsyncPipeline<T, R>[]): AsyncPipeline<T, R[]>;
}

// Step information for introspection
interface PipelineStepInfo {
  type: 'map' | 'filter' | 'flatMap' | 'reduce' | 'tap' | 'catch' | 'custom';
  name?: string;
  async: boolean;
  index: number;
}
```

### 3. Advanced Pipeline Features

```typescript
// Lazy evaluation
interface LazyPipeline<TInput, TOutput = TInput> extends Pipeline<TInput, TOutput> {
  // Lazy execution - returns iterator
  lazy(input: TInput): Iterator<TOutput>;
  lazyAll(inputs: TInput[]): Iterator<TOutput>;
  
  // Stream processing
  stream(inputs: Iterable<TInput>): AsyncIterable<TOutput>;
  
  // Caching
  cache(keyFn?: (input: TInput) => string): LazyPipeline<TInput, TOutput>;
  memoize(): LazyPipeline<TInput, TOutput>;
  
  // Optimization
  optimize(): LazyPipeline<TInput, TOutput>;
  compile(): CompiledPipeline<TInput, TOutput>;
}

// Compiled pipeline for maximum performance
interface CompiledPipeline<TInput, TOutput> {
  execute(input: TInput): TOutput;
  executeAll(inputs: TInput[]): TOutput[];
  getCode(): string;
  getBytecode(): Uint8Array;
}

// Pipeline with branching
interface BranchingPipeline<TInput, TOutput = TInput> extends Pipeline<TInput, TOutput> {
  branch<TBranch>(
    condition: (input: TOutput) => boolean,
    truePipeline: Pipeline<TOutput, TBranch>,
    falsePipeline?: Pipeline<TOutput, TBranch>
  ): Pipeline<TInput, TBranch>;
  
  switch<TKey extends string | number, TResult>(
    keySelector: (input: TOutput) => TKey,
    branches: Record<TKey, Pipeline<TOutput, TResult>>,
    defaultBranch?: Pipeline<TOutput, TResult>
  ): Pipeline<TInput, TResult>;
}
```

### 4. Data Processing Pipelines

```typescript
// Collection processing
interface CollectionPipeline<T> extends Pipeline<T[], T[]> {
  sort(compareFn?: (a: T, b: T) => number): CollectionPipeline<T>;
  sortBy<K>(keySelector: (item: T) => K): CollectionPipeline<T>;
  
  unique(compareFn?: (a: T, b: T) => boolean): CollectionPipeline<T>;
  uniqueBy<K>(keySelector: (item: T) => K): CollectionPipeline<T>;
  
  take(count: number): CollectionPipeline<T>;
  skip(count: number): CollectionPipeline<T>;
  
  chunk(size: number): Pipeline<T[], T[][]>;
  flatten(): Pipeline<T[], any>;
  
  partition(predicate: (item: T) => boolean): Pipeline<T[], [T[], T[]]>;
  groupBy<K extends string | number | symbol>(
    keySelector: (item: T) => K
  ): Pipeline<T[], Record<K, T[]>>;
}

// String processing pipeline
interface StringPipeline extends Pipeline<string, string> {
  trim(): StringPipeline;
  toLowerCase(): StringPipeline;
  toUpperCase(): StringPipeline;
  replace(searchValue: string | RegExp, replaceValue: string): StringPipeline;
  split(separator: string | RegExp): Pipeline<string, string[]>;
  match(regexp: RegExp): Pipeline<string, RegExpMatchArray | null>;
  
  // Validation
  isEmail(): Pipeline<string, boolean>;
  isUrl(): Pipeline<string, boolean>;
  matches(pattern: RegExp): Pipeline<string, boolean>;
  
  // Sanitization
  sanitize(): StringPipeline;
  escape(): StringPipeline;
  slugify(): StringPipeline;
}

// Number processing pipeline
interface NumberPipeline extends Pipeline<number, number> {
  round(digits?: number): NumberPipeline;
  floor(): NumberPipeline;
  ceil(): NumberPipeline;
  abs(): NumberPipeline;
  
  clamp(min: number, max: number): NumberPipeline;
  scale(factor: number): NumberPipeline;
  
  // Format
  format(options?: Intl.NumberFormatOptions): Pipeline<number, string>;
  toCurrency(currency: string): Pipeline<number, string>;
  toPercentage(): Pipeline<number, string>;
}
```

### 5. Specialized Pipelines

```typescript
// HTTP request pipeline
interface HttpPipeline<TResponse = any> extends AsyncPipeline<RequestConfig, TResponse> {
  // Request transformation
  baseUrl(url: string): HttpPipeline<TResponse>;
  headers(headers: Record<string, string>): HttpPipeline<TResponse>;
  query(params: Record<string, any>): HttpPipeline<TResponse>;
  body<TBody>(data: TBody): HttpPipeline<TResponse>;
  
  // HTTP methods
  get(): HttpPipeline<TResponse>;
  post<TBody>(data?: TBody): HttpPipeline<TResponse>;
  put<TBody>(data?: TBody): HttpPipeline<TResponse>;
  delete(): HttpPipeline<TResponse>;
  
  // Response handling
  json<T>(): HttpPipeline<T>;
  text(): HttpPipeline<string>;
  blob(): HttpPipeline<Blob>;
  
  // Error handling
  retry(maxAttempts: number, delay?: number): HttpPipeline<TResponse>;
  timeout(ms: number): HttpPipeline<TResponse>;
  
  // Caching
  cache(ttl?: number): HttpPipeline<TResponse>;
}

interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  query?: Record<string, any>;
}

// File processing pipeline
interface FilePipeline extends AsyncPipeline<File, any> {
  // Read operations
  readAsText(encoding?: string): AsyncPipeline<File, string>;
  readAsDataURL(): AsyncPipeline<File, string>;
  readAsArrayBuffer(): AsyncPipeline<File, ArrayBuffer>;
  
  // Validation
  validateSize(maxSize: number): AsyncPipeline<File, File>;
  validateType(allowedTypes: string[]): AsyncPipeline<File, File>;
  
  // Processing
  compress(quality?: number): AsyncPipeline<File, File>;
  resize(width: number, height: number): AsyncPipeline<File, File>;
  
  // Upload
  upload(url: string, options?: UploadOptions): AsyncPipeline<File, UploadResult>;
}

interface UploadOptions {
  method?: string;
  headers?: Record<string, string>;
  onProgress?: (progress: number) => void;
}

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}
```

## 🧪 Casos de Prueba

### Caso 1: Basic Pipeline

```typescript
const pipeline = PipelineFactory
  .create<number>()
  .map(x => x * 2)
  .filter(x => x > 10)
  .map(x => x.toString())
  .map(s => `Result: ${s}`);

// Execute pipeline
const result1 = pipeline.execute(3); // "Result: 6" (filtered out)
const result2 = pipeline.execute(8); // "Result: 16"

// Execute multiple
const results = pipeline.executeAll([1, 5, 10, 15]); 
console.log(results); // ["Result: 10", "Result: 20", "Result: 30"]

// Inspect pipeline
console.log(pipeline.steps());
// [
//   { type: 'map', async: false, index: 0 },
//   { type: 'filter', async: false, index: 1 },
//   { type: 'map', async: false, index: 2 },
//   { type: 'map', async: false, index: 3 }
// ]
```

### Caso 2: Async Pipeline

```typescript
const asyncPipeline = PipelineFactory
  .create<string>()
  .mapAsync(async url => {
    const response = await fetch(url);
    return response.json();
  })
  .map(data => data.results)
  .filterAsync(async results => results.length > 0)
  .map(results => results.slice(0, 10));

// Execute async pipeline
const data = await asyncPipeline.execute('https://api.example.com/data');
console.log(data);

// Execute with concurrency control
const parallelPipeline = asyncPipeline.parallel(3);
const allData = await parallelPipeline.executeAll([
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
]);
```

### Caso 3: Data Processing

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 30, department: 'Engineering' },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 25, department: 'Marketing' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35, department: 'Engineering' },
];

// Complex data processing pipeline
const userProcessingPipeline = PipelineFactory
  .create<User[]>()
  .filter(users => users.length > 0)
  .map(users => users.filter(u => u.age >= 25))
  .map(users => users.sort((a, b) => a.age - b.age))
  .groupBy(users => users[0].department)
  .map(grouped => Object.entries(grouped).map(([dept, users]) => ({
    department: dept,
    userCount: users.length,
    averageAge: users.reduce((sum, u) => sum + u.age, 0) / users.length,
    users: users.map(u => ({ id: u.id, name: u.name }))
  })));

const summary = userProcessingPipeline.execute(users);
console.log(summary);
```

### Caso 4: Branching Pipeline

```typescript
const numberProcessor = PipelineFactory
  .create<number>()
  .branch(
    x => x > 0,
    // Positive numbers
    PipelineFactory.create<number>()
      .map(x => Math.sqrt(x))
      .map(x => `Positive: ${x.toFixed(2)}`),
    // Negative numbers
    PipelineFactory.create<number>()
      .map(x => Math.abs(x))
      .map(x => x * x)
      .map(x => `Negative squared: ${x}`)
  );

console.log(numberProcessor.execute(16));  // "Positive: 4.00"
console.log(numberProcessor.execute(-3));  // "Negative squared: 9"

// Switch-based branching
const statusProcessor = PipelineFactory
  .create<{ status: string; data: any }>()
  .switch(
    obj => obj.status,
    {
      'success': PipelineFactory.create<any>().map(obj => `✅ ${obj.data}`),
      'error': PipelineFactory.create<any>().map(obj => `❌ Error: ${obj.data}`),
      'warning': PipelineFactory.create<any>().map(obj => `⚠️ Warning: ${obj.data}`)
    },
    PipelineFactory.create<any>().map(obj => `❓ Unknown: ${obj.data}`)
  );
```

### Caso 5: String Processing

```typescript
const textProcessor: StringPipeline = PipelineFactory
  .create<string>()
  .trim()
  .toLowerCase()
  .replace(/[^\w\s-]/g, '') // Remove special chars
  .replace(/\s+/g, '-')     // Replace spaces with dashes
  .replace(/-+/g, '-')      // Remove multiple dashes
  .replace(/^-|-$/g, '');   // Remove leading/trailing dashes

const slug = textProcessor.execute('  Hello, World! This is a Test  ');
console.log(slug); // "hello-world-this-is-a-test"

// Email validation pipeline
const emailValidator = PipelineFactory
  .create<string>()
  .trim()
  .toLowerCase()
  .isEmail()
  .when(
    isValid => !isValid,
    PipelineFactory.create<boolean>().map(() => { throw new Error('Invalid email') })
  );

try {
  emailValidator.execute('user@example.com'); // ✅
  emailValidator.execute('invalid-email');     // ❌ throws error
} catch (error) {
  console.log(error.message);
}
```

### Caso 6: HTTP Pipeline

```typescript
// API client with pipeline
const apiPipeline = PipelineFactory
  .create<RequestConfig>()
  .baseUrl('https://jsonplaceholder.typicode.com')
  .headers({ 'Content-Type': 'application/json' })
  .timeout(5000)
  .retry(3, 1000)
  .get()
  .json<any>()
  .catch((error, request) => {
    console.error('API Error:', error);
    return { error: error.message, request };
  });

// Fetch user data
const userData = await apiPipeline.execute({ url: '/users/1' });
console.log(userData);

// Batch requests
const userIds = [1, 2, 3, 4, 5];
const userRequests = userIds.map(id => ({ url: `/users/${id}` }));
const allUsers = await apiPipeline.executeAll(userRequests);

// File upload pipeline
const fileUploadPipeline = PipelineFactory
  .create<File>()
  .validateSize(10 * 1024 * 1024) // 10MB max
  .validateType(['image/jpeg', 'image/png'])
  .compress(0.8)
  .upload('/api/upload', {
    onProgress: (progress) => console.log(`Upload: ${progress}%`)
  });

const fileInput = document.getElementById('file') as HTMLInputElement;
const file = fileInput.files?.[0];

if (file) {
  try {
    const result = await fileUploadPipeline.execute(file);
    console.log('Upload successful:', result.url);
  } catch (error) {
    console.error('Upload failed:', error.message);
  }
}
```

### Caso 7: Lazy Evaluation

```typescript
// Lazy pipeline for large datasets
const lazyPipeline = PipelineFactory
  .create<number>()
  .map(x => {
    console.log(`Processing: ${x}`);
    return x * 2;
  })
  .filter(x => x > 10)
  .take(5)
  .lazy(Array.from({ length: 1000000 }, (_, i) => i));

// Only processes items as needed
const iterator = lazyPipeline.lazy(0);
for (const result of iterator) {
  console.log('Result:', result);
  // Breaks early, only processes what's needed
}

// Stream processing
const stream = lazyPipeline.stream(function* () {
  for (let i = 0; i < 1000000; i++) {
    yield i;
  }
}());

for await (const result of stream) {
  console.log('Streamed result:', result);
}
```

## ✅ Criterios de Evaluación

- [ ] **Function composition**: Pipeline composition funciona correctamente
- [ ] **Type inference**: Tipos se infieren automáticamente
- [ ] **Lazy evaluation**: Evaluación lazy implementada
- [ ] **Async support**: Pipelines asíncronos funcionan
- [ ] **Error handling**: Manejo de errores robusto
- [ ] **Performance**: Optimizaciones aplicadas
- [ ] **Branching**: Pipelines condicionales funcionan
- [ ] **Introspection**: Información de steps disponible

## 🎁 Bonus

- Implementa pipeline visualization y debugging
- Agrega compilación a JavaScript optimizado
- Crea DSL para definir pipelines declarativamente
- Implementa pipeline caching y memoization inteligente

## 💡 Pistas

1. Usa function composition: `f(g(h(x)))`
2. Los iterators permiten lazy evaluation
3. Type inference con `ReturnType<T>`
4. Los generators son útiles para streams
5. Memoization mejora performance en pipelines repetitivos

## 🔗 Conceptos Clave

- Function composition
- Lazy evaluation
- Type inference
- Iterator pattern
- Stream processing
- Pipeline pattern
- Memoization
- Generator functions

---

**Anterior:** [State Manager](./04-State_Manager.md) | **Siguiente:** [Component System](../03-Metodos_This/01-Component_System.md)
