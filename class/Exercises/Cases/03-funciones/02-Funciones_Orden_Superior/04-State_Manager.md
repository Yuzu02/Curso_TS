# 🎯 Ejercicio 3.2.4: State Manager

## 📋 Descripción

Implementa un gestor de estado reactivo que utilice funciones de orden superior, subscribers tipados y patrones de inmutabilidad para crear un sistema de gestión de estado robusto y type-safe.

## 🎯 Objetivos

- Crear un sistema de gestión de estado inmutable
- Implementar subscribers tipados con callbacks
- Usar selectors y computed values
- Manejar middleware y side effects

## 📊 Dificultad: 🔴 Avanzado

**Tiempo estimado:** 30 minutos

## 📝 Requisitos

### 1. Core State Types

```typescript
interface StateManager<TState = any> {
  // State access
  getState(): TState;
  setState(newState: TState): void;
  updateState(updater: StateUpdater<TState>): void;
  
  // Subscriptions
  subscribe(listener: StateListener<TState>): Unsubscribe;
  subscribe<TSelected>(
    selector: StateSelector<TState, TSelected>,
    listener: StateListener<TSelected>
  ): Unsubscribe;
  
  // Computed values
  computed<TResult>(
    selector: StateSelector<TState, TResult>,
    dependencies?: StateSelector<TState, any>[]
  ): ComputedValue<TResult>;
  
  // Actions
  dispatch<TPayload = any>(action: Action<TPayload>): void;
  dispatch<TPayload = any>(type: string, payload: TPayload): void;
  
  // Middleware
  use(middleware: Middleware<TState>): void;
  
  // Utilities
  reset(): void;
  destroy(): void;
}

// Core types
type StateUpdater<TState> = (currentState: TState) => TState;
type StateListener<TState> = (state: TState, previousState: TState) => void;
type StateSelector<TState, TResult> = (state: TState) => TResult;
type Unsubscribe = () => void;

interface Action<TPayload = any> {
  type: string;
  payload: TPayload;
  meta?: any;
}

interface ComputedValue<T> {
  get(): T;
  subscribe(listener: (value: T) => void): Unsubscribe;
  invalidate(): void;
}
```

### 2. Advanced State Features

```typescript
// Reducer pattern
type Reducer<TState, TAction extends Action = Action> = (
  state: TState,
  action: TAction
) => TState;

// Middleware system
type Middleware<TState> = (
  store: MiddlewareStore<TState>
) => (next: Dispatch) => (action: Action) => void;

type Dispatch = (action: Action) => void;

interface MiddlewareStore<TState> {
  getState(): TState;
  dispatch: Dispatch;
}

// Async actions
interface AsyncAction<TState, TResult = any> {
  (dispatch: Dispatch, getState: () => TState): Promise<TResult>;
}

// Side effects
interface Effect<TState> {
  (action: Action, state: TState): void | Promise<void>;
}

interface EffectDefinition<TState> {
  pattern: string | RegExp | ((action: Action) => boolean);
  effect: Effect<TState>;
  options?: {
    once?: boolean;
    debounce?: number;
    throttle?: number;
  };
}
```

### 3. State Slicing and Composition

```typescript
// State slices
interface StateSlice<TSliceState, TRootState = any> {
  name: string;
  initialState: TSliceState;
  reducers: Record<string, Reducer<TSliceState>>;
  selectors: Record<string, StateSelector<TRootState, any>>;
  effects?: EffectDefinition<TRootState>[];
}

// Store composition
interface StoreComposer {
  combine<T extends Record<string, any>>(
    slices: { [K in keyof T]: StateSlice<T[K]> }
  ): CombinedStore<T>;
  
  enhance<TState>(
    baseStore: StateManager<TState>,
    enhancers: StoreEnhancer<TState>[]
  ): StateManager<TState>;
}

type StoreEnhancer<TState> = (
  store: StateManager<TState>
) => StateManager<TState>;

interface CombinedStore<T> extends StateManager<T> {
  getSlice<K extends keyof T>(name: K): StateManager<T[K]>;
  replaceSlice<K extends keyof T>(name: K, slice: StateSlice<T[K]>): void;
}
```

