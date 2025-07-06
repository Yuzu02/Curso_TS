# 🎯 Ejercicio 3: Union Types

> Aprende a usar Union Types para crear tipos flexibles y seguros

---

## 📋 Descripción

Domina el uso de Union Types (|) para crear tipos que pueden aceptar múltiples tipos de valores.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 45 minutos

---

## 🎯 Objetivos

- Entender qué son los Union Types
- Crear funciones que acepten múltiples tipos
- Usar type guards con Union Types
- Implementar discriminated unions básicas

---

## 📋 Requerimientos

1. **Union Types Básicos:**
   - Tipos primitivos unidos
   - Funciones con parámetros union
   - Variables que acepten múltiples tipos

2. **Type Guards:**
   - Usar typeof para discriminar tipos
   - Implementar verificaciones de tipo
   - Narrowing con Union Types

---

## 💡 Estructura Base

```typescript
// 1. Define Union Types básicos
type StringOrNumber = /* tu definición aquí */;
type BooleanOrString = /* tu definición aquí */;
type ID = /* tu definición aquí */; // string o number

// 2. Implementa funciones con Union Types
function formatearValor(valor: StringOrNumber): string {
  // Tu implementación aquí
  // Usa type guards para manejar ambos tipos
}

function procesarID(id: ID): string {
  // Tu implementación aquí
  // Maneja tanto string como number
}

// 3. Union Types con objetos
type Circulo = {
  tipo: "circulo";
  radio: number;
};

type Rectangulo = {
  tipo: "rectangulo";
  ancho: number;
  alto: number;
};

type Figura = /* tu definición aquí */;

function calcularArea(figura: Figura): number {
  // Tu implementación aquí
  // Usa discriminated unions
}

// 4. Ejercicio práctico: Sistema de respuestas
type RespuestaExitosa = {
  estado: "exitosa";
  datos: any;
};

type RespuestaError = {
  estado: "error";
  mensaje: string;
  codigo: number;
};

type Respuesta = /* tu definición aquí */;

function manejarRespuesta(respuesta: Respuesta): string {
  // Tu implementación aquí
  // Maneja ambos tipos de respuesta
}

// 5. Union Types con arrays
type ListaMixta = /* tu definición aquí */; // array de strings o numbers

function procesarLista(lista: ListaMixta): string {
  // Tu implementación aquí
  // Procesa elementos que pueden ser string o number
}

// 6. Funciones sobrecargadas con Union Types
function concatenar(a: string, b: string): string;
function concatenar(a: number, b: number): number;
function concatenar(a: /* tipo aquí */, b: /* tipo aquí */): /* tipo aquí */ {
  // Tu implementación aquí
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba tus implementaciones
console.log(formatearValor("Hola")); // "Hola"
console.log(formatearValor(42)); // "42"

console.log(procesarID("ABC123")); // "ID: ABC123"
console.log(procesarID(123)); // "ID: 123"

const circulo: Circulo = { tipo: "circulo", radio: 5 };
const rectangulo: Rectangulo = { tipo: "rectangulo", ancho: 10, alto: 5 };

console.log(calcularArea(circulo)); // π * 5²
console.log(calcularArea(rectangulo)); // 10 * 5

const respuestaOK: RespuestaExitosa = { estado: "exitosa", datos: { mensaje: "Todo bien" } };
const respuestaError: RespuestaError = { estado: "error", mensaje: "Error interno", codigo: 500 };

console.log(manejarRespuesta(respuestaOK));
console.log(manejarRespuesta(respuestaError));

console.log(procesarLista(["a", "b", "c"]));
console.log(procesarLista([1, 2, 3]));
```

---

## 🏆 Criterios de Evaluación

- ✅ Union Types correctamente definidos
- ✅ Type guards implementados apropiadamente
- ✅ Discriminated unions funcionando
- ✅ Funciones que manejan múltiples tipos
- ✅ Narrowing de tipos correcto

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](04-Intersection_Types.md)
