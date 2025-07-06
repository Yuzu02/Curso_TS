# 🔧 2.1.2 Tipos Compuestos Básicos

> **Duración:** 2 horas | **Nivel:** Fundamental

## 🎯 Objetivos de la Lección

Al finalizar esta lección, serás capaz de:

- ✅ Trabajar con arrays y tuplas
- ✅ Definir objetos e interfaces básicas
- ✅ Crear tipos para funciones
- ✅ Utilizar union e intersection types
- ✅ Combinar tipos para crear estructuras complejas

---

## 📚 Arrays y Tuplas

### 🔢 Arrays

Los arrays en TypeScript pueden contener elementos del mismo tipo o tipos múltiples.

```typescript
// Array de números
let numeros: number[] = [1, 2, 3, 4, 5];
let otrosNumeros: Array<number> = [10, 20, 30];

// Array de strings
let nombres: string[] = ["Juan", "María", "Pedro"];

// Array mixto con union types
let mixto: (string | number)[] = ["texto", 42, "otro", 100];

// Array de objetos
interface Usuario {
  id: number;
  nombre: string;
}

let usuarios: Usuario[] = [
  { id: 1, nombre: "Juan" },
  { id: 2, nombre: "María" }
];

// Arrays anidados
let matriz: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
```

### 📦 Tuplas

Las tuplas son arrays con un número fijo de elementos y tipos específicos en cada posición.

```typescript
// Tupla básica
let coordenada: [number, number] = [10, 20];

// Tupla con tipos mixtos
let persona: [string, number, boolean] = ["Juan", 25, true];

// Tupla con nombres (TypeScript 4.0+)
let punto: [x: number, y: number] = [100, 200];

// Tuplas opcionales
let configuracion: [string, number?] = ["debug"];
configuracion = ["production", 3000];

// Tuplas con rest elements
let datos: [string, ...number[]] = ["etiqueta", 1, 2, 3, 4];

// Tuplas readonly
let inmutable: readonly [string, number] = ["constante", 42];
// inmutable[0] = "cambio"; // Error!
```

---

## 🏗️ Objetos e Interfaces

### 📋 Tipos de Objeto Básicos

```typescript
// Tipo de objeto literal
let usuario: { id: number; nombre: string; email: string } = {
  id: 1,
  nombre: "Juan",
  email: "juan@example.com"
};

// Propiedades opcionales
let configuracion: { host: string; puerto?: number } = {
  host: "localhost"
  // puerto es opcional
};

// Propiedades readonly
let settings: { readonly apiKey: string; entorno: string } = {
  apiKey: "secret-key",
  entorno: "desarrollo"
};
// settings.apiKey = "nuevo-key"; // Error!
```

### 🔧 Interfaces Básicas

```typescript
// Interface básica
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  disponible: boolean;
}

// Interface con propiedades opcionales
interface UsuarioCompleto {
  id: number;
  nombre: string;
  email: string;
  telefono?: string; // Opcional
  fechaNacimiento?: Date; // Opcional
}

// Interface con propiedades readonly
interface ConfiguracionAPI {
  readonly baseUrl: string;
  readonly timeout: number;
  retries: number;
}

// Interface con índices
interface Diccionario {
  [clave: string]: string;
}

let traducciones: Diccionario = {
  "hello": "hola",
  "goodbye": "adiós",
  "thank you": "gracias"
};
```

---

## 🎯 Funciones y sus Tipos

### 🔧 Tipos de Función Básicos

```typescript
// Tipo de función básico
let saludar: (nombre: string) => string;

saludar = function(nombre: string): string {
  return `Hola, ${nombre}!`;
};

// Función con múltiples parámetros
let calcular: (a: number, b: number, operacion: string) => number;

calcular = (a, b, operacion) => {
  switch (operacion) {
    case "suma": return a + b;
    case "resta": return a - b;
    default: return 0;
  }
};

// Función con parámetros opcionales
let formatear: (texto: string, mayuscula?: boolean) => string;

formatear = (texto, mayuscula = false) => {
  return mayuscula ? texto.toUpperCase() : texto;
};
```

### 🔧 Interfaces para Funciones

```typescript
// Interface de función
interface Calculadora {
  (a: number, b: number): number;
}

let sumar: Calculadora = (a, b) => a + b;
let multiplicar: Calculadora = (a, b) => a * b;

// Interface con múltiples firmas
interface Conversor {
  (valor: string): number;
  (valor: number): string;
  (valor: boolean): string;
}

// Implementación con overloads
function convertir(valor: string): number;
function convertir(valor: number): string;
function convertir(valor: boolean): string;
function convertir(valor: string | number | boolean): string | number {
  if (typeof valor === "string") return parseFloat(valor);
  if (typeof valor === "number") return valor.toString();
  return valor.toString();
}
```

---

## 🔄 Union Types

Los union types permiten que una variable pueda ser de múltiples tipos.

```typescript
// Union type básico
let id: string | number;
id = "ABC123";
id = 123;

// Union type con literales
let estado: "cargando" | "completo" | "error";
estado = "cargando";

// Función con union types
function formatearId(id: string | number): string {
  // Type narrowing necesario
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toString();
}

// Union types con objetos
interface Rectangulo {
  tipo: "rectangulo";
  ancho: number;
  alto: number;
}

interface Circulo {
  tipo: "circulo";
  radio: number;
}

type Forma = Rectangulo | Circulo;

function calcularArea(forma: Forma): number {
  switch (forma.tipo) {
    case "rectangulo":
      return forma.ancho * forma.alto;
    case "circulo":
      return Math.PI * forma.radio ** 2;
  }
}
```

