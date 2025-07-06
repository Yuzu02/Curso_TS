# 🔢 2.3.2 Enums

> **Duración:** 1.5 horas | **Nivel:** Intermedio

## 🎯 Objetivos de la Lección

Al finalizar esta lección, serás capaz de:

- ✅ Implementar numeric enums y string enums
- ✅ Utilizar const enums para optimización
- ✅ Decidir entre enums y union types
- ✅ Aplicar enums en situaciones reales
- ✅ Evitar problemas comunes con enums

---

## 📚 ¿Qué son los Enums?

Los enums son una forma de definir un conjunto de constantes con nombre. A diferencia de los literal types, los enums:

- Generan código JavaScript real
- Pueden ser iterados
- Proporcionan reverse mapping (en numeric enums)
- Ofrecen mejor refactoring

---

## 🔢 Numeric Enums

### 📊 Básicos

```typescript
// Enum numérico básico
enum Direccion {
  Norte,    // 0
  Sur,      // 1
  Este,     // 2
  Oeste     // 3
}

// Uso
let direccion: Direccion = Direccion.Norte;
console.log(direccion); // 0
console.log(Direccion.Norte); // 0
console.log(Direccion[0]); // "Norte" (reverse mapping)

// Función usando enum
function mover(direccion: Direccion): string {
  switch (direccion) {
    case Direccion.Norte:
      return "Moviendo hacia el norte";
    case Direccion.Sur:
      return "Moviendo hacia el sur";
    case Direccion.Este:
      return "Moviendo hacia el este";
    case Direccion.Oeste:
      return "Moviendo hacia el oeste";
    default:
      return "Dirección desconocida";
  }
}
```

### 🎯 Enums con Valores Personalizados

```typescript
// Enum con valores iniciales
enum CodigoHTTP {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}

// Enum con valores calculados
enum Permisos {
  None = 0,
  Read = 1,
  Write = 2,
  Execute = 4,
  ReadWrite = Read | Write,
  All = Read | Write | Execute
}

function tienePermiso(usuario: number, permiso: Permisos): boolean {
  return (usuario & permiso) === permiso;
}

// Uso
let permisoUsuario = Permisos.ReadWrite;
console.log(tienePermiso(permisoUsuario, Permisos.Read)); // true
console.log(tienePermiso(permisoUsuario, Permisos.Execute)); // false
```

### 📋 Casos de Uso Comunes

```typescript
// Estados de aplicación
enum EstadoAplicacion {
  Iniciando,
  Cargando,
  Listo,
  Error,
  Cerrando
}

// Niveles de log
enum NivelLog {
  Debug,
  Info,
  Warning,
  Error,
  Fatal
}

// Días de la semana
enum DiaSemana {
  Domingo,
  Lunes,
  Martes,
  Miercoles,
  Jueves,
  Viernes,
  Sabado
}

// Ejemplo completo
class Logger {
  private nivel: NivelLog;

  constructor(nivel: NivelLog = NivelLog.Info) {
    this.nivel = nivel;
  }

  log(mensaje: string, nivel: NivelLog = NivelLog.Info): void {
    if (nivel >= this.nivel) {
      console.log(`[${NivelLog[nivel]}] ${mensaje}`);
    }
  }
}

const logger = new Logger(NivelLog.Warning);
logger.log("Mensaje de debug", NivelLog.Debug); // No se muestra
logger.log("Mensaje de error", NivelLog.Error); // Se muestra
```

---

## 🔤 String Enums

### 📝 Básicos

```typescript
// String enum básico
enum TipoEvento {
  Click = "click",
  Focus = "focus",
  Blur = "blur",
  KeyDown = "keydown",
  KeyUp = "keyup"
}

// Uso
function manejarEvento(tipo: TipoEvento): void {
  switch (tipo) {
    case TipoEvento.Click:
      console.log("Elemento clickeado");
      break;
    case TipoEvento.Focus:
      console.log("Elemento enfocado");
      break;
    case TipoEvento.Blur:
      console.log("Elemento desenfocado");
      break;
    default:
      console.log("Evento no manejado");
  }
}

// Ventaja: valor legible en runtime
console.log(TipoEvento.Click); // "click"
```

### 🎯 Casos de Uso Comunes

```typescript
// Estados de petición
enum EstadoPeticion {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error"
}

// Tipos de usuario
enum TipoUsuario {
  Admin = "admin",
  Usuario = "usuario",
  Invitado = "invitado",
  Moderador = "moderador"
}

// Colores del tema
enum ColorTema {
  Primario = "primary",
  Secundario = "secondary",
  Exito = "success",
  Advertencia = "warning",
  Error = "error",
  Info = "info"
}

// Ejemplo completo
interface NotificacionProps {
  mensaje: string;
  tipo: ColorTema;
  duracion?: number;
}

class SistemaNotificaciones {
  private notificaciones: NotificacionProps[] = [];

  agregar(notificacion: NotificacionProps): void {
    this.notificaciones.push(notificacion);
    console.log(`Notificación ${notificacion.tipo}: ${notificacion.mensaje}`);
  }

  mostrarExito(mensaje: string): void {
    this.agregar({ mensaje, tipo: ColorTema.Exito });
  }

  mostrarError(mensaje: string): void {
    this.agregar({ mensaje, tipo: ColorTema.Error });
  }
}
```

---

## 🚀 Const Enums

### ⚡ Optimización

Los const enums se reemplazan inline durante la compilación, eliminando el código JavaScript generado.

