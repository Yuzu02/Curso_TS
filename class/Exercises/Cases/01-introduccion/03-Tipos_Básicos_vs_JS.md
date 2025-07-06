# 🔍 Ejercicio 3: Tipos Básicos vs JavaScript

> **Módulo:** Introducción a TypeScript  
> **Dificultad:** 🟢 Fácil  
> **Tiempo estimado:** 25 minutos

---

## 🎯 Objetivo

Comprender las ventajas del sistema de tipos de TypeScript comparándolo directamente con JavaScript, experimentando con errores de tipo y type safety.

## 📋 Requisitos

Al completar este ejercicio, deberás haber:

- ✅ Creado versiones en JavaScript y TypeScript del mismo código
- ✅ Experimentado con errores de tipo en tiempo de compilación
- ✅ Entendido las ventajas de type safety
- ✅ Visto cómo TypeScript previene errores comunes

## 🚀 Instrucciones

### Parte 1: Comparación Básica

1. **Crea el archivo `src/javascript-version.js`:**

   ```javascript
   // Código JavaScript sin tipos
   function procesarUsuario(usuario) {
     return `Usuario: ${usuario.name}, Edad: ${usuario.age}`;
   }

   // Estos errores no se detectan hasta runtime
   console.log(procesarUsuario({ name: "Juan", age: 25 })); // ✅ Correcto
   console.log(procesarUsuario({ nombre: "Ana", edad: 30 })); // ❌ Error silencioso
   console.log(procesarUsuario("Juan")); // ❌ Error en runtime
   console.log(procesarUsuario(null)); // ❌ Error en runtime
   ```

2. **Crea el archivo `src/typescript-version.ts`:**

   ```typescript
   // Código TypeScript con tipos
   interface Usuario {
     name: string;
     age: number;
   }

   function procesarUsuario(usuario: Usuario): string {
     return `Usuario: ${usuario.name}, Edad: ${usuario.age}`;
   }

   // TypeScript detecta errores en tiempo de compilación
   console.log(procesarUsuario({ name: "Juan", age: 25 })); // ✅ Correcto
   
   // Descomenta estas líneas para ver errores de TypeScript:
   // console.log(procesarUsuario({ nombre: "Ana", edad: 30 })); // ❌ Error de compilación
   // console.log(procesarUsuario("Juan")); // ❌ Error de compilación
   // console.log(procesarUsuario(null)); // ❌ Error de compilación
   ```

### Parte 2: Funciones con Tipos

3. **Crea el archivo `src/funciones-js.js`:**

   ```javascript
   // JavaScript - sin validación de tipos
   function multiplicar(a, b) {
     return a * b;
   }

   function dividir(a, b) {
     return a / b;
   }

   // Estos pueden producir resultados inesperados
   console.log(multiplicar(5, 3)); // 15
   console.log(multiplicar("5", 3)); // 15 (coerción implícita)
   console.log(multiplicar("cinco", 3)); // NaN
   console.log(dividir(10, 0)); // Infinity
   console.log(dividir("10", "2")); // 5
   ```

4. **Crea el archivo `src/funciones-ts.ts`:**

   ```typescript
   // TypeScript - con validación de tipos
   function multiplicar(a: number, b: number): number {
     return a * b;
   }

   function dividir(a: number, b: number): number {
     if (b === 0) {
       throw new Error("División por cero no permitida");
     }
     return a / b;
   }

   // Solo acepta números
   console.log(multiplicar(5, 3)); // 15
   console.log(dividir(10, 2)); // 5

   // Descomenta para ver errores de TypeScript:
   // console.log(multiplicar("5", 3)); // ❌ Error de compilación
   // console.log(multiplicar("cinco", 3)); // ❌ Error de compilación
   // console.log(dividir("10", "2")); // ❌ Error de compilación
   ```

### Parte 3: Arrays y Objetos

5. **Crea el archivo `src/estructuras-js.js`:**

   ```javascript
   // JavaScript - sin tipos en arrays
   const numeros = [1, 2, 3, "4", 5];
   
   function sumarArray(arr) {
     return arr.reduce((sum, num) => sum + num, 0);
   }

   // Puede producir resultados inesperados
   console.log(sumarArray([1, 2, 3])); // 6
   console.log(sumarArray([1, 2, "3"])); // "33"
   console.log(sumarArray([1, 2, true])); // 4
   ```

