# 🎯 Ejercicio 3.3.4: Decorator System

## 📋 Descripción

Desarrolla un sistema de decoradores avanzado que utilice method decoration, property binding y context preservation para crear una infraestructura de metaprogramming type-safe.

## 🎯 Objetivos

- Implementar decoradores que preserven el contexto `this`
- Crear metadatos tipados para methods y properties
- Manejar interceptors con binding correcto
- Desarrollar un sistema de reflection type-safe

## 📊 Dificultad: 🔴 Avanzado

**Tiempo estimado:** 40 minutos

## 📝 Requisitos

### 1. Core Decorator Types

```typescript
// Method decorator with this preservation
type MethodDecorator<TThis = any, TArgs extends any[] = any[], TReturn = any> = (
  target: TThis,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<(this: TThis, ...args: TArgs) => TReturn>
) => TypedPropertyDescriptor<(this: TThis, ...args: TArgs) => TReturn> | void;

// Property decorator with this binding
type PropertyDecorator<TThis = any, TValue = any> = (
  target: TThis,
  propertyKey: string | symbol
) => void;

// Class decorator with context preservation
type ClassDecorator<TClass extends new (...args: any[]) => any = any> = (
  target: TClass
) => TClass | void;

// Parameter decorator with this awareness
type ParameterDecorator<TThis = any> = (
  target: TThis,
  propertyKey: string | symbol | undefined,
  parameterIndex: number
) => void;

// Decorator metadata interface
interface DecoratorMetadata {
  target: any;
  propertyKey?: string | symbol;
  parameterIndex?: number;
  descriptor?: PropertyDescriptor;
  decoratorType: 'class' | 'method' | 'property' | 'parameter';
}
```

### 2. Method Decorators

```typescript
interface MethodDecoratorFactory {
  // Timing decorators with this preservation
  Debounce<TThis, TArgs extends any[], TReturn>(
    delay: number
  ): MethodDecorator<TThis, TArgs, TReturn>;
  
  Throttle<TThis, TArgs extends any[], TReturn>(
    interval: number
  ): MethodDecorator<TThis, TArgs, TReturn>;
  
  // Validation decorators with this binding
  Validate<TThis, TArgs extends any[], TReturn>(
    ...validators: Array<(this: TThis, ...args: TArgs) => boolean | string>
  ): MethodDecorator<TThis, TArgs, TReturn>;
  
  // Caching decorators with context preservation
  Memoize<TThis, TArgs extends any[], TReturn>(
    keyGenerator?: (this: TThis, ...args: TArgs) => string
  ): MethodDecorator<TThis, TArgs, TReturn>;
  
  Cache<TThis, TArgs extends any[], TReturn>(
    ttl?: number,
    maxSize?: number
  ): MethodDecorator<TThis, TArgs, TReturn>;
  
  // Error handling with this preservation
  Retry<TThis, TArgs extends any[], TReturn>(
    maxAttempts: number,
    delay?: number
  ): MethodDecorator<TThis, TArgs, Promise<TReturn>>;
  
  Catch<TThis, TArgs extends any[], TReturn>(
    handler: (this: TThis, error: Error, ...args: TArgs) => TReturn
  ): MethodDecorator<TThis, TArgs, TReturn>;
  
  // Logging decorators with this binding
  Log<TThis, TArgs extends any[], TReturn>(
    level?: 'debug' | 'info' | 'warn' | 'error'
  ): MethodDecorator<TThis, TArgs, TReturn>;
  
  Trace<TThis, TArgs extends any[], TReturn>(
    includeArgs?: boolean,
    includeResult?: boolean
  ): MethodDecorator<TThis, TArgs, TReturn>;
  
  // Authorization decorators with context preservation
  Authorize<TThis, TArgs extends any[], TReturn>(
    permissions: string | string[],
    contextProvider?: (this: TThis, ...args: TArgs) => any
  ): MethodDecorator<TThis, TArgs, TReturn>;
  
  // Binding decorators
  Bind<TThis, TArgs extends any[], TReturn>(): MethodDecorator<TThis, TArgs, TReturn>;
  
  BindAll<TClass extends new (...args: any[]) => any>(
    target: TClass
  ): TClass;
}
```

