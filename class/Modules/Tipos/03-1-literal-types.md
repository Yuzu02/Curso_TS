# 🎨 2.3.1 Literal Types

> **Duración:** 1.5 horas | **Nivel:** Intermedio

## 🎯 Objetivos de la Lección

Al finalizar esta lección, serás capaz de:

- ✅ Crear y usar string literal types
- ✅ Implementar number literal types
- ✅ Trabajar con boolean literal types
- ✅ Dominar template literal types
- ✅ Aplicar literal types en situaciones reales

---

## 📚 ¿Qué son los Literal Types?

Los literal types permiten especificar valores exactos en lugar de tipos generales. En lugar de `string`, puedes especificar `"hola"`. En lugar de `number`, puedes especificar `42`.

### 🎯 Ventajas de los Literal Types

- **Precisión:** Especifica valores exactos
- **Seguridad:** Previene valores incorrectos
- **Autocompletado:** Mejora la experiencia de desarrollo
- **Rendimiento:** Cero overhead en runtime

---

## 🔤 String Literal Types

### 📝 Básicos

```typescript
// Literal type básico
let estado: "activo" | "inactivo" | "pendiente";
estado = "activo"; // ✅ Válido
// estado = "otro"; // ❌ Error!

// Función con string literals
function configurarModo(modo: "desarrollo" | "produccion" | "prueba") {
  switch (modo) {
    case "desarrollo":
      console.log("Modo desarrollo activado");
      break;
    case "produccion":
      console.log("Modo producción activado");
      break;
    case "prueba":
      console.log("Modo prueba activado");
      break;
  }
}

// Uso
configurarModo("desarrollo"); // ✅ Válido
// configurarModo("staging"); // ❌ Error!
```

### 🎨 Casos de Uso Comunes

```typescript
// Estados de aplicación
type EstadoApp = "cargando" | "exito" | "error" | "inicial";

// Tipos de eventos
type EventoMouse = "click" | "mouseover" | "mouseout";

// Direcciones
type Direccion = "norte" | "sur" | "este" | "oeste";

// Roles de usuario
type RolUsuario = "admin" | "usuario" | "invitado";

// Colores del tema
type ColorTema = "primario" | "secundario" | "exito" | "error" | "advertencia";

// Ejemplo completo
interface BotonProps {
  texto: string;
  color: ColorTema;
  tamaño: "pequeño" | "mediano" | "grande";
  variante: "solido" | "outline" | "ghost";
}

function crearBoton(props: BotonProps) {
  return `<button class="${props.color} ${props.tamaño} ${props.variante}">
    ${props.texto}
  </button>`;
}
```

---

## 🔢 Number Literal Types

### 📊 Básicos

```typescript
// Literal numbers
let codigo: 200 | 404 | 500;
codigo = 200; // ✅ Válido
// codigo = 201; // ❌ Error!

// Función con number literals
function manejarCodigoHTTP(codigo: 200 | 201 | 400 | 404 | 500) {
  switch (codigo) {
    case 200:
      return "OK";
    case 201:
      return "Created";
    case 400:
      return "Bad Request";
    case 404:
      return "Not Found";
    case 500:
      return "Internal Server Error";
  }
}
```

### 🎯 Casos de Uso Comunes

```typescript
// Códigos de respuesta HTTP
type CodigoExito = 200 | 201 | 204;
type CodigoError = 400 | 401 | 403 | 404 | 500;
type CodigoHTTP = CodigoExito | CodigoError;

// Puertos comunes
type PuertoComun = 80 | 443 | 3000 | 8080;

// Niveles de log
type NivelLog = 0 | 1 | 2 | 3 | 4; // debug, info, warn, error, fatal

// Versiones de API
type VersionAPI = 1 | 2 | 3;

// Ejemplo completo
interface ConfiguracionServidor {
  puerto: PuertoComun;
  version: VersionAPI;
  nivelLog: NivelLog;
}

function iniciarServidor(config: ConfiguracionServidor) {
  console.log(`Iniciando servidor v${config.version} en puerto ${config.puerto}`);
  console.log(`Nivel de log: ${config.nivelLog}`);
}
```

---

## ✅ Boolean Literal Types

### 🔄 Básicos

```typescript
// Boolean literals
let esAdmin: true = true;
let esInvitado: false = false;

// Función con boolean literals
function verificarPermiso(esAdmin: true): string;
function verificarPermiso(esAdmin: false): string;
function verificarPermiso(esAdmin: boolean): string {
  if (esAdmin === true) {
    return "Acceso completo";
  }
  return "Acceso limitado";
}
```

### 🎯 Casos de Uso Comunes

```typescript
// Flags específicos
interface ConfiguracionApp {
  modoDebug: true | false;
  produccion: boolean;
  ssl: true; // Siempre debe ser true
}

// Discriminated unions con boolean literals
interface UsuarioActivo {
  activo: true;
  ultimoLogin: Date;
  sesiones: string[];
}

interface UsuarioInactivo {
  activo: false;
  fechaDesactivacion: Date;
}

type Usuario = UsuarioActivo | UsuarioInactivo;

function procesarUsuario(usuario: Usuario) {
  if (usuario.activo) {
    // TypeScript sabe que es UsuarioActivo
    console.log(`Último login: ${usuario.ultimoLogin}`);
  } else {
    // TypeScript sabe que es UsuarioInactivo
    console.log(`Desactivado: ${usuario.fechaDesactivacion}`);
  }
}
```

---

