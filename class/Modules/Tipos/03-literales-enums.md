# 📝 2.3 Literales y Enums

> **Duración:** 3 horas | **Nivel:** Intermedio

## 🎯 Objetivos de la Lección

Al finalizar esta lección, serás capaz de:

- ✅ Utilizar literal types para crear tipos más específicos
- ✅ Implementar template literal types
- ✅ Trabajar con diferentes tipos de enums
- ✅ Decidir cuándo usar enums vs union types
- ✅ Optimizar código con const enums

---

## 📚 Subtemas

### 🎨 [2.3.1 Literal Types](./03-1-literal-types.md)

Los literal types permiten especificar valores exactos en lugar de tipos generales:

- **String literals:** Valores de cadena específicos
- **Number literals:** Valores numéricos específicos
- **Boolean literals:** `true` o `false` específicos
- **Template literal types:** Patrones de cadena dinámicos

### 🔢 [2.3.2 Enums](./03-2-enums.md)

Los enums proporcionan una forma de definir conjuntos de constantes con nombre:

- **Numeric enums:** Valores numéricos automáticos
- **String enums:** Valores de cadena explícitos
- **Const enums:** Optimización en tiempo de compilación
- **Cuándo usar enums vs union types**

---

## 🎯 Comparación: Literales vs Enums

### 📊 Tabla Comparativa

| Aspecto | Literal Types | Enums |
|---------|---------------|-------|
| **Sintaxis** | `"valor1" \| "valor2"` | `enum Mi { Valor1, Valor2 }` |
| **Rendimiento** | ✅ Cero overhead | ❌ Genera código JS |
| **Autocompletado** | ✅ Excelente | ✅ Excelente |
| **Refactoring** | ❌ Más difícil | ✅ Más fácil |
| **Iteración** | ❌ No posible | ✅ Posible |
| **Extensibilidad** | ❌ Limitada | ✅ Buena |

### 🎯 Cuándo usar cada uno

#### ✅ Usa Literal Types cuando

- Tengas pocos valores fijos
- Busques máximo rendimiento
- Los valores no cambien frecuentemente
- Prefieras un enfoque funcional

#### ✅ Usa Enums cuando

- Necesites iterar sobre valores
- Los valores puedan cambiar o crecer
- Quieras namespacing
- Prefieras un enfoque orientado a objetos

---

## 🎓 Ejemplos Prácticos

### Sistema de Estados

```typescript
// Con literal types
type EstadoPedido = "pendiente" | "procesando" | "enviado" | "entregado" | "cancelado";

function procesarPedido(estado: EstadoPedido) {
  switch (estado) {
    case "pendiente":
      return "Pedido recibido";
    case "procesando":
      return "Preparando pedido";
    case "enviado":
      return "Pedido en camino";
    case "entregado":
      return "Pedido entregado";
    case "cancelado":
      return "Pedido cancelado";
  }
}

// Con enums
enum EstadoPedidoEnum {
  Pendiente = "pendiente",
  Procesando = "procesando",
  Enviado = "enviado",
  Entregado = "entregado",
  Cancelado = "cancelado"
}

function procesarPedidoEnum(estado: EstadoPedidoEnum) {
  switch (estado) {
    case EstadoPedidoEnum.Pendiente:
      return "Pedido recibido";
    case EstadoPedidoEnum.Procesando:
      return "Preparando pedido";
    // ... resto de casos
  }
}
```

### Sistema de Configuración

```typescript
// Template literal types para configuración
type Entorno = "desarrollo" | "prueba" | "produccion";
type LogLevel = "debug" | "info" | "warn" | "error";
type ConfigKey = `${Entorno}_${LogLevel}`;

// Genera: "desarrollo_debug" | "desarrollo_info" | ... | "produccion_error"

interface Configuracion {
  [K in ConfigKey]: string;
}

// Enum para códigos de error
enum CodigoError {
  UsuarioNoEncontrado = 404,
  AccesoDenegado = 403,
  ErrorInterno = 500,
  DatosInvalidos = 400
}

function manejarError(codigo: CodigoError): string {
  switch (codigo) {
    case CodigoError.UsuarioNoEncontrado:
      return "Usuario no encontrado";
    case CodigoError.AccesoDenegado:
      return "Acceso denegado";
    case CodigoError.ErrorInterno:
      return "Error interno del servidor";
    case CodigoError.DatosInvalidos:
      return "Datos proporcionados son inválidos";
  }
}
```

---

## 🎯 Mejores Prácticas

### 1. **Prefiere Union Types para casos simples**

```typescript
// ✅ Recomendado para casos simples
type Direccion = "norte" | "sur" | "este" | "oeste";

// ❌ Exceso para casos simples
enum DireccionEnum {
  Norte = "norte",
  Sur = "sur",
  Este = "este",
  Oeste = "oeste"
}
```

### 2. **Usa Enums para conjuntos complejos**

```typescript
// ✅ Recomendado para casos complejos
enum PermisosUsuario {
  Leer = 1,
  Escribir = 2,
  Eliminar = 4,
  Administrar = 8,
  TodosLosPermisos = Leer | Escribir | Eliminar | Administrar
}

function tienePermiso(usuario: number, permiso: PermisosUsuario): boolean {
  return (usuario & permiso) === permiso;
}
```

### 3. **Aprovecha Template Literal Types**

```typescript
// ✅ Tipos dinámicos con template literals
type EventoMouse = `mouse${Capitalize<"click" | "over" | "out">}`;
// Genera: "mouseClick" | "mouseOver" | "mouseOut"

type EventoTeclado = `key${Capitalize<"press" | "down" | "up">}`;
// Genera: "keyPress" | "keyDown" | "keyUp"

type TodosLosEventos = EventoMouse | EventoTeclado;
```

---

## 📖 Recursos Adicionales

- 🔗 [TypeScript Handbook: Literal Types](https://www.typescriptlang.org/docs/handbook/literal-types.html)
- 🔗 [TypeScript Handbook: Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
- 🔗 [TypeScript Handbook: Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

---

[⬅️ Volver: Inferencia de Tipos](./02-inferencia-tipos.md) | [➡️ Siguiente: Type Assertions y Narrowing](./04-assertions-narrowing.md)