### 3. Property Decorators

```typescript
interface PropertyDecoratorFactory {
  // Observable properties with this preservation
  Observable<TThis, TValue>(
    options?: ObservableOptions<TThis, TValue>
  ): PropertyDecorator<TThis, TValue>;
  
  // Computed properties with this binding
  Computed<TThis, TValue>(
    dependencies: Array<keyof TThis>,
    calculator: (this: TThis) => TValue
  ): PropertyDecorator<TThis, TValue>;
  
  // Validation properties with context preservation
  ValidatedProperty<TThis, TValue>(
    validators: Array<(this: TThis, value: TValue) => boolean | string>
  ): PropertyDecorator<TThis, TValue>;
  
  // Serialization decorators with this binding
  Serializable<TThis, TValue>(
    options?: SerializationOptions<TThis, TValue>
  ): PropertyDecorator<TThis, TValue>;
  
  // Injection decorators with context preservation
  Inject<TThis, TValue>(
    token: string | symbol,
    optional?: boolean
  ): PropertyDecorator<TThis, TValue>;
  
  // Format decorators with this binding
  Format<TThis, TValue>(
    formatter: (this: TThis, value: TValue) => string
  ): PropertyDecorator<TThis, TValue>;
  
  // Access control with context preservation
  ReadOnly<TThis, TValue>(): PropertyDecorator<TThis, TValue>;
  Private<TThis, TValue>(): PropertyDecorator<TThis, TValue>;
}

interface ObservableOptions<TThis, TValue> {
  initialValue?: TValue;
  onChange?: (this: TThis, newValue: TValue, oldValue: TValue) => void;
  validator?: (this: TThis, value: TValue) => boolean;
}

interface SerializationOptions<TThis, TValue> {
  key?: string;
  serialize?: (this: TThis, value: TValue) => any;
  deserialize?: (this: TThis, data: any) => TValue;
  exclude?: boolean;
}
```

### 4. Advanced Decorator Features

```typescript
// Decorator composition with this preservation
interface DecoratorComposer {
  compose<TThis, TArgs extends any[], TReturn>(
    ...decorators: Array<MethodDecorator<TThis, TArgs, TReturn>>
  ): MethodDecorator<TThis, TArgs, TReturn>;
  
  // Conditional decorators with context awareness
  when<TThis, TArgs extends any[], TReturn>(
    condition: (this: TThis, ...args: TArgs) => boolean,
    decorator: MethodDecorator<TThis, TArgs, TReturn>
  ): MethodDecorator<TThis, TArgs, TReturn>;
  
  // Decorator factory with this binding
  createDecorator<TThis, TArgs extends any[], TReturn, TConfig>(
    factory: (config: TConfig) => (this: TThis, ...args: TArgs) => TReturn
  ): (config: TConfig) => MethodDecorator<TThis, TArgs, TReturn>;
}

// Interceptor system with this preservation
interface Interceptor<TThis = any, TArgs extends any[] = any[], TReturn = any> {
  before?: (this: TThis, ...args: TArgs) => TArgs | void;
  after?: (this: TThis, result: TReturn, ...args: TArgs) => TReturn | void;
  error?: (this: TThis, error: Error, ...args: TArgs) => TReturn | void;
  finally?: (this: TThis, ...args: TArgs) => void;
}

interface InterceptorManager<TThis = any> {
  // Add interceptors with this binding
  addInterceptor<TArgs extends any[], TReturn>(
    method: keyof TThis,
    interceptor: Interceptor<TThis, TArgs, TReturn>
  ): void;
  
  // Remove interceptors with context preservation
  removeInterceptor<TArgs extends any[], TReturn>(
    method: keyof TThis,
    interceptor: Interceptor<TThis, TArgs, TReturn>
  ): void;
  
  // Execute with interceptors
  executeWithInterceptors<TArgs extends any[], TReturn>(
    target: TThis,
    method: keyof TThis,
    args: TArgs
  ): TReturn;
}
```

