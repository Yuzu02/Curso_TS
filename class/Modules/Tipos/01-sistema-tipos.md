# 🔧 2.1 Sistema de Tipos de TypeScript

> **Duración:** 4 horas | **Nivel:** Fundamental

## 🎯 Objetivos de la Lección

Al finalizar esta lección, serás capaz de:

- ✅ Entender el sistema de tipos de TypeScript
- ✅ Trabajar con tipos primitivos y compuestos
- ✅ Aplicar tipos básicos en situaciones reales
- ✅ Combinar tipos para crear estructuras más complejas

---

## 📚 Introducción

El sistema de tipos de TypeScript es uno de sus aspectos más poderosos. A diferencia de JavaScript, TypeScript permite especificar qué tipo de datos puede contener una variable, parámetro o valor de retorno. Esto proporciona:

- **Seguridad en tiempo de compilación:** Detecta errores antes de ejecutar el código
- **Mejor experiencia de desarrollo:** Autocompletado y refactoring inteligente
- **Documentación viva:** Los tipos sirven como documentación del código
- **Refactoring seguro:** Cambios con confianza en bases de código grandes

---

## 🔧 Subtemas

### 📖 [2.1.1 Tipos Primitivos](./01-1-tipos-primitivos.md)

Los tipos primitivos son la base del sistema de tipos de TypeScript. Incluyen:

- **Tipos básicos:** `string`, `number`, `boolean`
- **Tipos especiales:** `bigint`, `symbol`
- **Valores especiales:** `null`, `undefined`
- **Tipos únicos:** `void`, `never`
- **Tipos de escape:** `unknown`, `any`

### 📖 [2.1.2 Tipos Compuestos Básicos](./01-2-tipos-compuestos.md)

Los tipos compuestos permiten crear estructuras de datos más complejas:

- **Arrays y tuplas:** Para colecciones de datos
- **Objetos e interfaces:** Para estructuras de datos
- **Funciones:** Para operaciones tipadas
- **Union types:** Para múltiples posibilidades
- **Intersection types:** Para combinar tipos

---

## 🎓 Ejemplo Práctico

```typescript
// Ejemplo que combina tipos primitivos y compuestos
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
  ultimoLogin: Date | null;
}

function crearUsuario(
  nombre: string,
  email: string
): Usuario {
  return {
    id: Math.random(),
    nombre,
    email,
    activo: true,
    ultimoLogin: null
  };
}

// Array de usuarios
const usuarios: Usuario[] = [
  crearUsuario("Juan", "juan@example.com"),
  crearUsuario("María", "maria@example.com")
];

// Función con union types
function buscarUsuario(criterio: string | number): Usuario | undefined {
  if (typeof criterio === "string") {
    return usuarios.find(u => u.nombre === criterio);
  }
  return usuarios.find(u => u.id === criterio);
}
```

## 🔍 Puntos Clave

> 💡 **Tip:** TypeScript utiliza inferencia de tipos, por lo que no siempre es necesario especificar tipos explícitamente.

> ⚠️ **Advertencia:** Evita usar `any` a menos que sea absolutamente necesario, ya que elimina las ventajas del tipado.

> 📚 **Recuerda:** Los tipos en TypeScript se verifican en tiempo de compilación, no en tiempo de ejecución.

---

## 📖 Recursos Adicionales

- 🔗 [TypeScript Handbook: Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- 🔗 [TypeScript Handbook: Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- 🔗 [TypeScript Playground](https://www.typescriptlang.org/play)

---

[⬅️ Volver al Módulo 2](./README.md) | [➡️ Siguiente: Inferencia de Tipos](./02-inferencia-tipos.md)
