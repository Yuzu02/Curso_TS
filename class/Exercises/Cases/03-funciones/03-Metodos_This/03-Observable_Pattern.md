# 🎯 Ejercicio 3.3.3: Observable Pattern

## 📋 Descripción

Implementa el patrón Observable con context preservation, reactive streams y operadores funcionales que mantengan el contexto `this` apropiado en todas las operaciones.

## 🎯 Objetivos

- Crear observables con this preservation
- Implementar operadores reactivos con context binding
- Manejar subscripciones con cleanup automático
- Crear streams reactivos type-safe

## 📊 Dificultad: 🔴 Avanzado

**Tiempo estimado:** 25 minutos

## 📝 Requisitos

### 1. Core Observable Types

```typescript
interface Observer<T> {
  next: (this: Observer<T>, value: T) => void;
  error?: (this: Observer<T>, error: any) => void;
  complete?: (this: Observer<T>) => void;
}

interface Subscription {
  unsubscribe(this: Subscription): void;
  readonly closed: boolean;
}

interface Observable<T> {
  // Core subscription with this preservation
  subscribe(this: Observable<T>, observer: Partial<Observer<T>>): Subscription;
  subscribe(
    this: Observable<T>,
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription;
  
  // Operators with this binding
  map<R>(this: Observable<T>, mapper: (this: any, value: T) => R): Observable<R>;
  filter(this: Observable<T>, predicate: (this: any, value: T) => boolean): Observable<T>;
  flatMap<R>(this: Observable<T>, mapper: (this: any, value: T) => Observable<R>): Observable<R>;
  
  // Error handling with context preservation
  catch<R>(this: Observable<T>, handler: (this: any, error: any) => Observable<R>): Observable<T | R>;
  retry(this: Observable<T>, count?: number): Observable<T>;
  
  // Combination operators
  merge<R>(this: Observable<T>, other: Observable<R>): Observable<T | R>;
  combine<R>(this: Observable<T>, other: Observable<R>): Observable<[T, R]>;
  
  // Timing operators with this preservation
  debounce(this: Observable<T>, time: number): Observable<T>;
  throttle(this: Observable<T>, time: number): Observable<T>;
  delay(this: Observable<T>, time: number): Observable<T>;
  
  // Utility methods
  take(this: Observable<T>, count: number): Observable<T>;
  skip(this: Observable<T>, count: number): Observable<T>;
  distinct(this: Observable<T>): Observable<T>;
  
  // Conversion
  toPromise(this: Observable<T>): Promise<T>;
  toArray(this: Observable<T>): Promise<T[]>;
}
```

### 2. Subject and BehaviorSubject

```typescript
interface Subject<T> extends Observable<T> {
  // Emit values with this binding
  next(this: Subject<T>, value: T): void;
  error(this: Subject<T>, error: any): void;
  complete(this: Subject<T>): void;
  
  // Subject state
  readonly isClosed: boolean;
  readonly hasError: boolean;
  readonly thrownError: any;
  
  // Observer management with this preservation
  addObserver(this: Subject<T>, observer: Observer<T>): void;
  removeObserver(this: Subject<T>, observer: Observer<T>): void;
  
  // Conversion
  asObservable(this: Subject<T>): Observable<T>;
}

interface BehaviorSubject<T> extends Subject<T> {
  // Current value access with this binding
  readonly value: T;
  getValue(this: BehaviorSubject<T>): T;
  
  // Update value with this preservation
  setValue(this: BehaviorSubject<T>, value: T): void;
}

interface ReplaySubject<T> extends Subject<T> {
  // Replay configuration
  readonly bufferSize: number;
  readonly windowTime?: number;
  
  // Buffer access with this binding
  getBuffer(this: ReplaySubject<T>): T[];
  clearBuffer(this: ReplaySubject<T>): void;
}
```

### 3. Observable Factory

```typescript
interface ObservableFactory {
  // Creation methods with this preservation
  create<T>(
    subscribe: (this: any, observer: Observer<T>) => Subscription | (() => void)
  ): Observable<T>;
  
  // Static creators
  of<T>(...values: T[]): Observable<T>;
  from<T>(source: T[] | Promise<T> | Observable<T>): Observable<T>;
  fromEvent<T>(target: EventTarget, event: string): Observable<T>;
  
  // Empty and error observables
  empty<T>(): Observable<T>;
  never<T>(): Observable<T>;
  throw<T>(error: any): Observable<T>;
  
  // Timer observables with this binding
  interval(period: number): Observable<number>;
  timer(delay: number, period?: number): Observable<number>;
  
  // Combination creators
  merge<T>(...sources: Observable<T>[]): Observable<T>;
  concat<T>(...sources: Observable<T>[]): Observable<T>;
  race<T>(...sources: Observable<T>[]): Observable<T>;
  
  // Advanced creators
  defer<T>(factory: () => Observable<T>): Observable<T>;
  generate<T>(
    initialState: any,
    condition: (state: any) => boolean,
    iterate: (state: any) => any,
    resultSelector: (state: any) => T
  ): Observable<T>;
}
```

