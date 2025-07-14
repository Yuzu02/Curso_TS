# 🎯 Ejercicio 3.1.1: Calculadora Tipada

## 📋 Descripción

Implementa una calculadora avanzada que utilice function overloads, tipos seguros y manejo de errores para realizar operaciones matemáticas tanto con números individuales como con arrays.

## 🎯 Objetivos

- Implementar function overloads para diferentes tipos de operaciones
- Manejar tanto números individuales como arrays de números
- Proporcionar type safety completo sin usar `any`
- Incluir validación y manejo de errores apropiado

## 📊 Dificultad: 🟢 Básico

**Tiempo estimado:** 20 minutos

## 📝 Requisitos

### 1. Operaciones Básicas con Overloads

Implementa las siguientes funciones con function overloads:

```typescript
// Overloads para números individuales y arrays
function sumar(a: number, b: number): number;
function sumar(numeros: number[]): number;

function multiplicar(a: number, b: number): number;
function multiplicar(numeros: number[]): number;

function dividir(a: number, b: number): number | Error;
function dividir(numeros: number[]): number | Error;
```

### 2. Operaciones Avanzadas

```typescript
// Potencia con exponente opcional (por defecto 2)
function potencia(base: number, exponente?: number): number;

// Operación con callback personalizado
function operar(
  a: number, 
  b: number, 
  operacion: (x: number, y: number) => number
): number;

// Múltiples operaciones en cadena
function cadena(...operaciones: Array<(x: number) => number>): (inicial: number) => number;
```

## 💡 Estructura Base para Implementar

```typescript
// TODO: Implementa las funciones con overloads correctos
// Ejemplo de estructura:

function sumar(a: number, b: number): number;
function sumar(numeros: number[]): number;
function sumar(aOrNumeros: number | number[], b?: number): number {
  // TODO: Implementa la lógica usando type guards
  // Tip: Usa Array.isArray() para distinguir entre tipos
}

// TODO: Implementa el resto de funciones siguiendo el mismo patrón
// TODO: Recuerda manejar casos de error (división por cero)
// TODO: Implementa validación de entrada cuando sea necesario
```

## 🧪 Casos de Prueba

### Caso 1: Operaciones con números individuales

```typescript
// Ejemplo de uso esperado
const suma = sumar(5, 3); // 8
const producto = multiplicar(4, 6); // 24
const division = dividir(10, 2); // 5
const cuadrado = potencia(4); // 16 (exponente por defecto)
```

### Caso 2: Operaciones con arrays

```typescript
// Ejemplo de uso con arrays
const sumaArray = sumar([1, 2, 3, 4]); // 10
const productoArray = multiplicar([2, 3, 4]); // 24
const divisionArray = dividir([100, 2, 5]); // 10
```

### Caso 3: Funciones de orden superior

```typescript
// Ejemplo con callback personalizado
const resultado = operar(8, 2, (a, b) => a ** b); // 64 (8 elevado a 2)

// Ejemplo de cadena de operaciones
const operaciones = cadena(
  x => x * 2,
  x => x + 10,
  x => x / 3
);
const final = operaciones(5); // ((5 * 2) + 10) / 3 = 6.67
```

## ✅ Criterios de Evaluación

- [ ] **Function Overloads**: Implementación correcta de múltiples signatures
- [ ] **Type Safety**: Uso apropiado de tipos sin `any`
- [ ] **Error Handling**: Manejo correcto de casos edge (división por cero)
- [ ] **Type Guards**: Distinción apropiada entre números y arrays
- [ ] **Default Parameters**: Implementación correcta de parámetros opcionales
- [ ] **Higher-Order Functions**: Uso correcto de callbacks y funciones de retorno

## 🎓 Puntos de Aprendizaje

1. **Function Overloads**: Cómo definir múltiples signatures para una función
2. **Type Guards**: Usar `Array.isArray()` y otros type guards para type narrowing
3. **Error Handling**: Manejo de errores con union types (`number | Error`)
4. **Default Parameters**: Parámetros opcionales con valores por defecto
5. **Higher-Order Functions**: Funciones que reciben y retornan otras funciones

## 📚 Recursos

- [Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)
- [Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

## 🗂️ Archivos a Crear

```text
01-Calculadora_Tipada/
├── solution.ts          # Tu implementación aquí
├── types.ts            # Tipos auxiliares (si es necesario)
└── tests.ts            # Casos de prueba (opcional)
```

---

## 🧭 Navegación

[📚 Índice](../README.md) | [➡️ Ejercicio Siguiente](02-Validador_Formularios.md)

---

💡 **Tip**: Empieza implementando las operaciones básicas con sus overloads. Usa `Array.isArray()` para distinguir entre números individuales y arrays.
