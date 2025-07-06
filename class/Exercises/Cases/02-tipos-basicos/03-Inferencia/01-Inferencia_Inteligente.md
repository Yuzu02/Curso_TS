# 🎯 Ejercicio 1: Inferencia Inteligente

> Crea funciones que aprovechen la inferencia de tipos para mantener el código limpio y legible

---

## 📋 Descripción

Crea funciones que aprovechen la inferencia de tipos para mantener el código limpio y legible.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 45 minutos

---

## 🎯 Objetivos

- Entender cómo funciona la inferencia de tipos en TypeScript
- Escribir código que aproveche la inferencia automática
- Saber cuándo es necesario ser explícito con los tipos
- Crear funciones que infieran tipos de retorno apropiados

---

## 📋 Requerimientos

1. **Funciones con Inferencia Automática:**
   - Funciones que infieran tipos de retorno
   - Funciones que infieran tipos de parámetros
   - Funciones genéricas básicas

2. **Casos Avanzados:**
   - Inferencia con objetos complejos
   - Inferencia con arrays y tuplas
   - Inferencia condicional

3. **Optimización:**
   - Reducir anotaciones de tipo innecesarias
   - Mantener la legibilidad del código

---

## 💡 Estructura Base

```typescript
// Ejemplos de funciones que aprovechan la inferencia

// Función básica - TypeScript infiere el tipo de retorno
function suma(a: number, b: number) {
  return a + b; // TypeScript infiere que retorna number
}

// Función con objeto - TypeScript infiere la estructura
function crearUsuario(nombre: string, edad: number) {
  return {
    nombre,
    edad,
    activo: true,
    fechaCreacion: new Date()
  }; // TypeScript infiere toda la estructura
}

// Función genérica - TypeScript infiere el tipo T
function primerElemento<T>(array: T[]) {
  return array[0]; // TypeScript infiere que retorna T | undefined
}

// Implementa más funciones que aprovechen la inferencia
```

---

## 🧪 Casos de Prueba

```typescript
// Casos donde la inferencia debe funcionar correctamente
const resultado1 = suma(5, 3); // number
const usuario = crearUsuario("Ana", 28); // objeto con estructura inferida
const primer = primerElemento([1, 2, 3]); // number | undefined
const primerString = primerElemento(["a", "b", "c"]); // string | undefined
```

---

## 🏆 Criterios de Evaluación

- ✅ Aprovecha correctamente la inferencia de tipos
- ✅ Minimiza anotaciones de tipo innecesarias
- ✅ Mantiene la legibilidad y claridad
- ✅ Casos de prueba con tipos inferidos correctos

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../04-Rutas_literal/01-Sistema_Rutas.md)