### 4. Reactive State Management

```typescript
interface ReactiveState<T> {
  // State access with this binding
  get(this: ReactiveState<T>): T;
  set(this: ReactiveState<T>, value: T): void;
  update(this: ReactiveState<T>, updater: (current: T) => T): void;
  
  // Observable state
  asObservable(this: ReactiveState<T>): Observable<T>;
  
  // Computed properties with this preservation
  computed<R>(
    this: ReactiveState<T>,
    selector: (this: any, state: T) => R,
    dependencies?: ReactiveState<any>[]
  ): ReactiveState<R>;
  
  // State history
  history(this: ReactiveState<T>): Observable<StateChange<T>>;
  
  // Validation with this binding
  validate(
    this: ReactiveState<T>,
    validator: (this: any, state: T) => boolean | string
  ): ReactiveState<T>;
}

interface StateChange<T> {
  previous: T;
  current: T;
  timestamp: Date;
  source?: string;
}

interface ReactiveStore {
  // State registration with this preservation
  register<T>(
    this: ReactiveStore,
    key: string,
    initialValue: T
  ): ReactiveState<T>;
  
  // State access
  get<T>(this: ReactiveStore, key: string): ReactiveState<T> | null;
  select<T, R>(
    this: ReactiveStore,
    key: string,
    selector: (this: any, state: T) => R
  ): Observable<R>;
  
  // Store operations with this binding
  dispatch(this: ReactiveStore, action: Action): void;
  middleware(
    this: ReactiveStore,
    middleware: (this: any, action: Action, next: () => void) => void
  ): void;
  
  // Global state
  snapshot(this: ReactiveStore): Record<string, any>;
  restore(this: ReactiveStore, snapshot: Record<string, any>): void;
}

interface Action {
  type: string;
  payload?: any;
  meta?: any;
}
```

### 5. Advanced Operators

```typescript
interface AdvancedOperators {
  // Window operators with this preservation
  window<T>(this: Observable<T>, windowBoundaries: Observable<any>): Observable<Observable<T>>;
  buffer<T>(this: Observable<T>, bufferBoundaries: Observable<any>): Observable<T[]>;
  
  // Scan operators with this binding
  scan<T, R>(
    this: Observable<T>,
    accumulator: (this: any, acc: R, value: T, index: number) => R,
    seed: R
  ): Observable<R>;
  
  // Conditional operators
  takeWhile<T>(this: Observable<T>, predicate: (this: any, value: T) => boolean): Observable<T>;
  skipWhile<T>(this: Observable<T>, predicate: (this: any, value: T) => boolean): Observable<T>;
  
  // Share operators with this preservation
  share<T>(this: Observable<T>): Observable<T>;
  shareReplay<T>(this: Observable<T>, bufferSize?: number): Observable<T>;
  
  // Side effect operators
  tap<T>(this: Observable<T>, observer: Partial<Observer<T>>): Observable<T>;
  finalize<T>(this: Observable<T>, callback: (this: any) => void): Observable<T>;
  
  // Error operators with this binding
  retryWhen<T>(
    this: Observable<T>,
    notifier: (this: any, errors: Observable<any>) => Observable<any>
  ): Observable<T>;
  
  // Time-based operators
  timeout<T>(this: Observable<T>, due: number, scheduler?: any): Observable<T>;
  timeInterval<T>(this: Observable<T>): Observable<{ value: T; interval: number }>;
}
```

### 6. Context-Aware Components

