# 3.1 Tipado de Funciones

## 🎯 Objetivos

- Dominar la declaración y tipado de funciones en TypeScript
- Comprender las diferencias entre function declarations y expressions
- Implementar parámetros opcionales, por defecto y rest parameters
- Crear function overloads y signatures avanzadas

## 📚 Contenido

### Secciones

| Sección | Tema | Archivo |
|---------|------|---------|
| 3.1.1 | [Declaración y Expresiones](01-1-declaracion-expresiones.md) | Tipos básicos de funciones |
| 3.1.2 | [Overloads y Signatures](01-2-overloads-signatures.md) | Sobrecarga y firmas avanzadas |

## 🔗 Navegación

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| [Módulo 3: Funciones](README.md) | **3.1 Tipado de Funciones** | [3.2 Funciones de Orden Superior](02-funciones-orden-superior.md) |

## 🧠 Fundamentos Teóricos

### ¿Por qué Tipar Funciones?

En JavaScript, las funciones son ciudadanos de primera clase, pero carecen de garantías sobre los tipos de datos que reciben y retornan. Esta flexibilidad, aunque poderosa, es también una fuente común de errores en tiempo de ejecución.

TypeScript resuelve este problema introduciendo un **sistema de tipos estático** para funciones que:

1. **Previene errores silenciosos**: Detecta incompatibilidades de tipos antes de ejecutar el código
2. **Mejora la documentación**: Los tipos actúan como documentación viva del código
3. **Facilita el refactoring**: Cambios en una función propagan automáticamente a todos sus usos
4. **Habilita mejor tooling**: IntelliSense, autocompletado y navegación de código

### El Concepto de Function Signature

Una **signature de función** define el contrato que debe cumplir una función: qué tipos acepta como parámetros y qué tipo devuelve. Es similar a un contrato legal que especifica las obligaciones de ambas partes.

```typescript
// Esta signature dice: "Acepto dos números y prometo devolver un número"
(a: number, b: number) => number
```

Este contrato permite que TypeScript:

- Verifique que los argumentos pasados sean del tipo correcto
- Garantice que el valor de retorno sea usado apropiadamente
- Detecte errores antes de que lleguen a producción

## Conceptos Fundamentales

### Function Declarations vs Expressions

La diferencia entre declaraciones y expresiones de función no es solo sintáctica, sino que tiene implicaciones importantes en TypeScript:

**Function Declarations** se benefician del *hoisting* de JavaScript, lo que significa que pueden ser llamadas antes de su definición en el código. Esto es útil para organizar código donde las funciones principales están al inicio y las auxiliares al final.

**Function Expressions** y **Arrow Functions** no tienen hoisting, lo que proporciona un flujo de ejecución más predecible y es la forma preferida en muchos estilos de código moderno.

```typescript
// Function Declaration
function suma(a: number, b: number): number {
  return a + b;
}

// Function Expression
const multiplicar = function(a: number, b: number): number {
  return a * b;
};

// Arrow Function
const dividir = (a: number, b: number): number => {
  return a / b;
};

// Arrow Function concisa
const restar = (a: number, b: number): number => a - b;
```

### Tipos de Función Explícitos

**¿Por qué definir tipos de función explícitamente?**

Aunque TypeScript puede inferir tipos de función en muchos casos, definir tipos explícitos es crucial cuando:

1. **Creamos contratos claros**: Los tipos actúan como documentación que especifica exactamente qué espera y devuelve una función
2. **Reutilizamos lógica**: Un tipo de función puede ser usado en múltiples lugares, asegurando consistencia
3. **Mejoramos la legibilidad**: El código se vuelve más autodocumentado y fácil de entender

```typescript
// Definiendo el tipo de función como contrato reutilizable
type OperacionMatematica = (a: number, b: number) => number;

// Ahora cualquier función que implemente este tipo debe cumplir el contrato
const operacion: OperacionMatematica = (x, y) => x + y;

// Usando interface para definir funciones más complejas
interface Calculadora {
  sumar: (a: number, b: number) => number;
  restar: (a: number, b: number) => number;
}

const calc: Calculadora = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b
};
```

