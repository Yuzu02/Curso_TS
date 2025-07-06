# 🎯 Ejercicio 1: String Literals

> Domina el uso de String Literal Types para crear tipos más precisos

---

## 📋 Descripción

Aprende a usar String Literal Types para crear tipos más específicos y seguros.

**Dificultad:** 🟢 Principiante | **Tiempo:** 40 minutos

---

## 🎯 Objetivos

- Entender qué son los String Literal Types
- Crear tipos con valores específicos
- Usar union de string literals
- Implementar sistemas tipados con literales

---

## 📋 Requerimientos

1. **String Literals Básicos:**
   - Definir tipos con valores específicos
   - Crear unions de string literals
   - Usar en funciones y variables

2. **Casos Prácticos:**
   - Sistema de estados
   - Configuraciones tipadas
   - Validación de entrada

---

## 💡 Estructura Base

```typescript
// 1. Define String Literal Types
type Direccion = /* tu definición aquí */; // "norte" | "sur" | "este" | "oeste"
type Estado = /* tu definición aquí */; // "activo" | "inactivo" | "pendiente"
type TipoUsuario = /* tu definición aquí */; // "admin" | "usuario" | "invitado"

// 2. Implementa funciones con String Literals
function mover(direccion: Direccion): string {
  // Tu implementación aquí
}

function cambiarEstado(nuevoEstado: Estado): string {
  // Tu implementación aquí
}

function validarTipoUsuario(tipo: TipoUsuario): boolean {
  // Tu implementación aquí
}

// 3. Ejercicio práctico: Sistema de configuración
type TemaColor = /* tu definición aquí */; // "claro" | "oscuro" | "auto"
type Idioma = /* tu definición aquí */; // "es" | "en" | "fr" | "de"
type TamañoFuente = /* tu definición aquí */; // "pequeño" | "mediano" | "grande"

type Configuracion = {
  tema: TemaColor;
  idioma: Idioma;
  tamaño: TamañoFuente;
};

function aplicarConfiguracion(config: Configuracion): string {
  // Tu implementación aquí
}

function validarConfiguracion(config: unknown): config is Configuracion {
  // Tu implementación aquí
}

// 4. String Literals con objetos
type EventoTipo = /* tu definición aquí */; // "click" | "hover" | "focus" | "blur"

type Evento = {
  tipo: EventoTipo;
  elemento: string;
  timestamp: Date;
};

function procesarEvento(evento: Evento): string {
  // Tu implementación aquí
}

function crearEvento(tipo: EventoTipo, elemento: string): Evento {
  // Tu implementación aquí
}

// 5. Funciones que retornan String Literals
function obtenerDireccionOpuesta(direccion: Direccion): Direccion {
  // Tu implementación aquí
}

function siguientePrioridad(prioridad: "baja" | "media" | "alta"): "baja" | "media" | "alta" {
  // Tu implementación aquí
}

// 6. Validación con String Literals
function esDireccionValida(valor: string): valor is Direccion {
  // Tu implementación aquí
}

function esEstadoValido(valor: string): valor is Estado {
  // Tu implementación aquí
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba tus implementaciones
console.log(mover("norte")); // Debería funcionar
console.log(cambiarEstado("activo")); // Debería funcionar
console.log(validarTipoUsuario("admin")); // true

const miConfig: Configuracion = {
  tema: "oscuro",
  idioma: "es",
  tamaño: "mediano"
};

console.log(aplicarConfiguracion(miConfig));
console.log(validarConfiguracion(miConfig)); // true

const evento = crearEvento("click", "boton-enviar");
console.log(procesarEvento(evento));

console.log(obtenerDireccionOpuesta("norte")); // "sur"
console.log(siguientePrioridad("baja")); // "media"

// Prueba validadores
console.log(esDireccionValida("norte")); // true
console.log(esDireccionValida("centro")); // false
console.log(esEstadoValido("activo")); // true
```

---

## 🏆 Criterios de Evaluación

- ✅ String Literal Types correctamente definidos
- ✅ Funciones que usan literales implementadas
- ✅ Validación de tipos funcionando
- ✅ Casos prácticos resueltos
- ✅ Type guards con literales

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](02-Number_Boolean_Literals.md)
