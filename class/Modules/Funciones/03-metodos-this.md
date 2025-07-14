# 3.3 Métodos y This

## 🎯 Objetivos

- Comprender el tipado del contexto `this` en TypeScript
- Diferenciar entre arrow functions y regular functions en cuanto a `this`
- Implementar binding de métodos de forma segura
- Manejar patrones avanzados con contexto de ejecución

## 🧠 Fundamentos Teóricos

### El Problema del Contexto `this` en JavaScript

El comportamiento de `this` en JavaScript es una de las características más confusas del lenguaje. Su valor depende de **cómo se llama la función**, no de **dónde se define**. Esto crea problemas como:

```javascript
// JavaScript - comportamiento inesperado
const obj = {
  nombre: 'Ana',
  saludar: function() {
    console.log('Hola, ' + this.nombre);
  }
};

obj.saludar(); // "Hola, Ana" - funciona
const fn = obj.saludar;
fn(); // "Hola, undefined" - ¡this cambió!
```

**TypeScript al rescate:**

TypeScript permite **tipar explícitamente el contexto `this`**, lo que:

1. **Previene errores**: Detecta cuando `this` no es el esperado
2. **Documenta intención**: Deja claro qué contexto necesita una función
3. **Mejora IntelliSense**: El editor sabe qué propiedades tiene `this`
4. **Facilita refactoring**: Cambios en objetos se propagan automáticamente

## 📚 Contenido

### Secciones

Esta sección cubre el manejo avanzado del contexto `this` en TypeScript:

- **Tipado del Contexto This**: Definición explícita de tipos para `this`
- **Arrow Functions vs Regular Functions**: Diferencias en el binding de `this`
- **Binding Methods**: Técnicas para preservar el contexto de ejecución

## 🔗 Navegación

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| [3.2 Funciones de Orden Superior](02-funciones-orden-superior.md) | **3.3 Métodos y This** | [Módulo 4: Clases](../Clases/README.md) |

### Tipado del Contexto This: Control Total sobre el Contexto

#### This Parameters: Documentando Expectativas

Los **this parameters** son una característica única de TypeScript que permite especificar explícitamente qué tipo debe tener `this` dentro de una función. Esto no afecta la ejecución, pero proporciona verificación de tipos en tiempo de compilación.

**¿Por qué es revolucionario?**

1. **Prevención de errores**: TypeScript verifica que `this` tenga las propiedades esperadas
2. **Documentación viva**: La función declara explícitamente qué contexto necesita
3. **Mejor tooling**: IntelliSense funciona correctamente dentro de la función
4. **Refactoring seguro**: Cambios en interfaces se propagan automáticamente

#### This Parameters en Acción

```typescript
// Definiendo el tipo de 'this' explícitamente
interface Usuario {
  nombre: string;
  email: string;
  activo: boolean;
}

// Esta función REQUIERE que 'this' sea de tipo Usuario
function saludar(this: Usuario, formal: boolean = false): string {
  // TypeScript sabe que 'this' tiene las propiedades de Usuario
  if (formal) {
    return `Buenos días, ${this.nombre}`;
  }
  return `¡Hola ${this.nombre}!`;
}

// Uso correcto - proporcionando el contexto adecuado
const usuario: Usuario = {
  nombre: 'Ana',
  email: 'ana@email.com',
  activo: true
};

const saludo = saludar.call(usuario, true); // ✅ "Buenos días, Ana"

// ❌ Error en tiempo de compilación - falta contexto
// saludar(); // Error: The 'this' context of type 'void' is not assignable to method's 'this' of type 'Usuario'
```

#### This en Interfaces: Contratos Avanzados

Las interfaces pueden definir métodos que requieren contextos específicos, creando contratos que garantizan comportamiento consistente:

```typescript
interface Calculadora {
  valor: number;
  // Métodos que requieren 'this' de tipo Calculadora
  sumar(this: Calculadora, num: number): Calculadora;
  multiplicar(this: Calculadora, num: number): Calculadora;
  resultado(this: Calculadora): number;
}

const calculadora: Calculadora = {
  valor: 0,
  
  // Implementación que cumple el contrato
  sumar(num: number) {
    this.valor += num;
    return this; // Permite method chaining
  },
  
  multiplicar(num: number) {
    this.valor *= num;
    return this;
  },
  
  resultado() {
    return this.valor;
  }
};

// Method chaining type-safe gracias al tipado de 'this'
const resultado = calculadora
  .sumar(5)      // Calculadora
  .multiplicar(2) // Calculadora
  .sumar(3)      // Calculadora
  .resultado();  // number - 13
```

#### This en Clases: Type Safety Automático

En clases, TypeScript infiere automáticamente el tipo de `this`, pero puedes ser explícito para mayor claridad:

