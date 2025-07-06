# 🎯 Ejercicio 4: Discriminated Unions

> Aprende a usar Discriminated Unions para type narrowing automático

---

## 📋 Descripción

Domina el uso de Discriminated Unions para crear tipos que se pueden discriminar automáticamente.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 60 minutos

---

## 🎯 Objetivos

- Entender qué son las Discriminated Unions
- Crear unions con discriminator properties
- Implementar exhaustive checking
- Usar pattern matching con switch

---

## 📋 Requerimientos

1. **Discriminated Unions Básicas:**
   - Tipos con propiedades discriminadoras
   - Pattern matching con switch
   - Narrowing automático

2. **Casos Avanzados:**
   - Múltiples discriminators
   - Exhaustive checking
   - Error handling

---

## 💡 Estructura Base

```typescript
// 1. Discriminated Union básica
type Resultado = 
  | { tipo: "exito"; datos: any }
  | { tipo: "error"; codigo: number; mensaje: string }
  | { tipo: "cargando" };

function procesarResultado(resultado: Resultado): string {
  // Tu implementación aquí
  // Usa switch con la propiedad discriminadora 'tipo'
}

function esExitoso(resultado: Resultado): boolean {
  // Tu implementación aquí
  // Verifica si el resultado es exitoso
}

// 2. Formas geométricas con discriminated unions
type Forma = 
  | { tipo: "circulo"; radio: number }
  | { tipo: "rectangulo"; ancho: number; alto: number }
  | { tipo: "triangulo"; base: number; altura: number };

function calcularArea(forma: Forma): number {
  // Tu implementación aquí
  // Usa switch para calcular el área según el tipo
}

function calcularPerimetro(forma: Forma): number {
  // Tu implementación aquí
  // Implementa el cálculo del perímetro para cada forma
}

// 3. Estados de aplicación
type EstadoApp = 
  | { estado: "inicializando"; progreso: number }
  | { estado: "listo"; usuario: string }
  | { estado: "error"; mensaje: string; recuperable: boolean }
  | { estado: "mantenimiento"; tiempoEstimado: number };

function manejarEstadoApp(estado: EstadoApp): string {
  // Tu implementación aquí
  // Maneja cada estado de la aplicación
}

function puedeUsarApp(estado: EstadoApp): boolean {
  // Tu implementación aquí
  // Determina si la app se puede usar en el estado actual
}

// 4. Ejercicio práctico: Sistema de pagos
type MetodoPago = 
  | { tipo: "tarjeta"; numero: string; cvv: string; expiracion: string }
  | { tipo: "paypal"; email: string }
  | { tipo: "transferencia"; banco: string; cuenta: string }
  | { tipo: "efectivo"; monto: number };

function procesarPago(metodo: MetodoPago): string {
  // Tu implementación aquí
  // Procesa el pago según el método
}

function validarMetodoPago(metodo: MetodoPago): boolean {
  // Tu implementación aquí
  // Valida cada método de pago según sus reglas
}

// 5. Múltiples discriminators
type Notificacion = 
  | { tipo: "email"; prioridad: "alta" | "media" | "baja"; destinatario: string; asunto: string }
  | { tipo: "sms"; prioridad: "alta" | "media"; numero: string; mensaje: string }
  | { tipo: "push"; prioridad: "alta"; dispositivo: string; titulo: string };

function enviarNotificacion(notificacion: Notificacion): string {
  // Tu implementación aquí
  // Usa ambos discriminators: tipo y prioridad
}

function validarNotificacion(notificacion: Notificacion): boolean {
  // Tu implementación aquí
  // Valida según el tipo y prioridad
}

// 6. Exhaustive checking
function asegurarExhaustivo(valor: never): never {
  throw new Error(`Caso no manejado: ${valor}`);
}

function procesarFormaExhaustivo(forma: Forma): number {
  switch (forma.tipo) {
    case "circulo":
      // Tu implementación aquí
      return 0; // placeholder
    case "rectangulo":
      // Tu implementación aquí
      return 0; // placeholder
    case "triangulo":
      // Tu implementación aquí
      return 0; // placeholder
    default:
      // Tu implementación aquí
      // Usa asegurarExhaustivo para garantizar que todos los casos están cubiertos
      return asegurarExhaustivo(forma);
  }
}

// 7. Eventos del sistema con discriminated unions
type EventoSistema = 
  | { tipo: "usuario_login"; usuario: string; timestamp: Date }
  | { tipo: "usuario_logout"; usuario: string; timestamp: Date; duracionSesion: number }
  | { tipo: "error_sistema"; codigo: number; mensaje: string; timestamp: Date }
  | { tipo: "actualizacion_datos"; tabla: string; registrosAfectados: number; timestamp: Date };

function registrarEvento(evento: EventoSistema): string {
  // Tu implementación aquí
  // Registra el evento según su tipo
}

function analizarEvento(evento: EventoSistema): { categoria: string; importancia: number } {
  // Tu implementación aquí
  // Analiza el evento y retorna categoria e importancia
}

// 8. API Responses con discriminated unions
type RespuestaAPI<T> = 
  | { estado: "exitosa"; datos: T; timestamp: Date }
  | { estado: "error"; codigo: number; mensaje: string; detalles?: any }
  | { estado: "timeout"; tiempoEspera: number }
  | { estado: "sin_autorizacion"; tokenRequerido: boolean };

function manejarRespuestaAPI<T>(respuesta: RespuestaAPI<T>): T | null {
  // Tu implementación aquí
  // Maneja cada tipo de respuesta
}

function esRespuestaExitosaAPI<T>(respuesta: RespuestaAPI<T>): respuesta is { estado: "exitosa"; datos: T; timestamp: Date } {
  // Tu implementación aquí
  // Type guard específico para respuestas exitosas
}

// 9. State Machine con discriminated unions
type EstadoMaquina = 
  | { estado: "apagada" }
  | { estado: "encendiendo"; progreso: number }
  | { estado: "funcionando"; temperatura: number; velocidad: number }
  | { estado: "pausada"; razon: string }
  | { estado: "error"; codigo: number; descripcion: string };

function transicionarEstado(estadoActual: EstadoMaquina, accion: string): EstadoMaquina {
  // Tu implementación aquí
  // Implementa transiciones válidas entre estados
}

function obtenerEstadoInfo(estado: EstadoMaquina): string {
  // Tu implementación aquí
  // Retorna información descriptiva del estado
}

// 10. Ejercicio avanzado: Parser de comandos
type Comando = 
  | { tipo: "crear"; archivo: string; contenido?: string }
  | { tipo: "leer"; archivo: string }
  | { tipo: "actualizar"; archivo: string; contenido: string }
  | { tipo: "eliminar"; archivo: string; confirmar: boolean }
  | { tipo: "listar"; directorio?: string };

function ejecutarComando(comando: Comando): string {
  // Tu implementación aquí
  // Ejecuta el comando según su tipo
}

function validarComando(comando: Comando): { valido: boolean; errores: string[] } {
  // Tu implementación aquí
  // Valida el comando según sus reglas específicas
}

function ayudaComando(tipoComando?: Comando["tipo"]): string {
  // Tu implementación aquí
  // Retorna ayuda general o específica para un tipo de comando
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba resultados básicos
const resultadoExito: Resultado = { tipo: "exito", datos: { mensaje: "Todo bien" } };
const resultadoError: Resultado = { tipo: "error", codigo: 404, mensaje: "No encontrado" };
const resultadoCarga: Resultado = { tipo: "cargando" };

console.log(procesarResultado(resultadoExito)); // "Éxito: ..."
console.log(procesarResultado(resultadoError)); // "Error 404: No encontrado"
console.log(esExitoso(resultadoExito)); // true

// Prueba formas geométricas
const circulo: Forma = { tipo: "circulo", radio: 5 };
const rectangulo: Forma = { tipo: "rectangulo", ancho: 10, alto: 5 };
const triangulo: Forma = { tipo: "triangulo", base: 8, altura: 6 };

console.log(calcularArea(circulo)); // π * 25
console.log(calcularArea(rectangulo)); // 50
console.log(calcularPerimetro(triangulo)); // perímetro del triángulo

// Prueba estados de app
const estadoListo: EstadoApp = { estado: "listo", usuario: "Juan" };
const estadoError: EstadoApp = { estado: "error", mensaje: "Fallo de conexión", recuperable: true };

console.log(manejarEstadoApp(estadoListo)); // "App lista para Juan"
console.log(puedeUsarApp(estadoListo)); // true
console.log(puedeUsarApp(estadoError)); // false

// Prueba métodos de pago
const tarjeta: MetodoPago = { tipo: "tarjeta", numero: "1234", cvv: "123", expiracion: "12/25" };
const paypal: MetodoPago = { tipo: "paypal", email: "user@example.com" };

console.log(procesarPago(tarjeta)); // "Procesando tarjeta..."
console.log(validarMetodoPago(paypal)); // true

// Prueba notificaciones con múltiples discriminators
const emailAlta: Notificacion = { tipo: "email", prioridad: "alta", destinatario: "user@example.com", asunto: "Urgente" };
const smsMedia: Notificacion = { tipo: "sms", prioridad: "media", numero: "123456789", mensaje: "Información" };

console.log(enviarNotificacion(emailAlta)); // "Email alta prioridad enviado"
console.log(validarNotificacion(smsMedia)); // true

// Prueba exhaustive checking
console.log(procesarFormaExhaustivo(circulo)); // Área del círculo

// Prueba eventos del sistema
const eventoLogin: EventoSistema = { tipo: "usuario_login", usuario: "Ana", timestamp: new Date() };
const eventoError: EventoSistema = { tipo: "error_sistema", codigo: 500, mensaje: "Error interno", timestamp: new Date() };

console.log(registrarEvento(eventoLogin)); // "Login registrado para Ana"
console.log(analizarEvento(eventoError)); // { categoria: "error", importancia: 9 }

// Prueba respuestas API
const respuestaOK: RespuestaAPI<{ id: number; nombre: string }> = {
  estado: "exitosa",
  datos: { id: 1, nombre: "Test" },
  timestamp: new Date()
};

console.log(manejarRespuestaAPI(respuestaOK)); // { id: 1, nombre: "Test" }
console.log(esRespuestaExitosaAPI(respuestaOK)); // true

// Prueba máquina de estados
const estadoFuncionando: EstadoMaquina = { estado: "funcionando", temperatura: 25, velocidad: 100 };
console.log(transicionarEstado(estadoFuncionando, "pausar")); // { estado: "pausada", razon: "..." }
console.log(obtenerEstadoInfo(estadoFuncionando)); // "Máquina funcionando..."

// Prueba comandos
const comandoCrear: Comando = { tipo: "crear", archivo: "test.txt", contenido: "Hola mundo" };
const comandoLeer: Comando = { tipo: "leer", archivo: "test.txt" };

console.log(ejecutarComando(comandoCrear)); // "Archivo test.txt creado"
console.log(validarComando(comandoLeer)); // { valido: true, errores: [] }
console.log(ayudaComando("crear")); // "Ayuda para comando crear..."
```

---

## 🏆 Criterios de Evaluación

- ✅ Discriminated Unions correctamente definidas
- ✅ Pattern matching con switch implementado
- ✅ Exhaustive checking funcionando
- ✅ Type narrowing automático aprovechado
- ✅ Múltiples discriminators manejados

---

## 💡 Mejores Prácticas

- **Usa nombres descriptivos**: La propiedad discriminadora debe ser clara
- **Implementa exhaustive checking**: Usa never para garantizar completitud
- **Agrupa casos relacionados**: Cuando tiene sentido semánticamente
- **Considera performance**: Switch es más eficiente que if/else en cadena

---

[🔙 Volver al Módulo](../README.md) | [🏠 Inicio del Curso](../../../README.md)
