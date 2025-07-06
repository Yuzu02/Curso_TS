# 🎯 Ejercicio 1: Numeric Enums

> Aprende a usar Numeric Enums para crear conjuntos de constantes numéricas

---

## 📋 Descripción

Domina el uso de Numeric Enums para crear conjuntos ordenados de constantes numéricas.

**Dificultad:** 🟢 Principiante | **Tiempo:** 40 minutos

---

## 🎯 Objetivos

- Entender qué son los Numeric Enums
- Crear enums con valores automáticos y manuales
- Usar reverse mapping
- Implementar sistemas de prioridades y estados

---

## 📋 Requerimientos

1. **Numeric Enums Básicos:**
   - Enums con valores automáticos
   - Enums con valores personalizados
   - Acceso a valores y nombres

2. **Casos Prácticos:**
   - Sistema de prioridades
   - Estados de aplicación
   - Códigos de respuesta HTTP

---

## 💡 Estructura Base

```typescript
// 1. Define Numeric Enums básicos
enum Prioridad {
  // Tu definición aquí
  // Baja = 1, Media = 2, Alta = 3, Critica = 4
}

enum DiaSemana {
  // Tu definición aquí
  // Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo
}

enum CodigoHTTP {
  // Tu definición aquí
  // OK = 200, Created = 201, BadRequest = 400, NotFound = 404, ServerError = 500
}

// 2. Implementa funciones que usen Numeric Enums
function asignarPrioridad(tarea: string, prioridad: Prioridad): string {
  // Tu implementación aquí
}

function obtenerNombreDia(dia: DiaSemana): string {
  // Tu implementación aquí
}

function procesarRespuestaHTTP(codigo: CodigoHTTP): string {
  // Tu implementación aquí
}

// 3. Ejercicio práctico: Sistema de niveles
enum Nivel {
  // Tu definición aquí
  // Principiante = 1, Intermedio = 5, Avanzado = 10, Experto = 20
}

function calcularExperiencia(nivel: Nivel): number {
  // Tu implementación aquí
  // Retorna puntos de experiencia basados en el nivel
}

function subirNivel(nivelActual: Nivel): Nivel | null {
  // Tu implementación aquí
  // Retorna el siguiente nivel o null si ya está al máximo
}

// 4. Uso de reverse mapping
function obtenerNombreNivel(numeroNivel: number): string | undefined {
  // Tu implementación aquí
  // Usa reverse mapping para obtener el nombre del nivel
}

function esNivelValido(valor: number): valor is Nivel {
  // Tu implementación aquí
  // Verifica si el número corresponde a un nivel válido
}

// 5. Enum con valores no consecutivos
enum PuertosRed {
  // Tu definición aquí
  // HTTP = 80, HTTPS = 443, FTP = 21, SSH = 22, SMTP = 25
}

function configurarPuerto(servicio: string, puerto: PuertosRed): string {
  // Tu implementación aquí
}

function esPuertoSeguro(puerto: PuertosRed): boolean {
  // Tu implementación aquí
}

// 6. Comparación y ordenamiento
function compararPrioridades(p1: Prioridad, p2: Prioridad): number {
  // Tu implementación aquí
  // Retorna -1, 0, o 1 según la comparación
}

function ordenarPorPrioridad(tareas: { nombre: string; prioridad: Prioridad }[]): typeof tareas {
  // Tu implementación aquí
}

// 7. Validación y conversión
function stringAPrioridad(valor: string): Prioridad | null {
  // Tu implementación aquí
  // Convierte string a Prioridad si es válido
}

function numeroAPrioridad(valor: number): Prioridad | null {
  // Tu implementación aquí
  // Convierte número a Prioridad si es válido
}

// 8. Ejercicio avanzado: Máquina de estados
enum EstadoMaquina {
  // Tu definición aquí
  // Apagado = 0, Iniciando = 1, Funcionando = 2, Pausado = 3, Error = 4
}

function transicionarEstado(estadoActual: EstadoMaquina, accion: string): EstadoMaquina {
  // Tu implementación aquí
  // Implementa transiciones válidas entre estados
}

function puedeTransicionar(desde: EstadoMaquina, hacia: EstadoMaquina): boolean {
  // Tu implementación aquí
  // Verifica si la transición es válida
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba Numeric Enums básicos
console.log(asignarPrioridad("Tarea importante", Prioridad.Alta));
console.log(obtenerNombreDia(DiaSemana.Lunes));
console.log(procesarRespuestaHTTP(CodigoHTTP.OK));

// Prueba sistema de niveles
console.log(calcularExperiencia(Nivel.Intermedio)); // 5 puntos
console.log(subirNivel(Nivel.Principiante)); // Nivel.Intermedio
console.log(obtenerNombreNivel(10)); // "Avanzado"

// Prueba reverse mapping
console.log(Prioridad[2]); // "Media"
console.log(Prioridad.Media); // 2
console.log(esNivelValido(5)); // true

// Prueba puertos de red
console.log(configurarPuerto("Web", PuertosRed.HTTP));
console.log(esPuertoSeguro(PuertosRed.HTTPS)); // true

// Prueba comparación
console.log(compararPrioridades(Prioridad.Alta, Prioridad.Baja)); // 1
const tareas = [
  { nombre: "Tarea 1", prioridad: Prioridad.Baja },
  { nombre: "Tarea 2", prioridad: Prioridad.Critica },
  { nombre: "Tarea 3", prioridad: Prioridad.Media }
];
console.log(ordenarPorPrioridad(tareas));

// Prueba validación
console.log(stringAPrioridad("Alta")); // Prioridad.Alta
console.log(numeroAPrioridad(2)); // Prioridad.Media

// Prueba máquina de estados
console.log(transicionarEstado(EstadoMaquina.Apagado, "encender"));
console.log(puedeTransicionar(EstadoMaquina.Funcionando, EstadoMaquina.Pausado)); // true
```

---

## 🏆 Criterios de Evaluación

- ✅ Numeric Enums correctamente definidos
- ✅ Reverse mapping funcionando
- ✅ Funciones con enums implementadas
- ✅ Sistema de estados funcional
- ✅ Validación y conversión correctas

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](02-String_Enums.md)