### 5. Reflection System

```typescript
// Type-safe reflection with this preservation
interface ReflectionSystem {
  // Method metadata with this binding
  getMethodMetadata<TThis>(
    target: TThis,
    method: keyof TThis
  ): MethodMetadata<TThis> | null;
  
  setMethodMetadata<TThis>(
    target: TThis,
    method: keyof TThis,
    metadata: MethodMetadata<TThis>
  ): void;
  
  // Property metadata with context preservation
  getPropertyMetadata<TThis>(
    target: TThis,
    property: keyof TThis
  ): PropertyMetadata<TThis> | null;
  
  setPropertyMetadata<TThis>(
    target: TThis,
    property: keyof TThis,
    metadata: PropertyMetadata<TThis>
  ): void;
  
  // Class metadata with this binding
  getClassMetadata<TClass extends new (...args: any[]) => any>(
    target: TClass
  ): ClassMetadata<TClass> | null;
  
  // Decorator inspection
  getDecorators<TThis>(
    target: TThis,
    member?: keyof TThis
  ): DecoratorInfo[];
  
  // Type information with context preservation
  getTypeInfo<TThis>(
    target: TThis,
    member?: keyof TThis
  ): TypeInfo;
}

interface MethodMetadata<TThis> {
  name: string;
  parameters: ParameterMetadata[];
  returnType: any;
  decorators: DecoratorInfo[];
  interceptors: Interceptor<TThis>[];
  thisBinding: boolean;
}

interface PropertyMetadata<TThis> {
  name: string;
  type: any;
  decorators: DecoratorInfo[];
  getter?: (this: TThis) => any;
  setter?: (this: TThis, value: any) => void;
  observable: boolean;
  computed: boolean;
}

interface ClassMetadata<TClass> {
  name: string;
  constructor: TClass;
  methods: Map<string, MethodMetadata<InstanceType<TClass>>>;
  properties: Map<string, PropertyMetadata<InstanceType<TClass>>>;
  decorators: DecoratorInfo[];
  mixins: any[];
}

interface DecoratorInfo {
  name: string;
  factory: Function;
  options: any;
  target: any;
  member?: string;
}

interface TypeInfo {
  name: string;
  kind: 'class' | 'method' | 'property' | 'parameter';
  type: any;
  nullable: boolean;
  optional: boolean;
}
```

### 6. Decorator Registry

```typescript
// Global decorator registry with this preservation
interface DecoratorRegistry {
  // Register decorators with context awareness
  register<TThis, TArgs extends any[], TReturn>(
    name: string,
    decorator: MethodDecorator<TThis, TArgs, TReturn>
  ): void;
  
  registerProperty<TThis, TValue>(
    name: string,
    decorator: PropertyDecorator<TThis, TValue>
  ): void;
  
  registerClass<TClass extends new (...args: any[]) => any>(
    name: string,
    decorator: ClassDecorator<TClass>
  ): void;
  
  // Get decorators with this binding
  get<TThis, TArgs extends any[], TReturn>(
    name: string
  ): MethodDecorator<TThis, TArgs, TReturn> | null;
  
  getProperty<TThis, TValue>(
    name: string
  ): PropertyDecorator<TThis, TValue> | null;
  
  getClass<TClass extends new (...args: any[]) => any>(
    name: string
  ): ClassDecorator<TClass> | null;
  
  // List all decorators
  list(): DecoratorRegistration[];
  
  // Create decorator instances with context preservation
  create<TThis>(target: TThis): DecoratedInstance<TThis>;
}

interface DecoratorRegistration {
  name: string;
  type: 'method' | 'property' | 'class' | 'parameter';
  factory: Function;
  metadata: any;
}

interface DecoratedInstance<TThis> {
  target: TThis;
  applyDecorator<TArgs extends any[], TReturn>(
    method: keyof TThis,
    decoratorName: string,
    options?: any
  ): void;
  
  getDecoratedMethods(): Array<keyof TThis>;
  getDecoratedProperties(): Array<keyof TThis>;
}
```

