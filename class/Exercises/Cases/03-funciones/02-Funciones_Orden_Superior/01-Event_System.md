# 🎯 Ejercicio 3.2.1: Event System

## 📋 Descripción

Desarrolla un sistema de eventos completo que utilice callbacks tipados, generic functions y patrones de observer para crear un event emitter robusto y type-safe.

## 🎯 Objetivos

- Implementar callbacks tipados para eventos
- Usar generic functions para type safety
- Crear un sistema de subscripción/unsubscripción
- Manejar eventos asíncronos con Promises

## 📊 Dificultad: 🟡 Intermedio

**Tiempo estimado:** 25 minutos

## 📝 Requisitos

### 1. Tipos Base de Eventos

```typescript
interface EventMap {
  [event: string]: any;
}

interface EventListener<T = any> {
  (data: T): void | Promise<void>;
}

interface EventListenerWithContext<T = any> {
  (data: T, context: EventContext): void | Promise<void>;
}

interface EventContext {
  event: string;
  timestamp: Date;
  source?: string;
  correlationId?: string;
  metadata?: Record<string, any>;
}

interface Subscription {
  unsubscribe(): void;
  isActive(): boolean;
  getEvent(): string;
  getListener(): Function;
}
```

### 2. Event Emitter Interface

```typescript
interface EventEmitter<TEventMap extends EventMap = EventMap> {
  // Subscription methods
  on<K extends keyof TEventMap>(
    event: K,
    listener: EventListener<TEventMap[K]>
  ): Subscription;

  once<K extends keyof TEventMap>(
    event: K,
    listener: EventListener<TEventMap[K]>
  ): Subscription;

  off<K extends keyof TEventMap>(
    event: K,
    listener?: EventListener<TEventMap[K]>
  ): void;

  // Emission methods
  emit<K extends keyof TEventMap>(
    event: K,
    data: TEventMap[K]
  ): Promise<void>;

  emitSync<K extends keyof TEventMap>(
    event: K,
    data: TEventMap[K]
  ): void;

  // Advanced methods
  pipe<K extends keyof TEventMap>(
    event: K,
    target: EventEmitter,
    targetEvent?: keyof EventMap
  ): Subscription;

  filter<K extends keyof TEventMap>(
    event: K,
    predicate: (data: TEventMap[K]) => boolean
  ): EventEmitter<Pick<TEventMap, K>>;

  map<K extends keyof TEventMap, R>(
    event: K,
    mapper: (data: TEventMap[K]) => R
  ): EventEmitter<Record<K, R>>;

  // Utility methods
  listenerCount<K extends keyof TEventMap>(event: K): number;
  removeAllListeners<K extends keyof TEventMap>(event?: K): void;
  getEvents(): Array<keyof TEventMap>;
}
```

### 3. Funciones de Orden Superior

```typescript
// Higher-order functions para composición de eventos
type EventTransformer<T, R> = (data: T) => R;
type EventFilter<T> = (data: T) => boolean;
type EventValidator<T> = (data: T) => boolean;

// Decorators para listeners
function debounce<T>(delay: number): (listener: EventListener<T>) => EventListener<T>;
function throttle<T>(interval: number): (listener: EventListener<T>) => EventListener<T>;
function validate<T>(validator: EventValidator<T>): (listener: EventListener<T>) => EventListener<T>;
function retry<T>(maxRetries: number): (listener: EventListener<T>) => EventListener<T>;

// Combinadores de eventos
function combineLatest<T extends Record<string, any>>(
  emitters: { [K in keyof T]: EventEmitter<Record<string, T[K]>> },
  events: { [K in keyof T]: string }
): EventEmitter<{ combined: T }>;

function merge<T>(...emitters: EventEmitter<Record<string, T>>[]): EventEmitter<Record<string, T>>;

function switchMap<T, R>(
  source: EventEmitter<Record<string, T>>,
  project: (data: T) => EventEmitter<Record<string, R>>
): EventEmitter<Record<string, R>>;
```

### 4. Tipos de Eventos Específicos