### Parámetros Opcionales y Por Defecto

#### La Filosofía de la Flexibilidad Controlada

Los parámetros opcionales y por defecto representan una filosofía fundamental en el diseño de APIs: proporcionar flexibilidad sin sacrificar seguridad de tipos.

**Parámetros Opcionales (`?`)** le dicen a TypeScript: "Este parámetro puede no estar presente, pero si está, debe ser del tipo especificado". Esto es especialmente útil para:

- Funciones que pueden trabajar con información parcial
- APIs que evolucionan agregando nuevos parámetros sin romper código existente
- Configuraciones donde muchos valores tienen comportamientos por defecto sensatos

**Parámetros por Defecto** van un paso más allá: "Si no proporcionas este valor, usaré este valor específico". Esto reduce la necesidad de verificaciones manuales y hace el código más conciso.

```typescript
// Parámetros opcionales (deben ir al final por sintaxis de JavaScript)
function saludar(nombre: string, apellido?: string): string {
  if (apellido) {
    return `Hola ${nombre} ${apellido}`;
  }
  return `Hola ${nombre}`;
}

// Parámetros por defecto - TypeScript infiere los tipos automáticamente
function crearUsuario(
  nombre: string,
  edad: number = 18,           // Valor por defecto inferido como number
  activo: boolean = true       // Valor por defecto inferido como boolean
): { nombre: string; edad: number; activo: boolean } {
  return { nombre, edad, activo };
}

// Combinando estrategias: opcionales con por defecto
function configurar(
  host: string,               // Requerido
  puerto?: number,            // Opcional
  ssl: boolean = false        // Por defecto
): string {
  // Operador nullish coalescing (??) para manejar valores undefined de forma elegante
  const puertoFinal = puerto ?? (ssl ? 443 : 80);
  return `${ssl ? 'https' : 'http'}://${host}:${puertoFinal}`;
}
```

### Rest Parameters: Manejando Argumentos Variables

#### ¿Por qué Rest Parameters?

En JavaScript tradicional, manejar un número variable de argumentos requería usar el objeto `arguments`, que no era type-safe y tenía comportamientos inconsistentes con arrow functions.

Los **Rest Parameters** (`...`) solucionan esto proporcionando:

1. **Type Safety**: Los argumentos adicionales se agrupan en un array tipado
2. **Consistencia**: Funciona igual en function declarations, expressions y arrow functions
3. **Flexibilidad**: Permite crear APIs que aceptan cantidades variables de argumentos de manera elegante

```typescript
// Rest parameters básicos - todos los argumentos se agrupan en un array tipado
function sumarTodos(...numeros: number[]): number {
  return numeros.reduce((acc, num) => acc + num, 0);
}

// Combinando parámetros fijos con rest parameters
function log(nivel: string, ...mensajes: string[]): void {
  console.log(`[${nivel}]`, ...mensajes);
}

// Rest parameters genéricos para máxima reutilización
function combinarArrays<T>(...arrays: T[][]): T[] {
  return arrays.flat();
}

// Ejemplos de uso que demuestran la flexibilidad
const resultado = sumarTodos(1, 2, 3, 4, 5); // 15
log('INFO', 'Usuario conectado', 'ID: 123', 'Tiempo: ' + new Date());
const combinado = combinarArrays([1, 2], [3, 4], [5, 6]); // [1, 2, 3, 4, 5, 6]
```

## 🔬 Conceptos Avanzados

### Function Overloads: Una Función, Múltiples Comportamientos

#### La Teoría detrás de los Overloads

Los **Function Overloads** resuelven un problema fundamental: ¿cómo hacer que una función se comporte de manera diferente según los tipos de argumentos que recibe, manteniendo type safety?

En lenguajes como Java o C#, esto se logra mediante múltiples definiciones de método. TypeScript adopta un enfoque único: defines múltiples **signatures** (firmas) que describen diferentes formas de llamar la función, seguidas de una **implementation** (implementación) que maneja todos los casos.

**¿Por qué es esto poderoso?**

1. **APIs más intuitivas**: Una sola función puede comportarse inteligentemente según el contexto
2. **Mejor IntelliSense**: El editor puede sugerir diferentes signatures según lo que escribas
3. **Type Safety garantizado**: TypeScript verifica que cada signature sea manejada correctamente

```typescript
// Múltiples signatures que describen diferentes formas de usar la función
function procesar(input: string): string;         // Signature 1: string → string
function procesar(input: number): number;         // Signature 2: number → number  
function procesar(input: boolean): boolean;       // Signature 3: boolean → boolean