## 🧪 Casos de Prueba

### Caso 1: Basic Method Decorators

```typescript
class UserService {
  private cache = new Map<string, any>();
  
  // Memoization with this preservation
  @MethodDecoratorFactory.Memoize(function(this: UserService, id: string) {
    return `user:${id}`;
  })
  async getUser(this: UserService, id: string): Promise<User> {
    console.log('Fetching user from API:', id);
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }
  
  // Debounced search with this binding
  @MethodDecoratorFactory.Debounce(300)
  search(this: UserService, query: string): void {
    console.log('Searching for:', query);
    // Search implementation with access to 'this'
  }
  
  // Retry with this preservation
  @MethodDecoratorFactory.Retry(3, 1000)
  async saveUser(this: UserService, user: User): Promise<User> {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
    
    if (!response.ok) {
      throw new Error('Save failed');
    }
    
    return response.json();
  }
  
  // Validation with this binding
  @MethodDecoratorFactory.Validate(
    function(this: UserService, user: User) {
      return user.email.includes('@') || 'Invalid email';
    },
    function(this: UserService, user: User) {
      return user.name.length > 0 || 'Name required';
    }
  )
  updateUser(this: UserService, user: User): void {
    console.log('Updating user:', user.id);
    // Update implementation
  }
  
  // Error handling with this preservation
  @MethodDecoratorFactory.Catch(function(this: UserService, error: Error, id: string) {
    console.error('Error deleting user:', id, error);
    return false; // Default return value
  })
  async deleteUser(this: UserService, id: string): Promise<boolean> {
    const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    return response.ok;
  }
}

// Usage
const userService = new UserService();

// Memoization works with this context
const user1 = await userService.getUser('123'); // API call
const user2 = await userService.getUser('123'); // Cached, no API call

// Debounced method preserves this
userService.search('john'); // Will be debounced
userService.search('john doe'); // Previous call cancelled

// Retry with this context
try {
  await userService.saveUser({ id: '456', name: 'Jane', email: 'jane@example.com' });
} catch (error) {
  console.log('Save failed after retries');
}
```

### Caso 2: Property Decorators