```typescript
// Event maps para diferentes dominios
interface UserEvents {
  'user.created': { id: string; email: string; name: string };
  'user.updated': { id: string; changes: Partial<User> };
  'user.deleted': { id: string };
  'user.login': { id: string; timestamp: Date; ip: string };
  'user.logout': { id: string; sessionDuration: number };
}

interface OrderEvents {
  'order.created': { orderId: string; userId: string; total: number };
  'order.updated': { orderId: string; status: OrderStatus };
  'order.cancelled': { orderId: string; reason: string };
  'order.completed': { orderId: string; completedAt: Date };
}

interface SystemEvents {
  'system.startup': { version: string; timestamp: Date };
  'system.shutdown': { reason: string; graceful: boolean };
  'system.error': { error: Error; context: string };
  'system.warning': { message: string; code: string };
}

type AllEvents = UserEvents & OrderEvents & SystemEvents;

// Helper types
type EventNames<T extends EventMap> = keyof T;
type EventData<T extends EventMap, K extends keyof T> = T[K];
```

### 5. Advanced Event Patterns

```typescript
// Event store para replay y persistencia
interface EventStore<TEventMap extends EventMap> {
  append<K extends keyof TEventMap>(
    event: K,
    data: TEventMap[K],
    metadata?: EventMetadata
  ): Promise<void>;

  replay<K extends keyof TEventMap>(
    event: K,
    fromTimestamp?: Date
  ): AsyncIterable<StoredEvent<TEventMap[K]>>;

  subscribe<K extends keyof TEventMap>(
    event: K,
    fromTimestamp: Date,
    listener: EventListener<TEventMap[K]>
  ): Subscription;
}

interface EventMetadata {
  version: number;
  correlationId?: string;
  causationId?: string;
  userId?: string;
  timestamp: Date;
}

interface StoredEvent<T> {
  id: string;
  event: string;
  data: T;
  metadata: EventMetadata;
  timestamp: Date;
}

// Event aggregator
interface EventAggregator<TEventMap extends EventMap> {
  aggregate<K extends keyof TEventMap>(
    event: K,
    windowSize: number,
    aggregator: (events: TEventMap[K][]) => any
  ): EventEmitter<Record<string, any>>;

  buffer<K extends keyof TEventMap>(
    event: K,
    size: number
  ): EventEmitter<Record<K, TEventMap[K][]>>;

  sample<K extends keyof TEventMap>(
    event: K,
    interval: number
  ): EventEmitter<Pick<TEventMap, K>>;
}
```

## 🧪 Casos de Prueba

### Caso 1: Event Emitter Básico

```typescript
const emitter: EventEmitter<UserEvents> = new TypedEventEmitter();

// Subscription básica
const subscription = emitter.on('user.created', (user) => {
  console.log(`User created: ${user.name} (${user.email})`);
});

// Emisión de evento
await emitter.emit('user.created', {
  id: '123',
  email: 'john@example.com',
  name: 'John Doe'
});

// One-time listener
emitter.once('user.login', (loginData) => {
  console.log(`First login: ${loginData.id}`);
});

// Unsubscribe
subscription.unsubscribe();
console.log(subscription.isActive()); // false
```

### Caso 2: Funciones de Orden Superior

```typescript
// Debounced listener
const debouncedListener = debounce<UserEvents['user.updated']>(1000)(
  (update) => {
    console.log('Processing user update:', update.changes);
  }
);

emitter.on('user.updated', debouncedListener);

// Throttled listener
const throttledListener = throttle<UserEvents['user.login']>(5000)(
  (login) => {
    console.log('Login attempt from:', login.ip);
  }
);

emitter.on('user.login', throttledListener);

// Validated listener
const validateOrder = (order: OrderEvents['order.created']) => order.total > 0;
const validatedListener = validate(validateOrder)(
  (order) => {
    console.log('Valid order created:', order.orderId);
  }
);

const orderEmitter: EventEmitter<OrderEvents> = new TypedEventEmitter();
orderEmitter.on('order.created', validatedListener);
```

### Caso 3: Event Composition

