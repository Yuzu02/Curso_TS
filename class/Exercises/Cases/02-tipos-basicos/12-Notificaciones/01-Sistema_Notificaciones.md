# 🎯 Ejercicio 1: Sistema de Notificaciones con Enums

> Crea un sistema de notificaciones usando enums para tipos, prioridades y estados

---

## 📋 Descripción

Crea un sistema de notificaciones usando enums para categorizar y manejar diferentes tipos de notificaciones.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 60 minutos

---

## 🎯 Objetivos

- Definir enums para tipos, prioridades y estados
- Implementar un sistema de notificaciones
- Manejar diferentes tipos de notificaciones
- Procesar notificaciones según su prioridad

---

## 📋 Requerimientos

1. **Definir Enums:**
   - `TipoNotificacion`: Info, Warning, Error, Success
   - `PrioridadNotificacion`: Baja, Media, Alta, Crítica
   - `EstadoNotificacion`: Pendiente, Enviada, Leída, Archivada

2. **Implementar Sistema:**
   - Crear notificaciones
   - Procesar cola de notificaciones
   - Filtrar por tipo y prioridad

---

## 💡 Estructura Base

```typescript
// Define estos enums
enum TipoNotificacion {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
  SUCCESS = "success"
}

enum PrioridadNotificacion {
  BAJA = 1,
  MEDIA = 2,
  ALTA = 3,
  CRITICA = 4
}

enum EstadoNotificacion {
  PENDIENTE = "pendiente",
  ENVIADA = "enviada",
  LEIDA = "leida",
  ARCHIVADA = "archivada"
}

// Implementa la interfaz de notificación
interface Notificacion {
  id: string;
  tipo: TipoNotificacion;
  prioridad: PrioridadNotificacion;
  estado: EstadoNotificacion;
  titulo: string;
  mensaje: string;
  destinatario: string;
  fechaCreacion: Date;
  fechaEnvio?: Date;
  fechaLectura?: Date;
}

interface FiltroNotificaciones {
  tipo?: TipoNotificacion;
  prioridad?: PrioridadNotificacion;
  estado?: EstadoNotificacion;
  destinatario?: string;
}

class GestorNotificaciones {
  private notificaciones: Notificacion[] = [];
  private contadorId = 0;

  crearNotificacion(
    tipo: TipoNotificacion,
    prioridad: PrioridadNotificacion,
    titulo: string,
    mensaje: string,
    destinatario: string
  ): Notificacion {
    const notificacion: Notificacion = {
      id: `notif-${++this.contadorId}`,
      tipo,
      prioridad,
      estado: EstadoNotificacion.PENDIENTE,
      titulo,
      mensaje,
      destinatario,
      fechaCreacion: new Date()
    };

    this.notificaciones.push(notificacion);
    return notificacion;
  }

  procesarNotificacion(id: string): boolean {
    const notificacion = this.obtenerNotificacionPorId(id);
    if (!notificacion || notificacion.estado !== EstadoNotificacion.PENDIENTE) {
      return false;
    }

    notificacion.estado = EstadoNotificacion.ENVIADA;
    notificacion.fechaEnvio = new Date();
    return true;
  }

  marcarComoLeida(id: string): boolean {
    const notificacion = this.obtenerNotificacionPorId(id);
    if (!notificacion || notificacion.estado !== EstadoNotificacion.ENVIADA) {
      return false;
    }

    notificacion.estado = EstadoNotificacion.LEIDA;
    notificacion.fechaLectura = new Date();
    return true;
  }

  archivarNotificacion(id: string): boolean {
    const notificacion = this.obtenerNotificacionPorId(id);
    if (!notificacion || notificacion.estado !== EstadoNotificacion.LEIDA) {
      return false;
    }

    notificacion.estado = EstadoNotificacion.ARCHIVADA;
    return true;
  }

  obtenerNotificacionPorId(id: string): Notificacion | undefined {
    return this.notificaciones.find(n => n.id === id);
  }

  filtrarNotificaciones(filtro: FiltroNotificaciones): Notificacion[] {
    return this.notificaciones.filter(notificacion => {
      if (filtro.tipo && notificacion.tipo !== filtro.tipo) return false;
      if (filtro.prioridad && notificacion.prioridad !== filtro.prioridad) return false;
      if (filtro.estado && notificacion.estado !== filtro.estado) return false;
      if (filtro.destinatario && notificacion.destinatario !== filtro.destinatario) return false;
      return true;
    });
  }

  obtenerNotificacionesPorPrioridad(): Notificacion[] {
    return [...this.notificaciones].sort((a, b) => b.prioridad - a.prioridad);
  }

  obtenerEstadisticas() {
    const estadisticas = {
      total: this.notificaciones.length,
      porTipo: {} as Record<TipoNotificacion, number>,
      porPrioridad: {} as Record<PrioridadNotificacion, number>,
      porEstado: {} as Record<EstadoNotificacion, number>
    };

    // Inicializar contadores
    Object.values(TipoNotificacion).forEach(tipo => {
      estadisticas.porTipo[tipo] = 0;
    });
    Object.values(PrioridadNotificacion).forEach(prioridad => {
      if (typeof prioridad === 'number') {
        estadisticas.porPrioridad[prioridad] = 0;
      }
    });
    Object.values(EstadoNotificacion).forEach(estado => {
      estadisticas.porEstado[estado] = 0;
    });

    // Contar notificaciones
    this.notificaciones.forEach(notificacion => {
      estadisticas.porTipo[notificacion.tipo]++;
      estadisticas.porPrioridad[notificacion.prioridad]++;
      estadisticas.porEstado[notificacion.estado]++;
    });

    return estadisticas;
  }
}

// Implementa funciones auxiliares
function obtenerIconoPorTipo(tipo: TipoNotificacion): string {
  switch (tipo) {
    case TipoNotificacion.INFO: return "ℹ️";
    case TipoNotificacion.WARNING: return "⚠️";
    case TipoNotificacion.ERROR: return "❌";
    case TipoNotificacion.SUCCESS: return "✅";
    default: return "📢";
  }
}

function obtenerColorPorPrioridad(prioridad: PrioridadNotificacion): string {
  switch (prioridad) {
    case PrioridadNotificacion.BAJA: return "green";
    case PrioridadNotificacion.MEDIA: return "blue";
    case PrioridadNotificacion.ALTA: return "orange";
    case PrioridadNotificacion.CRITICA: return "red";
    default: return "gray";
  }
}
```

