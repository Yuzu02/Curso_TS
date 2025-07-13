# 🎯 2.1.1 Tipos Primitivos

> **Duración:** 2 horas | **Nivel:** Fundamental

## 🎯 Objetivos de la Lección

Al finalizar esta lección, serás capaz de:

- ✅ Trabajar con todos los tipos primitivos de TypeScript
- ✅ Entender las diferencias entre tipos similares
- ✅ Aplicar tipos primitivos en situaciones reales
- ✅ Evitar errores comunes con tipos primitivos

---

## 📚 Tipos Básicos

### 🔤 String

Representa cadenas de texto. Puede usar comillas simples, dobles o template literals.

```typescript
// Declaración explícita
let nombre: string = "Juan";
let apellido: string = 'Pérez';

// Template literals
let saludo: string = `Hola, ${nombre} ${apellido}`;

// Inferencia automática
let mensaje = "TypeScript es genial"; // string inferido
```

### 🔢 Number

Representa números enteros y decimales. TypeScript usa el tipo `number` para todos los números.

```typescript
// Números enteros
let edad: number = 25;
let año: number = 2024;

// Números decimales
let precio: number = 19.99;
let pi: number = 3.14159;

// Notación científica
let grande: number = 1e6; // 1,000,000
let pequeño: number = 1e-6; // 0.000001

// Sistemas numéricos
let binario: number = 0b1010; // 10 en decimal
let octal: number = 0o744; // 484 en decimal
let hexadecimal: number = 0xff; // 255 en decimal
```

### ✅ Boolean

Representa valores verdadero o falso.

```typescript
let esActivo: boolean = true;
let esCompleto: boolean = false;

// Resultado de expresiones
let esMayor: boolean = edad > 18;
let tienePermiso: boolean = esActivo && esMayor;
```

---

## 🔧 Tipos Especiales

### 🔢 BigInt

Para números enteros muy grandes que exceden el límite de `number`.

```typescript
// Declaración con sufijo 'n'
let numeroGrande: bigint = 1234567890123456789012345678901234567890n;

// Usando BigInt()
let otroGrande: bigint = BigInt("1234567890123456789012345678901234567890");

// Operaciones
let suma: bigint = numeroGrande + otroGrande;

// ⚠️ No se puede mezclar bigint con number
// let resultado = numeroGrande + 10; // Error!
let resultado: bigint = numeroGrande + 10n; // ✅ Correcto
```

### 🔣 Symbol

Representa identificadores únicos e inmutables.

```typescript
// Símbolos únicos
let sym1: symbol = Symbol();
let sym2: symbol = Symbol("descripción");

// Símbolos con la misma descripción son diferentes
let sym3: symbol = Symbol("id");
let sym4: symbol = Symbol("id");
console.log(sym3 === sym4); // false

// Uso común: claves de objeto únicas
const ID_USUARIO: symbol = Symbol("id");
const usuario = {
  [ID_USUARIO]: 123,
  nombre: "Juan"
};
```

---

## 🚫 Valores Especiales

### 🔄 Null y Undefined

Representan ausencia de valor, pero con diferentes semánticas.

```typescript
// undefined: variable declarada pero no inicializada
let sinInicializar: undefined = undefined;
let valor: string | undefined; // undefined por defecto

// null: ausencia intencional de valor
let valorVacio: null = null;
let usuario: Usuario | null = null; // No hay usuario

// Diferencias prácticas
function buscarUsuario(id: number): Usuario | null {
  // Retorna null si no encuentra el usuario
  return usuarios.find(u => u.id === id) || null;
}

function obtenerConfiguracion(): Config | undefined {
  // Retorna undefined si la configuración no está disponible
  return config.isLoaded ? config.data : undefined;
}
```

### 🔲 Void

Representa la ausencia de valor, típicamente usado en funciones que no retornan nada.

```typescript
// Función que no retorna valor
function mostrarMensaje(mensaje: string): void {
  console.log(mensaje);
  // No hay return explícito
}

// Función que retorna undefined explícitamente
function procesar(): void {
  // ... procesamiento
  return; // Equivalente a return undefined;
}

// Variable de tipo void (raro, pero posible)
let resultado: void = undefined; // Solo puede ser undefined
```

