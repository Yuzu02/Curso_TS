# 🎯 Ejercicio 3.3.1: Component System

## 📋 Descripción

Desarrolla un sistema de componentes que utilice this binding, context preservation y patrones de composición para crear una arquitectura de componentes type-safe y reactiva.

## 🎯 Objetivos

- Implementar this binding correcto en métodos
- Preservar contexto en callbacks
- Crear un sistema de eventos con this preservation
- Manejar lifecycle hooks con tipado estricto

## 📊 Dificultad: 🔴 Avanzado

**Tiempo estimado:** 30 minutos

## 📝 Requisitos

### 1. Component Base Types

```typescript
interface ComponentLifecycle {
  onInit?(): void | Promise<void>;
  onMount?(): void | Promise<void>;
  onUpdate?(changes: PropertyChanges): void | Promise<void>;
  onDestroy?(): void | Promise<void>;
}

interface PropertyChanges {
  [property: string]: {
    currentValue: any;
    previousValue: any;
    firstChange: boolean;
  };
}

interface ComponentProps {
  [key: string]: any;
}

interface ComponentState {
  [key: string]: any;
}

interface ComponentEvents {
  [event: string]: any;
}

// This parameter for bound methods
interface ComponentThis<TProps = ComponentProps, TState = ComponentState> {
  props: TProps;
  state: TState;
  element?: HTMLElement;
  children: Component[];
  parent?: Component;
}
```

### 2. Component Interface

```typescript
interface Component<
  TProps extends ComponentProps = ComponentProps,
  TState extends ComponentState = ComponentState,
  TEvents extends ComponentEvents = ComponentEvents
> extends ComponentLifecycle {
  // Component identity
  readonly id: string;
  readonly type: string;
  
  // Properties and state
  props: TProps;
  state: TState;
  
  // DOM reference
  element?: HTMLElement;
  
  // Hierarchy
  children: Component[];
  parent?: Component;
  
  // Lifecycle methods with proper this binding
  init(this: ComponentThis<TProps, TState>): void | Promise<void>;
  mount(this: ComponentThis<TProps, TState>, element: HTMLElement): void | Promise<void>;
  update(this: ComponentThis<TProps, TState>, newProps: Partial<TProps>): void | Promise<void>;
  destroy(this: ComponentThis<TProps, TState>): void | Promise<void>;
  
  // Event handling with this preservation
  addEventListener<K extends keyof TEvents>(
    this: ComponentThis<TProps, TState>,
    event: K,
    handler: EventHandler<TEvents[K]>
  ): void;
  
  removeEventListener<K extends keyof TEvents>(
    this: ComponentThis<TProps, TState>,
    event: K,
    handler?: EventHandler<TEvents[K]>
  ): void;
  
  emit<K extends keyof TEvents>(
    this: ComponentThis<TProps, TState>,
    event: K,
    data: TEvents[K]
  ): void;
  
  // State management with this binding
  setState(
    this: ComponentThis<TProps, TState>,
    updater: StateUpdater<TState> | Partial<TState>
  ): void;
  
  // DOM methods with this preservation
  render(this: ComponentThis<TProps, TState>): string | HTMLElement;
  refresh(this: ComponentThis<TProps, TState>): void;
  
  // Component tree methods
  addChild(this: ComponentThis<TProps, TState>, child: Component): void;
  removeChild(this: ComponentThis<TProps, TState>, child: Component): void;
  findChild(this: ComponentThis<TProps, TState>, predicate: (child: Component) => boolean): Component | null;
  
  // Utility methods
  bindMethods(this: ComponentThis<TProps, TState>): void;
  clone(this: ComponentThis<TProps, TState>): Component<TProps, TState, TEvents>;
}

type StateUpdater<TState> = (currentState: TState) => TState;
type EventHandler<TData = any> = (data: TData, component: Component) => void;
```

### 3. Component Factory

