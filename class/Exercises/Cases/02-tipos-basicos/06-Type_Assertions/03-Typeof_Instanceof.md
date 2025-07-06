# 🎯 Ejercicio 3: Typeof e Instanceof

> Domina el uso específico de typeof e instanceof para type narrowing

---

## 📋 Descripción

Aprende a usar eficientemente `typeof` e `instanceof` para narrowing de tipos en diferentes contextos.

**Dificultad:** 🟢 Principiante | **Tiempo:** 40 minutos

---

## 🎯 Objetivos

- Dominar el operador `typeof` para primitivos
- Usar `instanceof` para objetos y clases
- Entender las limitaciones de cada operador
- Implementar narrowing efectivo

---

## 📋 Requerimientos

1. **Typeof para Primitivos:**
   - Validar strings, numbers, booleans
   - Manejar casos especiales (null, arrays)
   - Narrowing con typeof

2. **Instanceof para Objetos:**
   - Verificar instancias de clases
   - Trabajar con herencia
   - Manejar objetos built-in

---

## 💡 Estructura Base

```typescript
// 1. Typeof para tipos primitivos
function manejarPrimitivo(valor: unknown): string {
  // Tu implementación aquí
  // Usa typeof para identificar y procesar diferentes tipos primitivos
}

function procesarStringONumber(valor: string | number): string {
  // Tu implementación aquí
  // Usa typeof para narrow entre string y number
}

function validarEntrada(entrada: unknown): string {
  // Tu implementación aquí
  // Usa typeof para validar diferentes tipos de entrada
}

// 2. Casos especiales de typeof
function manejarCasosEspeciales(valor: unknown): string {
  // Tu implementación aquí
  // Maneja null, arrays, objetos, funciones
  // Recuerda: typeof null === "object"
  // Recuerda: typeof [] === "object"
}

function esArrayRealmente(valor: unknown): boolean {
  // Tu implementación aquí
  // Distingue entre array y objeto usando typeof
}

function esFuncion(valor: unknown): valor is Function {
  // Tu implementación aquí
  // Usa typeof para verificar si es función
}

// 3. Instanceof para clases
class Animal {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  hacerSonido(): string {
    return "Sonido genérico";
  }
}

class Perro extends Animal {
  raza: string;
  constructor(nombre: string, raza: string) {
    super(nombre);
    this.raza = raza;
  }
  ladrar(): string {
    return "Woof!";
  }
}

class Gato extends Animal {
  color: string;
  constructor(nombre: string, color: string) {
    super(nombre);
    this.color = color;
  }
  maullar(): string {
    return "Meow!";
  }
}

function identificarAnimal(animal: Animal): string {
  // Tu implementación aquí
  // Usa instanceof para identificar el tipo específico
}

function hacerSonidoEspecifico(animal: Animal): string {
  // Tu implementación aquí
  // Usa instanceof para llamar el método apropiado
}

// 4. Instanceof con objetos built-in
function procesarObjeto(obj: unknown): string {
  // Tu implementación aquí
  // Usa instanceof para identificar Date, Array, RegExp, Error, etc.
}

function manejarError(error: unknown): string {
  // Tu implementación aquí
  // Usa instanceof para distinguir diferentes tipos de errores
}

// 5. Combinando typeof e instanceof
function analizarValor(valor: unknown): string {
  // Tu implementación aquí
  // Combina typeof e instanceof para análisis completo
}

function procesarEntrada(entrada: unknown): any {
  // Tu implementación aquí
  // Usa ambos operadores para procesar diferentes tipos de entrada
}

// 6. Ejercicio práctico: Serializador
function serializar(valor: unknown): string {
  // Tu implementación aquí
  // Usa typeof e instanceof para serializar diferentes tipos
}

function deserializar(json: string): unknown {
  // Tu implementación aquí
  // Procesa el resultado con typeof e instanceof
}

// 7. Narrowing con control de flujo
function procesarValorConNarrowing(valor: string | number | Date | null): string {
  // Tu implementación aquí
  // Usa typeof e instanceof con if/else para narrowing
}

function manejarUnionCompleja(valor: string | number | Array<any> | Date | Error): string {
  // Tu implementación aquí
  // Maneja cada tipo de la union usando los operadores apropiados
}

// 8. Limitaciones y casos edge
function manejarLimitaciones(valor: unknown): string {
  // Tu implementación aquí
  // Demuestra las limitaciones de typeof e instanceof
  // Por ejemplo: typeof null, instanceof con objetos de diferentes contextos
}

function solucionesAlternativas(valor: unknown): string {
  // Tu implementación aquí
  // Implementa alternativas cuando typeof e instanceof no son suficientes
}

// 9. Performance y mejores prácticas
function optimizarVerificaciones(valores: unknown[]): string[] {
  // Tu implementación aquí
  // Implementa verificaciones eficientes para un array de valores
}

function verificacionesOrdenadas(valor: unknown): string {
  // Tu implementación aquí
  // Ordena las verificaciones de más específicas a más generales
}

// 10. Ejercicio avanzado: Type detector
type TipoDetectado = 
  | "string" 
  | "number" 
  | "boolean" 
  | "null" 
  | "undefined" 
  | "array" 
  | "object" 
  | "function" 
  | "date" 
  | "regexp" 
  | "error";

function detectarTipo(valor: unknown): TipoDetectado {
  // Tu implementación aquí
  // Implementa un detector de tipos preciso
}

function estadisticasTipos(valores: unknown[]): Record<TipoDetectado, number> {
  // Tu implementación aquí
  // Cuenta cuántos valores de cada tipo hay en el array
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba typeof con primitivos
console.log(manejarPrimitivo("hola")); // "String: hola"
console.log(manejarPrimitivo(42)); // "Number: 42"
console.log(manejarPrimitivo(true)); // "Boolean: true"

console.log(procesarStringONumber("texto")); // "String procesado"
console.log(procesarStringONumber(123)); // "Number procesado"

// Prueba casos especiales
console.log(manejarCasosEspeciales(null)); // "Null value"
console.log(manejarCasosEspeciales([1, 2, 3])); // "Array con 3 elementos"
console.log(manejarCasosEspeciales({})); // "Object vacío"

console.log(esArrayRealmente([1, 2, 3])); // true
console.log(esArrayRealmente({})); // false
console.log(esFuncion(() => {})); // true

// Prueba instanceof con clases
const perro = new Perro("Max", "Golden");
const gato = new Gato("Whiskers", "Negro");
const animal = new Animal("Genérico");

console.log(identificarAnimal(perro)); // "Es un Perro"
console.log(identificarAnimal(gato)); // "Es un Gato"
console.log(hacerSonidoEspecifico(perro)); // "Woof!"
console.log(hacerSonidoEspecifico(gato)); // "Meow!"

// Prueba objetos built-in
console.log(procesarObjeto(new Date())); // "Date object"
console.log(procesarObjeto(/pattern/)); // "RegExp object"
console.log(procesarObjeto(new Error("test"))); // "Error object"

// Prueba combinación
console.log(analizarValor("texto")); // "Primitive string"
console.log(analizarValor(new Date())); // "Date instance"
console.log(analizarValor([1, 2, 3])); // "Array instance"

// Prueba serializador
console.log(serializar({ nombre: "Juan", edad: 30 })); // JSON string
console.log(serializar(new Date())); // ISO string
console.log(serializar([1, 2, 3])); // Array JSON

// Prueba narrowing
console.log(procesarValorConNarrowing("texto")); // "String: texto"
console.log(procesarValorConNarrowing(42)); // "Number: 42"
console.log(procesarValorConNarrowing(new Date())); // "Date: ..."

// Prueba detector de tipos
console.log(detectarTipo("hola")); // "string"
console.log(detectarTipo(new Date())); // "date"
console.log(detectarTipo([1, 2, 3])); // "array"
console.log(detectarTipo(null)); // "null"

const valores = ["texto", 42, new Date(), [1, 2], null, undefined, true];
console.log(estadisticasTipos(valores));
// { string: 1, number: 1, date: 1, array: 1, null: 1, undefined: 1, boolean: 1, ... }
```

---

## 🏆 Criterios de Evaluación

- ✅ Uso correcto de `typeof` para primitivos
- ✅ Uso apropiado de `instanceof` para objetos
- ✅ Manejo de casos especiales y limitaciones
- ✅ Narrowing efectivo implementado
- ✅ Combinación eficiente de ambos operadores

---

## 📝 Notas Importantes

### Typeof

- `typeof null === "object"` (quirk histórico)
- `typeof [] === "object"` (usa Array.isArray())
- `typeof function() {} === "function"`

### Instanceof

- Verifica la cadena de prototipos
- No funciona entre diferentes contextos (iframes)
- Más preciso que typeof para objetos

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](04-Discriminated_Unions.md)
