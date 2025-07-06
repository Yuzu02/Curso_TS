# 🎯 2.4 Type Assertions y Narrowing

> **Duración:** 2 horas | **Nivel:** Intermedio-Avanzado

## 🎯 Objetivos de la Lección

Al finalizar esta lección, serás capaz de:

- ✅ Usar type assertions de forma segura
- ✅ Implementar type guards básicos
- ✅ Aplicar narrowing con typeof e instanceof
- ✅ Crear discriminated unions
- ✅ Dominar técnicas avanzadas de narrowing

---

## 📚 ¿Qué son Type Assertions y Narrowing?

### 🔧 Type Assertions

Las type assertions le dicen al compilador "confía en mí, sé lo que estoy haciendo". Es una forma de casting en TypeScript.

### 🎯 Narrowing

El narrowing es el proceso de refinar tipos desde una unión amplia a tipos más específicos usando análisis de flujo de control.

---

## 🔧 Type Assertions (as)

### 📝 Sintaxis Básica

```typescript
// Sintaxis con 'as'
let valor: unknown = "Hola mundo";
let longitud: number = (valor as string).length;

// Sintaxis con angle brackets (menos común)
let longitud2: number = (<string>valor).length;

// Assertion to any (escape hatch)
let cualquierCosa: any = valor as any;
```

### 🎯 Casos de Uso Comunes

```typescript
// 1. Trabajar con DOM
const elemento = document.getElementById("miElemento") as HTMLInputElement;
elemento.value = "nuevo valor";

// 2. APIs que retornan any
function obtenerDatos(): any {
  return { id: 1, nombre: "Juan", email: "juan@example.com" };
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const usuario = obtenerDatos() as Usuario;
console.log(usuario.nombre); // TypeScript ahora conoce la estructura

// 3. Conversiones de tipos
let input: unknown = "123";
let numero: number = parseInt(input as string);

// 4. Assertions con objetos
const configuracion = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as const; // Readonly assertion
```

### ⚠️ Precauciones con Type Assertions

```typescript
// ❌ Peligroso - assertion incorrecta
let texto: string = "hola";
let numero: number = texto as any as number;
console.log(numero.toFixed(2)); // Runtime error!

// ❌ Assertion sin verificación
function procesarDatos(datos: unknown) {
  const usuario = datos as Usuario;
  return usuario.nombre.toUpperCase(); // Podría fallar
}

// ✅ Mejor - verificación previa
function procesarDatosSafe(datos: unknown) {
  if (typeof datos === "object" && datos !== null && "nombre" in datos) {
    const usuario = datos as Usuario;
    return usuario.nombre.toUpperCase();
  }
  throw new Error("Datos inválidos");
}
```

---

## 🛡️ Type Guards

### 📝 Type Guards Básicos

```typescript
// Type guard personalizado
function esString(valor: unknown): valor is string {
  return typeof valor === "string";
}

// Uso del type guard
function procesarValor(valor: unknown): string {
  if (esString(valor)) {
    // TypeScript sabe que valor es string aquí
    return valor.toUpperCase();
  }
  return "No es string";
}

// Type guard para objetos
interface Usuario {
  id: number;
  nombre: string;
}

function esUsuario(obj: unknown): obj is Usuario {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "nombre" in obj &&
    typeof (obj as Usuario).id === "number" &&
    typeof (obj as Usuario).nombre === "string"
  );
}

// Uso
function saludarUsuario(data: unknown): string {
  if (esUsuario(data)) {
    return `Hola, ${data.nombre}`;
  }
  return "Datos de usuario inválidos";
}
```

### 🔧 Type Guards con Clases

```typescript
// Type guard con instanceof
function esPerro(animal: Perro | Gato): animal is Perro {
  return animal instanceof Perro;
}

function hacerSonido(animal: Perro | Gato): void {
  if (esPerro(animal)) {
    animal.ladrar(); // TypeScript sabe que es Perro
  } else {
    animal.maullar(); // TypeScript sabe que es Gato
  }
}
```

---

## 🔍 Narrowing con typeof e instanceof

### 📊 Operador typeof

