# 🚀 Ejercicio 2: Primer Programa TypeScript

> **Módulo:** Introducción a TypeScript  
> **Dificultad:** 🟢 Fácil  
> **Tiempo estimado:** 20 minutos

---

## 🎯 Objetivo

Crear tu primer programa TypeScript funcional, explorando la sintaxis básica, tipos implícitos y el proceso de compilación.

## 📋 Requisitos

Al completar este ejercicio, deberás haber:

- ✅ Creado varios archivos TypeScript con diferentes características
- ✅ Utilizado tipos básicos (string, number, boolean, array)
- ✅ Experimentado con inferencia de tipos
- ✅ Compilado y ejecutado código TypeScript

## 🚀 Instrucciones

### Parte 1: Programa de Saludo

1. **Crea el archivo `src/saludo.ts`:**

   ```typescript
   // Función con tipos explícitos
   function saludarPersona(nombre: string, edad: number): string {
     return `¡Hola ${nombre}! Tienes ${edad} años.`;
   }

   // Variables con tipos inferidos
   const miNombre = "Juan";
   const miEdad = 25;

   // Uso de la función
   const mensaje = saludarPersona(miNombre, miEdad);
   console.log(mensaje);
   ```

2. **Ejecuta el programa:**

   ```bash
   bun run src/saludo.ts
   ```

### Parte 2: Calculadora Básica

3. **Crea el archivo `src/calculadora.ts`:**

   ```typescript
   // Función con múltiples parámetros
   function calcular(operacion: string, a: number, b: number): number {
     switch (operacion) {
       case "suma":
         return a + b;
       case "resta":
         return a - b;
       case "multiplicacion":
         return a * b;
       case "division":
         return b !== 0 ? a / b : 0;
       default:
         return 0;
     }
   }

   // Pruebas de la calculadora
   console.log("Suma:", calcular("suma", 10, 5));
   console.log("Resta:", calcular("resta", 10, 5));
   console.log("Multiplicación:", calcular("multiplicacion", 10, 5));
   console.log("División:", calcular("division", 10, 5));
   ```

### Parte 3: Trabajando con Arrays

4. **Crea el archivo `src/arrays.ts`:**

   ```typescript
   // Arrays con tipos explícitos
   const numeros: number[] = [1, 2, 3, 4, 5];
   const nombres: string[] = ["Ana", "Carlos", "María"];
   
   // Array con inferencia de tipos
   const mixto = [1, "texto", true]; // (string | number | boolean)[]

   // Función que procesa arrays
   function procesarNumeros(lista: number[]): { suma: number; promedio: number } {
     const suma = lista.reduce((acc, num) => acc + num, 0);
     const promedio = suma / lista.length;
     
     return { suma, promedio };
   }

   // Uso de la función
   const resultado = procesarNumeros(numeros);
   console.log("Suma:", resultado.suma);
   console.log("Promedio:", resultado.promedio);
   ```

### Parte 4: Objeto con Propiedades

5. **Crea el archivo `src/objetos.ts`:**

   ```typescript
   // Objeto con tipos implícitos
   const persona = {
     nombre: "Laura",
     edad: 30,
     esEstudiante: false,
     materias: ["TypeScript", "JavaScript", "React"]
   };

   // Función que acepta objetos
   function presentarPersona(p: typeof persona): string {
     const materiasTexto = p.materias.join(", ");
     return `${p.nombre} (${p.edad} años) ${p.esEstudiante ? 'estudia' : 'no estudia'} ${materiasTexto}`;
   }

   console.log(presentarPersona(persona));
   ```

## 🧪 Verificación

### Ejecuta cada programa:

1. **Ejecuta todos los archivos:**

   ```bash
   bun run src/saludo.ts
   bun run src/calculadora.ts
   bun run src/arrays.ts
   bun run src/objetos.ts
   ```

2. **Compila los archivos:**

   ```bash
   bun run build
   ```

3. **Ejecuta los archivos compilados:**

   ```bash
   node dist/saludo.js
   node dist/calculadora.js
   node dist/arrays.js
   node dist/objetos.js
   ```

## 🎯 Desafíos Adicionales

### Nivel 1: Función de Estadísticas

Crea `src/estadisticas.ts` con una función que calcule:
- Valor máximo
- Valor mínimo
- Mediana
- Desviación estándar

### Nivel 2: Sistema de Tareas

Crea `src/tareas.ts` con:
- Array de tareas con propiedades (id, título, completada)
- Funciones para agregar, completar y listar tareas
- Función para mostrar estadísticas

## ✅ Criterios de Éxito

- [ ] Todos los archivos TypeScript se ejecutan sin errores
- [ ] Se utilizan tipos explícitos e implícitos correctamente
- [ ] Los programas producen la salida esperada
- [ ] El código compila correctamente
- [ ] Se experimenta con diferentes tipos de datos

## 🔍 Conceptos Clave Aprendidos

- **Tipos explícitos vs implícitos:** Cuándo usar cada uno
- **Inferencia de tipos:** Cómo TypeScript deduce tipos automáticamente
- **Funciones tipadas:** Parámetros y valores de retorno
- **Arrays tipados:** Diferentes formas de declarar arrays
- **Objetos:** Estructura y propiedades tipadas

## 🤝 Contribuir

¿Tienes ideas para mejorar estos ejercicios? ¡Comparte tus programas!

- [✅ Ver soluciones](../../../Solutions/01-introduccion/)
- [🏠 Volver al módulo](./README.md)

---

**💡 Tip:** Experimenta modificando los tipos para ver cómo TypeScript detecta errores en tiempo de compilación.