```typescript
// Observable component mixin
interface ObservableMixin<TState = any> {
  // State streams with this preservation
  state$: BehaviorSubject<TState>;
  
  // Property streams
  createProperty$<K extends keyof TState>(
    this: ObservableMixin<TState>,
    key: K
  ): Observable<TState[K]>;
  
  // Lifecycle streams with this binding
  onInit$: Subject<void>;
  onDestroy$: Subject<void>;
  
  // Auto-cleanup subscriptions
  subscribe$<T>(
    this: ObservableMixin<TState>,
    observable: Observable<T>,
    observer: Partial<Observer<T>>
  ): void;
  
  // Effect handling with this preservation
  effect<T>(
    this: ObservableMixin<TState>,
    source$: Observable<T>,
    effect: (this: any, value: T) => void,
    error?: (this: any, error: any) => void
  ): void;
  
  // Computed properties
  computed$<R>(
    this: ObservableMixin<TState>,
    selector: (this: any, state: TState) => R
  ): Observable<R>;
}

// Observable form controls
interface FormControl<T> {
  // Value access with this binding
  value: T;
  setValue(this: FormControl<T>, value: T): void;
  patchValue(this: FormControl<T>, value: Partial<T>): void;
  
  // Observables with this preservation
  valueChanges$: Observable<T>;
  statusChanges$: Observable<'VALID' | 'INVALID' | 'PENDING'>;
  
  // Validation with this binding
  setValidators(
    this: FormControl<T>,
    validators: Array<(this: any, value: T) => string | null>
  ): void;
  
  // Status
  readonly valid: boolean;
  readonly errors: Record<string, any> | null;
  
  // Methods with this preservation
  markAsTouched(this: FormControl<T>): void;
  markAsDirty(this: FormControl<T>): void;
  reset(this: FormControl<T>, value?: T): void;
}
```

## 🧪 Casos de Prueba

### Caso 1: Basic Observable

```typescript
class UserService {
  private users$ = new BehaviorSubject<User[]>([]);
  
  // Method with proper this binding
  getUsers(this: UserService): Observable<User[]> {
    return this.users$.asObservable();
  }
  
  // Load users with this preservation
  async loadUsers(this: UserService): Promise<void> {
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      this.users$.next(users); // 'this' correctly bound
    } catch (error) {
      this.users$.error(error);
    }
  }
  
  // Add user with this binding
  addUser(this: UserService, user: User): void {
    const currentUsers = this.users$.value;
    this.users$.next([...currentUsers, user]);
  }
  
  // Find user with this preservation
  findUser(this: UserService, id: string): Observable<User | null> {
    return this.users$.pipe(
      map(users => users.find(u => u.id === id) || null)
    );
  }
}

// Usage with proper context
const userService = new UserService();

// Subscribe with this binding preserved
userService.getUsers().subscribe({
  next(users) {
    console.log('Users updated:', users.length);
  },
  error(error) {
    console.error('Error loading users:', error);
  }
});

// Load data
await userService.loadUsers();

// Find specific user
userService.findUser('123').subscribe(user => {
  if (user) {
    console.log('Found user:', user.name);
  }
});
```

### Caso 2: Reactive Component

```typescript
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  loading: boolean;
}

class TodoComponent implements ObservableMixin<TodoState> {
  // State stream with this preservation
  state$ = new BehaviorSubject<TodoState>({
    todos: [],
    filter: 'all',
    loading: false
  });
  
  // Lifecycle streams
  onInit$ = new Subject<void>();
  onDestroy$ = new Subject<void>();
  
  // Computed observables with this binding
  get filteredTodos$(this: TodoComponent): Observable<Todo[]> {
    return this.state$.pipe(
      map(state => {
        switch (state.filter) {
          case 'active':
            return state.todos.filter(todo => !todo.completed);
          case 'completed':
            return state.todos.filter(todo => todo.completed);
          default:
            return state.todos;
        }
      })
    );
  }
  
  get todoCount$(this: TodoComponent): Observable<number> {
    return this.state$.pipe(
      map(state => state.todos.length)
    );
  }
  
  get completedCount$(this: TodoComponent): Observable<number> {
    return this.state$.pipe(
      map(state => state.todos.filter(t => t.completed).length)
    );
  }
  
  // Actions with this preservation
  addTodo(this: TodoComponent, text: string): void {
    const todo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date()
    };
    
    this.updateState(state => ({
      ...state,
      todos: [...state.todos, todo]
    }));
  }
  
  toggleTodo(this: TodoComponent, id: string): void {
    this.updateState(state => ({
      ...state,
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  }
  
  setFilter(this: TodoComponent, filter: TodoState['filter']): void {
    this.updateState(state => ({ ...state, filter }));
  }
  
  // State update with this binding
  private updateState(
    this: TodoComponent,
    updater: (state: TodoState) => TodoState
  ): void {
    const currentState = this.state$.value;
    const newState = updater(currentState);
    this.state$.next(newState);
  }
  
  // Effect setup with this preservation
  setupEffects(this: TodoComponent): void {
    // Auto-save effect
    this.effect(
      this.state$.pipe(
        debounce(1000),
        map(state => state.todos)
      ),
      todos => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }
    );
    
    // Loading state effect
    this.effect(
      this.state$.pipe(
        map(state => state.loading)
      ),
      loading => {
        document.body.classList.toggle('loading', loading);
      }
    );
  }
  
  // Subscription management with this binding
  subscribe$<T>(
    this: TodoComponent,
    observable: Observable<T>,
    observer: Partial<Observer<T>>
  ): void {
    const subscription = observable
      .pipe(
        takeUntil(this.onDestroy$) // Auto-cleanup
      )
      .subscribe(observer);
  }
  
  // Effect helper with this preservation
  effect<T>(
    this: TodoComponent,
    source$: Observable<T>,
    effect: (value: T) => void,
    error?: (error: any) => void
  ): void {
    this.subscribe$(source$, {
      next: effect,
      error: error || (err => console.error('Effect error:', err))
    });
  }
  
  // Component destruction
  destroy(this: TodoComponent): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.state$.complete();
  }
}

// Usage
const todoComponent = new TodoComponent();
todoComponent.setupEffects();

// Subscribe to computed values
todoComponent.filteredTodos$.subscribe(todos => {
  console.log('Filtered todos:', todos);
});

todoComponent.todoCount$.subscribe(count => {
  console.log('Total todos:', count);
});

// Actions
todoComponent.addTodo('Learn TypeScript');
todoComponent.addTodo('Build Observable system');
todoComponent.toggleTodo('todo-id-1');
todoComponent.setFilter('active');
```

