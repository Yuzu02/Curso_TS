# 🎯 Ejercicio 1: Sistema de Rutas con Literal Types

> Crea un sistema de rutas tipado usando literal types

---

## 📋 Descripción

Crea un sistema de rutas tipado usando literal types para HTTP methods y recursos.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 60 minutos

---

## 🎯 Objetivos

- Definir tipos literales para métodos HTTP
- Crear sistemas de rutas tipadas
- Implementar un router básico
- Usar template literal types

---

## 📋 Requerimientos

1. **Definir Tipos Literales:**
   - `HttpMethod`: GET, POST, PUT, DELETE
   - `ResourceType`: users, posts, comments, etc.
   - `RoutePattern`: combina método y recurso

2. **Implementar Router:**
   - Definir rutas con handlers tipados
   - Función para crear rutas
   - Función para hacer match de rutas

---

## 💡 Estructura Base

```typescript
// Define estos tipos
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ResourceType = "users" | "posts" | "comments" | "categories";
type RoutePattern = `${HttpMethod} /${ResourceType}` | `${HttpMethod} /${ResourceType}/:id`;

// Implementa un router tipado
interface Route {
  pattern: RoutePattern;
  handler: (req: any, res: any) => void;
}

interface Router {
  routes: Route[];
  addRoute: (pattern: RoutePattern, handler: (req: any, res: any) => void) => void;
  match: (method: HttpMethod, path: string) => Route | null;
}

// Implementa funciones para manejar rutas
function defineRoute(pattern: RoutePattern, handler: (req: any, res: any) => void): Route {
  // Tu implementación
}

function createRouter(): Router {
  // Tu implementación
}

function matchRoute(routes: Route[], method: HttpMethod, path: string): Route | null {
  // Tu implementación
}
```

---

## 🧪 Casos de Prueba

```typescript
// Crear router y definir rutas
const router = createRouter();

// Estas rutas deben ser válidas
router.addRoute("GET /users", (req, res) => {
  res.json({ users: [] });
});

router.addRoute("POST /posts", (req, res) => {
  res.json({ message: "Post created" });
});

router.addRoute("PUT /users/:id", (req, res) => {
  res.json({ message: "User updated" });
});

// Pruebas de matching
const route1 = router.match("GET", "/users");
const route2 = router.match("POST", "/posts");
const route3 = router.match("PUT", "/users/123");
```

---

## 🏆 Criterios de Evaluación

- ✅ Tipos literales correctamente definidos
- ✅ Sistema de rutas funcional
- ✅ Template literal types implementados
- ✅ Router con matching correcto
- ✅ Casos de prueba funcionando

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../05-Estilos_css/01-Sistema_Estilos.md)
