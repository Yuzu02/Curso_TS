# 🎯 Ejercicio 4: Enums vs Union Types

> Aprende cuándo usar Enums vs Union Types y sus diferencias

---

## 📋 Descripción

Comprende las diferencias entre Enums y Union Types, y aprende cuándo usar cada uno.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 55 minutos

---

## 🎯 Objetivos

- Entender las diferencias entre Enums y Union Types
- Saber cuándo usar cada uno
- Implementar ambos enfoques
- Comparar ventajas y desventajas

---

## 📋 Requerimientos

1. **Comparación Directa:**
   - Implementar la misma funcionalidad con ambos enfoques
   - Analizar diferencias en uso
   - Evaluar rendimiento y legibilidad

2. **Casos de Uso:**
   - Identificar cuándo usar enums
   - Identificar cuándo usar union types
   - Migración entre enfoques

---

## 💡 Estructura Base

```typescript
// 1. Implementa con Enum
enum EstadoPedidoEnum {
  // Tu definición aquí
  // PENDIENTE = "pendiente", PROCESANDO = "procesando", ENVIADO = "enviado", ENTREGADO = "entregado"
}

// 1. Implementa con Union Type
type EstadoPedidoUnion = /* tu definición aquí */; // "pendiente" | "procesando" | "enviado" | "entregado"

// 2. Funciones usando Enum
function procesarPedidoEnum(estado: EstadoPedidoEnum): string {
  // Tu implementación aquí
}

function siguienteEstadoEnum(estado: EstadoPedidoEnum): EstadoPedidoEnum | null {
  // Tu implementación aquí
}

// 2. Funciones usando Union Type
function procesarPedidoUnion(estado: EstadoPedidoUnion): string {
  // Tu implementación aquí
}

function siguienteEstadoUnion(estado: EstadoPedidoUnion): EstadoPedidoUnion | null {
  // Tu implementación aquí
}

// 3. Ejercicio práctico: Sistema de colores
// Implementa ambos enfoques

// Usando Enum
enum ColorEnum {
  // Tu definición aquí
  // ROJO = "#FF0000", VERDE = "#00FF00", AZUL = "#0000FF"
}

// Usando Union Type
type ColorUnion = /* tu definición aquí */; // "#FF0000" | "#00FF00" | "#0000FF"

function aplicarColorEnum(color: ColorEnum): string {
  // Tu implementación aquí
}

function aplicarColorUnion(color: ColorUnion): string {
  // Tu implementación aquí
}

// 4. Validación y conversión
function esEstadoValidoEnum(valor: string): valor is EstadoPedidoEnum {
  // Tu implementación aquí
}

function esEstadoValidoUnion(valor: string): valor is EstadoPedidoUnion {
  // Tu implementación aquí
}

// 5. Iteración y reflexión
function obtenerTodosLosEstadosEnum(): EstadoPedidoEnum[] {
  // Tu implementación aquí
  // Nota: esto es más fácil con enum
}

function obtenerTodosLosEstadosUnion(): EstadoPedidoUnion[] {
  // Tu implementación aquí
  // Nota: esto requiere definir manualmente el array
}

// 6. Ejercicio avanzado: Sistema de permisos
// Caso donde Union Type es mejor

type PermisoAccion = "leer" | "escribir" | "eliminar";
type PermisoRecurso = "posts" | "usuarios" | "configuracion";
type PermisoCompleto = `${PermisoAccion}:${PermisoRecurso}`;

function validarPermiso(permiso: PermisoCompleto): boolean {
  // Tu implementación aquí
}

function tienePermiso(usuario: { permisos: PermisoCompleto[] }, permiso: PermisoCompleto): boolean {
  // Tu implementación aquí
}

// 7. Caso donde Enum es mejor
// Sistema de códigos de error con valores numéricos

enum CodigoError {
  // Tu definición aquí
  // SIN_ERROR = 0, ERROR_VALIDACION = 1001, ERROR_AUTENTICACION = 2001, ERROR_SERVIDOR = 5001
}

function manejarError(codigo: CodigoError): string {
  // Tu implementación aquí
}

function esErrorCritico(codigo: CodigoError): boolean {
  // Tu implementación aquí
}

// 8. Migración entre enfoques
// Convierte de Enum a Union Type

enum TipoNotificacionEnum {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error"
}

type TipoNotificacionUnion = /* tu definición aquí */; // Convierte el enum a union type

function migrarDeEnumAUnion(tipoEnum: TipoNotificacionEnum): TipoNotificacionUnion {
  // Tu implementación aquí
}

// 9. Análisis de ventajas y desventajas
type AnalisisComparativo = {
  enfoque: "enum" | "union";
  ventajas: string[];
  desventajas: string[];
  casoDeUso: string;
};

function analizarEnum(): AnalisisComparativo {
  // Tu implementación aquí
}

function analizarUnionType(): AnalisisComparativo {
  // Tu implementación aquí
}

// 10. Recomendaciones de uso
function recomendarEnfoque(escenario: string): "enum" | "union" | "cualquiera" {
  // Tu implementación aquí
  // Basado en el escenario, recomienda qué usar
}

const escenarios = [
  "valores que no cambiarán nunca",
  "strings literales simples",
  "necesito iterar sobre todos los valores",
  "necesito reverse mapping",
  "valores que pueden ser extendidos por otros módulos",
  "template literal types",
  "valores numéricos con significado",
  "configuración de compilación"
];
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba ambos enfoques
console.log(procesarPedidoEnum(EstadoPedidoEnum.PENDIENTE));
console.log(procesarPedidoUnion("pendiente"));

console.log(siguienteEstadoEnum(EstadoPedidoEnum.PROCESANDO));
console.log(siguienteEstadoUnion("procesando"));

// Prueba colores
console.log(aplicarColorEnum(ColorEnum.ROJO));
console.log(aplicarColorUnion("#FF0000"));

// Prueba validación
console.log(esEstadoValidoEnum("pendiente")); // true
console.log(esEstadoValidoUnion("pendiente")); // true

// Prueba iteración
console.log(obtenerTodosLosEstadosEnum());
console.log(obtenerTodosLosEstadosUnion());

// Prueba permisos (mejor con union)
console.log(validarPermiso("leer:posts")); // true
console.log(tienePermiso({ permisos: ["leer:posts", "escribir:posts"] }, "leer:posts")); // true

// Prueba códigos de error (mejor con enum)
console.log(manejarError(CodigoError.ERROR_VALIDACION));
console.log(esErrorCritico(CodigoError.ERROR_SERVIDOR)); // true

// Prueba migración
console.log(migrarDeEnumAUnion(TipoNotificacionEnum.ERROR)); // "error"

// Prueba análisis
console.log(analizarEnum());
console.log(analizarUnionType());

// Prueba recomendaciones
escenarios.forEach(escenario => {
  console.log(`${escenario}: ${recomendarEnfoque(escenario)}`);
});
```

---

## 🏆 Criterios de Evaluación

- ✅ Implementación correcta de ambos enfoques
- ✅ Comprensión de las diferencias
- ✅ Casos de uso apropiados identificados
- ✅ Análisis comparativo completo
- ✅ Recomendaciones fundamentadas

---

## 📝 Guía de Decisión

### Usa **Enum** cuando

- Necesites reverse mapping
- Valores numéricos con significado
- Necesites iterar sobre todos los valores
- Valores que no cambiarán nunca
- Configuración de compilación

### Usa **Union Types** cuando

- Strings literales simples
- Template literal types
- Valores que pueden ser extendidos
- Mejores mensajes de error
- Integración con otras partes del sistema de tipos

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../../06-Type_Assertions/01-Type_Assertions.md)