### Caso 3: Form Controls

```typescript
class ReactiveForm {
  // Form controls with this preservation
  name = new FormControl('');
  email = new FormControl('');
  age = new FormControl(0);
  
  // Form state with this binding
  get valid$(this: ReactiveForm): Observable<boolean> {
    return combineLatest([
      this.name.statusChanges$,
      this.email.statusChanges$,
      this.age.statusChanges$
    ]).pipe(
      map(statuses => statuses.every(status => status === 'VALID'))
    );
  }
  
  get value$(this: ReactiveForm): Observable<FormValue> {
    return combineLatest([
      this.name.valueChanges$,
      this.email.valueChanges$,
      this.age.valueChanges$
    ]).pipe(
      map(([name, email, age]) => ({ name, email, age }))
    );
  }
  
  constructor() {
    this.setupValidation();
    this.setupEffects();
  }
  
  // Validation setup with this preservation
  private setupValidation(this: ReactiveForm): void {
    this.name.setValidators([
      value => value.length < 2 ? 'Name too short' : null,
      value => value.length > 50 ? 'Name too long' : null
    ]);
    
    this.email.setValidators([
      value => !value.includes('@') ? 'Invalid email' : null
    ]);
    
    this.age.setValidators([
      value => value < 0 ? 'Age must be positive' : null,
      value => value > 120 ? 'Age too high' : null
    ]);
  }
  
  // Effects with this binding
  private setupEffects(this: ReactiveForm): void {
    // Auto-save draft
    this.value$
      .pipe(debounce(1000))
      .subscribe(value => {
        localStorage.setItem('formDraft', JSON.stringify(value));
      });
    
    // Validation feedback
    this.name.statusChanges$.subscribe(status => {
      const element = document.getElementById('name-input');
      element?.classList.toggle('invalid', status === 'INVALID');
    });
  }
  
  // Form submission with this preservation
  async submit(this: ReactiveForm): Promise<void> {
    if (!(await this.valid$.pipe(take(1)).toPromise())) {
      throw new Error('Form is invalid');
    }
    
    const value = await this.value$.pipe(take(1)).toPromise();
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });
      
      if (response.ok) {
        this.reset();
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  }
  
  // Form reset with this binding
  reset(this: ReactiveForm): void {
    this.name.reset();
    this.email.reset();
    this.age.reset(0);
  }
}

interface FormValue {
  name: string;
  email: string;
  age: number;
}

// Usage
const form = new ReactiveForm();

// Subscribe to form state
form.valid$.subscribe(valid => {
  const submitButton = document.getElementById('submit');
  submitButton!.disabled = !valid;
});

// Handle form submission
document.getElementById('form')!.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    await form.submit(); // 'this' context preserved
    console.log('Form submitted successfully');
  } catch (error) {
    console.error('Submission failed:', error.message);
  }
});
```

### Caso 4: Custom Operators