```typescript
class EventEmitter {
  private eventos: Map<string, Function[]> = new Map();
  
  // 'this' se infiere automáticamente como EventEmitter
  on(evento: string, callback: Function): this {
    if (!this.eventos.has(evento)) {
      this.eventos.set(evento, []);
    }
    this.eventos.get(evento)!.push(callback);
    return this; // Tipo de retorno 'this' permite fluent interface
  }
  
  emit(evento: string, ...args: any[]): this {
    const callbacks = this.eventos.get(evento);
    if (callbacks) {
      callbacks.forEach(callback => callback(...args));
    }
    return this;
  }
  
  // Método que demuestra captura de contexto
  crearEmitir(evento: string) {
    // Arrow function preserva el 'this' de la clase automáticamente
    return (...args: any[]) => {
      this.emit(evento, ...args);
    };
  }
}

const emitter = new EventEmitter();

// Fluent interface funciona gracias al tipo de retorno 'this'
emitter
  .on('data', (data: any) => console.log('Data:', data))
  .on('error', (error: Error) => console.error('Error:', error))
  .emit('data', { id: 1, message: 'Hello' });

// Factory method que preserva contexto
const emitirData = emitter.crearEmitir('data');
emitirData({ message: 'Desde factory method' }); // Funciona correctamente
```

### Arrow Functions vs Regular Functions

#### Diferencias en el Contexto This

```typescript
class ComponenteUI {
  private elemento: string = 'Button';
  private clicks: number = 0;
  
  // Regular function - 'this' depende del contexto de llamada
  handleClickRegular(this: ComponenteUI, event: Event): void {
    this.clicks++;
    console.log(`${this.elemento} clickeado ${this.clicks} veces`);
  }
  
  // Arrow function - 'this' siempre apunta a la instancia de la clase
  handleClickArrow = (event: Event): void => {
    this.clicks++;
    console.log(`${this.elemento} clickeado ${this.clicks} veces`);
  }
  
  // Método que demuestra la diferencia
  configurarEventos() {
    const button = document.createElement('button');
    
    // Regular function perdería el contexto sin bind
    button.addEventListener('click', this.handleClickRegular.bind(this));
    
    // Arrow function mantiene automáticamente el contexto
    button.addEventListener('click', this.handleClickArrow);
  }
}
```

#### Casos de Uso Específicos

```typescript
// Regular functions para métodos que pueden ser sobrescritos
class Animal {
  nombre: string;
  
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  
  // Regular function - puede ser sobrescrita en subclases
  hacerSonido(this: Animal): void {
    console.log(`${this.nombre} hace un sonido`);
  }
}

class Perro extends Animal {
  // Sobrescribir método
  hacerSonido(): void {
    console.log(`${this.nombre} ladra`);
  }
}

// Arrow functions para callbacks que necesitan preservar contexto
class AsyncProcessor<T> {
  private resultados: T[] = [];
  
  // Arrow function para preservar contexto en callbacks
  procesarItem = async (item: T): Promise<void> => {
    try {
      const resultado = await this.procesar(item);
      this.resultados.push(resultado);
    } catch (error) {
      console.error('Error procesando item:', error);
    }
  }
  
  private async procesar(item: T): Promise<T> {
    // Simulación de procesamiento asíncrono
    return new Promise(resolve => {
      setTimeout(() => resolve(item), 100);
    });
  }
  
  async procesarTodos(items: T[]): Promise<T[]> {
    // Usar el método arrow function como callback
    await Promise.all(items.map(this.procesarItem));
    return [...this.resultados];
  }
}
```

### Binding Methods

#### Explicit Binding

```typescript
interface Context {
  usuario: string;
  permisos: string[];
}

class GestorSeguridad {
  verificarPermiso(this: Context, accion: string): boolean {
    return this.permisos.includes(accion);
  }
  
  ejecutarAccion(this: Context, accion: string, callback: () => void): void {
    if (this.verificarPermiso(accion)) {
      console.log(`${this.usuario} ejecuta: ${accion}`);
      callback();
    } else {
      console.log(`${this.usuario} no tiene permisos para: ${accion}`);
    }
  }
}

const gestor = new GestorSeguridad();
const contextoAdmin: Context = {
  usuario: 'admin',
  permisos: ['read', 'write', 'delete']
};

const contextoUser: Context = {
  usuario: 'user',
  permisos: ['read']
};

// Binding explícito
const verificarComoAdmin = gestor.verificarPermiso.bind(contextoAdmin);
const verificarComoUser = gestor.verificarPermiso.bind(contextoUser);

console.log(verificarComoAdmin('delete')); // true
console.log(verificarComoUser('delete')); // false
```

#### Method Binding Patterns

