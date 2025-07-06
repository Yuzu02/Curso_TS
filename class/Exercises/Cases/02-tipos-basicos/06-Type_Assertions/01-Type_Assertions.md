# 🎯 Ejercicio 1: Type Assertions

> Aprende a usar Type Assertions para trabajar con tipos en situaciones específicas

---

## 📋 Descripción

Domina el uso de Type Assertions (as) para convertir tipos cuando TypeScript no puede inferir correctamente.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 50 minutos

---

## 🎯 Objetivos

- Entender cuándo usar Type Assertions
- Dominar la sintaxis `as`
- Conocer los riesgos y limitaciones
- Implementar conversiones seguras

---

## 📋 Requerimientos

1. **Type Assertions Básicas:**
   - Sintaxis `as`
   - Conversiones de tipos
   - Trabajo con `unknown` y `any`

2. **Casos Prácticos:**
   - Manipulación del DOM
   - Deserialización de JSON
   - APIs externas

---

## 💡 Estructura Base

```typescript
// 1. Type Assertions básicas
function procesarDatoDesconocido(dato: unknown): string {
  // Tu implementación aquí
  // Usa type assertion para convertir dato a string
}

function obtenerNumeroDesdeAny(valor: any): number {
  // Tu implementación aquí
  // Usa type assertion para convertir valor a number
}

// 2. Manipulación del DOM
function obtenerElementoInput(id: string): HTMLInputElement {
  // Tu implementación aquí
  // Usa type assertion para convertir el elemento del DOM
}

function obtenerElementoCanvas(selector: string): HTMLCanvasElement {
  // Tu implementación aquí
  // Usa type assertion con querySelector
}

// 3. Deserialización de JSON
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

function deserializarUsuario(json: string): Usuario {
  // Tu implementación aquí
  // Usa type assertion para convertir el objeto parseado
}

function deserializarUsuarios(json: string): Usuario[] {
  // Tu implementación aquí
  // Usa type assertion para convertir el array parseado
}

// 4. Trabajando con APIs externas
function procesarRespuestaAPI(respuesta: unknown): { datos: any; estado: string } {
  // Tu implementación aquí
  // Usa type assertion para estructurar la respuesta
}

function extraerDatosFormateados(respuesta: unknown): string[] {
  // Tu implementación aquí
  // Usa type assertion para obtener un array de strings
}

// 5. Type Assertions con union types
type Respuesta = { tipo: "exito"; datos: any } | { tipo: "error"; mensaje: string };

function procesarRespuestaCompleja(respuesta: unknown): Respuesta {
  // Tu implementación aquí
  // Usa type assertion para convertir a Respuesta
}

function esRespuestaExitosa(respuesta: unknown): boolean {
  // Tu implementación aquí
  // Usa type assertion y verifica el tipo
}

// 6. Type Assertions seguras con validación
function convertirANumeroSeguro(valor: unknown): number {
  // Tu implementación aquí
  // Valida antes de usar type assertion
}

function convertirAStringSeguro(valor: unknown): string {
  // Tu implementación aquí
  // Valida antes de usar type assertion
}

// 7. Ejercicio práctico: Procesador de formularios
interface DatosFormulario {
  nombre: string;
  edad: number;
  email: string;
  activo: boolean;
}

function procesarFormulario(formData: FormData): DatosFormulario {
  // Tu implementación aquí
  // Usa type assertions para extraer y convertir datos
}

function validarDatosFormulario(datos: unknown): datos is DatosFormulario {
  // Tu implementación aquí
  // Validador type guard
}

// 8. Type Assertions con generics
function extraerPropiedad<T, K extends keyof T>(objeto: unknown, clave: K): T[K] {
  // Tu implementación aquí
  // Usa type assertion con genéricos
}

function crearObjetoTipado<T>(datos: unknown): T {
  // Tu implementación aquí
  // Usa type assertion para crear objeto del tipo especificado
}

// 9. Casos donde NO usar Type Assertions
function ejemploIncorrecto(dato: unknown): string {
  // Tu implementación aquí
  // Muestra un caso donde type assertion sería peligroso
  // Implementa una alternativa segura
}

function alternativaSegura(dato: unknown): string | null {
  // Tu implementación aquí
  // Implementa una validación apropiada en lugar de type assertion
}

// 10. Double assertion (casos extremos)
function conversionCompleja(dato: unknown): HTMLElement {
  // Tu implementación aquí
  // Usa double assertion solo cuando sea absolutamente necesario
}

function evitarDoubleAssertion(dato: unknown): HTMLElement | null {
  // Tu implementación aquí
  // Implementa una alternativa más segura
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba type assertions básicas
console.log(procesarDatoDesconocido("Hola mundo")); // "Hola mundo"
console.log(obtenerNumeroDesdeAny(42)); // 42

// Prueba manipulación del DOM (en entorno con DOM)
// const input = obtenerElementoInput("mi-input");
// const canvas = obtenerElementoCanvas("canvas");

// Prueba deserialización
const usuarioJson = '{"id": 1, "nombre": "Juan", "email": "juan@example.com"}';
const usuario = deserializarUsuario(usuarioJson);
console.log(usuario);

const usuariosJson = '[{"id": 1, "nombre": "Juan", "email": "juan@example.com"}]';
const usuarios = deserializarUsuarios(usuariosJson);
console.log(usuarios);

// Prueba respuestas API
const respuestaAPI = { datos: [1, 2, 3], estado: "ok" };
console.log(procesarRespuestaAPI(respuestaAPI));

// Prueba union types
const respuestaExito = { tipo: "exito", datos: { mensaje: "Todo bien" } };
const respuestaError = { tipo: "error", mensaje: "Error ocurrido" };
console.log(procesarRespuestaCompleja(respuestaExito));
console.log(esRespuestaExitosa(respuestaExito)); // true

// Prueba conversiones seguras
console.log(convertirANumeroSeguro("123")); // 123
console.log(convertirAStringSeguro(456)); // "456"

// Prueba formularios
const formData = new FormData();
formData.append("nombre", "Ana");
formData.append("edad", "25");
formData.append("email", "ana@example.com");
formData.append("activo", "true");

const datosFormulario = procesarFormulario(formData);
console.log(datosFormulario);
console.log(validarDatosFormulario(datosFormulario)); // true

// Prueba genéricos
const persona = { nombre: "Carlos", edad: 30 };
console.log(extraerPropiedad<typeof persona, "nombre">(persona, "nombre")); // "Carlos"

// Prueba alternativas seguras
console.log(alternativaSegura("texto válido")); // "texto válido"
console.log(alternativaSegura(123)); // null
```

---

## 🏆 Criterios de Evaluación

- ✅ Type Assertions correctamente implementadas
- ✅ Validación antes de assertions
- ✅ Casos de uso apropiados identificados
- ✅ Alternativas seguras implementadas
- ✅ Comprensión de riesgos y limitaciones

---

## ⚠️ Advertencias Importantes

- **Usa Type Assertions con cuidado**: No verifican en runtime
- **Siempre valida cuando sea posible**: Preferred over blind assertions
- **Evita double assertions**: Indica problemas de diseño
- **Considera Type Guards**: Más seguros para validación

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](02-Type_Guards.md)
