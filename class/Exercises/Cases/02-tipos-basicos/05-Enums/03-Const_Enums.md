# 🎯 Ejercicio 3: Const Enums

> Aprende a usar Const Enums para optimización en tiempo de compilación

---

## 📋 Descripción

Domina el uso de Const Enums para crear enums que se optimizan completamente en tiempo de compilación.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 50 minutos

---

## 🎯 Objetivos

- Entender las diferencias entre Enum y Const Enum
- Saber cuándo usar cada tipo
- Comprender las optimizaciones de compilación
- Implementar sistemas de configuración optimizados

---

## 📋 Requerimientos

1. **Const Enums Básicos:**
   - Definir const enums
   - Comparar con enums normales
   - Entender inline expansion

2. **Casos de Uso:**
   - Configuraciones de compilación
   - Códigos de estado
   - Banderas de características

---

## 💡 Estructura Base

```typescript
// 1. Define Const Enums básicos
const enum TamañoBuffer {
  // Tu definición aquí
  // PEQUEÑO = 1024, MEDIANO = 4096, GRANDE = 8192
}

const enum TipoOperacion {
  // Tu definición aquí
  // LEER = "read", ESCRIBIR = "write", ELIMINAR = "delete"
}

const enum BanderaCompilacion {
  // Tu definición aquí
  // DESARROLLO = 1, PRODUCCION = 2, TESTING = 4
}

// 2. Implementa funciones con Const Enums
function configurarBuffer(tamaño: TamañoBuffer): string {
  // Tu implementación aquí
}

function ejecutarOperacion(operacion: TipoOperacion): string {
  // Tu implementación aquí
}

function verificarBandera(bandera: BanderaCompilacion): boolean {
  // Tu implementación aquí
}

// 3. Ejercicio práctico: Sistema de configuración
const enum ConfiguracionApp {
  // Tu definición aquí
  // API_VERSION = "v1", API_BASE_URL = "https://api.ejemplo.com", MAX_RETRIES = 3
}

function construirURLAPI(endpoint: string): string {
  // Tu implementación aquí
  // Usa ConfiguracionApp.API_BASE_URL y ConfiguracionApp.API_VERSION
}

function configurarReintentos(): number {
  // Tu implementación aquí
  // Retorna ConfiguracionApp.MAX_RETRIES
}

// 4. Comparación con enum normal
// Enum normal para comparación
enum ColoresNormal {
  ROJO = "rojo",
  VERDE = "verde",
  AZUL = "azul"
}

// Const enum equivalente
const enum ColoresConst {
  // Tu definición aquí
  // ROJO = "rojo", VERDE = "verde", AZUL = "azul"
}

function usarColorNormal(color: ColoresNormal): string {
  // Tu implementación aquí
}

function usarColorConst(color: ColoresConst): string {
  // Tu implementación aquí
}

// 5. Const enum para códigos de estado HTTP
const enum CodigoHTTP {
  // Tu definición aquí
  // OK = 200, CREATED = 201, BAD_REQUEST = 400, NOT_FOUND = 404, SERVER_ERROR = 500
}

function manejarRespuestaHTTP(codigo: CodigoHTTP): string {
  // Tu implementación aquí
}

function esCodigoExitoso(codigo: CodigoHTTP): boolean {
  // Tu implementación aquí
}

// 6. Banderas de características con const enum
const enum CaracteristicaApp {
  // Tu definición aquí
  // CHAT = 1, NOTIFICACIONES = 2, MODO_OSCURO = 4, ANALYTICS = 8
}

function habilitarCaracteristica(caracteristica: CaracteristicaApp): string {
  // Tu implementación aquí
}

function tieneCaracteristica(caracteristicas: number, caracteristica: CaracteristicaApp): boolean {
  // Tu implementación aquí
}

// 7. Ejercicio avanzado: Sistema de eventos optimizado
const enum TipoEventoSistema {
  // Tu definición aquí
  // INICIO = "system.start", PARADA = "system.stop", ERROR = "system.error"
}

interface EventoSistema {
  tipo: TipoEventoSistema;
  timestamp: number;
  datos?: any;
}

function crearEventoSistema(tipo: TipoEventoSistema, datos?: any): EventoSistema {
  // Tu implementación aquí
}

function procesarEventoSistema(evento: EventoSistema): string {
  // Tu implementación aquí
}

// 8. Limitaciones de const enum
// Estas funciones NO funcionarán con const enum
function obtenerNombresEnum(): string[] {
  // Tu implementación aquí
  // Intenta obtener todas las claves del enum
  // Nota: esto no funcionará con const enum
}

function enumAArray(enumObj: any): Array<{key: string, value: any}> {
  // Tu implementación aquí
  // Convierte enum a array
  // Nota: esto no funcionará con const enum
}

// 9. Cuándo usar const enum vs enum normal
// Implementa funciones que demuestren cuándo usar cada uno

function configuracionDesarrollo(): string {
  // Tu implementación aquí
  // Usa const enum para configuraciones que no cambiarán
}

function configuracionDinamica(): string {
  // Tu implementación aquí
  // Usa enum normal para configuraciones que necesitan ser iteradas
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba Const Enums básicos
console.log(configurarBuffer(TamañoBuffer.MEDIANO)); // "Buffer configurado a 4096"
console.log(ejecutarOperacion(TipoOperacion.LEER)); // "Operación de lectura"
console.log(verificarBandera(BanderaCompilacion.DESARROLLO)); // true

// Prueba configuración de app
console.log(construirURLAPI("usuarios")); // "https://api.ejemplo.com/v1/usuarios"
console.log(configurarReintentos()); // 3

// Prueba comparación con enum normal
console.log(usarColorNormal(ColoresNormal.ROJO)); // "Color rojo"
console.log(usarColorConst(ColoresConst.ROJO)); // "Color rojo"

// Prueba códigos HTTP
console.log(manejarRespuestaHTTP(CodigoHTTP.OK)); // "Respuesta exitosa"
console.log(esCodigoExitoso(CodigoHTTP.CREATED)); // true

// Prueba banderas de características
console.log(habilitarCaracteristica(CaracteristicaApp.CHAT)); // "Chat habilitado"
console.log(tieneCaracteristica(5, CaracteristicaApp.CHAT)); // true (5 = 1 + 4)

// Prueba eventos del sistema
const evento = crearEventoSistema(TipoEventoSistema.INICIO, { version: "1.0.0" });
console.log(procesarEventoSistema(evento));

// Prueba limitaciones
// console.log(obtenerNombresEnum()); // No funcionará con const enum
// console.log(enumAArray(ColoresConst)); // No funcionará con const enum

// Prueba cuándo usar cada tipo
console.log(configuracionDesarrollo()); // Usa const enum
console.log(configuracionDinamica()); // Usa enum normal
```

---

## 🏆 Criterios de Evaluación

- ✅ Const Enums correctamente definidos
- ✅ Comprensión de las diferencias con enums normales
- ✅ Funciones optimizadas implementadas
- ✅ Entendimiento de las limitaciones
- ✅ Casos de uso apropiados identificados

---

## 📝 Notas Importantes

- Los const enums se sustituyen inline en tiempo de compilación
- No se puede usar reflexión con const enums
- Ideales para configuraciones estáticas
- Reduce el tamaño del bundle final

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](04-Enums_vs_Union_Types.md)
