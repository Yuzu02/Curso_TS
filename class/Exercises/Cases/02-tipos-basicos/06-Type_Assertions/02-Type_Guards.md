# 🎯 Ejercicio 2: Type Guards Básicos

> Aprende a implementar Type Guards para validación segura de tipos

---

## 📋 Descripción

Domina el uso de Type Guards para validar tipos de forma segura en runtime.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 55 minutos

---

## 🎯 Objetivos

- Entender qué son los Type Guards
- Implementar guards con `typeof` e `instanceof`
- Crear custom type guards
- Usar narrowing efectivamente

---

## 📋 Requerimientos

1. **Type Guards Básicos:**
   - Guards con `typeof`
   - Guards con `instanceof`
   - Custom type guards

2. **Casos Prácticos:**
   - Validación de entrada
   - Procesamiento de APIs
   - Manejo de union types

---

## 💡 Estructura Base

```typescript
// 1. Type Guards con typeof
function esString(valor: unknown): valor is string {
  // Tu implementación aquí
}

function esNumero(valor: unknown): valor is number {
  // Tu implementación aquí
}

function esBoolean(valor: unknown): valor is boolean {
  // Tu implementación aquí
}

// 2. Funciones que usan type guards básicos
function procesarValor(valor: unknown): string {
  // Tu implementación aquí
  // Usa los type guards de arriba para procesar el valor
}

function convertirAString(valor: unknown): string {
  // Tu implementación aquí
  // Usa type guards para convertir de forma segura
}

// 3. Type Guards con instanceof
class Perro {
  nombre: string;
  raza: string;
  constructor(nombre: string, raza: string) {
    this.nombre = nombre;
    this.raza = raza;
  }
  ladrar(): string {
    return "Woof!";
  }
}

class Gato {
  nombre: string;
  color: string;
  constructor(nombre: string, color: string) {
    this.nombre = nombre;
    this.color = color;
  }
  maullar(): string {
    return "Meow!";
  }
}

function esPerro(animal: unknown): animal is Perro {
  // Tu implementación aquí
}

function esGato(animal: unknown): animal is Gato {
  // Tu implementación aquí
}

function hacerSonido(animal: Perro | Gato): string {
  // Tu implementación aquí
  // Usa type guards para determinar qué método llamar
}

// 4. Custom Type Guards para interfaces
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

interface Producto {
  id: string;
  nombre: string;
  precio: number;
}

function esUsuario(obj: unknown): obj is Usuario {
  // Tu implementación aquí
}

function esProducto(obj: unknown): obj is Producto {
  // Tu implementación aquí
}

function procesarEntidad(entidad: unknown): string {
  // Tu implementación aquí
  // Usa type guards para procesar usuario o producto
}

// 5. Type Guards con arrays
function esArrayDeStrings(valor: unknown): valor is string[] {
  // Tu implementación aquí
}

function esArrayDeNumeros(valor: unknown): valor is number[] {
  // Tu implementación aquí
}

function procesarArray(arr: unknown): string {
  // Tu implementación aquí
  // Usa type guards para procesar diferentes tipos de arrays
}

// 6. Type Guards para union types
type Respuesta = 
  | { tipo: "exito"; datos: any }
  | { tipo: "error"; codigo: number; mensaje: string };

function esRespuestaExitosa(respuesta: Respuesta): respuesta is { tipo: "exito"; datos: any } {
  // Tu implementación aquí
}

function esRespuestaError(respuesta: Respuesta): respuesta is { tipo: "error"; codigo: number; mensaje: string } {
  // Tu implementación aquí
}

function manejarRespuesta(respuesta: Respuesta): string {
  // Tu implementación aquí
  // Usa type guards para manejar cada tipo de respuesta
}

// 7. Ejercicio práctico: Validador de formularios
interface DatosFormulario {
  nombre: string;
  edad: number;
  email: string;
  activo: boolean;
}

function tienePropiedad<T, K extends keyof T>(obj: T, prop: K): obj is T & Record<K, unknown> {
  // Tu implementación aquí
}

function esDatosFormularioValidos(datos: unknown): datos is DatosFormulario {
  // Tu implementación aquí
  // Implementa validación completa paso a paso
}

function procesarFormulario(datos: unknown): DatosFormulario | null {
  // Tu implementación aquí
  // Usa el type guard para validar antes de procesar
}

// 8. Type Guards con narrowing
function procesarValorComplejo(valor: string | number | boolean | null): string {
  // Tu implementación aquí
  // Usa narrowing para manejar cada tipo
}

function manejarError(error: Error | string | unknown): string {
  // Tu implementación aquí
  // Usa type guards para manejar diferentes tipos de errores
}

// 9. Type Guards para objetos anidados
interface Direccion {
  calle: string;
  ciudad: string;
  codigoPostal: string;
}

interface PersonaCompleta {
  nombre: string;
  edad: number;
  direccion: Direccion;
}

function esDireccionValida(obj: unknown): obj is Direccion {
  // Tu implementación aquí
}

function esPersonaCompleta(obj: unknown): obj is PersonaCompleta {
  // Tu implementación aquí
  // Usa el type guard de dirección
}

// 10. Combinación de Type Guards
function validarDatosCompletos(datos: unknown): datos is { usuario: Usuario; producto: Producto } {
  // Tu implementación aquí
  // Combina múltiples type guards
}

function procesarDatosCompletos(datos: unknown): string {
  // Tu implementación aquí
  // Usa el type guard combinado
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba type guards básicos
console.log(esString("hola")); // true
console.log(esNumero(42)); // true
console.log(esBoolean(true)); // true

console.log(procesarValor("texto")); // "Procesando string: texto"
console.log(procesarValor(123)); // "Procesando number: 123"

// Prueba instanceof
const perro = new Perro("Max", "Golden Retriever");
const gato = new Gato("Whiskers", "Negro");

console.log(esPerro(perro)); // true
console.log(esGato(gato)); // true
console.log(hacerSonido(perro)); // "Woof!"
console.log(hacerSonido(gato)); // "Meow!"

// Prueba custom type guards
const usuario = { id: 1, nombre: "Juan", email: "juan@example.com" };
const producto = { id: "PROD-001", nombre: "Laptop", precio: 999 };

console.log(esUsuario(usuario)); // true
console.log(esProducto(producto)); // true
console.log(procesarEntidad(usuario)); // "Usuario: Juan"
console.log(procesarEntidad(producto)); // "Producto: Laptop"

// Prueba arrays
console.log(esArrayDeStrings(["a", "b", "c"])); // true
console.log(esArrayDeNumeros([1, 2, 3])); // true
console.log(procesarArray(["hello", "world"])); // "Array de strings con 2 elementos"

// Prueba union types
const respuestaOK: Respuesta = { tipo: "exito", datos: { mensaje: "Todo bien" } };
const respuestaError: Respuesta = { tipo: "error", codigo: 404, mensaje: "No encontrado" };

console.log(esRespuestaExitosa(respuestaOK)); // true
console.log(esRespuestaError(respuestaError)); // true
console.log(manejarRespuesta(respuestaOK)); // "Éxito: ..."
console.log(manejarRespuesta(respuestaError)); // "Error 404: No encontrado"

// Prueba formularios
const datosFormulario = {
  nombre: "Ana",
  edad: 25,
  email: "ana@example.com",
  activo: true
};

console.log(esDatosFormularioValidos(datosFormulario)); // true
console.log(procesarFormulario(datosFormulario)); // DatosFormulario válidos

// Prueba narrowing
console.log(procesarValorComplejo("texto")); // "String: texto"
console.log(procesarValorComplejo(42)); // "Number: 42"
console.log(procesarValorComplejo(null)); // "Null value"

// Prueba objetos anidados
const direccion = { calle: "Av. Principal 123", ciudad: "Ciudad", codigoPostal: "12345" };
const persona = { nombre: "Carlos", edad: 30, direccion };

console.log(esDireccionValida(direccion)); // true
console.log(esPersonaCompleta(persona)); // true

// Prueba combinación
const datosCompletos = { usuario, producto };
console.log(validarDatosCompletos(datosCompletos)); // true
console.log(procesarDatosCompletos(datosCompletos)); // "Datos completos procesados"
```

---

## 🏆 Criterios de Evaluación

- ✅ Type Guards básicos implementados correctamente
- ✅ Custom type guards funcionando
- ✅ Narrowing aplicado apropiadamente
- ✅ Validación robusta de objetos complejos
- ✅ Combinación de guards efectiva

---

## 💡 Mejores Prácticas

- **Valida paso a paso**: Verifica cada propiedad individualmente
- **Usa nombres descriptivos**: `esUsuario` es mejor que `checkUser`
- **Combina guards**: Reutiliza type guards existentes
- **Maneja casos edge**: null, undefined, propiedades faltantes

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](03-Typeof_Instanceof.md)