```typescript
// Pattern: Bound Methods Factory
class ApiClient {
  private baseUrl: string;
  private token: string;
  
  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }
  
  // Factory method que retorna función bound
  createBoundMethod<T extends any[], R>(
    method: (this: ApiClient, ...args: T) => R
  ): (...args: T) => R {
    return method.bind(this);
  }
  
  private async request(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
    return response.json();
  }
  
  // Métodos públicos que serán bound
  getUser(id: number): Promise<any> {
    return this.request(`/users/${id}`);
  }
  
  getPosts(): Promise<any> {
    return this.request('/posts');
  }
  
  // Crear versiones bound para callbacks
  getBoundMethods() {
    return {
      getUser: this.createBoundMethod(this.getUser),
      getPosts: this.createBoundMethod(this.getPosts)
    };
  }
}

// Uso con callbacks
const client = new ApiClient('https://api.example.com', 'token123');
const { getUser, getPosts } = client.getBoundMethods();

// Ahora pueden usarse como callbacks sin perder contexto
Promise.all([
  getUser(1),
  getPosts()
]).then(([user, posts]) => {
  console.log('Usuario:', user);
  console.log('Posts:', posts);
});
```

#### Decorators para Method Binding

```typescript
// Decorator para auto-binding (experimental)
function autobind<T extends Function>(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;
  
  return {
    configurable: true,
    get() {
      // Bind el método a la instancia la primera vez que se accede
      const boundMethod = originalMethod.bind(this);
      
      // Cachear el método bound en la instancia
      Object.defineProperty(this, propertyKey, {
        value: boundMethod,
        configurable: true,
        writable: true
      });
      
      return boundMethod;
    }
  };
}

class FormHandler {
  private mensajes: string[] = [];
  
  @autobind
  handleSubmit(event: Event): void {
    event.preventDefault();
    this.mensajes.push('Formulario enviado');
    console.log(this.mensajes);
  }
  
  @autobind
  handleReset(): void {
    this.mensajes = [];
    console.log('Formulario reseteado');
  }
  
  configurarFormulario() {
    const form = document.querySelector('form');
    if (form) {
      // No necesita .bind() debido al decorator
      form.addEventListener('submit', this.handleSubmit);
      form.addEventListener('reset', this.handleReset);
    }
  }
}
```

### Patrones Avanzados con This

#### Fluent Interface

```typescript
class QueryBuilder<T> {
  private query: {
    select?: string[];
    where?: string[];
    orderBy?: string[];
    limit?: number;
  } = {};
  
  select(...campos: (keyof T)[]): this {
    this.query.select = campos as string[];
    return this;
  }
  
  where(condicion: string): this {
    if (!this.query.where) {
      this.query.where = [];
    }
    this.query.where.push(condicion);
    return this;
  }
  
  orderBy(campo: keyof T, direccion: 'ASC' | 'DESC' = 'ASC'): this {
    if (!this.query.orderBy) {
      this.query.orderBy = [];
    }
    this.query.orderBy.push(`${String(campo)} ${direccion}`);
    return this;
  }
  
  limit(cantidad: number): this {
    this.query.limit = cantidad;
    return this;
  }
  
  build(): string {
    let sql = 'SELECT ';
    sql += this.query.select?.join(', ') || '*';
    sql += ' FROM table';
    
    if (this.query.where?.length) {
      sql += ' WHERE ' + this.query.where.join(' AND ');
    }
    
    if (this.query.orderBy?.length) {
      sql += ' ORDER BY ' + this.query.orderBy.join(', ');
    }
    
    if (this.query.limit) {
      sql += ` LIMIT ${this.query.limit}`;
    }
    
    return sql;
  }
}

// Uso type-safe del fluent interface
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad: number;
}

const query = new QueryBuilder<Usuario>()
  .select('nombre', 'email')
  .where('edad > 18')
  .where('activo = true')
  .orderBy('nombre', 'ASC')
  .limit(10)
  .build();

console.log(query);
// SELECT nombre, email FROM table WHERE edad > 18 AND activo = true ORDER BY nombre ASC LIMIT 10
```

## 💡 Conceptos Clave

1. **This Parameters**: Tipado explícito del contexto de ejecución
2. **Arrow vs Regular**: Comportamiento diferente del binding automático
3. **Method Chaining**: Usar `this` como tipo de retorno para interfaces fluidas
4. **Context Preservation**: Técnicas para mantener el contexto en callbacks

## 🔍 Casos de Uso Comunes

- **Event Handlers** en aplicaciones web
- **Method Chaining** para APIs fluidas
- **Callback Functions** que preservan contexto
- **Class Decorators** para auto-binding

## 🎯 Resumen del Módulo

Has completado el **Módulo 3: Funciones**. Ahora puedes:

- ✅ Tipar funciones con overloads y signatures complejas
- ✅ Crear funciones de orden superior type-safe
- ✅ Manejar el contexto `this` en cualquier escenario
- ✅ Implementar patrones avanzados como fluent interfaces

## ➡️ Próximos Pasos

Continúa con el **Módulo 4: Clases** para aprender sobre programación orientada a objetos en TypeScript, o practica con los [ejercicios del módulo](../../Exercises/Cases/03-funciones/README.md).
