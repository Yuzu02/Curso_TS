# 🎯 Ejercicio 3.1.6: Logger Avanzado

## 📋 Descripción

Crea un sistema de logging avanzado que utilice index signatures, template literal types y overloads para proporcionar una API flexible y tipada para diferentes niveles de logging y formatos.

## 🎯 Objetivos

- Implementar index signatures para configuración flexible
- Usar template literal types para formateo tipado
- Crear overloads para diferentes tipos de logging
- Manejar contexto y metadatos de forma tipada

## 📊 Dificultad: 🟡 Intermedio

**Tiempo estimado:** 25 minutos

## 📝 Requisitos

### 1. Tipos Base del Logger

```typescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  context?: string;
  metadata?: Record<string, any>;
  stack?: string;
}

interface LoggerConfig {
  level: LogLevel;
  format: 'json' | 'text' | 'structured';
  outputs: LogOutput[];
  metadata?: Record<string, any>;
  // Index signature para configuraciones extendidas
  [key: string]: any;
}

interface LogOutput {
  type: 'console' | 'file' | 'http' | 'database';
  config: OutputConfig;
}

// Index signature para configuraciones de salida
interface OutputConfig {
  [key: string]: any;
}
```

### 2. Template Literal Types

```typescript
// Template literal types para formateo
type LogTemplate<T extends string> = `[${T}] ${string}`;
type TimestampedLog<T extends string> = `${string} | ${LogTemplate<T>}`;
type ContextualLog<C extends string, T extends string> = `${C}: ${LogTemplate<T>}`;

// Formatters con template literals
type JsonFormat = '{"timestamp":"${string}","level":"${LogLevel}","message":"${string}"}';
type TextFormat = '${string} [${LogLevel}] ${string}';
type StructuredFormat = '${string} | ${LogLevel} | ${string} | ${string}';

// Helper types para interpolación
type InterpolateVars<T extends string> = T extends `${infer Before}{${infer Variable}}${infer After}`
  ? `${Before}${string}${InterpolateVars<After>}`
  : T;
```

### 3. Logger Interface con Overloads

```typescript
interface Logger {
  // Overloads básicos por nivel
  debug(message: string): void;
  debug(message: string, metadata: Record<string, any>): void;
  debug(template: TemplateStringsArray, ...args: any[]): void;

  info(message: string): void;
  info(message: string, metadata: Record<string, any>): void;
  info(template: TemplateStringsArray, ...args: any[]): void;

  warn(message: string): void;
  warn(message: string, metadata: Record<string, any>): void;
  warn(template: TemplateStringsArray, ...args: any[]): void;

  error(message: string): void;
  error(message: string, error: Error): void;
  error(message: string, metadata: Record<string, any>): void;
  error(error: Error): void;

  fatal(message: string): void;
  fatal(message: string, error: Error): void;
  fatal(error: Error): void;

  // Métodos de contexto
  child(context: string): Logger;
  child(metadata: Record<string, any>): Logger;
  child(context: string, metadata: Record<string, any>): Logger;

  // Métodos de configuración con index signatures
  configure(config: Partial<LoggerConfig>): void;
  setLevel(level: LogLevel): void;
  addOutput(output: LogOutput): void;
  setMetadata(key: string, value: any): void;
  setMetadata(metadata: Record<string, any>): void;
}
```

### 4. Advanced Features

```typescript
// Structured logging con index signatures
interface StructuredLogger extends Logger {
  // Index signature para métodos dinámicos
  [K: `log${Capitalize<LogLevel>}`]: (entry: StructuredLogEntry) => void;
  
  // Eventos estructurados
  event(name: string, data: EventData): void;
  metric(name: string, value: number, unit?: string): void;
  trace(operation: string, data?: TraceData): void;
  audit(action: string, user: string, resource: string): void;
}

interface StructuredLogEntry {
  message: string;
  fields: Record<string, any>;
  tags?: string[];
  correlationId?: string;
}

interface EventData {
  [key: string]: any;
  source?: string;
  userId?: string;
  sessionId?: string;
}

interface TraceData {
  [key: string]: any;
  duration?: number;
  success?: boolean;
  errorCode?: string;
}

// Query interface para logs
interface LogQuery {
  level?: LogLevel | LogLevel[];
  context?: string;
  timeRange?: {
    start: Date;
    end: Date;
  };
  metadata?: Record<string, any>;
  // Index signature para filtros personalizados
  [filter: string]: any;
}
```

### 5. Formatter System

```typescript
interface LogFormatter {
  format(entry: LogEntry): string;
  parse(log: string): LogEntry | null;
}

interface FormatterFactory {
  json(): LogFormatter;
  text(template?: string): LogFormatter;
  structured(separator?: string): LogFormatter;
  custom<T extends Record<string, any>>(config: T): LogFormatter;
}

// Template-based formatter
interface TemplateFormatter extends LogFormatter {
  setTemplate<T extends string>(template: T): void;
  interpolate<T extends string>(template: T, data: Record<string, any>): InterpolateVars<T>;
}
```

## 🧪 Casos de Prueba

### Caso 1: Logger Básico