### 🚫 Never

Representa el tipo de valores que nunca ocurren.

```typescript
// Función que nunca retorna (lanza error)
function error(mensaje: string): never {
  throw new Error(mensaje);
}

// Función con bucle infinito
function bucleInfinito(): never {
  while (true) {
    // ... código que nunca termina
  }
}

// Uso en type guards exhaustivos
function procesarTipo(valor: string | number): string {
  if (typeof valor === "string") {
    return valor.toUpperCase();
  }
  if (typeof valor === "number") {
    return valor.toString();
  }
  
  // TypeScript sabe que esto nunca debe ejecutarse
  const exhaustiveCheck: never = valor;
  return exhaustiveCheck;
}
```

---

## 🚨 Tipos de Escape

### ❓ Unknown

Tipo seguro para valores desconocidos. Requiere verificación de tipo antes de usar.

```typescript
// Mejor alternativa a 'any'
let valorDesconocido: unknown;

valorDesconocido = 42;
valorDesconocido = "hola";
valorDesconocido = true;

// ⚠️ Requiere verificación de tipo
// let texto: string = valorDesconocido; // Error!

// ✅ Verificación segura
if (typeof valorDesconocido === "string") {
  let texto: string = valorDesconocido; // OK
}

// Uso típico: datos de APIs
async function obtenerDatos(): Promise<unknown> {
  const response = await fetch("/api/datos");
  return response.json();
}

const datos = await obtenerDatos();
// Verificar antes de usar
if (typeof datos === "object" && datos !== null) {
  // Ahora puedes usar datos como objeto
}
```

### ⚠️ Any

Desactiva la verificación de tipos. **Usar con extrema precaución**.

```typescript
// Desactiva el sistema de tipos
let cualquierCosa: any = 42;
cualquierCosa = "hola";
cualquierCosa = true;
cualquierCosa.foo.bar.baz; // No hay verificación

// Casos donde podría ser necesario (pero evitar)
// 1. Migración gradual de JavaScript
let legacyCode: any = obtenerDatosLegacy();

// 2. Librerías sin tipos
declare const libreriaSinTipos: any;

// 3. Prototipado rápido (temporal)
let prototipo: any = {};
```

---

## 🎯 Mejores Prácticas

### ✅ Recomendaciones

1. **Usa inferencia cuando sea clara:**

   ```typescript
   let nombre = "Juan"; // string inferido (claro)
   let edad = 25; // number inferido (claro)
   ```

2. **Especifica tipos cuando sea necesario:**

   ```typescript
   let usuario: Usuario | null = null; // Intención clara
   let configuracion: Config = {}; // Estructura esperada
   ```

3. **Prefiere `unknown` sobre `any`:**

   ```typescript
   // ❌ Evitar
   function procesar(data: any) { /* ... */ }
   
   // ✅ Mejor
   function procesar(data: unknown) {
     if (typeof data === "string") {
       // Ahora puedes usar data como string
     }
   }
   ```

4. **Usa `null` para ausencia intencional:**

   ```typescript
   // ✅ Intención clara
   let usuario: Usuario | null = buscarUsuario(id);
   
   // ❌ Confuso
   let usuario: Usuario | undefined = buscarUsuario(id);
   ```

### ❌ Errores Comunes

1. **Confundir `null` y `undefined`:**

   ```typescript
   // ❌ Inconsistente
   function buscar(id: number): Usuario | null | undefined {
     // ...
   }
   
   // ✅ Consistente
   function buscar(id: number): Usuario | null {
     // ...
   }
   ```

2. **Usar `any` innecesariamente:**

   ```typescript
   // ❌ Pierde seguridad de tipos
   let datos: any = await fetch("/api");
   
   // ✅ Mantiene seguridad
   let datos: unknown = await fetch("/api");
   ```

---

## 📖 Recursos Adicionales

- 🔗 [TypeScript Handbook: Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- 🔗 [MDN: JavaScript Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- 🔗 [TypeScript Deep Dive: Basic Types](https://basarat.gitbook.io/typescript/type-system)

---

[⬅️ Volver: Sistema de Tipos](./01-sistema-tipos.md) | [➡️ Siguiente: Tipos Compuestos](./01-2-tipos-compuestos.md)