### 4. Reactive Utilities

```typescript
// Observable-like patterns
interface Observable<T> {
  subscribe(observer: Observer<T>): Subscription;
  map<R>(mapper: (value: T) => R): Observable<R>;
  filter(predicate: (value: T) => boolean): Observable<T>;
  distinctUntilChanged(compareFn?: (a: T, b: T) => boolean): Observable<T>;
  debounce(ms: number): Observable<T>;
  throttle(ms: number): Observable<T>;
}

interface Observer<T> {
  next: (value: T) => void;
  error?: (error: any) => void;
  complete?: () => void;
}

interface Subscription {
  unsubscribe(): void;
}

// State queries
interface StateQuery<TState> {
  select<TResult>(selector: StateSelector<TState, TResult>): StateQuery<TResult>;
  where(predicate: (state: TState) => boolean): StateQuery<TState>;
  distinctUntilChanged(): StateQuery<TState>;
  debounce(ms: number): StateQuery<TState>;
  subscribe(listener: StateListener<TState>): Unsubscribe;
  toObservable(): Observable<TState>;
}
```

### 5. Time Travel and Debugging

```typescript
// Time travel debugging
interface TimeTravelStore<TState> extends StateManager<TState> {
  // History management
  canUndo(): boolean;
  canRedo(): boolean;
  undo(): void;
  redo(): void;
  jumpTo(index: number): void;
  
  // History access
  getHistory(): StateHistory<TState>;
  clearHistory(): void;
  setMaxHistorySize(size: number): void;
  
  // Snapshots
  takeSnapshot(label?: string): string;
  restoreSnapshot(id: string): void;
  listSnapshots(): SnapshotInfo[];
}

interface StateHistory<TState> {
  past: HistoryEntry<TState>[];
  present: HistoryEntry<TState>;
  future: HistoryEntry<TState>[];
}

interface HistoryEntry<TState> {
  state: TState;
  action: Action;
  timestamp: Date;
  id: string;
}

interface SnapshotInfo {
  id: string;
  label?: string;
  timestamp: Date;
  actionCount: number;
}

// Development tools
interface DevTools<TState> {
  // State inspection
  inspect(): StateInspection<TState>;
  monitor(listener: (info: ActionInfo) => void): Unsubscribe;
  
  // Performance tracking
  startProfiling(): void;
  stopProfiling(): PerformanceReport;
  
  // Debugging utilities
  logState(): void;
  logActions(count?: number): void;
  exportState(): string;
  importState(data: string): void;
}

interface StateInspection<TState> {
  currentState: TState;
  subscriberCount: number;
  computedValues: ComputedValueInfo[];
  pendingEffects: EffectInfo[];
}

interface ActionInfo {
  action: Action;
  stateBefore: any;
  stateAfter: any;
  timestamp: Date;
  duration: number;
}

interface PerformanceReport {
  totalActions: number;
  averageActionTime: number;
  slowestActions: ActionInfo[];
  memoryUsage: {
    subscribers: number;
    computedValues: number;
    historySize: number;
  };
}
```

## 🧪 Casos de Prueba

### Caso 1: Basic State Management

```typescript
interface AppState {
  user: { id: string; name: string; email: string } | null;
  posts: Post[];
  ui: { loading: boolean; error: string | null };
}

const initialState: AppState = {
  user: null,
  posts: [],
  ui: { loading: false, error: null }
};

const store = new StateManager(initialState);

// Basic state updates
store.updateState(state => ({
  ...state,
  user: { id: '1', name: 'John Doe', email: 'john@example.com' }
}));

// Subscribe to state changes
const unsubscribe = store.subscribe((state, prevState) => {
  if (state.user !== prevState.user) {
    console.log('User changed:', state.user);
  }
});

// Selective subscriptions
const unsubscribeUser = store.subscribe(
  state => state.user,
  (user, prevUser) => {
    console.log('User updated:', user);
  }
);

console.log(store.getState().user?.name); // 'John Doe'
```

### Caso 2: Actions and Reducers