```typescript
// Custom operator with this preservation
function filterWithContext<T>(
  predicate: (this: any, value: T, index: number) => boolean
): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) => {
    return new Observable<T>(observer => {
      let index = 0;
      
      return source.subscribe({
        next(value) {
          try {
            if (predicate.call(this, value, index++)) {
              observer.next(value);
            }
          } catch (error) {
            observer.error(error);
          }
        },
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer)
      });
    });
  };
}

// Context-aware map operator
function mapWithContext<T, R>(
  mapper: (this: any, value: T, index: number) => R,
  context?: any
): (source: Observable<T>) => Observable<R> {
  return (source: Observable<T>) => {
    return new Observable<R>(observer => {
      let index = 0;
      
      return source.subscribe({
        next(value) {
          try {
            const result = mapper.call(context || this, value, index++);
            observer.next(result);
          } catch (error) {
            observer.error(error);
          }
        },
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer)
      });
    });
  };
}

// Usage with context
class DataProcessor {
  private multiplier = 10;
  
  // Process data with this binding
  processNumbers(this: DataProcessor, numbers: Observable<number>): Observable<string> {
    return numbers.pipe(
      filterWithContext(function(this: DataProcessor, value) {
        return value > 0; // Access to context if needed
      }),
      mapWithContext(function(this: DataProcessor, value) {
        return `Processed: ${value * this.multiplier}`;
      }, this) // Explicit context binding
    );
  }
}

const processor = new DataProcessor();
const numbers$ = of(1, -2, 3, -4, 5);

processor.processNumbers(numbers$).subscribe(result => {
  console.log(result); // "Processed: 10", "Processed: 30", "Processed: 50"
});
```

### Caso 5: Reactive Store

```typescript
class AppStore implements ReactiveStore {
  private states = new Map<string, ReactiveState<any>>();
  private actions$ = new Subject<Action>();
  
  // Register state with this preservation
  register<T>(this: AppStore, key: string, initialValue: T): ReactiveState<T> {
    const state = new ReactiveStateImpl(initialValue);
    this.states.set(key, state);
    return state;
  }
  
  // Get state with this binding
  get<T>(this: AppStore, key: string): ReactiveState<T> | null {
    return this.states.get(key) || null;
  }
  
  // Select with this preservation
  select<T, R>(
    this: AppStore,
    key: string,
    selector: (state: T) => R
  ): Observable<R> {
    const state = this.get<T>(key);
    if (!state) {
      return throwError(new Error(`State '${key}' not found`));
    }
    
    return state.asObservable().pipe(
      map(selector)
    );
  }
  
  // Dispatch actions with this binding
  dispatch(this: AppStore, action: Action): void {
    this.actions$.next(action);
  }
  
  // Action stream with this preservation
  get actions$(this: AppStore): Observable<Action> {
    return this.actions$.asObservable();
  }
  
  // Global state snapshot
  snapshot(this: AppStore): Record<string, any> {
    const result: Record<string, any> = {};
    
    this.states.forEach((state, key) => {
      result[key] = state.get();
    });
    
    return result;
  }
  
  // Restore state with this binding
  restore(this: AppStore, snapshot: Record<string, any>): void {
    Object.entries(snapshot).forEach(([key, value]) => {
      const state = this.states.get(key);
      if (state) {
        state.set(value);
      }
    });
  }
}

// Usage
const store = new AppStore();

// Register states
const userState = store.register('user', null);
const todosState = store.register('todos', []);

// Select data
store.select('user', user => user?.name).subscribe(name => {
  console.log('User name:', name);
});

// Listen to actions
store.actions$.subscribe(action => {
  console.log('Action dispatched:', action.type);
});

// Dispatch actions
store.dispatch({ type: 'LOGIN', payload: { id: '1', name: 'John' } });
```

## ✅ Criterios de Evaluación

- [ ] **This preservation**: Contexto mantenido en observables
- [ ] **Type safety**: Tipos correctos en operadores
- [ ] **Memory management**: Subscripciones limpiadas automáticamente
- [ ] **Error handling**: Errores manejados con contexto preservado
- [ ] **Operators**: Operadores custom con this binding
- [ ] **Reactive patterns**: Patrones reactivos implementados
- [ ] **Performance**: Streams eficientes sin memory leaks
- [ ] **Composition**: Observables se componen correctamente

## 🎁 Bonus

- Implementa time-travel debugging para observables
- Agrega marble testing para operadores custom
- Crea DevTools para visualización de streams
- Implementa hot/cold observable optimization

## 💡 Pistas

1. Usa `Function.prototype.call()` para this binding explícito
2. WeakMap previene memory leaks en subscripciones
3. `takeUntil` permite auto-cleanup
4. Arrow functions preservan this del scope padre
5. Subjects pueden actuar como bridges

## 🔗 Conceptos Clave

- Observer pattern
- This parameter preservation
- Reactive programming
- Stream composition
- Memory management
- Error handling
- Custom operators
- Context binding

---

**Anterior:** [Query Builder](./02-Query_Builder.md) | **Siguiente:** [Decorator System](./04-Decorator_System.md)