---

## 🔗 Intersection Types

Los intersection types combinan múltiples tipos en uno solo.

```typescript
// Intersection type básico
interface Persona {
  nombre: string;
  edad: number;
}

interface Empleado {
  empresa: string;
  salario: number;
}

type EmpleadoCompleto = Persona & Empleado;

let trabajador: EmpleadoCompleto = {
  nombre: "Juan",
  edad: 30,
  empresa: "TechCorp",
  salario: 50000
};

// Intersection con funciones
interface Validador {
  validar(valor: any): boolean;
}

interface Formateador {
  formatear(valor: any): string;
}

type ValidadorFormateador = Validador & Formateador;

class ProcesadorTexto implements ValidadorFormateador {
  validar(valor: any): boolean {
    return typeof valor === "string" && valor.length > 0;
  }
  
  formatear(valor: any): string {
    return valor.toString().trim();
  }
}
```

---

## 🎯 Ejemplos Prácticos

### Sistema de Inventario

```typescript
// Tipos básicos
type EstadoProducto = "disponible" | "agotado" | "descontinuado";

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  estado: EstadoProducto;
  etiquetas: string[];
}

// Función para gestionar inventario
function actualizarInventario(
  productos: Producto[],
  id: string,
  cambios: Partial<Producto>
): Producto[] {
  return productos.map(producto => 
    producto.id === id 
      ? { ...producto, ...cambios }
      : producto
  );
}

// Función con union types
function buscarProducto(
  productos: Producto[],
  criterio: string | { categoria: string; estado: EstadoProducto }
): Producto[] {
  if (typeof criterio === "string") {
    return productos.filter(p => 
      p.nombre.toLowerCase().includes(criterio.toLowerCase())
    );
  }
  
  return productos.filter(p => 
    p.categoria === criterio.categoria && 
    p.estado === criterio.estado
  );
}
```

### Sistema de Configuración

```typescript
// Configuración con intersection types
interface ConfiguracionBase {
  nombre: string;
  version: string;
  debug: boolean;
}

interface ConfiguracionBaseDatos {
  host: string;
  puerto: number;
  baseDatos: string;
}

interface ConfiguracionAPI {
  baseUrl: string;
  timeout: number;
  reintentos: number;
}

type ConfiguracionCompleta = ConfiguracionBase & 
  ConfiguracionBaseDatos & 
  ConfiguracionAPI;

// Función para validar configuración
function validarConfiguracion(
  config: Partial<ConfiguracionCompleta>
): config is ConfiguracionCompleta {
  return !!(
    config.nombre &&
    config.version &&
    config.host &&
    config.puerto &&
    config.baseDatos &&
    config.baseUrl &&
    config.timeout &&
    config.reintentos !== undefined
  );
}
```

---

## 🎓 Ejercicios Prácticos

### Ejercicio 1: Sistema de Tareas

Crea un sistema de gestión de tareas con los siguientes tipos:

```typescript
// Define estos tipos
type PrioridadTarea = // "alta" | "media" | "baja"
type EstadoTarea = // "pendiente" | "en_progreso" | "completada"

interface Tarea {
  // Define la estructura de una tarea
}

interface ListaTareas {
  // Define la estructura de una lista de tareas
}

// Implementa estas funciones
function crearTarea(/* parámetros */): Tarea {
  // Tu implementación
}

function filtrarTareas(/* parámetros */): Tarea[] {
  // Tu implementación
}

function actualizarEstado(/* parámetros */): void {
  // Tu implementación
}
```

### Ejercicio 2: Sistema de Usuarios

Implementa un sistema de usuarios con diferentes roles:

```typescript
// Define estos tipos
interface UsuarioBase {
  // Propiedades comunes
}

interface Administrador {
  // Propiedades específicas del admin
}

interface UsuarioRegular {
  // Propiedades específicas del usuario
}

// Combina tipos según sea necesario
type Usuario = // Tu implementación

// Implementa funciones de gestión
function crearUsuario(/* parámetros */): Usuario {
  // Tu implementación
}

function verificarPermisos(/* parámetros */): boolean {
  // Tu implementación
}
```

### Ejercicio 3: API de Respuestas

Crea tipos para manejar respuestas de API:

```typescript
// Define tipos para respuestas exitosas y errores
interface RespuestaExitosa<T> {
  // Tu implementación
}

interface RespuestaError {
  // Tu implementación
}

type RespuestaAPI<T> = // Combina los tipos anteriores

// Implementa funciones para manejar respuestas
function procesarRespuesta<T>(
  respuesta: RespuestaAPI<T>
): T | null {
  // Tu implementación
}
```

---

## 📖 Recursos Adicionales

- 🔗 [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- 🔗 [TypeScript Handbook: More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- 🔗 [TypeScript Handbook: Union and Intersection Types](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html)

---

[⬅️ Volver: Tipos Primitivos](./01-1-tipos-primitivos.md) | [➡️ Siguiente: Inferencia de Tipos](./02-inferencia-tipos.md)