```typescript
interface ComponentFactory {
  // Create components with proper this binding
  create<TProps, TState, TEvents>(
    type: string,
    config: ComponentConfig<TProps, TState, TEvents>
  ): Component<TProps, TState, TEvents>;
  
  // Create from class
  fromClass<T extends Component>(
    ComponentClass: ComponentConstructor<T>
  ): T;
  
  // Create functional component
  functional<TProps, TState>(
    render: (this: ComponentThis<TProps, TState>) => string | HTMLElement,
    hooks?: ComponentHooks<TProps, TState>
  ): Component<TProps, TState>;
  
  // Registry
  register<T extends Component>(name: string, factory: () => T): void;
  get<T extends Component>(name: string): T | null;
  list(): string[];
}

interface ComponentConfig<TProps, TState, TEvents> {
  props?: TProps;
  initialState?: TState;
  methods?: ComponentMethods<TProps, TState, TEvents>;
  lifecycle?: ComponentLifecycle;
  events?: ComponentEventDefinitions<TEvents>;
}

interface ComponentMethods<TProps, TState, TEvents> {
  [methodName: string]: (this: ComponentThis<TProps, TState>, ...args: any[]) => any;
}

interface ComponentEventDefinitions<TEvents> {
  [K in keyof TEvents]?: EventDefinition<TEvents[K]>;
}

interface EventDefinition<TData> {
  bubbles?: boolean;
  cancelable?: boolean;
  validator?: (data: TData) => boolean;
}

type ComponentConstructor<T extends Component = Component> = new (...args: any[]) => T;

interface ComponentHooks<TProps, TState> {
  onInit?(this: ComponentThis<TProps, TState>): void | Promise<void>;
  onMount?(this: ComponentThis<TProps, TState>): void | Promise<void>;
  onUpdate?(this: ComponentThis<TProps, TState>, changes: PropertyChanges): void | Promise<void>;
  onDestroy?(this: ComponentThis<TProps, TState>): void | Promise<void>;
}
```

### 4. Advanced Component Features

```typescript
// Mixin system for component composition
interface ComponentMixin<TProps = any, TState = any> {
  methods?: ComponentMethods<TProps, TState, any>;
  lifecycle?: Partial<ComponentLifecycle>;
  state?: Partial<TState>;
  
  // Mixin initialization
  apply<T extends Component>(
    this: ComponentMixin<TProps, TState>,
    component: T
  ): T;
}

// Component decorator system
type ComponentDecorator<TProps = any, TState = any> = (
  target: Component<TProps, TState>,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor | void;

// Context system for dependency injection
interface ComponentContext {
  // Service injection with this preservation
  inject<T>(
    this: ComponentThis,
    token: string | symbol
  ): T;
  
  provide<T>(
    this: ComponentThis,
    token: string | symbol,
    value: T
  ): void;
  
  // Context inheritance
  createChild(): ComponentContext;
}

// Component store for state management
interface ComponentStore<TState> {
  // State access with this binding
  getState(this: ComponentThis): TState;
  setState(
    this: ComponentThis,
    updater: StateUpdater<TState>
  ): void;
  
  // Subscriptions with this preservation
  subscribe(
    this: ComponentThis,
    listener: (state: TState, component: Component) => void
  ): () => void;
  
  // Computed properties
  computed<TResult>(
    this: ComponentThis,
    selector: (state: TState) => TResult,
    dependencies?: (keyof TState)[]
  ): TResult;
}
```

### 5. Component Utilities

```typescript
interface ComponentUtils {
  // Method binding utilities
  bindAll<T extends Component>(component: T): T;
  bindMethod<T extends Component>(
    component: T,
    methodName: keyof T
  ): T[keyof T];
  
  // Context preservation
  preserveContext<TArgs extends any[], TReturn>(
    fn: (this: any, ...args: TArgs) => TReturn,
    context: any
  ): (...args: TArgs) => TReturn;
  
  // Event binding with this preservation
  bindEvent<TComponent extends Component>(
    component: TComponent,
    event: string,
    handler: (this: TComponent, ...args: any[]) => void
  ): (this: TComponent, ...args: any[]) => void;
  
  // Lifecycle helpers
  awaitLifecycle<T extends Component>(
    component: T,
    phase: keyof ComponentLifecycle
  ): Promise<void>;
  
  // Component composition
  compose<T extends Component>(...mixins: ComponentMixin[]): ComponentMixin;
  extend<TBase extends Component, TExtended extends Component>(
    base: TBase,
    extension: Partial<TExtended>
  ): TBase & TExtended;
}

// This-aware decorators
interface ComponentDecorators {
  // Bind decorator to preserve this
  Bind(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;
  
  // Lifecycle decorator
  Lifecycle(phase: keyof ComponentLifecycle): ComponentDecorator;
  
  // Event listener decorator
  Listen<TEvents>(event: keyof TEvents): ComponentDecorator;
  
  // State watcher decorator
  Watch<TState>(property: keyof TState): ComponentDecorator;
  
  // Memoization decorator with this awareness
  Memo(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;
}
```