```typescript
class ReactiveComponent {
  // Observable property with this preservation
  @PropertyDecoratorFactory.Observable({
    onChange(this: ReactiveComponent, newValue: string, oldValue: string) {
      console.log(`Title changed from "${oldValue}" to "${newValue}"`);
      this.render(); // 'this' correctly bound
    }
  })
  title: string = 'Default Title';
  
  // Computed property with this binding
  @PropertyDecoratorFactory.Computed(['title', 'subtitle'], function(this: ReactiveComponent) {
    return `${this.title} - ${this.subtitle}`;
  })
  get fullTitle(): string {
    return ''; // Will be replaced by computed value
  }
  
  @PropertyDecoratorFactory.Observable()
  subtitle: string = 'Subtitle';
  
  // Validated property with this preservation
  @PropertyDecoratorFactory.ValidatedProperty([
    function(this: ReactiveComponent, value: number) {
      return value >= 0 || 'Count must be positive';
    },
    function(this: ReactiveComponent, value: number) {
      return value <= 100 || 'Count must be <= 100';
    }
  ])
  count: number = 0;
  
  // Formatted property with this binding
  @PropertyDecoratorFactory.Format(function(this: ReactiveComponent, value: Date) {
    return value.toLocaleDateString();
  })
  createdAt: Date = new Date();
  
  // Serializable property with context preservation
  @PropertyDecoratorFactory.Serializable({
    key: 'user_settings',
    serialize(this: ReactiveComponent, value: Settings) {
      return JSON.stringify(value);
    },
    deserialize(this: ReactiveComponent, data: string) {
      return JSON.parse(data);
    }
  })
  settings: Settings = { theme: 'light', language: 'en' };
  
  // Injected property with this binding
  @PropertyDecoratorFactory.Inject('apiService')
  private apiService!: ApiService;
  
  // Method that uses decorated properties
  render(this: ReactiveComponent): void {
    console.log('Rendering component with:');
    console.log('Title:', this.fullTitle); // Uses computed property
    console.log('Count:', this.count);
    console.log('Created:', this.createdAt); // Uses formatted property
    
    // Can access injected service
    this.apiService.log('Component rendered');
  }
  
  // Method to test property changes
  updateTitle(this: ReactiveComponent, newTitle: string): void {
    this.title = newTitle; // Triggers onChange with correct this
  }
  
  incrementCount(this: ReactiveComponent): void {
    try {
      this.count++; // Validates with this context
    } catch (error) {
      console.error('Validation failed:', error.message);
    }
  }
}

interface Settings {
  theme: 'light' | 'dark';
  language: string;
}

// Usage
const component = new ReactiveComponent();

// Property changes trigger decorated behavior
component.updateTitle('New Title'); // Triggers onChange, then render
component.subtitle = 'New Subtitle'; // Updates computed property
console.log(component.fullTitle); // "New Title - New Subtitle"

// Validation with this context
component.incrementCount(); // count becomes 1
component.count = -5; // Throws validation error
```

### Caso 3: Class Decorators

```typescript
// Singleton decorator with this preservation
function Singleton<T extends new (...args: any[]) => any>(target: T): T {
  let instance: InstanceType<T> | null = null;
  
  return class extends target {
    constructor(...args: any[]) {
      if (instance) {
        return instance;
      }
      
      super(...args);
      instance = this as InstanceType<T>;
      return instance;
    }
    
    // Ensure this binding is preserved
    static getInstance(this: T): InstanceType<T> {
      if (!instance) {
        instance = new this() as InstanceType<T>;
      }
      return instance;
    }
  } as T;
}

// Auto-bind decorator for all methods
function AutoBind<T extends new (...args: any[]) => any>(target: T): T {
  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      
      // Bind all methods to preserve this context
      const prototype = Object.getPrototypeOf(this);
      Object.getOwnPropertyNames(prototype).forEach(name => {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
        if (descriptor && typeof descriptor.value === 'function' && name !== 'constructor') {
          (this as any)[name] = (this as any)[name].bind(this);
        }
      });
    }
  } as T;
}

// Logger decorator with this preservation
function Logged<T extends new (...args: any[]) => any>(target: T): T {
  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      console.log(`Created instance of ${target.name}`);
    }
    
    // Override methods to add logging
    [key: string]: any;
  } as T;
}

// Apply decorators
@Singleton
@AutoBind
@Logged
class ConfigService {
  private config: Record<string, any> = {};
  
  get(this: ConfigService, key: string): any {
    return this.config[key];
  }
  
  set(this: ConfigService, key: string, value: any): void {
    this.config[key] = value;
    console.log(`Config updated: ${key} = ${value}`);
  }
  
  // Method will be auto-bound by decorator
  loadFromFile(this: ConfigService, filename: string): void {
    console.log(`Loading config from ${filename}`);
    // Implementation that uses 'this'
  }
}

// Usage
const config1 = new ConfigService(); // Logs: "Created instance of ConfigService"
const config2 = new ConfigService(); // Returns same instance

console.log(config1 === config2); // true (singleton)

// Methods are auto-bound
const loadMethod = config1.loadFromFile;
loadMethod('config.json'); // 'this' correctly preserved

config1.set('theme', 'dark');
console.log(config1.get('theme')); // 'dark'
```

