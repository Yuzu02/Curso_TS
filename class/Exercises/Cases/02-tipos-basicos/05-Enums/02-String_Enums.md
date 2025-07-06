# 🎯 Ejercicio 2: String Enums

> Aprende a usar String Enums para crear conjuntos de constantes de texto

---

## 📋 Descripción

Domina el uso de String Enums para crear conjuntos de constantes de texto más expresivos y seguros.

**Dificultad:** 🟢 Principiante | **Tiempo:** 45 minutos

---

## 🎯 Objetivos

- Entender las ventajas de String Enums
- Crear enums con valores string
- Comparar con Numeric Enums
- Implementar sistemas de categorización

---

## 📋 Requerimientos

1. **String Enums Básicos:**
   - Enums con valores string explícitos
   - Uso en comparaciones y validaciones
   - Serialización segura

2. **Casos Prácticos:**
   - Categorías de productos
   - Estados de aplicación
   - Tipos de eventos

---

## 💡 Estructura Base

```typescript
// 1. Define String Enums básicos
enum TipoUsuario {
  // Tu definición aquí
  // ADMIN = "admin", USUARIO = "usuario", INVITADO = "invitado"
}

enum EstadoPedido {
  // Tu definición aquí
  // PENDIENTE = "pendiente", PROCESANDO = "procesando", ENVIADO = "enviado", ENTREGADO = "entregado"
}

enum CategoriaProducto {
  // Tu definición aquí
  // ELECTRONICA = "electronica", ROPA = "ropa", HOGAR = "hogar", DEPORTES = "deportes"
}

// 2. Implementa funciones con String Enums
function validarTipoUsuario(tipo: TipoUsuario): boolean {
  // Tu implementación aquí
}

function obtenerPermisosUsuario(tipo: TipoUsuario): string[] {
  // Tu implementación aquí
}

function procesarPedido(estado: EstadoPedido): string {
  // Tu implementación aquí
}

// 3. Ejercicio práctico: Sistema de logging
enum NivelLog {
  // Tu definición aquí
  // DEBUG = "debug", INFO = "info", WARN = "warn", ERROR = "error"
}

function log(nivel: NivelLog, mensaje: string): void {
  // Tu implementación aquí
}

function deberiaLoguear(nivel: NivelLog, nivelMinimo: NivelLog): boolean {
  // Tu implementación aquí
}

// 4. Comparación y validación
function compararNivelesLog(nivel1: NivelLog, nivel2: NivelLog): number {
  // Tu implementación aquí
  // Retorna -1, 0, o 1 según la importancia
}

function esNivelLogValido(valor: string): valor is NivelLog {
  // Tu implementación aquí
}

// 5. Enum para API endpoints
enum EndpointAPI {
  // Tu definición aquí
  // USUARIOS = "/api/usuarios", PRODUCTOS = "/api/productos", PEDIDOS = "/api/pedidos"
}

function construirURL(base: string, endpoint: EndpointAPI): string {
  // Tu implementación aquí
}

function validarEndpoint(endpoint: string): endpoint is EndpointAPI {
  // Tu implementación aquí
}

// 6. Sistema de temas
enum Tema {
  // Tu definición aquí
  // CLARO = "claro", OSCURO = "oscuro", CONTRASTE_ALTO = "contraste-alto"
}

function aplicarTema(tema: Tema): string {
  // Tu implementación aquí
}

function obtenerEstilosTema(tema: Tema): Record<string, string> {
  // Tu implementación aquí
}

// 7. Conversión y serialización
function stringAEstadoPedido(valor: string): EstadoPedido | null {
  // Tu implementación aquí
}

function serializarConfiguracion(config: { tema: Tema; nivel: NivelLog }): string {
  // Tu implementación aquí
}

function deserializarConfiguracion(json: string): { tema: Tema; nivel: NivelLog } | null {
  // Tu implementación aquí
}

// 8. Ejercicio avanzado: Sistema de eventos
enum TipoEvento {
  // Tu definición aquí
  // CLICK = "click", HOVER = "hover", SCROLL = "scroll", RESIZE = "resize"
}

type EventoHandler = {
  tipo: TipoEvento;
  handler: (evento: any) => void;
};

function registrarEvento(tipo: TipoEvento, handler: (evento: any) => void): EventoHandler {
  // Tu implementación aquí
}

function ejecutarEvento(evento: EventoHandler, datos: any): void {
  // Tu implementación aquí
}

// 9. Migración de Numeric a String Enum
// Convierte este Numeric Enum a String Enum
enum EstadoLegacy {
  INACTIVO = 0,
  ACTIVO = 1,
  SUSPENDIDO = 2
}

enum EstadoNuevo {
  // Tu definición aquí
  // Convierte los valores numéricos a strings descriptivos
}

function migrarEstado(estadoLegacy: EstadoLegacy): EstadoNuevo {
  // Tu implementación aquí
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba String Enums básicos
console.log(validarTipoUsuario(TipoUsuario.ADMIN)); // true
console.log(obtenerPermisosUsuario(TipoUsuario.USUARIO)); // ["leer", "escribir"]
console.log(procesarPedido(EstadoPedido.PROCESANDO)); // "Procesando pedido..."

// Prueba sistema de logging
log(NivelLog.INFO, "Sistema iniciado");
log(NivelLog.ERROR, "Error crítico");
console.log(deberiaLoguear(NivelLog.DEBUG, NivelLog.INFO)); // false

// Prueba comparación
console.log(compararNivelesLog(NivelLog.ERROR, NivelLog.DEBUG)); // 1
console.log(esNivelLogValido("info")); // true

// Prueba API endpoints
console.log(construirURL("https://api.ejemplo.com", EndpointAPI.USUARIOS));
console.log(validarEndpoint("/api/productos")); // true

// Prueba temas
console.log(aplicarTema(Tema.OSCURO)); // "Tema oscuro aplicado"
console.log(obtenerEstilosTema(Tema.CLARO)); // { backgroundColor: "white", ... }

// Prueba serialización
const config = { tema: Tema.OSCURO, nivel: NivelLog.INFO };
const json = serializarConfiguracion(config);
console.log(json); // JSON string
console.log(deserializarConfiguracion(json)); // config object

// Prueba sistema de eventos
const clickHandler = registrarEvento(TipoEvento.CLICK, (e) => console.log("Click!", e));
ejecutarEvento(clickHandler, { target: "button" });

// Prueba migración
console.log(migrarEstado(EstadoLegacy.ACTIVO)); // EstadoNuevo.ACTIVO
```

---

## 🏆 Criterios de Evaluación

- ✅ String Enums correctamente definidos
- ✅ Funciones con string enums implementadas
- ✅ Sistema de logging funcional
- ✅ Serialización y deserialización correctas
- ✅ Migración de enums implementada

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](03-Const_Enums.md)
