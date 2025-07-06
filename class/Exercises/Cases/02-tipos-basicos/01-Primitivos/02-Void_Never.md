# 🎯 Ejercicio 2: Tipos Void y Never

> Comprende y utiliza los tipos void y never en diferentes contextos

---

## 📋 Descripción

Explora los tipos `void` y `never` de TypeScript, entendiendo cuándo y cómo utilizarlos correctamente.

**Dificultad:** 🟢 Principiante | **Tiempo:** 30 minutos

---

## 🎯 Objetivos

- Entender la diferencia entre `void` y `never`
- Saber cuándo usar cada tipo
- Implementar funciones que retornen `void` y `never`
- Comprender el concepto de "unreachable code"

---

## 📋 Requerimientos

1. **Funciones Void:**
   - Crear funciones que no retornan valor
   - Manejar callbacks con void
   - Entender cuándo TypeScript infiere void

2. **Funciones Never:**
   - Implementar funciones que nunca terminan
   - Manejar errores con never
   - Usar never para exhaustive checking

---

## 💡 Estructura Base

```typescript
// 1. Implementa funciones que retornen void
function mostrarMensaje(mensaje: string): void {
  // Tu implementación aquí
}

function ejecutarCallback(callback: () => void): void {
  // Tu implementación aquí
}

// 2. Implementa funciones que retornen never
function lanzarError(mensaje: string): never {
  // Tu implementación aquí
}

function bucleInfinito(): never {
  // Tu implementación aquí
}

// 3. Usa never para exhaustive checking
type Color = "rojo" | "verde" | "azul";

function procesarColor(color: Color): string {
  switch (color) {
    case "rojo":
      return "Color rojo seleccionado";
    case "verde":
      return "Color verde seleccionado";
    case "azul":
      return "Color azul seleccionado";
    default:
      // Usa never aquí para exhaustive checking
      const _exhaustiveCheck: never = color;
      return _exhaustiveCheck;
  }
}

// 4. Ejercicio práctico: Sistema de logs
interface Logger {
  info(mensaje: string): void;
  error(mensaje: string): never;
  warn(mensaje: string): void;
}

class ConsoleLogger implements Logger {
  info(mensaje: string): void {
    // Tu implementación aquí
  }

  error(mensaje: string): never {
    // Tu implementación aquí
  }

  warn(mensaje: string): void {
    // Tu implementación aquí
  }
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba tus implementaciones aquí
const logger = new ConsoleLogger();

// Estas funciones deberían funcionar
logger.info("Información importante");
logger.warn("Advertencia");

// Esta función debería lanzar error y never retornar
// logger.error("Error crítico");

// Prueba exhaustive checking
console.log(procesarColor("rojo"));
console.log(procesarColor("verde"));
console.log(procesarColor("azul"));
```

---

## 🏆 Criterios de Evaluación

- ✅ Funciones void correctamente implementadas
- ✅ Funciones never que realmente nunca retornan
- ✅ Exhaustive checking funcionando
- ✅ Diferencia clara entre void y never

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](02-Unknown_Any.md)