```typescript
// Action types
interface SetUserAction extends Action<{ id: string; name: string; email: string }> {
  type: 'SET_USER';
}

interface AddPostAction extends Action<Post> {
  type: 'ADD_POST';
}

interface SetLoadingAction extends Action<boolean> {
  type: 'SET_LOADING';
}

type AppActions = SetUserAction | AddPostAction | SetLoadingAction;

// Reducer
const appReducer: Reducer<AppState, AppActions> = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_POST':
      return { ...state, posts: [...state.posts, action.payload] };
    
    case 'SET_LOADING':
      return { ...state, ui: { ...state.ui, loading: action.payload } };
    
    default:
      return state;
  }
};

const store = new StateManager(initialState, appReducer);

// Dispatch actions
store.dispatch({
  type: 'SET_USER',
  payload: { id: '1', name: 'John Doe', email: 'john@example.com' }
});

store.dispatch('ADD_POST', {
  id: '1',
  title: 'Hello World',
  content: 'This is my first post',
  authorId: '1'
});

// Async actions
const fetchUserAction: AsyncAction<AppState, void> = async (dispatch, getState) => {
  dispatch({ type: 'SET_LOADING', payload: true });
  
  try {
    const response = await fetch('/api/user/1');
    const user = await response.json();
    dispatch({ type: 'SET_USER', payload: user });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

store.dispatch(fetchUserAction);
```

### Caso 3: Computed Values and Selectors

```typescript
// Selectors
const selectUser = (state: AppState) => state.user;
const selectPosts = (state: AppState) => state.posts;
const selectUserPosts = (state: AppState) => 
  state.posts.filter(post => post.authorId === state.user?.id);

// Computed values
const userPostCount = store.computed(
  selectUserPosts,
  [selectUser, selectPosts] // Dependencies
);

const isUserLoggedIn = store.computed(state => state.user !== null);

// Subscribe to computed values
userPostCount.subscribe(count => {
  console.log(`User has ${count} posts`);
});

isUserLoggedIn.subscribe(loggedIn => {
  console.log('User logged in:', loggedIn);
});

// Access computed values
console.log('Post count:', userPostCount.get());
console.log('Is logged in:', isUserLoggedIn.get());

// Computed values update automatically
store.dispatch('ADD_POST', {
  id: '2',
  title: 'Second Post',
  content: 'Another post',
  authorId: '1'
});
// userPostCount automatically updates and notifies subscribers
```

### Caso 4: Middleware and Effects

```typescript
// Logging middleware
const loggingMiddleware: Middleware<AppState> = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};

// Persistence middleware
const persistenceMiddleware: Middleware<AppState> = store => next => action => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('appState', JSON.stringify(state));
  return result;
};

store.use(loggingMiddleware);
store.use(persistenceMiddleware);

// Effects
const effects: EffectDefinition<AppState>[] = [
  {
    pattern: 'SET_USER',
    effect: async (action, state) => {
      // Analytics tracking
      analytics.track('user_set', { userId: action.payload.id });
    }
  },
  {
    pattern: /^ADD_/,
    effect: async (action, state) => {
      // Auto-save after any ADD action
      await autoSave(state);
    },
    options: { debounce: 1000 }
  },
  {
    pattern: action => action.type.includes('ERROR'),
    effect: async (action, state) => {
      // Error reporting
      errorReporter.report(action.payload);
    }
  }
];

effects.forEach(effect => store.addEffect(effect));
```

### Caso 5: State Composition

```typescript
// User slice
const userSlice: StateSlice<AppState['user'], AppState> = {
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
    updateUser: (state, action) => ({ ...state, ...action.payload })
  },
  selectors: {
    selectUser: state => state.user,
    selectUserId: state => state.user?.id,
    selectUserName: state => state.user?.name
  }
};

// Posts slice
const postsSlice: StateSlice<AppState['posts'], AppState> = {
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => [...state, action.payload],
    removePost: (state, action) => state.filter(p => p.id !== action.payload),
    updatePost: (state, action) => 
      state.map(p => p.id === action.payload.id ? { ...p, ...action.payload } : p)
  },
  selectors: {
    selectPosts: state => state.posts,
    selectPostById: (state, id) => state.posts.find(p => p.id === id),
    selectUserPosts: state => state.posts.filter(p => p.authorId === state.user?.id)
  }
};

// Combine slices
const composer = new StoreComposer();
const combinedStore = composer.combine({
  user: userSlice,
  posts: postsSlice,
  ui: uiSlice
});

// Access individual slices
const userStore = combinedStore.getSlice('user');
userStore.dispatch('setUser', { id: '1', name: 'John', email: 'john@example.com' });

const postsStore = combinedStore.getSlice('posts');
postsStore.dispatch('addPost', { id: '1', title: 'Hello', content: 'World', authorId: '1' });
```

