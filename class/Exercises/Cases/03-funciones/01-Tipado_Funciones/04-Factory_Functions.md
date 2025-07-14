# 🎯 Ejercicio 3.1.4: Factory Functions

## 📋 Descripción

Implementa un sistema de factory functions que utilice call signatures, generic constraints y patrones de construcción de objetos para crear diferentes tipos de entidades de forma tipada.

## 🎯 Objetivos

- Implementar factory functions con call signatures
- Usar generic constraints para tipado seguro
- Crear patterns de construcción de objetos
- Manejar configuraciones opcionales tipadas

## 📊 Dificultad: 🟡 Intermedio

**Tiempo estimado:** 25 minutos

## 📝 Requisitos

### 1. Tipos Base

```typescript
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User extends BaseEntity {
  type: 'user';
  username: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  profile?: UserProfile;
}

interface Product extends BaseEntity {
  type: 'product';
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface Order extends BaseEntity {
  type: 'order';
  userId: string;
  products: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
}

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}
```

### 2. Factory Interfaces

```typescript
// Call signature interfaces
interface UserFactory {
  (config: UserConfig): User;
  (username: string, email: string, role?: User['role']): User;
  withProfile(config: UserConfig, profile: UserProfile): User;
  admin(username: string, email: string): User;
  guest(username: string): User;
}

interface ProductFactory {
  (config: ProductConfig): Product;
  (name: string, price: number, category: string): Product;
  inStock(name: string, price: number, category: string, stock: number): Product;
  digital(name: string, price: number): Product;
}

interface OrderFactory {
  (config: OrderConfig): Order;
  (userId: string, items: OrderItem[]): Order;
  empty(userId: string): Order;
  fromCart(userId: string, cartItems: CartItem[]): Order;
}
```

### 3. Configuration Types

```typescript
interface UserConfig {
  username: string;
  email: string;
  role?: User['role'];
  profile?: Partial<UserProfile>;
}

interface ProductConfig {
  name: string;
  price: number;
  category: string;
  inStock?: boolean;
  metadata?: Record<string, any>;
}

interface OrderConfig {
  userId: string;
  items: OrderItem[];
  status?: Order['status'];
  discounts?: Discount[];
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface Discount {
  type: 'percentage' | 'fixed';
  value: number;
  code?: string;
}
```

### 4. Generic Factory

```typescript
// Generic factory con constraints
interface EntityFactory<T extends BaseEntity> {
  create(config: EntityConfig<T>): T;
  createMany(configs: EntityConfig<T>[]): T[];
  clone(entity: T): T;
  update<K extends keyof T>(entity: T, updates: Partial<Pick<T, K>>): T;
}

type EntityConfig<T extends BaseEntity> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

// Factory builder
interface FactoryBuilder {
  <T extends BaseEntity>(type: T['type']): EntityFactory<T>;
  user(): UserFactory;
  product(): ProductFactory;
  order(): OrderFactory;
}
```

## 🧪 Casos de Prueba

### Caso 1: User Factory

```typescript
const createUser: UserFactory = /* implementación */;

// Call signature básico
const user1 = createUser({
  username: "johndoe",
  email: "john@example.com",
  role: "user"
});
console.log(user1.type); // 'user'
console.log(user1.username); // 'johndoe'

// Call signature con parámetros
const user2 = createUser("janedoe", "jane@example.com", "admin");
console.log(user2.role); // 'admin'

// Método especializado
const admin = createUser.admin("admin", "admin@example.com");
console.log(admin.role); // 'admin'

const guest = createUser.guest("guest123");
console.log(guest.role); // 'guest'

// Con perfil
const userWithProfile = createUser.withProfile(
  { username: "user", email: "user@example.com" },
  { firstName: "John", lastName: "Doe" }
);
console.log(userWithProfile.profile?.firstName); // 'John'
```

### Caso 2: Product Factory

```typescript
const createProduct: ProductFactory = /* implementación */;

// Producto básico
const product1 = createProduct({
  name: "Laptop",
  price: 999.99,
  category: "Electronics"
});
console.log(product1.type); // 'product'
console.log(product1.inStock); // true (default)

// Con parámetros directos
const product2 = createProduct("Mouse", 29.99, "Accessories");
console.log(product2.name); // 'Mouse'

// Producto en stock
const product3 = createProduct.inStock("Keyboard", 79.99, "Accessories", 50);
console.log(product3.inStock); // true

// Producto digital
const digitalProduct = createProduct.digital("Software License", 199.99);
console.log(digitalProduct.category); // 'Digital'
```

### Caso 3: Order Factory

```typescript
const createOrder: OrderFactory = /* implementación */;

// Orden con configuración
const order1 = createOrder({
  userId: "user123",
  items: [
    { productId: "prod1", quantity: 2, price: 99.99 },
    { productId: "prod2", quantity: 1, price: 149.99 }
  ]
});
console.log(order1.total); // 349.97

// Orden directa
const order2 = createOrder("user456", [
  { productId: "prod3", quantity: 1, price: 299.99 }
]);
console.log(order2.total); // 299.99

// Orden vacía
const emptyOrder = createOrder.empty("user789");
console.log(emptyOrder.products.length); // 0
console.log(emptyOrder.total); // 0

// Desde carrito
const cartItems: CartItem[] = [
  { productId: "prod1", quantity: 2 },
  { productId: "prod2", quantity: 1 }
];
const orderFromCart = createOrder.fromCart("user123", cartItems);
console.log(orderFromCart.products.length); // 2
```

### Caso 4: Generic Factory

```typescript
const factory: FactoryBuilder = /* implementación */;

// Factory genérico
const userFactory = factory<User>('user');
const genericUser = userFactory.create({
  type: 'user',
  username: 'test',
  email: 'test@example.com',
  role: 'user'
});

// Factory específico
const productFactory = factory.product();
const product = productFactory("Test Product", 99.99, "Test Category");

// Operaciones genéricas
const clonedUser = userFactory.clone(genericUser);
console.log(clonedUser.id !== genericUser.id); // true (nuevo ID)

const updatedUser = userFactory.update(genericUser, { role: 'admin' });
console.log(updatedUser.role); // 'admin'
```

## ✅ Criterios de Evaluación

- [ ] **Call signatures**: Implementa call signatures correctamente
- [ ] **Multiple signatures**: Soporta múltiples formas de llamada
- [ ] **Generic constraints**: Usa constraints apropiadamente
- [ ] **Type safety**: Mantiene type safety en todas las operaciones
- [ ] **Factory methods**: Implementa métodos especializados
- [ ] **Configuration**: Maneja configuraciones opcionales
- [ ] **ID generation**: Genera IDs únicos automáticamente
- [ ] **Timestamps**: Maneja createdAt/updatedAt correctamente

## 🎁 Bonus

- Implementa un sistema de validación en los factories
- Agrega soporte para hooks (beforeCreate, afterCreate)
- Crea un sistema de serialización/deserialización
- Implementa factories anidados para relaciones complejas

## 💡 Pistas

1. Usa `crypto.randomUUID()` para generar IDs únicos
2. Los call signatures se definen como métodos sin nombre
3. Usa `Date.now()` para timestamps
4. Los generic constraints usan `extends` keyword
5. Implementa métodos estáticos para casos especiales

## 🔗 Conceptos Clave

- Call signatures
- Function overloads
- Generic constraints
- Factory pattern
- Type inference
- Configuration objects
- Builder pattern

---

**Anterior:** [Parser de Comandos](./03-Parser_Comandos.md) | **Siguiente:** [Sistema de Plugins](./05-Sistema_Plugins.md)
