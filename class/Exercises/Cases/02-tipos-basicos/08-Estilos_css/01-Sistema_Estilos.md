# 🎯 Ejercicio 1: Sistema de Estilos CSS con Template Literals

> Usa template literal types para crear un sistema de estilos CSS tipado

---

## 📋 Descripción

Usa template literal types para crear un sistema de estilos CSS completamente tipado.

**Dificultad:** 🔴 Avanzado | **Tiempo:** 75 minutos

---

## 🎯 Objetivos

- Utilizar template literal types para CSS
- Crear tipos para unidades CSS
- Implementar un sistema de estilos tipado
- Generar CSS válido desde TypeScript

---

## 📋 Requerimientos

1. **Definir Tipos CSS:**
   - `CSSLength`: px, em, rem, %, vh, vw
   - `CSSColor`: hex, rgb, hsl, named colors
   - `CSSPosition`: absolute, relative, fixed, sticky

2. **Sistema de Estilos:**
   - Interface para propiedades CSS
   - Función para generar CSS
   - Validación de valores

---

## 💡 Estructura Base

```typescript
// Define tipos para CSS
type CSSLength = `${number}px` | `${number}em` | `${number}rem` | `${number}%` | `${number}vh` | `${number}vw`;
type CSSColor = 
  | `#${string}` 
  | `rgb(${number}, ${number}, ${number})` 
  | `rgba(${number}, ${number}, ${number}, ${number})` 
  | `hsl(${number}, ${number}%, ${number}%)` 
  | "red" | "blue" | "green" | "black" | "white" | "transparent";
type CSSPosition = "absolute" | "relative" | "fixed" | "sticky" | "static";

// Crea un sistema de estilos tipado
interface StyleProps {
  width?: CSSLength;
  height?: CSSLength;
  color?: CSSColor;
  backgroundColor?: CSSColor;
  position?: CSSPosition;
  top?: CSSLength;
  left?: CSSLength;
  fontSize?: CSSLength;
  margin?: CSSLength;
  padding?: CSSLength;
}

// Implementa funciones para generar CSS
function generateCSS(selector: string, styles: StyleProps): string {
  // Tu implementación
}

function validateCSSValue(property: keyof StyleProps, value: string): boolean {
  // Tu implementación
}

function createStyleSheet(styles: Record<string, StyleProps>): string {
  // Tu implementación
}
```

---

## 🧪 Casos de Prueba

```typescript
// Casos de prueba para estilos válidos
const estilos: StyleProps = {
  width: "100px",
  height: "50vh",
  color: "#ff0000",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  position: "absolute",
  top: "10px",
  left: "20%",
  fontSize: "1.2em",
  margin: "10px",
  padding: "5px"
};

const css = generateCSS(".mi-clase", estilos);
console.log(css);

// Prueba con múltiples selectores
const styleSheet = createStyleSheet({
  ".header": {
    width: "100%",
    height: "80px",
    backgroundColor: "#333",
    color: "white"
  },
  ".button": {
    padding: "10px",
    backgroundColor: "blue",
    color: "white"
  }
});

console.log(styleSheet);
```

---

## 🏆 Criterios de Evaluación

- ✅ Template literal types correctamente implementados
- ✅ Sistema de estilos funcional
- ✅ Validación de valores CSS
- ✅ Generación de CSS válido
- ✅ Casos de prueba funcionando

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../06-Sistema_tema/01-Sistema_Tema.md)