6. **Crea el archivo `src/estructuras-ts.ts`:**

   ```typescript
   // TypeScript - con tipos en arrays
   const numeros: number[] = [1, 2, 3, 4, 5];
   
   function sumarArray(arr: number[]): number {
     return arr.reduce((sum, num) => sum + num, 0);
   }

   // Solo acepta arrays de números
   console.log(sumarArray([1, 2, 3])); // 6
   console.log(sumarArray(numeros)); // 15

   // Descomenta para ver errores:
   // const mixto = [1, 2, "3"]; // ❌ Error si está tipado como number[]
   // console.log(sumarArray(["1", "2", "3"])); // ❌ Error de compilación
   ```

### Parte 4: Refactoring con Tipos

7. **Crea el archivo `src/refactoring-ejemplo.ts`:**

   ```typescript
   // Antes: Código JavaScript problemático
   /*
   function processOrder(order) {
     const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
     const tax = total * 0.1;
     return {
       subtotal: total,
       tax: tax,
       total: total + tax,
       customer: order.customer.name
     };
   }
   */

   // Después: Código TypeScript con tipos
   interface OrderItem {
     name: string;
     price: number;
     quantity: number;
   }

   interface Customer {
     name: string;
     email: string;
   }

   interface Order {
     items: OrderItem[];
     customer: Customer;
   }

   interface OrderSummary {
     subtotal: number;
     tax: number;
     total: number;
     customer: string;
   }

   function processOrder(order: Order): OrderSummary {
     const subtotal = order.items.reduce(
       (sum, item) => sum + (item.price * item.quantity), 
       0
     );
     const tax = subtotal * 0.1;
     
     return {
       subtotal,
       tax,
       total: subtotal + tax,
       customer: order.customer.name
     };
   }

   // Uso con datos tipados
   const order: Order = {
     items: [
       { name: "Laptop", price: 999.99, quantity: 1 },
       { name: "Mouse", price: 29.99, quantity: 2 }
     ],
     customer: { name: "Juan Pérez", email: "juan@email.com" }
   };

   console.log(processOrder(order));
   ```

## 🧪 Verificación

### Ejecuta y compara:

1. **Ejecuta las versiones JavaScript:**

   ```bash
   node src/javascript-version.js
   node src/funciones-js.js
   node src/estructuras-js.js
   ```

2. **Ejecuta las versiones TypeScript:**

   ```bash
   bun run src/typescript-version.ts
   bun run src/funciones-ts.ts
   bun run src/estructuras-ts.ts
   bun run src/refactoring-ejemplo.ts
   ```

3. **Experimenta con errores:**
   - Descomenta las líneas marcadas con errores
   - Ejecuta `bun run build` para ver errores de compilación
   - Compara con el comportamiento en JavaScript

## 🎯 Experimentos Adicionales

### Experimento 1: Detección de Errores

```typescript
// Crea este archivo y experimenta
interface Product {
  id: number;
  name: string;
  price: number;
}

function calculateDiscount(product: Product, discount: number): number {
  return product.price * (1 - discount);
}

// Prueba con diferentes tipos de datos incorrectos
```

### Experimento 2: Refactoring

Toma código JavaScript existente y agrégale tipos TypeScript paso a paso.

## ✅ Criterios de Éxito

- [ ] Ejecutaste las versiones JavaScript y TypeScript
- [ ] Observaste las diferencias en detección de errores
- [ ] Experimentaste con errores de compilación
- [ ] Entendiste las ventajas de type safety
- [ ] Refactorizaste código JavaScript a TypeScript

## 🔍 Conceptos Clave Aprendidos

- **Type Safety:** Prevención de errores en tiempo de compilación
- **Interfaces:** Definición de contratos para objetos
- **Detección temprana de errores:** Vs errores en runtime
- **Refactoring seguro:** Cómo los tipos ayudan en mantenimiento
- **Documentación viva:** Los tipos como documentación

## 🤝 Contribuir

¿Encontraste otros ejemplos interesantes de comparación? ¡Compártelos!

- [✅ Ver soluciones](../../../Solutions/01-introduccion/)
- [🏠 Volver al módulo](./README.md)

---

**💡 Tip:** Los tipos en TypeScript no solo previenen errores, sino que también mejoran la experiencia de desarrollo con mejor autocompletado y refactoring.
