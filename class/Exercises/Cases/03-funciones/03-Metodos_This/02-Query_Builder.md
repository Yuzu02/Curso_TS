# � Ejercicio 3.3.2: Query Builder

## 📋 Descripción

Desarrolla un Query Builder que permita construir consultas SQL de forma type-safe usando method chaining y preservando el contexto de `this` correctamente.

## 🎯 Objetivos

- Implementar fluent interface con method chaining
- Mantener type safety en todas las operaciones
- Usar `this` binding correctamente en métodos
- Manejar generic constraints avanzados

## � Dificultad: 🔴 Avanzado

**Tiempo estimado:** 35 minutos

## 📝 Requisitos

### 1. Query Builder Base

```typescript
// Tipos base
interface TableSchema {
  [key: string]: 'string' | 'number' | 'boolean' | 'date';
}

interface QueryResult<T> {
  sql: string;
  params: any[];
  execute(): Promise<T[]>;
}

// Tipos auxiliares
type WhereOperator = '=' | '!=' | '>' | '<' | '>=' | '<=' | 'LIKE' | 'NOT LIKE';

type TypeForColumn<T> = T extends 'string' 
  ? string 
  : T extends 'number' 
    ? number 
    : T extends 'boolean' 
      ? boolean 
      : T extends 'date' 
        ? Date 
        : never;

type JoinCondition<T, U> = {
  left: keyof T;
  right: keyof U;
  operator?: '=' | '!=' | '>' | '<' | '>=' | '<=';
};
```

### 2. Clase Principal

```typescript
class QueryBuilder<T extends TableSchema> {
  constructor(private table: string, private schema: T);
  
  // SELECT operations - asegurar que retornen 'this' para chaining
  select<K extends keyof T>(...columns: K[]): this;
  selectAll(): this;
  
  // WHERE operations - mantener type safety
  where<K extends keyof T>(column: K, operator: WhereOperator, value: TypeForColumn<T[K]>): this;
  whereIn<K extends keyof T>(column: K, values: TypeForColumn<T[K]>[]): this;
  
  // JOIN operations - preservar tipos combinados
  join<U extends TableSchema>(
    table: string, 
    schema: U,
    condition: JoinCondition<T, U>
  ): QueryBuilder<T & U>;
  
  // ORDER BY operations
  orderBy<K extends keyof T>(column: K, direction?: 'ASC' | 'DESC'): this;
  
  // LIMIT operations
  limit(count: number): this;
  
  // Build final query
  build(): QueryResult<Pick<T, keyof T>>;
}
```

## 💡 Estructura Base para Implementar

```typescript
// TODO: Implementa los tipos auxiliares y validadores
type WhereOperator = '=' | '!=' | '>' | '<' | '>=' | '<=' | 'LIKE' | 'NOT LIKE';

// TODO: Define type mapping para columnas
type TypeForColumn<T> = T extends 'string' 
  ? string 
  : T extends 'number' 
    ? number 
    : T extends 'boolean' 
      ? boolean 
      : T extends 'date' 
        ? Date 
        : never;

// TODO: Implementa el QueryBuilder principal
class QueryBuilder<T extends TableSchema> {
  private selectedColumns: string[] = [];
  private whereConditions: string[] = [];
  private orderByClause: string = '';
  private limitClause: string = '';
  private joinClauses: string[] = [];
  private parameters: any[] = [];
  
  constructor(private table: string, private schema: T) {
    // TODO: Inicializar estado del builder
  }
  
  select<K extends keyof T>(...columns: K[]): this {
    // TODO: Implementar SELECT con validación de columnas
    // TODO: Asegurar que retorna 'this' para method chaining
  }
  
  where<K extends keyof T>(
    column: K, 
    operator: WhereOperator, 
    value: TypeForColumn<T[K]>
  ): this {
    // TODO: Implementar WHERE con type safety
    // TODO: Agregar parámetro a la lista para prepared statements
  }
  
  join<U extends TableSchema>(
    table: string, 
    schema: U,
    condition: JoinCondition<T, U>
  ): QueryBuilder<T & U> {
    // TODO: Implementar JOIN preservando tipos combinados
    // TODO: Retornar nuevo QueryBuilder con esquema combinado
  }
  
  orderBy<K extends keyof T>(column: K, direction: 'ASC' | 'DESC' = 'ASC'): this {
    // TODO: Implementar ORDER BY con validación de columnas
  }
  
  limit(count: number): this {
    // TODO: Implementar LIMIT con validación
  }
  
  build(): QueryResult<Pick<T, keyof T>> {
    // TODO: Generar SQL final y lista de parámetros
    // TODO: Retornar objeto con sql, params y método execute
  }
}
```