## 🧪 Casos de Prueba

### Caso 1: Basic Component

```typescript
interface ButtonProps {
  text: string;
  disabled?: boolean;
  variant: 'primary' | 'secondary';
}

interface ButtonState {
  clicked: number;
  loading: boolean;
}

interface ButtonEvents {
  click: { count: number };
  loading: { state: boolean };
}

class ButtonComponent implements Component<ButtonProps, ButtonState, ButtonEvents> {
  id = crypto.randomUUID();
  type = 'button';
  
  props: ButtonProps = { text: '', variant: 'primary' };
  state: ButtonState = { clicked: 0, loading: false };
  
  element?: HTMLElement;
  children: Component[] = [];
  parent?: Component;
  
  // Proper this binding in lifecycle methods
  async init(this: ComponentThis<ButtonProps, ButtonState>): Promise<void> {
    console.log('Button initializing:', this.props.text);
    // this refers to the component instance
  }
  
  async mount(this: ComponentThis<ButtonProps, ButtonState>, element: HTMLElement): Promise<void> {
    this.element = element;
    element.innerHTML = this.render();
    
    // Bind event with proper this context
    const handleClick = this.handleClick.bind(this);
    element.addEventListener('click', handleClick);
  }
  
  // Method with proper this typing
  handleClick(this: ComponentThis<ButtonProps, ButtonState>, event: Event): void {
    if (this.props.disabled) return;
    
    this.setState(state => ({
      ...state,
      clicked: state.clicked + 1
    }));
    
    this.emit('click', { count: this.state.clicked });
  }
  
  // Render method with this preservation
  render(this: ComponentThis<ButtonProps, ButtonState>): string {
    const { text, variant, disabled } = this.props;
    const { loading } = this.state;
    
    return `
      <button 
        class="btn btn-${variant}" 
        ${disabled ? 'disabled' : ''}
        ${loading ? 'aria-busy="true"' : ''}
      >
        ${loading ? 'Loading...' : text}
      </button>
    `;
  }
  
  // State update with this binding
  setState(
    this: ComponentThis<ButtonProps, ButtonState>,
    updater: StateUpdater<ButtonState> | Partial<ButtonState>
  ): void {
    const newState = typeof updater === 'function' 
      ? updater(this.state)
      : { ...this.state, ...updater };
    
    this.state = newState;
    this.refresh();
  }
  
  // Other required methods...
  addEventListener = () => {};
  removeEventListener = () => {};
  emit = () => {};
  update = () => {};
  destroy = () => {};
  refresh = () => {};
  addChild = () => {};
  removeChild = () => {};
  findChild = () => null;
  bindMethods = () => {};
  clone = () => this;
}

// Usage
const button = new ButtonComponent();
button.props = { text: 'Click me!', variant: 'primary' };

// Mount to DOM
const container = document.getElementById('app')!;
await button.mount(container);

// Event handling
button.addEventListener('click', function(data) {
  console.log(`Button clicked ${data.count} times`);
});
```

### Caso 2: Component Factory

```typescript
const factory = new ComponentFactory();

// Create component with configuration
const modal = factory.create<ModalProps, ModalState, ModalEvents>('modal', {
  props: { title: 'Confirm Action', visible: false },
  initialState: { animating: false },
  
  methods: {
    // Methods with proper this binding
    show(this: ComponentThis<ModalProps, ModalState>) {
      this.setState({ animating: true });
      setTimeout(() => {
        this.setState({ animating: false });
        this.props.visible = true;
        this.refresh();
      }, 300);
    },
    
    hide(this: ComponentThis<ModalProps, ModalState>) {
      this.setState({ animating: true });
      setTimeout(() => {
        this.props.visible = false;
        this.setState({ animating: false });
        this.refresh();
      }, 300);
    }
  },
  
  lifecycle: {
    onMount(this: ComponentThis<ModalProps, ModalState>) {
      // Set up keyboard handlers with preserved context
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this.props.visible) {
          this.hide(); // 'this' properly bound
        }
      };
      
      document.addEventListener('keydown', handleEscape);
    }
  }
});

// Functional component
const counter = factory.functional<CounterProps, CounterState>(
  function(this: ComponentThis<CounterProps, CounterState>) {
    return `
      <div class="counter">
        <button onclick="this.decrement()">-</button>
        <span>${this.state.count}</span>
        <button onclick="this.increment()">+</button>
      </div>
    `;
  },
  {
    onInit(this: ComponentThis<CounterProps, CounterState>) {
      this.state = { count: this.props.initialValue || 0 };
    }
  }
);
```