```typescript
// Const enum
const enum Direccion {
  Norte = "norte",
  Sur = "sur",
  Este = "este",
  Oeste = "oeste"
}

// Uso
function moverPersonaje(direccion: Direccion): void {
  console.log(`Moviendo hacia ${direccion}`);
}

// Llamada
moverPersonaje(Direccion.Norte);

// Código JavaScript generado:
// moverPersonaje("norte"); // ¡Inline!
```

### 🔧 Cuándo Usar Const Enums

```typescript
// ✅ Bueno para valores que no cambian
const enum CodigoError {
  InvalidInput = 1000,
  NetworkError = 2000,
  DatabaseError = 3000
}

// ✅ Bueno para configuraciones
const enum Config {
  MaxRetries = 3,
  TimeoutMs = 5000,
  ApiVersion = "v1"
}

// ❌ Evitar si necesitas iterar
const enum DiasSemana {
  Lunes = "lunes",
  Martes = "martes",
  // ...
}

// Esto no funciona con const enums:
// Object.values(DiasSemana) // Error en runtime
```

---

## 🤔 Enums vs Union Types

### 📊 Comparación Detallada

```typescript
// Union Type
type EstadoUnion = "idle" | "loading" | "success" | "error";

// Enum
enum EstadoEnum {
  Idle = "idle",
  Loading = "loading", 
  Success = "success",
  Error = "error"
}

// Const Enum
const enum EstadoConstEnum {
  Idle = "idle",
  Loading = "loading",
  Success = "success", 
  Error = "error"
}
```

### 🎯 Criterios de Decisión

#### ✅ Usa Union Types cuando

```typescript
// Valores simples y estables
type Tamaño = "small" | "medium" | "large";

// Pocos valores
type Tema = "light" | "dark";

// Valores que no necesitan ser iterados
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Máximo rendimiento
type Status = "active" | "inactive";
```

#### ✅ Usa Enums cuando

```typescript
// Necesitas iterar valores
enum Mes {
  Enero = "enero",
  Febrero = "febrero",
  // ... etc
}

// Valores que pueden cambiar
enum FeatureFlag {
  NewUI = "new-ui",
  BetaFeature = "beta-feature",
  ExperimentalAPI = "experimental-api"
}

// Operaciones bitwise
enum Permisos {
  Read = 1,
  Write = 2,
  Execute = 4
}

// Namespacing
enum API {
  BaseURL = "https://api.example.com",
  Version = "v1",
  Timeout = 5000
}
```

#### ✅ Usa Const Enums cuando

```typescript
// Configuraciones que no cambian
const enum DatabaseConfig {
  Host = "localhost",
  Port = 5432,
  Database = "myapp"
}

// Códigos de error fijos
const enum ErrorCode {
  ValidationError = 400,
  Unauthorized = 401,
  NotFound = 404
}

// Valores para optimización
const enum MagicNumbers {
  MaxFileSize = 1024 * 1024 * 10, // 10MB
  MaxRetries = 3,
  CacheTimeout = 300000 // 5 minutos
}
```

---

## 🎯 Mejores Prácticas

### ✅ Recomendaciones

1. **Usa string enums para valores legibles:**

   ```typescript
   // ✅ Bueno
   enum TipoNotificacion {
     Exito = "success",
     Error = "error",
     Advertencia = "warning"
   }
   
   // ❌ Evitar
   enum TipoNotificacion {
     Exito,    // 0
     Error,    // 1
     Advertencia // 2
   }
   ```

2. **Usa const enums para optimización:**

   ```typescript
   // ✅ Bueno para configuraciones
   const enum Config {
     ApiUrl = "https://api.example.com",
     MaxRetries = 3
   }
   
   // ❌ Evitar si necesitas reflexión
   const enum DynamicValues {
     // No puedes iterar sobre esto
   }
   ```

3. **Evita enums heterogéneos:**

   ```typescript
   // ❌ Evitar
   enum Mixto {
     Numero = 1,
     Texto = "texto",
     Booleano = true // No es válido
   }
   
   // ✅ Mejor
   enum Numeros {
     Uno = 1,
     Dos = 2
   }
   
   enum Textos {
     Primero = "first",
     Segundo = "second"
   }
   ```

### ❌ Errores Comunes

1. **Usar enums como objetos:**

   ```typescript
   enum Colores {
     Rojo = "red",
     Verde = "green"
   }
   
   // ❌ Evitar
   const colorActual = Colores["Rojo"];
   
   // ✅ Mejor
   const colorActual = Colores.Rojo;
   ```

2. **Iterar const enums:**

   ```typescript
   const enum Dias {
     Lunes = "lunes",
     Martes = "martes"
   }
   
   // ❌ No funciona
   // Object.values(Dias).forEach(...)
   
   // ✅ Usar enum normal para iteración
   enum DiasIterables {
     Lunes = "lunes",
     Martes = "martes"
   }
   ```

---

## 📖 Recursos Adicionales

- 🔗 [TypeScript Handbook: Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
- 🔗 [TypeScript Deep Dive: Enums](https://basarat.gitbook.io/typescript/type-system/enums)
- 🔗 [When to use enums vs union types](https://fettblog.eu/tidy-typescript-avoid-enums/)

---

[⬅️ Volver: Literal Types](./03-1-literal-types.md) | [➡️ Siguiente: Type Assertions y Narrowing](./04-assertions-narrowing.md)