## 🎨 Template Literal Types

### 📝 Básicos

Los template literal types permiten crear nuevos tipos string usando template literals.

```typescript
// Template literal type básico
type Saludo = `Hola, ${string}!`;

let mensaje: Saludo = "Hola, mundo!"; // ✅ Válido
// let mensaje: Saludo = "Adiós, mundo!"; // ❌ Error!

// Con union types
type Nombre = "Juan" | "María" | "Pedro";
type SaludoPersonal = `Hola, ${Nombre}!`;
// Genera: "Hola, Juan!" | "Hola, María!" | "Hola, Pedro!"

// Función usando template literals
function saludar(saludo: SaludoPersonal) {
  console.log(saludo);
}

saludar("Hola, Juan!"); // ✅ Válido
// saludar("Hola, Ana!"); // ❌ Error!
```

### 🔧 Casos Avanzados

```typescript
// Combinando múltiples tipos
type Prefijo = "get" | "set" | "delete";
type Recurso = "User" | "Post" | "Comment";
type MetodoAPI = `${Prefijo}${Recurso}`;
// Genera: "getUser" | "setUser" | "deleteUser" | "getPost" | etc.

// Con capitalize
type EventoDOM = "click" | "focus" | "blur";
type HandlerEvento = `on${Capitalize<EventoDOM>}`;
// Genera: "onClick" | "onFocus" | "onBlur"

// Rutas de API
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiVersion = "v1" | "v2";
type Endpoint = "users" | "posts" | "comments";
type ApiRoute = `/${ApiVersion}/${Endpoint}`;
// Genera: "/v1/users" | "/v1/posts" | "/v1/comments" | "/v2/users" | etc.

// Ejemplo completo
interface ApiConfig {
  baseUrl: string;
  routes: Record<ApiRoute, HttpMethod>;
}

const config: ApiConfig = {
  baseUrl: "https://api.ejemplo.com",
  routes: {
    "/v1/users": "GET",
    "/v1/posts": "GET",
    "/v2/users": "POST",
    // ... etc
  }
};
```

### 🎯 Combinando Template Literals con Union Types

```typescript
// Combinar prefijos y sufijos con union types
type Prefijo = "get" | "set" | "has";
type Propiedad = "name" | "age" | "email";

type MetodoAPI = `${Prefijo}${Capitalize<Propiedad>}`;
// Resultado: "getName" | "setName" | "hasName" | "getAge" | "setAge" | "hasAge" | "getEmail" | "setEmail" | "hasEmail"

// Uso en interfaces
interface APIUsuario {
  getName(): string;
  setName(valor: string): void;
  hasName(): boolean;
  getAge(): number;
  setAge(valor: number): void;
  hasAge(): boolean;
  getEmail(): string;
  setEmail(valor: string): void;
  hasEmail(): boolean;
}

// Ejemplo de rutas con parámetros
type RutaBasica = "/users" | "/posts" | "/comments";
type RutaConId = `${RutaBasica}/:id`;
// Resultado: "/users/:id" | "/posts/:id" | "/comments/:id"

// Definir todas las rutas de la API
interface RutasAPI {
  obtenerLista: RutaBasica;
  obtenerPorId: RutaConId;
  crearNuevo: RutaBasica;
  actualizar: RutaConId;
  eliminar: RutaConId;
}
```

type UsuarioGetters = Getters<Usuario>;
// Tipo: {
//   getNombre: () => string;
//   getEdad: () => number;
//   getEmail: () => string;
// }

```

---

## 🎯 Mejores Prácticas

### ✅ Recomendaciones

1. **Usa literal types para valores específicos:**

   ```typescript
   // ✅ Bueno
   type Estado = "cargando" | "exito" | "error";
   
   // ❌ Demasiado general
   type Estado = string;
   ```

2. **Combina con const assertions:**

   ```typescript
   // ✅ Bueno
   const colores = ["rojo", "verde", "azul"] as const;
   type Color = typeof colores[number]; // "rojo" | "verde" | "azul"
   
   // ❌ Pierde información de tipo
   const colores = ["rojo", "verde", "azul"];
   type Color = typeof colores[number]; // string
   ```

3. **Usa template literals para patrones:**

   ```typescript
   // ✅ Bueno
   type CSSUnit = `${number}px` | `${number}em` | `${number}rem`;
   
   // ❌ Limitado
   type CSSUnit = string;
   ```

### ❌ Errores Comunes

1. **Demasiados literales:**

   ```typescript
   // ❌ Difícil de mantener
   type Color = "rojo" | "verde" | "azul" | "amarillo" | "rosa" | "morado" | "naranja";
   
   // ✅ Mejor
   type ColorPrimario = "rojo" | "verde" | "azul";
   type ColorSecundario = "amarillo" | "rosa" | "morado";
   type Color = ColorPrimario | ColorSecundario;
   ```

2. **Template literals innecesarios:**

   ```typescript
   // ❌ Innecesario
   type Mensaje = `${string}`;
   
   // ✅ Mejor
   type Mensaje = string;
   ```

---

## 📖 Recursos Adicionales

- 🔗 [TypeScript Handbook: Literal Types](https://www.typescriptlang.org/docs/handbook/literal-types.html)
- 🔗 [TypeScript Handbook: Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- 🔗 [TypeScript 4.1 Template Literal Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#template-literal-types)

---

[⬅️ Volver: Literales y Enums](./03-literales-enums.md) | [➡️ Siguiente: Enums](./03-2-enums.md)