### Caso 4: Advanced Decorator Composition

```typescript
class OrderService {
  private orders: Order[] = [];
  
  // Compose multiple decorators with this preservation
  @DecoratorComposer.compose(
    MethodDecoratorFactory.Log('info'),
    MethodDecoratorFactory.Validate(function(this: OrderService, order: Order) {
      return order.total > 0 || 'Order total must be positive';
    }),
    MethodDecoratorFactory.Retry(3, 1000),
    MethodDecoratorFactory.Cache(300000) // 5 minutes
  )
  async createOrder(this: OrderService, order: Order): Promise<Order> {
    console.log('Creating order:', order.id);
    
    // Simulate API call
    const response = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    const savedOrder = await response.json();
    this.orders.push(savedOrder);
    return savedOrder;
  }
  
  // Conditional decorator with this binding
  @DecoratorComposer.when(
    function(this: OrderService, orderId: string) {
      return this.hasPermission('delete_orders');
    },
    MethodDecoratorFactory.Authorize(['admin'])
  )
  async deleteOrder(this: OrderService, orderId: string): Promise<boolean> {
    const index = this.orders.findIndex(o => o.id === orderId);
    if (index >= 0) {
      this.orders.splice(index, 1);
      return true;
    }
    return false;
  }
  
  private hasPermission(this: OrderService, permission: string): boolean {
    // Implementation that uses 'this'
    return true; // Simplified
  }
}

// Custom decorator factory with this preservation
const RateLimit = DecoratorComposer.createDecorator<
  any, 
  [string], 
  Promise<any>, 
  { maxCalls: number; windowMs: number }
>(function(config) {
  const calls = new Map<string, number[]>();
  
  return async function(this: any, key: string) {
    const now = Date.now();
    const windowStart = now - config.windowMs;
    
    if (!calls.has(key)) {
      calls.set(key, []);
    }
    
    const callTimes = calls.get(key)!;
    const recentCalls = callTimes.filter(time => time > windowStart);
    
    if (recentCalls.length >= config.maxCalls) {
      throw new Error('Rate limit exceeded');
    }
    
    recentCalls.push(now);
    calls.set(key, recentCalls);
    
    // Continue with original method
    return this;
  };
});

class ApiService {
  @RateLimit({ maxCalls: 100, windowMs: 60000 }) // 100 calls per minute
  async getData(this: ApiService, endpoint: string): Promise<any> {
    // Implementation with rate limiting
    return fetch(endpoint).then(r => r.json());
  }
}

// Usage
const orderService = new OrderService();

// All decorators work together with this preservation
try {
  const order = await orderService.createOrder({
    id: '123',
    total: 99.99,
    items: []
  });
  console.log('Order created:', order.id);
} catch (error) {
  console.error('Order creation failed:', error.message);
}
```

### Caso 5: Reflection and Metadata

```typescript
class UserController {
  @MethodDecoratorFactory.Authorize(['read_users'])
  @MethodDecoratorFactory.Log('info')
  async getUsers(this: UserController): Promise<User[]> {
    return [];
  }
  
  @MethodDecoratorFactory.Validate(function(this: UserController, user: User) {
    return user.email.includes('@') || 'Invalid email';
  })
  @MethodDecoratorFactory.Authorize(['write_users'])
  async createUser(this: UserController, user: User): Promise<User> {
    return user;
  }
}

// Reflection usage with this preservation
const reflection = new ReflectionSystem();
const controller = new UserController();

// Get method metadata
const getUsersMetadata = reflection.getMethodMetadata(controller, 'getUsers');
console.log('Method decorators:', getUsersMetadata?.decorators);

// Get all decorated methods
const decoratedMethods = reflection.getDecorators(controller);
console.log('All decorators:', decoratedMethods);

// Inspect class metadata
const classMetadata = reflection.getClassMetadata(UserController);
console.log('Class info:', classMetadata?.name);

// Dynamic decorator application
const registry = new DecoratorRegistry();

// Register custom decorator
registry.register('trace', MethodDecoratorFactory.Trace(true, true));

// Create decorated instance
const decoratedInstance = registry.create(controller);

// Apply decorator dynamically
decoratedInstance.applyDecorator('getUsers', 'trace');

// Method now has additional tracing with this preservation
await controller.getUsers(); // Will log with trace information
```