```typescript
// Narrowing con typeof
function procesar(valor: string | number | boolean): string {
  if (typeof valor === "string") {
    // valor es string aquí
    return valor.toUpperCase();
  }
  
  if (typeof valor === "number") {
    // valor es number aquí
    return valor.toFixed(2);
  }
  
  // valor es boolean aquí
  return valor ? "true" : "false";
}

// Casos especiales con typeof
function manejarTipos(valor: unknown): string {
  if (typeof valor === "object") {
    if (valor === null) {
      return "null";
    }
    if (Array.isArray(valor)) {
      return "array";
    }
    return "object";
  }
  
  return typeof valor;
}
```

### 🏗️ Operador instanceof

```typescript
// Narrowing con instanceof
class ErrorCustom extends Error {
  constructor(mensaje: string, public codigo: number) {
    super(mensaje);
  }
}

function manejarError(error: Error | ErrorCustom): void {
  if (error instanceof ErrorCustom) {
    // error es ErrorCustom aquí
    console.log(`Error ${error.codigo}: ${error.message}`);
  } else {
    // error es Error aquí
    console.log(`Error: ${error.message}`);
  }
}

// instanceof con tipos built-in
function procesarFecha(valor: Date | string): Date {
  if (valor instanceof Date) {
    return valor;
  }
  return new Date(valor);
}
```

---

## 🏷️ Discriminated Unions

### 📝 Concepto Básico

```typescript
// Discriminated union básica
interface Cargando {
  estado: "cargando";
}

interface Exito {
  estado: "exito";
  datos: any;
}

interface Error {
  estado: "error";
  mensaje: string;
}

type EstadoAPI = Cargando | Exito | Error;

// Narrowing con discriminated union
function manejarEstado(estado: EstadoAPI): string {
  switch (estado.estado) {
    case "cargando":
      return "Cargando...";
    
    case "exito":
      // TypeScript sabe que estado es Exito
      return `Datos: ${JSON.stringify(estado.datos)}`;
    
    case "error":
      // TypeScript sabe que estado es Error
      return `Error: ${estado.mensaje}`;
    
    default:
      // Exhaustive check
      const exhaustiveCheck: never = estado;
      return exhaustiveCheck;
  }
}
```

### 🎯 Casos de Uso Avanzados

```typescript
// Discriminated union con formas geométricas
interface Rectangulo {
  tipo: "rectangulo";
  ancho: number;
  alto: number;
}

interface Circulo {
  tipo: "circulo";
  radio: number;
}

interface Triangulo {
  tipo: "triangulo";
  base: number;
  altura: number;
}

type Forma = Rectangulo | Circulo | Triangulo;

// Función que calcula área usando discriminated union
function calcularArea(forma: Forma): number {
  switch (forma.tipo) {
    case "rectangulo":
      return forma.ancho * forma.alto;
    
    case "circulo":
      return Math.PI * forma.radio ** 2;
    
    case "triangulo":
      return (forma.base * forma.altura) / 2;
    
    default:
      // Exhaustive check asegura que manejamos todos los casos
      const exhaustiveCheck: never = forma;
      return exhaustiveCheck;
  }
}

// Uso
const miRectangulo: Rectangulo = {
  tipo: "rectangulo",
  ancho: 10,
  alto: 5
};

const miCirculo: Circulo = {
  tipo: "circulo",
  radio: 3
};

console.log(calcularArea(miRectangulo)); // 50
console.log(calcularArea(miCirculo)); // 28.27...
```

### 🔧 Discriminated Unions con Métodos

```typescript
// Discriminated union con comportamiento
interface UsuarioRegular {
  tipo: "regular";
  nombre: string;
  email: string;
}

interface UsuarioAdmin {
  tipo: "admin";
  nombre: string;
  email: string;
  permisos: string[];
}

interface UsuarioInvitado {
  tipo: "invitado";
  sesionId: string;
}

type Usuario = UsuarioRegular | UsuarioAdmin | UsuarioInvitado;

// Funciones que trabajan con discriminated unions
function obtenerNombre(usuario: Usuario): string {
  switch (usuario.tipo) {
    case "regular":
    case "admin":
      return usuario.nombre;
    
    case "invitado":
      return "Usuario Invitado";
    
    default:
      const exhaustiveCheck: never = usuario;
      return exhaustiveCheck;
  }
}

function puedeEliminar(usuario: Usuario): boolean {
  switch (usuario.tipo) {
    case "admin":
      return usuario.permisos.includes("delete");
    
    case "regular":
    case "invitado":
      return false;
    
    default:
      const exhaustiveCheck: never = usuario;
      return exhaustiveCheck;
  }
}
```