### Caso 6: Time Travel and Debugging

```typescript
// Create time travel enabled store
const timeTravelStore: TimeTravelStore<AppState> = new TimeTravelStore(initialState, {
  maxHistorySize: 50
});

// Perform some actions
timeTravelStore.dispatch('SET_USER', { id: '1', name: 'John', email: 'john@example.com' });
timeTravelStore.dispatch('ADD_POST', { id: '1', title: 'Post 1', content: 'Content 1', authorId: '1' });
timeTravelStore.dispatch('ADD_POST', { id: '2', title: 'Post 2', content: 'Content 2', authorId: '1' });

// Time travel
console.log('Can undo:', timeTravelStore.canUndo()); // true
console.log('Can redo:', timeTravelStore.canRedo()); // false

timeTravelStore.undo(); // Undo last ADD_POST
console.log('Posts after undo:', timeTravelStore.getState().posts.length); // 1

timeTravelStore.undo(); // Undo previous ADD_POST
console.log('Posts after second undo:', timeTravelStore.getState().posts.length); // 0

timeTravelStore.redo(); // Redo ADD_POST
console.log('Posts after redo:', timeTravelStore.getState().posts.length); // 1

// Snapshots
const snapshotId = timeTravelStore.takeSnapshot('After first post');
timeTravelStore.dispatch('ADD_POST', { id: '3', title: 'Post 3', content: 'Content 3', authorId: '1' });

timeTravelStore.restoreSnapshot(snapshotId);
console.log('Posts after restore:', timeTravelStore.getState().posts.length); // 1

// Dev tools
const devTools = timeTravelStore.getDevTools();
devTools.startProfiling();

// Perform actions...
for (let i = 0; i < 100; i++) {
  timeTravelStore.dispatch('ADD_POST', { id: i.toString(), title: `Post ${i}`, content: `Content ${i}`, authorId: '1' });
}

const report = devTools.stopProfiling();
console.log('Performance report:', report);

// Export/import state
const exportedState = devTools.exportState();
// ... save to file or send to server ...

devTools.importState(exportedState);
```

## ✅ Criterios de Evaluación

- [ ] **Immutability**: Estado inmutable mantenido correctamente
- [ ] **Type safety**: Tipado estricto en acciones y estado
- [ ] **Subscriptions**: Sistema de suscripción funcional
- [ ] **Computed values**: Valores computados eficientes
- [ ] **Middleware**: Sistema de middleware extensible
- [ ] **Effects**: Side effects manejados correctamente
- [ ] **Performance**: Optimizaciones y memoization
- [ ] **Dev tools**: Herramientas de desarrollo funcionales

## 🎁 Bonus

- Implementa persistencia automática con diferentes backends
- Agrega soporte para optimistic updates
- Crea un sistema de migración de estado
- Implementa state normalization automática

## 💡 Pistas

1. Usa `Object.freeze()` para inmutabilidad estricta
2. Implementa shallow equality checks para optimización
3. Los computed values deben usar memoization
4. Usa WeakMap para suscripciones y limpieza automática
5. El middleware sigue el patrón de Redux

## 🔗 Conceptos Clave

- Immutability
- Observer pattern
- Function composition
- Middleware pattern
- Memoization
- Type inference
- Generic constraints
- Reactive programming

---

**Anterior:** [Utility Library](./03-Utility_Library.md) | **Siguiente:** [Pipeline Functions](./05-Pipeline_Functions.md)