```typescript
// Filtering events
const highValueOrders = orderEmitter.filter('order.created', (order) => order.total > 1000);

highValueOrders.on('order.created', (order) => {
  console.log(`High value order: $${order.total}`);
});

// Mapping events
const orderSummaries = orderEmitter.map('order.created', (order) => ({
  id: order.orderId,
  customer: order.userId,
  amount: order.total,
  timestamp: new Date()
}));

orderSummaries.on('order.created', (summary) => {
  console.log('Order summary:', summary);
});

// Piping events
const userEmitter: EventEmitter<UserEvents> = new TypedEventEmitter();
const systemEmitter: EventEmitter<SystemEvents> = new TypedEventEmitter();

userEmitter.pipe('user.created', systemEmitter, 'system.startup');
```

### Caso 4: Advanced Patterns

```typescript
// Combining multiple event streams
const combined = combineLatest(
  {
    users: userEmitter,
    orders: orderEmitter
  },
  {
    users: 'user.created',
    orders: 'order.created'
  }
);

combined.on('combined', ({ users, orders }) => {
  console.log('User and order created:', { users, orders });
});

// Merging event streams
const allEmitters: EventEmitter<SystemEvents>[] = [
  userEmitter as any,
  orderEmitter as any,
  systemEmitter
];

const merged = merge(...allEmitters);
merged.on('system.error', (error) => {
  console.log('System error from any source:', error);
});

// Switch mapping
const userOrderEvents = switchMap(
  userEmitter,
  (userData) => {
    // Return new event stream based on user data
    return new TypedEventEmitter<OrderEvents>();
  }
);
```

### Caso 5: Event Store

```typescript
const eventStore: EventStore<AllEvents> = new InMemoryEventStore();

// Storing events
await eventStore.append('user.created', {
  id: '123',
  email: 'john@example.com',
  name: 'John Doe'
}, {
  version: 1,
  correlationId: 'req-456',
  userId: 'admin',
  timestamp: new Date()
});

// Replaying events
for await (const event of eventStore.replay('user.created', new Date('2023-01-01'))) {
  console.log('Replayed event:', event.data);
}

// Subscribing to event store
eventStore.subscribe('order.created', new Date(), (order) => {
  console.log('New order from store:', order);
});
```

### Caso 6: Event Aggregation

```typescript
const aggregator: EventAggregator<OrderEvents> = new EventAggregator(orderEmitter);

// Aggregating orders over time windows
const hourlyOrderStats = aggregator.aggregate('order.created', 3600000, (orders) => ({
  count: orders.length,
  totalValue: orders.reduce((sum, order) => sum + order.total, 0),
  averageValue: orders.reduce((sum, order) => sum + order.total, 0) / orders.length
}));

hourlyOrderStats.on('order.created', (stats) => {
  console.log('Hourly order statistics:', stats);
});

// Buffering events
const orderBatches = aggregator.buffer('order.created', 10);
orderBatches.on('order.created', (orders) => {
  console.log(`Processing batch of ${orders.length} orders`);
});

// Sampling events
const sampledOrders = aggregator.sample('order.created', 60000); // Every minute
sampledOrders.on('order.created', (order) => {
  console.log('Sampled order:', order);
});
```

## ✅ Criterios de Evaluación

- [ ] **Type safety**: Eventos tipados correctamente
- [ ] **Callbacks**: Listeners tipados funcionan
- [ ] **Subscriptions**: Sistema de suscripción/desuscripción
- [ ] **Async support**: Eventos asíncronos manejados
- [ ] **Higher-order functions**: Composición de listeners
- [ ] **Event composition**: Filter, map, pipe implementados
- [ ] **Advanced patterns**: Combine, merge, switchMap
- [ ] **Performance**: Eventos eficientes y no bloquean

## 🎁 Bonus

- Implementa un event sourcing completo
- Agrega métricas y monitoring de eventos
- Crea un event debugger visual
- Implementa eventos distribuidos con websockets

## 💡 Pistas

1. Usa generics para type safety: `<T extends EventMap>`
2. Los callbacks pueden ser async: `Promise<void>`
3. Mantén una Map interna para listeners
4. Usa WeakMap para subscriptions
5. Los higher-order functions retornan functions

## 🔗 Conceptos Clave

- Generic functions
- Callback typing
- Observer pattern
- Function composition
- Async/await patterns
- Higher-order functions
- Event composition
- Type constraints

---

**Anterior:** [Logger Avanzado](../01-Tipado_Funciones/06-Logger_Avanzado.md) | **Siguiente:** [API Client](./02-API_Client.md)
