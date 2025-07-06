# 🎯 Ejercicio 2: Number y Boolean Literals

> Aprende a usar Number y Boolean Literal Types para mayor precisión

---

## 📋 Descripción

Domina el uso de Number y Boolean Literal Types para crear tipos más específicos.

**Dificultad:** 🟢 Principiante | **Tiempo:** 35 minutos

---

## 🎯 Objetivos

- Entender Number Literal Types
- Usar Boolean Literal Types
- Combinar literales con unions
- Crear sistemas de configuración precisos

---

## 📋 Requerimientos

1. **Number Literals:**
   - Definir tipos con números específicos
   - Usar en configuraciones
   - Validación de rangos

2. **Boolean Literals:**
   - Usar true/false como tipos
   - Banderas de configuración
   - Estados binarios específicos

---

## 💡 Estructura Base

```typescript
// 1. Define Number Literal Types
type Puerto = /* tu definición aquí */; // 80 | 443 | 3000 | 8080
type Prioridad = /* tu definición aquí */; // 1 | 2 | 3 | 4 | 5
type Porcentaje = /* tu definición aquí */; // 0 | 25 | 50 | 75 | 100

// 2. Define Boolean Literal Types
type Activado = /* tu definición aquí */; // true
type Desactivado = /* tu definición aquí */; // false
type ModoDebug = /* tu definición aquí */; // true | false

// 3. Implementa funciones con Number Literals
function configurarServidor(puerto: Puerto): string {
  // Tu implementación aquí
}

function asignarPrioridad(tarea: string, prioridad: Prioridad): string {
  // Tu implementación aquí
}

function actualizarProgreso(porcentaje: Porcentaje): string {
  // Tu implementación aquí
}

// 4. Implementa funciones con Boolean Literals
function activarCaracteristica(activo: Activado): string {
  // Tu implementación aquí
}

function desactivarCaracteristica(inactivo: Desactivado): string {
  // Tu implementación aquí
}

function configurarDebug(debug: ModoDebug): string {
  // Tu implementación aquí
}

// 5. Ejercicio práctico: Sistema de configuración
type ConfiguracionServidor = {
  puerto: Puerto;
  debug: ModoDebug;
  ssl: true | false;
  version: 1 | 2 | 3;
};

function crearConfiguracionServidor(
  puerto: Puerto,
  debug: ModoDebug,
  ssl: boolean,
  version: 1 | 2 | 3
): ConfiguracionServidor {
  // Tu implementación aquí
}

function validarConfiguracionServidor(config: unknown): config is ConfiguracionServidor {
  // Tu implementación aquí
}

// 6. Combinación de literales
type EstadoConexion = {
  activo: true;
  puerto: Puerto;
  intentos: 1 | 2 | 3;
} | {
  activo: false;
  razon: string;
};

function manejarConexion(estado: EstadoConexion): string {
  // Tu implementación aquí
  // Usa discriminated union con boolean literal
}

// 7. Validadores de literales
function esPuertoValido(valor: number): valor is Puerto {
  // Tu implementación aquí
}

function esPrioridadValida(valor: number): valor is Prioridad {
  // Tu implementación aquí
}

function esPorcentajeValido(valor: number): valor is Porcentaje {
  // Tu implementación aquí
}

// 8. Funciones que retornan literales específicos
function obtenerPuertoSegunAmbiente(ambiente: "desarrollo" | "produccion"): Puerto {
  // Tu implementación aquí
}

function calcularPrioridadAutomatica(urgencia: "baja" | "media" | "alta"): Prioridad {
  // Tu implementación aquí
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba Number Literals
console.log(configurarServidor(3000)); // "Servidor configurado en puerto 3000"
console.log(asignarPrioridad("Tarea importante", 5)); // Máxima prioridad
console.log(actualizarProgreso(75)); // "Progreso: 75%"

// Prueba Boolean Literals
console.log(activarCaracteristica(true)); // Solo acepta true
console.log(desactivarCaracteristica(false)); // Solo acepta false
console.log(configurarDebug(true)); // "Debug activado"

// Prueba configuración del servidor
const config = crearConfiguracionServidor(8080, true, false, 2);
console.log(config);
console.log(validarConfiguracionServidor(config)); // true

// Prueba estados de conexión
const conexionActiva: EstadoConexion = {
  activo: true,
  puerto: 443,
  intentos: 1
};

const conexionInactiva: EstadoConexion = {
  activo: false,
  razon: "Timeout"
};

console.log(manejarConexion(conexionActiva));
console.log(manejarConexion(conexionInactiva));

// Prueba validadores
console.log(esPuertoValido(3000)); // true
console.log(esPuertoValido(9999)); // false
console.log(esPrioridadValida(3)); // true
console.log(esPorcentajeValido(50)); // true

// Prueba funciones que retornan literales
console.log(obtenerPuertoSegunAmbiente("desarrollo")); // 3000
console.log(obtenerPuertoSegunAmbiente("produccion")); // 80 o 443
console.log(calcularPrioridadAutomatica("alta")); // 5
```

---

## 🏆 Criterios de Evaluación

- ✅ Number Literal Types correctamente definidos
- ✅ Boolean Literal Types implementados
- ✅ Discriminated unions con literales
- ✅ Validadores funcionando correctamente
- ✅ Configuraciones tipadas precisas

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](03-Template_Literal_Types.md)