### Caso 6: Interceptor System

```typescript
class PaymentService {
  private interceptorManager = new InterceptorManager<PaymentService>();
  
  constructor() {
    this.setupInterceptors();
  }
  
  // Setup interceptors with this preservation
  private setupInterceptors(this: PaymentService): void {
    this.interceptorManager.addInterceptor('processPayment', {
      before(this: PaymentService, payment: Payment) {
        console.log('Before payment processing:', payment.id);
        // Validate payment with access to 'this'
        return [payment]; // Can modify arguments
      },
      
      after(this: PaymentService, result: PaymentResult, payment: Payment) {
        console.log('After payment processing:', result.success);
        // Log result with access to 'this'
        return result; // Can modify result
      },
      
      error(this: PaymentService, error: Error, payment: Payment) {
        console.error('Payment error:', error.message);
        // Handle error with access to 'this'
        return { success: false, error: error.message };
      },
      
      finally(this: PaymentService, payment: Payment) {
        console.log('Payment processing completed');
        // Cleanup with access to 'this'
      }
    });
  }
  
  // Method with interceptors
  async processPayment(this: PaymentService, payment: Payment): Promise<PaymentResult> {
    // This method will be intercepted
    if (payment.amount <= 0) {
      throw new Error('Invalid payment amount');
    }
    
    // Simulate payment processing
    return { success: true, transactionId: crypto.randomUUID() };
  }
  
  // Execute with interceptors and this preservation
  async executePayment(this: PaymentService, payment: Payment): Promise<PaymentResult> {
    return this.interceptorManager.executeWithInterceptors(
      this,
      'processPayment',
      [payment]
    );
  }
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

// Usage
const paymentService = new PaymentService();

// Process payment with interceptors
try {
  const result = await paymentService.executePayment({
    id: '123',
    amount: 99.99,
    currency: 'USD'
  });
  console.log('Payment result:', result);
} catch (error) {
  console.error('Payment failed:', error);
}
```

## ✅ Criterios de Evaluación

- [ ] **This preservation**: Decoradores mantienen contexto correcto
- [ ] **Type safety**: Decoradores tipados correctamente
- [ ] **Metadata system**: Sistema de metadatos funcional
- [ ] **Composition**: Decoradores se componen correctamente
- [ ] **Reflection**: Sistema de reflection type-safe
- [ ] **Interceptors**: Interceptores con this binding
- [ ] **Performance**: Decoradores eficientes
- [ ] **Flexibility**: Sistema extensible y configurable

## 🎁 Bonus

- Implementa hot-reloading de decoradores
- Agrega sistema de dependency injection basado en decoradores
- Crea herramientas de debugging para decoradores
- Implementa decoradores que funcionen con async/await

## 💡 Pistas

1. Usa `Reflect.getMetadata()` para acceder a metadatos
2. `Function.prototype.apply()` preserva contexto this
3. Weakmap previene memory leaks en metadata
4. Los descriptores pueden ser modificados en decoradores
5. Usa Proxy para interceptors dinámicos

## 🔗 Conceptos Clave

- Method decoration
- Property decoration
- Metadata reflection
- This parameter preservation
- Interceptor pattern
- Decorator composition
- Type-safe metaprogramming
- Context binding

---

**Anterior:** [Observable Pattern](./03-Observable_Pattern.md)