// Implementation única que maneja todos los casos
function procesar(input: string | number | boolean): string | number | boolean {
  if (typeof input === 'string') {
    return input.toUpperCase();
  }
  if (typeof input === 'number') {
    return input * 2;
  }
  return !input;
}

// TypeScript garantiza que cada llamada use una signature válida
const str = procesar("hello");    // TypeScript sabe que devuelve string
const num = procesar(42);         // TypeScript sabe que devuelve number
const bool = procesar(true);      // TypeScript sabe que devuelve boolean
```

### Call Signatures: Funciones como Objetos

#### El Concepto de Funciones Extensibles

En JavaScript, las funciones son objetos, lo que significa que pueden tener propiedades además de ser ejecutables. Los **Call Signatures** permiten tipar estas funciones-objeto de manera elegante.

**¿Cuándo es útil esto?**

- Funciones que necesitan mantener estado (como caches)
- APIs que agregan metadatos a funciones
- Bibliotecas que extienden funciones con utilidades adicionales

```typescript
// Call signature: define que algo es ejecutable Y tiene propiedades
interface Formatter {
  (value: string): string;                    // Es ejecutable
  formato: 'uppercase' | 'lowercase';         // Tiene propiedades
  configurar(formato: 'uppercase' | 'lowercase'): void;  // Tiene métodos
}

// Implementación que cumple con el call signature
const formatter: Formatter = ((value: string) => {
  return formatter.formato === 'uppercase' 
    ? value.toUpperCase() 
    : value.toLowerCase();
}) as Formatter;

// Agregando las propiedades requeridas
formatter.formato = 'uppercase';
formatter.configurar = function(formato) {
  this.formato = formato;
};

// Uso: ¡es una función Y un objeto!
formatter('hello');           // Usarlo como función
formatter.configurar('lowercase');  // Usarlo como objeto
```

## 💡 Conceptos Clave para Recordar

1. **Type Safety es el objetivo principal**: Cada técnica de tipado busca prevenir errores en tiempo de compilación
2. **Flexibilidad controlada**: TypeScript permite APIs flexibles sin sacrificar seguridad
3. **Documentación viva**: Los tipos actúan como documentación que siempre está actualizada
4. **Mejor Developer Experience**: IntelliSense, refactoring y navegación mejoran dramáticamente

## 🔍 Casos de Uso en el Mundo Real

- **APIs flexibles** que aceptan diferentes tipos de entrada y se adaptan automáticamente
- **Funciones de utilidad** con comportamiento adaptativo según parámetros
- **Sistemas de configuración** con valores por defecto inteligentes
- **Bibliotecas extensibles** que permiten múltiples formas de uso

## 💡 Resumen

El tipado de funciones en TypeScript proporciona:

- **Type Safety**: Prevención de errores en tiempo de compilación mediante contratos explícitos
- **Flexibilidad**: Múltiples formas de declarar y usar funciones manteniendo seguridad de tipos
- **Sobrecarga**: Diferentes firmas para la misma función según el contexto de uso
- **Reutilización**: Patrones que permiten código más limpio y mantenible

➡️ **Siguiente Tema**

Continúa con [3.2 Funciones de Orden Superior](02-funciones-orden-superior.md) para dominar conceptos más avanzados como callbacks tipados y funciones genéricas.