### Caso 3: Mixins and Composition

```typescript
// Event emitter mixin
const EventEmitterMixin: ComponentMixin = {
  methods: {
    // Methods with proper this context
    on(this: ComponentThis, event: string, handler: Function) {
      this.listeners = this.listeners || {};
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(handler);
    },
    
    off(this: ComponentThis, event: string, handler?: Function) {
      if (!this.listeners?.[event]) return;
      
      if (handler) {
        const index = this.listeners[event].indexOf(handler);
        if (index > -1) {
          this.listeners[event].splice(index, 1);
        }
      } else {
        delete this.listeners[event];
      }
    },
    
    trigger(this: ComponentThis, event: string, data?: any) {
      if (!this.listeners?.[event]) return;
      
      this.listeners[event].forEach((handler: Function) => {
        handler.call(this, data); // Preserve this context
      });
    }
  }
};

// Draggable mixin
const DraggableMixin: ComponentMixin = {
  methods: {
    makeDraggable(this: ComponentThis) {
      if (!this.element) return;
      
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      
      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true;
        startX = e.clientX - this.element!.offsetLeft;
        startY = e.clientY - this.element!.offsetTop;
        this.element!.style.cursor = 'grabbing';
      };
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        
        this.element!.style.left = `${e.clientX - startX}px`;
        this.element!.style.top = `${e.clientY - startY}px`;
      };
      
      const handleMouseUp = () => {
        isDragging = false;
        this.element!.style.cursor = 'grab';
        this.trigger('dragEnd', {
          x: this.element!.offsetLeft,
          y: this.element!.offsetTop
        });
      };
      
      this.element.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  }
};

// Compose mixins
const DraggableModalComponent = ComponentUtils.compose(
  EventEmitterMixin,
  DraggableMixin
);

// Apply to component
class Modal extends Component {
  constructor() {
    super();
    DraggableModalComponent.apply(this);
  }
  
  onMount(this: ComponentThis) {
    this.makeDraggable(); // Method from mixin
    this.on('dragEnd', (position) => { // Method from mixin
      console.log('Modal moved to:', position);
    });
  }
}
```

### Caso 4: Decorators

```typescript
class TodoComponent extends Component<TodoProps, TodoState, TodoEvents> {
  
  @ComponentDecorators.Bind
  @ComponentDecorators.Memo
  calculateProgress(this: ComponentThis<TodoProps, TodoState>): number {
    const completed = this.state.todos.filter(todo => todo.completed).length;
    return (completed / this.state.todos.length) * 100;
  }
  
  @ComponentDecorators.Listen('todo-added')
  onTodoAdded(this: ComponentThis<TodoProps, TodoState>, data: TodoEvents['todo-added']) {
    this.setState(state => ({
      ...state,
      todos: [...state.todos, data.todo]
    }));
  }
  
  @ComponentDecorators.Watch('todos')
  onTodosChanged(
    this: ComponentThis<TodoProps, TodoState>,
    newTodos: Todo[],
    oldTodos: Todo[]
  ) {
    if (newTodos.length !== oldTodos.length) {
      this.emit('count-changed', { count: newTodos.length });
    }
  }
  
  @ComponentDecorators.Lifecycle('onMount')
  setupAutoSave(this: ComponentThis<TodoProps, TodoState>) {
    setInterval(() => {
      this.saveToStorage(); // 'this' correctly bound
    }, 30000);
  }
  
  // Method automatically bound due to @Bind decorator
  addTodo(this: ComponentThis<TodoProps, TodoState>, text: string) {
    const todo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date()
    };
    
    this.setState(state => ({
      ...state,
      todos: [...state.todos, todo]
    }));
    
    this.emit('todo-added', { todo });
  }
  
  private saveToStorage(this: ComponentThis<TodoProps, TodoState>) {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }
}
```

### Caso 5: Context and Dependency Injection