---

## 🔍 Técnicas Avanzadas de Narrowing

### 🎯 Narrowing con in operator

```typescript
// Narrowing con 'in' operator
interface Pez {
  nadar(): void;
}

interface Pajaro {
  volar(): void;
}

function moverAnimal(animal: Pez | Pajaro): void {
  if ("nadar" in animal) {
    // animal es Pez
    animal.nadar();
  } else {
    // animal es Pajaro
    animal.volar();
  }
}
```

### 🔧 Narrowing con Equality

```typescript
// Narrowing con equality checks
function procesarValor(x: string | number, y: string | boolean): void {
  if (x === y) {
    // x y y son string aquí (única posibilidad común)
    console.log(x.toUpperCase());
    console.log(y.toUpperCase());
  }
}

// Narrowing con truthiness
function procesarTexto(texto: string | null | undefined): string {
  if (texto) {
    // texto es string aquí (truthy)
    return texto.trim();
  }
  return "Texto vacío";
}
```

### 🎨 Control Flow Analysis

```typescript
// TypeScript analiza el flujo de control
function ejemplo(valor: string | number | null): string {
  if (valor === null) {
    return "nulo";
  }
  
  // TypeScript sabe que valor no es null aquí
  if (typeof valor === "string") {
    return valor.toUpperCase();
  }
  
  // TypeScript sabe que valor es number aquí
  return valor.toFixed(2);
}

// Assignments también estrecha tipos
function procesoComplejo(input: unknown): string {
  let resultado: string;
  
  if (typeof input === "string") {
    resultado = input; // OK, input es string
  } else if (typeof input === "number") {
    resultado = input.toString(); // OK, input es number
  } else {
    resultado = "desconocido";
  }
  
  return resultado; // TypeScript sabe que resultado es string
}
```

---

## 🎯 Mejores Prácticas

### ✅ Recomendaciones

1. **Prefiere type guards sobre assertions:**

   ```typescript
   // ❌ Menos seguro
   function procesar(data: unknown) {
     const usuario = data as Usuario;
     return usuario.nombre;
   }
   
   // ✅ Más seguro
   function procesar(data: unknown) {
     if (esUsuario(data)) {
       return data.nombre;
     }
     throw new Error("Datos inválidos");
   }
   ```

2. **Usa discriminated unions para estados:**

   ```typescript
   // ✅ Claro y tipo-seguro
   type Estado = 
     | { tipo: "cargando" }
     | { tipo: "exito"; datos: any }
     | { tipo: "error"; mensaje: string };
   ```

3. **Implementa exhaustive checking:**

   ```typescript
   // ✅ Asegura que manejas todos los casos
   function manejar(estado: Estado): string {
     switch (estado.tipo) {
       case "cargando":
         return "Cargando...";
       case "exito":
         return "Éxito";
       case "error":
         return estado.mensaje;
       default:
         const exhaustiveCheck: never = estado;
         return exhaustiveCheck;
     }
   }
   ```

### ❌ Errores Comunes

1. **Assertions sin verificación:**

   ```typescript
   // ❌ Peligroso
   const usuario = data as Usuario;
   
   // ✅ Mejor
   if (esUsuario(data)) {
     const usuario = data;
   }
   ```

2. **Type guards incorrectos:**

   ```typescript
   // ❌ Incompleto
   function esUsuario(obj: any): obj is Usuario {
     return obj.nombre !== undefined;
   }
   
   // ✅ Completo
   function esUsuario(obj: unknown): obj is Usuario {
     return (
       typeof obj === "object" &&
       obj !== null &&
       "nombre" in obj &&
       typeof (obj as any).nombre === "string"
     );
   }
   ```

---

## 📖 Recursos Adicionales

- 🔗 [TypeScript Handbook: Type Assertions](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions)
- 🔗 [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- 🔗 [TypeScript Deep Dive: Type Guards](https://basarat.gitbook.io/typescript/type-system/typeguard)

---

[⬅️ Volver: Enums](./03-2-enums.md) | [🏠 Volver al Módulo 2](./README.md)
