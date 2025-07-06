# 🎯 Ejercicio 1: Trabajando con Tipos Primitivos

> Sistema de validación de datos utilizando todos los tipos primitivos de TypeScript

---

## 📋 Descripción

Crea un sistema de validación de datos utilizando todos los tipos primitivos de TypeScript.

**Dificultad:** 🟢 Principiante | **Tiempo:** 45 minutos

---

## 🎯 Objetivos

- Dominar el uso de tipos primitivos: `string`, `number`, `boolean`, `bigint`, `symbol`
- Implementar validaciones básicas
- Practicar la inferencia de tipos
- Entender las diferencias entre tipos primitivos y sus wrappers

---

## 📋 Requerimientos

1. **Validador de String:**
   - Validar longitud mínima y máxima
   - Validar formato (email, teléfono, etc.)
   - Validar caracteres permitidos

2. **Validador de Number:**
   - Validar rango de valores
   - Validar números enteros vs decimales
   - Manejar casos especiales (NaN, Infinity)

3. **Validador de Boolean:**
   - Validar valores truthy/falsy
   - Convertir strings a boolean de manera segura

4. **Validador de BigInt:**
   - Validar números grandes
   - Convertir string a bigint

5. **Validador de Symbol:**
   - Crear símbolos únicos
   - Validar símbolos existentes

---

## 💡 Pistas

```typescript
// Estructura base para empezar
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  value?: any;
}

// Ejemplo de función base
function validateString(value: unknown): ValidationResult {
  // Tu implementación aquí
}
```

---

## 🧪 Casos de Prueba

```typescript
// Casos de prueba que debes cubrir
const testCases = [
  { input: "hello@example.com", expected: true },
  { input: 42, expected: true },
  { input: true, expected: true },
  { input: 123n, expected: true },
  { input: Symbol("test"), expected: true },
  { input: null, expected: false },
  { input: undefined, expected: false },
];
```

---

## 🏆 Criterios de Evaluación

- ✅ Uso correcto de tipos primitivos
- ✅ Validaciones robustas
- ✅ Manejo de casos límite
- ✅ Código bien documentado
- ✅ Casos de prueba funcionando

---

## 🔗 Enlaces Útiles

- [📖 Tipos Primitivos - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Data_structures)
- [📚 TypeScript Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../02-Compuestos/01-Gestion_Usuarios.md)