---

## 🧪 Casos de Prueba

```typescript
// Casos de prueba para el sistema de notificaciones
const gestor = new GestorNotificaciones();

// Crear diferentes tipos de notificaciones
const notif1 = gestor.crearNotificacion(
  TipoNotificacion.INFO,
  PrioridadNotificacion.BAJA,
  "Información",
  "Esta es una notificación informativa",
  "usuario1@example.com"
);

const notif2 = gestor.crearNotificacion(
  TipoNotificacion.ERROR,
  PrioridadNotificacion.CRITICA,
  "Error Crítico",
  "Ha ocurrido un error crítico en el sistema",
  "admin@example.com"
);

const notif3 = gestor.crearNotificacion(
  TipoNotificacion.SUCCESS,
  PrioridadNotificacion.MEDIA,
  "Operación Exitosa",
  "La operación se completó exitosamente",
  "usuario2@example.com"
);

// Procesar notificaciones
console.log(gestor.procesarNotificacion(notif1.id)); // true
console.log(gestor.procesarNotificacion(notif2.id)); // true
console.log(gestor.marcarComoLeida(notif1.id)); // true

// Filtrar notificaciones
const errores = gestor.filtrarNotificaciones({ tipo: TipoNotificacion.ERROR });
const criticas = gestor.filtrarNotificaciones({ prioridad: PrioridadNotificacion.CRITICA });

console.log("Notificaciones de error:", errores);
console.log("Notificaciones críticas:", criticas);

// Ver estadísticas
console.log("Estadísticas:", gestor.obtenerEstadisticas());

// Obtener notificaciones ordenadas por prioridad
const porPrioridad = gestor.obtenerNotificacionesPorPrioridad();
console.log("Por prioridad:", porPrioridad);
```

---

## 🏆 Criterios de Evaluación

- ✅ Enums correctamente definidos
- ✅ Sistema de notificaciones funcional
- ✅ Gestión de estados implementada
- ✅ Filtros y estadísticas funcionando
- ✅ Casos de prueba funcionando

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../010-Validacion/01-Sistema_Validacion.md)
