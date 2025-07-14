# 🎯 Ejercicio 3.2.2: API Client

## 📋 Descripción

Crear un cliente HTTP type-safe que maneje diferentes tipos de respuesta con generics, implemente retry logic y timeout, proporcione error handling robusto y use callbacks y Promises de forma efectiva.

## 🎯 Objetivos

- Manejar diferentes tipos de respuesta con generics
- Implementar retry logic y timeout
- Proporcionar error handling robusto
- Usar callbacks y Promises de forma efectiva

## 📊 Dificultad: 🟡 Intermedio

**Tiempo estimado:** 30 minutos

## 📝 Requisitos

### 1. Cliente Base

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

interface RequestConfig {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

class ApiClient {
  constructor(private baseUrl: string, private defaultConfig?: RequestConfig);
  
  // Métodos principales
  get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>>;
  post<T, U>(endpoint: string, data: U, config?: RequestConfig): Promise<ApiResponse<T>>;
  put<T, U>(endpoint: string, data: U, config?: RequestConfig): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>>;
}
```

### 2. Funciones de Orden Superior

```typescript
// Interceptors
type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
type ResponseInterceptor<T> = (response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>;

// Retry function
function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number,
  delay?: number
): Promise<T>;

// Timeout wrapper
function withTimeout<T>(
  promise: Promise<T>,
  milliseconds: number
): Promise<T>;

// Batch requests
function batchRequests<T>(
  requests: Array<() => Promise<T>>,
  concurrency?: number
): Promise<T[]>;
```

## 💡 Estructura Base para Implementar

```typescript
// TODO: Implementa los tipos de error
abstract class ApiError extends Error {
  // TODO: Define propiedades abstractas code y statusCode
}

class NetworkError extends ApiError {
  // TODO: Implementa error de red
}

class TimeoutError extends ApiError {
  // TODO: Implementa error de timeout
}

class HttpError extends ApiError {
  // TODO: Implementa error HTTP con código de estado
}

// TODO: Implementa el ApiClient
class ApiClient {
  constructor(private baseUrl: string, private defaultConfig?: RequestConfig) {
    // TODO: Inicializar configuración por defecto
  }
  
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    // TODO: Implementar GET request con manejo de errores
    // TODO: Aplicar timeout si está configurado
    // TODO: Implementar retry logic
  }
  
  async post<T, U>(endpoint: string, data: U, config?: RequestConfig): Promise<ApiResponse<T>> {
    // TODO: Implementar POST request
  }
  
  // TODO: Implementar put y delete siguiendo el mismo patrón
}

// TODO: Implementa funciones de utilidad
function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number,
  delay?: number
): Promise<T> {
  // TODO: Implementar lógica de retry con backoff exponencial
}

function withTimeout<T>(promise: Promise<T>, milliseconds: number): Promise<T> {
  // TODO: Implementar wrapper de timeout
}

function batchRequests<T>(
  requests: Array<() => Promise<T>>,
  concurrency?: number
): Promise<T[]> {
  // TODO: Implementar procesamiento en lotes con concurrencia limitada
}
```

## 🧪 Casos de Prueba

### Caso 1: Request básico tipado

```typescript
// Ejemplo de uso esperado
const client = new ApiClient('https://api.example.com');

interface User {
  id: number;
  name: string;
  email: string;
}

const userResponse = await client.get<User>('/users/1');
console.log(userResponse.data.name); // Type-safe access
```

### Caso 2: POST request con datos

```typescript
// Ejemplo con POST request
interface CreateUserData {
  name: string;
  email: string;
}

const newUser = await client.post<User, CreateUserData>('/users', {
  name: 'Juan',
  email: 'juan@email.com'
});
```

### Caso 3: Manejo de errores y retry

```typescript
// Ejemplo de error handling
try {
  const response = await client.get<User>('/users/999');
} catch (error) {
  if (error instanceof HttpError) {
    console.log(`HTTP Error: ${error.statusCode}`);
  } else if (error instanceof TimeoutError) {
    console.log('Request timed out');
  }
}

// Ejemplo de retry con backoff
const data = await withRetry(
  () => client.get<User[]>('/users'),
  3, // max retries
  1000 // initial delay
);
```

## ✅ Criterios de Evaluación

- [ ] **Generic Functions**: Uso correcto de generics para type safety
- [ ] **Error Hierarchy**: Implementación correcta de jerarquía de errores
- [ ] **Promise Composition**: Manejo apropiado de operaciones asíncronas
- [ ] **Retry Logic**: Implementación de retry con backoff exponencial
- [ ] **Timeout Handling**: Manejo correcto de timeouts
- [ ] **Higher-Order Functions**: Uso efectivo de funciones de orden superior

## 🎓 Puntos de Aprendizaje

1. **Generic Constraints**: Tipos flexibles pero seguros
2. **Promise Composition**: Combinar operaciones asíncronas
3. **Error Hierarchy**: Jerarquía de errores tipada
4. **Functional Patterns**: Higher-order functions para reusabilidad
5. **Resource Management**: Timeouts y cancelación de requests

## 📚 Recursos

- [Promises](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#promises)
- [Generic Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html#generic-functions)
- [Error Handling](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing)

## 🗂️ Archivos a Crear

```text
02-API_Client/
├── solution.ts          # Tu implementación aquí
├── types.ts            # Tipos e interfaces
├── errors.ts           # Jerarquía de errores
└── tests.ts            # Casos de prueba (opcional)
```

---

## 🧭 Navegación

[⬅️ Ejercicio Anterior](01-Event_System.md) | [📚 Índice](../README.md) | [➡️ Ejercicio Siguiente](03-Cache_Manager.md)

---

💡 **Tip**: Comienza implementando el cliente básico, luego añade las funcionalidades avanzadas como retry y batch processing.
