# 🎯 Ejercicio 3: Template Literal Types

> Domina los Template Literal Types para crear tipos dinámicos

---

## 📋 Descripción

Aprende a usar Template Literal Types para crear tipos más dinámicos y expresivos.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 50 minutos

---

## 🎯 Objetivos

- Entender Template Literal Types
- Crear tipos dinámicos con plantillas
- Combinar literales con template literals
- Implementar sistemas de nombres tipados

---

## 📋 Requerimientos

1. **Template Literals Básicos:**
   - Tipos con plantillas de string
   - Interpolación de tipos
   - Patrones de naming

2. **Casos Avanzados:**
   - Combinación de múltiples tipos
   - Sistemas de eventos tipados
   - APIs con nombres dinámicos

---

## 💡 Estructura Base

```typescript
// 1. Define Template Literal Types básicos
type Saludo = /* tu definición aquí */; // `hola-${string}`
type EventoClick = /* tu definición aquí */; // `click-${string}`
type PropiedadCSS = /* tu definición aquí */; // `${string}-color`

// 2. Combina literales con template literals
type Direccion = "norte" | "sur" | "este" | "oeste";
type Accion = "mover" | "girar" | "detener";
type Comando = /* tu definición aquí */; // `${Accion}-${Direccion}`

// 3. Implementa funciones con Template Literals
function procesarSaludo(saludo: Saludo): string {
  // Tu implementación aquí
}

function manejarEventoClick(evento: EventoClick): string {
  // Tu implementación aquí
}

function ejecutarComando(comando: Comando): string {
  // Tu implementación aquí
}

// 4. Ejercicio práctico: Sistema de eventos
type TipoEvento = "mouse" | "keyboard" | "touch";
type AccionEvento = "down" | "up" | "move";
type EventoCompleto = /* tu definición aquí */; // `${TipoEvento}-${AccionEvento}`

function registrarEvento(evento: EventoCompleto): string {
  // Tu implementación aquí
}

function esEventoValido(evento: string): evento is EventoCompleto {
  // Tu implementación aquí
}

// 5. API con nombres dinámicos
type Metodo = "get" | "post" | "put" | "delete";
type Recurso = "users" | "posts" | "comments";
type Endpoint = /* tu definición aquí */; // `${Metodo}-${Recurso}`

function llamarAPI(endpoint: Endpoint): string {
  // Tu implementación aquí
}

function construirURL(endpoint: Endpoint): string {
  // Tu implementación aquí
}

// 6. Sistema de configuración avanzado
type Ambiente = "dev" | "test" | "prod";
type Servicio = "api" | "db" | "cache";
type ConfigKey = /* tu definición aquí */; // `${Ambiente}-${Servicio}-config`

type Configuracion = {
  [K in ConfigKey]: {
    host: string;
    puerto: number;
    activo: boolean;
  };
};

function obtenerConfiguracion(key: ConfigKey): Configuracion[ConfigKey] {
  // Tu implementación aquí
}

function validarConfiguracion(config: Partial<Configuracion>): boolean {
  // Tu implementación aquí
}

// 7. Patrones de naming
type PascalCase<S extends string> = /* tu definición aquí */;
type KebabCase<S extends string> = /* tu definición aquí */;

function toPascalCase(str: string): PascalCase<typeof str> {
  // Tu implementación aquí
}

function toKebabCase(str: string): KebabCase<typeof str> {
  // Tu implementación aquí
}

// 8. Ejercicio avanzado: Sistema de rutas
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type RouteParams = "id" | "slug" | "category";
type Route = /* tu definición aquí */; // `${HTTPMethod} /${string}` | `${HTTPMethod} /${string}/:${RouteParams}`

function definirRuta(ruta: Route): string {
  // Tu implementación aquí
}

function parsearRuta(ruta: string): Route | null {
  // Tu implementación aquí
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba Template Literals básicos
console.log(procesarSaludo("hola-mundo")); // ✅ Válido
console.log(manejarEventoClick("click-boton")); // ✅ Válido
console.log(ejecutarComando("mover-norte")); // ✅ Válido

// Prueba sistema de eventos
console.log(registrarEvento("mouse-down")); // ✅ Válido
console.log(registrarEvento("keyboard-up")); // ✅ Válido
console.log(esEventoValido("mouse-click")); // false

// Prueba API endpoints
console.log(llamarAPI("get-users")); // ✅ Válido
console.log(llamarAPI("post-posts")); // ✅ Válido
console.log(construirURL("delete-comments")); // ✅ Válido

// Prueba configuración
const config = obtenerConfiguracion("prod-api-config");
console.log(config);

// Prueba naming patterns
console.log(toPascalCase("mi-variable")); // "MiVariable"
console.log(toKebabCase("MiVariable")); // "mi-variable"

// Prueba rutas
console.log(definirRuta("GET /users")); // ✅ Válido
console.log(definirRuta("POST /users/:id")); // ✅ Válido
console.log(parsearRuta("GET /posts/:slug")); // Route válida
```

---

## 🏆 Criterios de Evaluación

- ✅ Template Literal Types correctamente definidos
- ✅ Interpolación de tipos funcionando
- ✅ Sistemas de naming implementados
- ✅ Validadores con template literals
- ✅ Casos avanzados resueltos

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../../05-Enums/01-Numeric_Enums.md)
