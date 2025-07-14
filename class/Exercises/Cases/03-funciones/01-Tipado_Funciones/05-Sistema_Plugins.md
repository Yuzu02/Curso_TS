# 🎯 Ejercicio 3.1.5: Sistema de Plugins

## 📋 Descripción

Desarrolla un sistema de plugins extensible que utilice construct signatures, decorators y patrones de inyección de dependencias para crear una arquitectura modular y tipada.

## 🎯 Objetivos

- Implementar construct signatures para clases plugin
- Usar decorators para metadatos de plugins
- Crear un sistema de registro y discovery de plugins
- Manejar dependencias entre plugins de forma tipada

## 📊 Dificultad: 🔴 Avanzado

**Tiempo estimado:** 35 minutos

## 📝 Requisitos

### 1. Tipos Base del Sistema

```typescript
interface PluginMetadata {
  name: string;
  version: string;
  description: string;
  author: string;
  dependencies?: string[];
  hooks?: string[];
}

interface PluginContext {
  app: Application;
  config: Record<string, any>;
  logger: Logger;
  events: EventEmitter;
}

interface Plugin {
  metadata: PluginMetadata;
  initialize(context: PluginContext): Promise<void>;
  destroy?(): Promise<void>;
  onHook?(hook: string, data: any): Promise<any>;
}

interface Logger {
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

interface EventEmitter {
  on(event: string, listener: Function): void;
  emit(event: string, ...args: any[]): void;
  off(event: string, listener: Function): void;
}
```

### 2. Construct Signatures

```typescript
// Construct signature para plugins
interface PluginConstructor {
  new (config?: any): Plugin;
  metadata: PluginMetadata;
}

interface PluginFactory {
  new (): Plugin;
  create(config?: any): Plugin;
}

// Construct signatures específicos por tipo
interface DatabasePluginConstructor {
  new (config: DatabaseConfig): DatabasePlugin;
  connect(url: string): DatabasePlugin;
  withPool(poolSize: number): DatabasePluginConstructor;
}

interface AuthPluginConstructor {
  new (config: AuthConfig): AuthPlugin;
  jwt(secret: string): AuthPlugin;
  oauth(provider: OAuthProvider): AuthPlugin;
}

interface CachePluginConstructor {
  new (config: CacheConfig): CachePlugin;
  memory(maxSize: number): CachePlugin;
  redis(url: string): CachePlugin;
}
```

### 3. Plugin Específicos

```typescript
interface DatabasePlugin extends Plugin {
  type: 'database';
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query(sql: string, params?: any[]): Promise<any>;
  transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T>;
}

interface AuthPlugin extends Plugin {
  type: 'auth';
  authenticate(token: string): Promise<User | null>;
  authorize(user: User, permission: string): boolean;
  generateToken(user: User): string;
  refreshToken(token: string): Promise<string>;
}

interface CachePlugin extends Plugin {
  type: 'cache';
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

// Configurations
interface DatabaseConfig {
  url: string;
  poolSize?: number;
  timeout?: number;
}

interface AuthConfig {
  secret: string;
  expiresIn?: string;
  issuer?: string;
}

interface CacheConfig {
  maxSize?: number;
  ttl?: number;
  strategy?: 'lru' | 'lfu' | 'fifo';
}
```

### 4. Plugin Manager

```typescript
interface PluginManager {
  register<T extends Plugin>(constructor: PluginConstructor): void;
  load(name: string, config?: any): Promise<Plugin>;
  unload(name: string): Promise<void>;
  get<T extends Plugin>(name: string): T | null;
  list(): PluginMetadata[];
  has(name: string): boolean;
  resolve(dependencies: string[]): Plugin[];
}

interface Application {
  plugins: PluginManager;
  config: AppConfig;
  start(): Promise<void>;
  stop(): Promise<void>;
  hook(name: string, data?: any): Promise<any[]>;
}

interface AppConfig {
  plugins: Record<string, any>;
  environment: 'development' | 'production' | 'test';
  debug?: boolean;
}
```

### 5. Decorators y Metadatos

```typescript
// Decorator para metadatos de plugin
function Plugin(metadata: PluginMetadata): ClassDecorator;

// Decorator para hooks
function Hook(name: string): MethodDecorator;

// Decorator para dependencias
function Depends(...dependencies: string[]): ClassDecorator;

// Decorator para configuración
function Config(schema: any): PropertyDecorator;
```

## 🧪 Casos de Prueba

### Caso 1: Plugin Básico

```typescript
@Plugin({
  name: 'logger',
  version: '1.0.0',
  description: 'Simple logging plugin',
  author: 'Dev Team'
})
class LoggerPlugin implements Plugin {
  metadata = LoggerPlugin.metadata;

  async initialize(context: PluginContext): Promise<void> {
    context.logger.info('Logger plugin initialized');
  }

  @Hook('request')
  async onRequest(data: any): Promise<void> {
    console.log(`Request: ${data.method} ${data.url}`);
  }
}

// Uso
const manager: PluginManager = new PluginManager();
manager.register(LoggerPlugin);

const plugin = await manager.load('logger');
console.log(plugin.metadata.name); // 'logger'
```

