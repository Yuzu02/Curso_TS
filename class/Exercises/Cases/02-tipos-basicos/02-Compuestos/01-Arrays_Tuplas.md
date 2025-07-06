# 🎯 Ejercicio 1: Arrays y Tuplas

> Domina los arrays tipados y tuplas en TypeScript

---

## 📋 Descripción

Aprende a trabajar con arrays tipados y tuplas, entendiendo sus diferencias y casos de uso.

**Dificultad:** 🟢 Principiante | **Tiempo:** 40 minutos

---

## 🎯 Objetivos

- Trabajar con arrays tipados
- Entender y usar tuplas
- Implementar arrays readonly
- Manejar rest elements en tuplas

---

## 📋 Requerimientos

1. **Arrays Tipados:**
   - Crear arrays de diferentes tipos
   - Implementar operaciones seguras
   - Usar métodos de array con tipos

2. **Tuplas:**
   - Definir tuplas con tipos específicos
   - Usar tuplas con nombres
   - Implementar tuplas opcionales

---

## 💡 Estructura Base

```typescript
// 1. Arrays tipados básicos
const numeros: number[] = []; // Tu implementación aquí
const nombres: string[] = []; // Tu implementación aquí
const booleanos: Array<boolean> = []; // Tu implementación aquí

// 2. Funciones que trabajan con arrays
function sumarNumeros(numeros: number[]): number {
  // Tu implementación aquí
}

function filtrarPares(numeros: number[]): number[] {
  // Tu implementación aquí
}

function encontrarMayor(numeros: number[]): number | undefined {
  // Tu implementación aquí
}

// 3. Tuplas básicas
type Coordenada = [number, number];
type PersonaInfo = [string, number, boolean]; // [nombre, edad, activo]

function crearCoordenada(x: number, y: number): Coordenada {
  // Tu implementación aquí
}

function crearPersona(nombre: string, edad: number, activo: boolean): PersonaInfo {
  // Tu implementación aquí
}

// 4. Tuplas con nombres (labeled tuples)
type PuntoNombrado = [x: number, y: number];
type UsuarioTupla = [id: number, nombre: string, email?: string];

function procesarPunto(punto: PuntoNombrado): string {
  // Tu implementación aquí
  // Retorna algo como "Punto en (x, y)"
}

// 5. Tuplas con rest elements
type PrimerElementoYResto = [string, ...number[]];
type ConfiguracionApp = [nombre: string, version: number, ...opciones: string[]];

function procesarConfiguracion(config: ConfiguracionApp): void {
  // Tu implementación aquí
  // Extrae nombre, versión y opciones
}

// 6. Arrays readonly
const CONSTANTES: readonly number[] = [1, 2, 3, 4, 5];
type TuplaReadonly = readonly [string, number];

function procesarConstantes(valores: readonly number[]): number {
  // Tu implementación aquí
  // Calcula la suma sin modificar el array
}

// 7. Ejercicio práctico: Sistema de coordenadas
interface Punto {
  x: number;
  y: number;
}

type Linea = [Punto, Punto];
type Triangulo = [Punto, Punto, Punto];
type Poligono = [Punto, Punto, Punto, ...Punto[]];

function calcularDistancia(linea: Linea): number {
  // Tu implementación aquí
  // Calcula la distancia entre dos puntos
}

function calcularArea(triangulo: Triangulo): number {
  // Tu implementación aquí
  // Calcula el área de un triángulo
}

// 8. Tuplas anidadas
type Matriz2D = [
  [number, number],
  [number, number]
];

type Respuesta<T> = [boolean, T | null, string?]; // [éxito, datos, mensaje]

function procesarMatriz(matriz: Matriz2D): number {
  // Tu implementación aquí
  // Calcula el determinante de la matriz 2x2
}

function crearRespuesta<T>(exito: boolean, datos: T | null, mensaje?: string): Respuesta<T> {
  // Tu implementación aquí
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba arrays
const numerosTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(sumarNumeros(numerosTest)); // 55
console.log(filtrarPares(numerosTest)); // [2, 4, 6, 8, 10]
console.log(encontrarMayor(numerosTest)); // 10

// Prueba tuplas
const coordenada = crearCoordenada(10, 20);
const persona = crearPersona("Juan", 30, true);
console.log(procesarPunto([5, 15]));

// Prueba configuración
const config: ConfiguracionApp = ["MiApp", 1.0, "debug", "logging", "cache"];
procesarConfiguracion(config);

// Prueba geometría
const linea: Linea = [{ x: 0, y: 0 }, { x: 3, y: 4 }];
console.log(calcularDistancia(linea)); // 5

const triangulo: Triangulo = [
  { x: 0, y: 0 },
  { x: 3, y: 0 },
  { x: 0, y: 4 }
];
console.log(calcularArea(triangulo)); // 6

// Prueba respuestas
const respuestaExito = crearRespuesta(true, { id: 1, nombre: "Juan" });
const respuestaError = crearRespuesta(false, null, "Error en el servidor");
```

---

## 🏆 Criterios de Evaluación

- ✅ Arrays tipados correctamente implementados
- ✅ Tuplas con tipos específicos
- ✅ Uso correcto de readonly
- ✅ Rest elements en tuplas
- ✅ Casos de prueba funcionando

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](02-Interfaces_Objetos.md)