```typescript
// Service with proper this binding
class ApiService {
  constructor(private baseUrl: string) {}
  
  async get<T>(this: ApiService, endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }
  
  async post<T>(this: ApiService, endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

// Component with dependency injection
class UserListComponent extends Component<UserListProps, UserListState> {
  private apiService!: ApiService;
  
  onInit(this: ComponentThis<UserListProps, UserListState>) {
    // Inject service with preserved context
    this.apiService = this.context.inject<ApiService>('apiService');
  }
  
  async loadUsers(this: ComponentThis<UserListProps, UserListState>) {
    this.setState({ loading: true });
    
    try {
      // Service methods preserve their context
      const users = await this.apiService.get<User[]>('/users');
      this.setState({ users, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }
  
  async deleteUser(this: ComponentThis<UserListProps, UserListState>, userId: string) {
    try {
      await this.apiService.delete(`/users/${userId}`);
      this.setState(state => ({
        ...state,
        users: state.users.filter(u => u.id !== userId)
      }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
}

// Context setup
const context = new ComponentContext();
context.provide('apiService', new ApiService('https://api.example.com'));

const userList = new UserListComponent();
userList.context = context;
```

### Caso 6: Component Store

```typescript
interface AppState {
  user: User | null;
  todos: Todo[];
  ui: { loading: boolean; error: string | null };
}

class AppComponent extends Component<AppProps, AppState> {
  private store!: ComponentStore<AppState>;
  
  onInit(this: ComponentThis<AppProps, AppState>) {
    this.store = new ComponentStore({
      user: null,
      todos: [],
      ui: { loading: false, error: null }
    });
    
    // Subscribe to store changes with preserved this
    this.store.subscribe((state, component) => {
      component.setState(state); // 'this' refers to the component
    });
  }
  
  // Computed property with this binding
  get todoCount(this: ComponentThis<AppProps, AppState>): number {
    return this.store.computed(
      state => state.todos.length,
      ['todos']
    );
  }
  
  get completedCount(this: ComponentThis<AppProps, AppState>): number {
    return this.store.computed(
      state => state.todos.filter(t => t.completed).length,
      ['todos']
    );
  }
  
  // Actions with proper this context
  async addTodo(this: ComponentThis<AppProps, AppState>, text: string) {
    this.store.setState(state => ({
      ...state,
      ui: { ...state.ui, loading: true }
    }));
    
    try {
      const todo = await this.apiService.post<Todo>('/todos', { text });
      
      this.store.setState(state => ({
        ...state,
        todos: [...state.todos, todo],
        ui: { ...state.ui, loading: false }
      }));
    } catch (error) {
      this.store.setState(state => ({
        ...state,
        ui: { loading: false, error: error.message }
      }));
    }
  }
  
  render(this: ComponentThis<AppProps, AppState>): string {
    const total = this.todoCount;
    const completed = this.completedCount;
    
    return `
      <div class="app">
        <h1>Todos (${completed}/${total})</h1>
        <!-- Component content -->
      </div>
    `;
  }
}
```

## ✅ Criterios de Evaluación

- [ ] **This binding**: Métodos mantienen contexto correcto
- [ ] **Type safety**: Parámetro `this` tipado correctamente
- [ ] **Context preservation**: Callbacks preservan contexto
- [ ] **Lifecycle hooks**: Hooks con this binding funcional
- [ ] **Event handling**: Eventos con contexto preservado
- [ ] **Composition**: Mixins y composición funcionan
- [ ] **Decorators**: Decorators preservan this context
- [ ] **Performance**: Binding eficiente sin memory leaks

## 🎁 Bonus

- Implementa hot-reloading que preserve el estado
- Agrega system de templates con this-aware expressions
- Crea DevTools para inspección de componentes
- Implementa lazy loading de componentes

## 💡 Pistas

1. Usa `this: Type` parameter para tipado de this
2. `Function.prototype.bind()` preserva contexto
3. Arrow functions heredan this del scope padre
4. WeakMap ayuda a prevenir memory leaks
5. Decorators pueden modificar method binding

## 🔗 Conceptos Clave

- This parameter
- Context preservation
- Method binding
- Component lifecycle
- Event handling
- Mixin pattern
- Decorator pattern
- Dependency injection

---

**Anterior:** [Pipeline Functions](../02-Funciones_Orden_Superior/05-Pipeline_Functions.md) | **Siguiente:** [Query Builder](./02-Query_Builder.md)