```typescript
const logger: Logger = new AdvancedLogger({
  level: 'info',
  format: 'text',
  outputs: [
    { type: 'console', config: { colors: true } }
  ]
});

// Logging básico
logger.info('Application started');
logger.warn('This is a warning');
logger.error('Something went wrong');

// Con metadata
logger.info('User login', { userId: '123', ip: '192.168.1.1' });
logger.error('Database error', { query: 'SELECT * FROM users', error: 'Connection timeout' });

// Template literals
logger.debug`Processing ${100} records in ${5.2} seconds`;
logger.info`User ${userId} performed ${action} on ${resource}`;
```

### Caso 2: Context y Child Loggers

```typescript
// Logger con contexto
const apiLogger = logger.child('API');
apiLogger.info('Request received'); // Output: [API] Request received

// Logger con metadata persistente
const userLogger = logger.child({ userId: '123', sessionId: 'abc' });
userLogger.info('Action performed'); // Incluye userId y sessionId automáticamente

// Logger combinado
const requestLogger = logger.child('Request', { requestId: 'req-456' });
requestLogger.warn('Slow query detected');
```

### Caso 3: Configuración con Index Signatures

```typescript
// Configuración flexible
logger.configure({
  level: 'debug',
  customProperty: 'value',
  plugins: ['performance', 'security'],
  sampling: {
    rate: 0.1,
    maxSize: 1000
  }
});

// Metadata dinámica
logger.setMetadata('environment', 'production');
logger.setMetadata({
  version: '1.0.0',
  region: 'us-east-1',
  datacenter: 'dc1'
});

// Output personalizado
logger.addOutput({
  type: 'http',
  config: {
    url: 'https://logs.example.com/api/logs',
    headers: { 'Authorization': 'Bearer token' },
    batchSize: 100,
    flushInterval: 5000
  }
});
```

### Caso 4: Structured Logging

```typescript
const structuredLogger: StructuredLogger = new StructuredLogger(config);

// Métodos dinámicos
structuredLogger.logInfo({
  message: 'User action',
  fields: { userId: '123', action: 'login' },
  tags: ['authentication', 'success']
});

structuredLogger.logError({
  message: 'Database error',
  fields: { query: 'SELECT * FROM users', duration: 1500 },
  correlationId: 'req-789'
});

// Eventos especializados
structuredLogger.event('user.login', {
  userId: '123',
  source: 'web',
  ip: '192.168.1.1'
});

structuredLogger.metric('response.time', 245, 'ms');
structuredLogger.trace('database.query', { duration: 150, success: true });
structuredLogger.audit('user.delete', 'admin123', 'user:456');
```

### Caso 5: Template Formatters

```typescript
const templateFormatter: TemplateFormatter = new TemplateFormatter();

// Template personalizado
templateFormatter.setTemplate('[{timestamp}] {level}: {message} | Context: {context}');

const formatted = templateFormatter.interpolate(
  'User {userId} performed {action} at {timestamp}',
  { userId: '123', action: 'login', timestamp: new Date().toISOString() }
);

// Formatters especializados
const jsonFormatter = FormatterFactory.json();
const textFormatter = FormatterFactory.text('{timestamp} [{level}] {message}');
const structuredFormatter = FormatterFactory.structured(' | ');

// Formatter personalizado
const customFormatter = FormatterFactory.custom({
  includeStack: true,
  colorize: true,
  timestampFormat: 'ISO',
  fieldsOrder: ['timestamp', 'level', 'context', 'message']
});
```

### Caso 6: Query y Filtrado

```typescript
// Query con index signatures
const query: LogQuery = {
  level: ['error', 'fatal'],
  context: 'API',
  timeRange: {
    start: new Date('2023-01-01'),
    end: new Date('2023-12-31')
  },
  customFilter: 'value',
  tags: ['critical'],
  userId: '123'
};

const logs = await logger.query(query);
console.log(`Found ${logs.length} logs matching criteria`);
```

## ✅ Criterios de Evaluación

- [ ] **Index signatures**: Configuración flexible implementada
- [ ] **Template literals**: Formateo tipado funciona
- [ ] **Overloads**: Múltiples formas de llamada implementadas
- [ ] **Context management**: Child loggers funcionan correctamente
- [ ] **Structured logging**: Eventos y métricas implementados
- [ ] **Formatters**: Sistema de formateo extensible
- [ ] **Type safety**: Tipado estricto mantenido
- [ ] **Performance**: Logging eficiente sin bloqueo

## 🎁 Bonus

- Implementa sampling y rate limiting
- Agrega compresión y rotación de logs
- Crea dashboards para visualización de logs
- Implementa alertas basadas en patrones de logs

## 💡 Pistas

1. Index signatures permiten propiedades dinámicas: `[key: string]: any`
2. Template literals se definen con backticks y `${}`
3. Los overloads deben tener firmas diferentes
4. Usa `Partial<T>` para configuraciones opcionales
5. Child loggers heredan configuración del padre

## 🔗 Conceptos Clave

- Index signatures
- Template literal types
- Function overloads
- Context propagation
- Structured logging
- Template interpolation
- Dynamic properties
- Type inference

---

**Anterior:** [Sistema de Plugins](./05-Sistema_Plugins.md) | **Siguiente:** [Event System](../02-Funciones_Orden_Superior/01-Event_System.md)