## 🧪 Casos de Prueba

### Caso 1: Query básica con method chaining

```typescript
// Schema de ejemplo
interface UserSchema {
  id: 'number';
  name: 'string';
  email: 'string';
  age: 'number';
  active: 'boolean';
  created_at: 'date';
}

const userSchema: UserSchema = {
  id: 'number',
  name: 'string', 
  email: 'string',
  age: 'number',
  active: 'boolean',
  created_at: 'date'
};

// Ejemplo de uso esperado
const query = new QueryBuilder('users', userSchema)
  .select('id', 'name', 'email')
  .where('active', '=', true)
  .where('age', '>=', 18)
  .orderBy('name', 'ASC')
  .limit(10);

const result = query.build();
console.log(result.sql);
// Debería generar: SELECT users.id, users.name, users.email FROM users 
// WHERE users.active = ? AND users.age >= ? ORDER BY users.name ASC LIMIT 10
```

### Caso 2: Query con JOIN y type safety

```typescript
// Schema de posts
interface PostSchema {
  id: 'number';
  title: 'string';
  user_id: 'number';
  published: 'boolean';
}

const postSchema: PostSchema = {
  id: 'number',
  title: 'string',
  user_id: 'number',
  published: 'boolean'
};

// JOIN con preservación de tipos
const joinedQuery = new QueryBuilder('users', userSchema)
  .join('posts', postSchema, { left: 'id', right: 'user_id' })
  .select('name', 'title') // Debe tener acceso a columnas de ambas tablas
  .where('published', '=', true);
```

### Caso 3: Queries complejas con múltiples condiciones

```typescript
// Query avanzada con múltiples WHERE y ORDER BY
const complexQuery = new QueryBuilder('users', userSchema)
  .selectAll()
  .where('age', '>=', 21)
  .where('name', 'LIKE', 'Juan%')
  .whereIn('id', [1, 2, 3, 4, 5])
  .orderBy('created_at', 'DESC')
  .orderBy('name', 'ASC')
  .limit(50);
```

## ✅ Criterios de Evaluación

- [ ] **Method Chaining**: Funciona correctamente retornando `this`
- [ ] **Type Safety**: Validación correcta de columnas y valores  
- [ ] **This Binding**: Contexto de `this` preservado en todos los métodos
- [ ] **Generic Constraints**: Manejo correcto de tipos de esquema
- [ ] **JOIN Operations**: Combinación correcta de tipos en joins
- [ ] **SQL Generation**: SQL generado es válido y seguro

## 🎓 Puntos de Aprendizaje

1. **Method Chaining**: Implementación de fluent interface con `this`
2. **Generic Constraints**: Uso avanzado de `keyof` y conditional types
3. **Type Safety**: Validación de tipos en tiempo de compilación
4. **This Binding**: Preservación del contexto en method chaining
5. **Intersection Types**: Combinación de tipos en operaciones JOIN

## 📚 Recursos

- [Method Chaining](https://www.typescriptlang.org/docs/handbook/2/classes.html#this-types)
- [Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

## 🗂️ Archivos a Crear

```text
02-Query_Builder/
├── solution.ts          # Tu implementación aquí
├── types.ts            # Tipos auxiliares
├── schemas.ts          # Esquemas de ejemplo
└── tests.ts            # Casos de prueba (opcional)
```

---

## 🧭 Navegación

[⬅️ Ejercicio Anterior](01-Form_Validator.md) | [📚 Índice](../README.md) | [➡️ Ejercicio Siguiente](03-State_Machine.md)

---

💡 **Tip**: Empieza implementando los métodos básicos asegurándote de que retornen `this`. Usa `keyof T` para validar nombres de columnas y conditional types para mapear tipos de datos.