### Caso 2: Database Plugin

```typescript
@Plugin({
  name: 'database',
  version: '2.0.0',
  description: 'Database connection plugin',
  author: 'DB Team'
})
@Depends('logger')
class DatabasePlugin implements DatabasePlugin {
  type = 'database' as const;
  metadata = DatabasePlugin.metadata;

  constructor(private config: DatabaseConfig) {}

  async initialize(context: PluginContext): Promise<void> {
    await this.connect();
    context.logger.info('Database plugin initialized');
  }

  async connect(): Promise<void> {
    // Implementación de conexión
  }

  async query(sql: string, params?: any[]): Promise<any> {
    // Implementación de query
    return [];
  }

  // Resto de métodos...
}

// Factory con construct signature
const createDatabase: DatabasePluginConstructor = DatabasePlugin as any;

// Uso directo
const db1 = new createDatabase({ url: 'postgresql://localhost:5432/db' });

// Factory methods
const db2 = createDatabase.connect('postgresql://localhost:5432/db');
const PooledDatabase = createDatabase.withPool(10);
const db3 = new PooledDatabase({ url: 'postgresql://localhost:5432/db' });
```

### Caso 3: Sistema Completo

```typescript
@Plugin({
  name: 'auth',
  version: '1.5.0',
  description: 'Authentication plugin',
  author: 'Auth Team'
})
@Depends('database', 'cache')
class AuthPlugin implements AuthPlugin {
  type = 'auth' as const;
  metadata = AuthPlugin.metadata;

  constructor(private config: AuthConfig) {}

  async initialize(context: PluginContext): Promise<void> {
    // Obtener dependencias
    const db = context.app.plugins.get<DatabasePlugin>('database');
    const cache = context.app.plugins.get<CachePlugin>('cache');
    
    context.logger.info('Auth plugin initialized with dependencies');
  }

  async authenticate(token: string): Promise<User | null> {
    // Implementación
    return null;
  }

  // Resto de métodos...
}

// Aplicación completa
const app: Application = {
  plugins: new PluginManager(),
  config: { plugins: {}, environment: 'development' },
  
  async start() {
    // Cargar plugins en orden de dependencias
    await this.plugins.load('logger');
    await this.plugins.load('database', { url: 'postgresql://localhost/db' });
    await this.plugins.load('cache', { maxSize: 1000 });
    await this.plugins.load('auth', { secret: 'secret-key' });
  },

  async stop() {
    // Descargar plugins en orden inverso
    const plugins = this.plugins.list().reverse();
    for (const plugin of plugins) {
      await this.plugins.unload(plugin.name);
    }
  },

  async hook(name: string, data?: any) {
    const results = [];
    for (const plugin of this.plugins.list()) {
      const p = this.plugins.get(plugin.name);
      if (p?.onHook) {
        const result = await p.onHook(name, data);
        results.push(result);
      }
    }
    return results;
  }
};
```

### Caso 4: Plugin Factory

```typescript
// Plugin factory con construct signatures múltiples
class PluginFactory {
  static create<T extends Plugin>(
    constructor: new (...args: any[]) => T,
    ...args: any[]
  ): T {
    return new constructor(...args);
  }

  static database(config: DatabaseConfig): DatabasePlugin {
    return new DatabasePlugin(config);
  }

  static auth(config: AuthConfig): AuthPlugin {
    return new AuthPlugin(config);
  }

  static cache(config: CacheConfig): CachePlugin {
    return new CachePlugin(config);
  }
}

// Uso del factory
const db = PluginFactory.database({ url: 'postgresql://localhost/db' });
const auth = PluginFactory.auth({ secret: 'my-secret' });
const cache = PluginFactory.cache({ maxSize: 500 });
```

## ✅ Criterios de Evaluación

- [ ] **Construct signatures**: Implementa construct signatures correctamente
- [ ] **Plugin interface**: Todos los plugins implementan la interfaz base
- [ ] **Dependency resolution**: Sistema de dependencias funciona
- [ ] **Metadatos**: Decorators y metadatos funcionan correctamente
- [ ] **Type safety**: Tipado estricto en todo el sistema
- [ ] **Plugin lifecycle**: Initialize/destroy funcionan correctamente
- [ ] **Hook system**: Sistema de hooks implementado
- [ ] **Factory patterns**: Factories con construct signatures funcionan

## 🎁 Bonus

- Implementa hot-reloading de plugins
- Agrega sistema de versioning y compatibilidad
- Crea un sistema de sandboxing para plugins
- Implementa métricas y monitoring de plugins

## 💡 Pistas

1. Los construct signatures usan `new` en la firma del tipo
2. Los decorators se aplican en tiempo de compilación
3. Usa `Reflect.getMetadata` para leer metadatos
4. Implementa dependency injection con Map/Set
5. Los hooks pueden usar el patrón observer

## 🔗 Conceptos Clave

- Construct signatures
- Decorators
- Dependency injection
- Plugin architecture
- Factory pattern
- Lifecycle management
- Hook system
- Type constraints

---

**Anterior:** [Factory Functions](./04-Factory_Functions.md) | **Siguiente:** [Logger Avanzado](./06-Logger_Avanzado.md)
