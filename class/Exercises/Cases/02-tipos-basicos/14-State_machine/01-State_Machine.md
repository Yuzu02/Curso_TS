# 🎯 Ejercicio 1: State Machine con Discriminated Unions

> Crea una máquina de estados usando discriminated unions para un reproductor de música

---

## 📋 Descripción

Crea una máquina de estados usando discriminated unions para modelar un reproductor de música con estados bien definidos.

**Dificultad:** 🔴 Avanzado | **Tiempo:** 105 minutos

---

## 🎯 Objetivos

- Implementar discriminated unions para estados
- Crear transiciones de estado válidas
- Manejar datos específicos por estado
- Implementar pattern matching con switch

---

## 📋 Requerimientos

1. **Definir Estados:**
   - Detenido, Reproduciendo, Pausado, Error
   - Cada estado con datos específicos

2. **Implementar Transiciones:**
   - Validar transiciones permitidas
   - Mantener coherencia de datos
   - Manejar errores de estado

3. **Funciones de Estado:**
   - Verificar posibles transiciones
   - Obtener información del estado actual
   - Manejar acciones específicas por estado

---

## 💡 Estructura Base

```typescript
// Define los estados usando discriminated unions
type EstadoReproductor = 
  | { estado: "detenido" }
  | { estado: "reproduciendo"; cancion: string; progreso: number; duracion: number }
  | { estado: "pausado"; cancion: string; progreso: number; duracion: number }
  | { estado: "error"; mensaje: string; codigoError: number };

interface Cancion {
  id: string;
  titulo: string;
  artista: string;
  duracion: number; // en segundos
  archivo: string;
}

interface HistorialReproduccion {
  cancion: Cancion;
  fechaInicio: Date;
  fechaFin?: Date;
  completada: boolean;
}

// Implementa la clase reproductora
class ReproductorMusica {
  private estado: EstadoReproductor;
  private playlist: Cancion[] = [];
  private historial: HistorialReproduccion[] = [];
  private volumen: number = 0.5;
  private indiceActual: number = 0;
  
  constructor() {
    this.estado = { estado: "detenido" };
  }
  
  reproducir(cancion?: Cancion): boolean {
    // Implementa las transiciones válidas
    switch (this.estado.estado) {
      case "detenido":
        if (!cancion && this.playlist.length === 0) {
          this.estado = { 
            estado: "error", 
            mensaje: "No hay canciones para reproducir", 
            codigoError: 404 
          };
          return false;
        }
        
        const cancionAReproducir = cancion || this.playlist[this.indiceActual];
        if (!cancionAReproducir) {
          this.estado = { 
            estado: "error", 
            mensaje: "Canción no encontrada", 
            codigoError: 404 
          };
          return false;
        }
        
        this.estado = { 
          estado: "reproduciendo", 
          cancion: cancionAReproducir.titulo, 
          progreso: 0,
          duracion: cancionAReproducir.duracion
        };
        
        this.agregarAlHistorial(cancionAReproducir);
        return true;
        
      case "pausado":
        this.estado = { 
          estado: "reproduciendo", 
          cancion: this.estado.cancion,
          progreso: this.estado.progreso,
          duracion: this.estado.duracion
        };
        return true;
        
      case "reproduciendo":
        // Ya está reproduciendo
        return false;
        
      case "error":
        // No se puede reproducir desde estado de error
        return false;
        
      default:
        return false;
    }
  }
  
  pausar(): boolean {
    // Implementa las transiciones válidas
    if (this.estado.estado === "reproduciendo") {
      this.estado = { 
        estado: "pausado", 
        cancion: this.estado.cancion,
        progreso: this.estado.progreso,
        duracion: this.estado.duracion
      };
      return true;
    }
    return false;
  }
  
  detener(): boolean {
    // Implementa las transiciones válidas
    switch (this.estado.estado) {
      case "reproduciendo":
      case "pausado":
        this.finalizarReproduccionActual();
        this.estado = { estado: "detenido" };
        return true;
        
      case "error":
        this.estado = { estado: "detenido" };
        return true;
        
      case "detenido":
        return false;
        
      default:
        return false;
    }
  }
  
  siguiente(): boolean {
    if (this.playlist.length === 0) return false;
    
    this.indiceActual = (this.indiceActual + 1) % this.playlist.length;
    
    if (this.estado.estado === "reproduciendo" || this.estado.estado === "pausado") {
      this.detener();
      return this.reproducir();
    }
    
    return true;
  }
  
  anterior(): boolean {
    if (this.playlist.length === 0) return false;
    
    this.indiceActual = this.indiceActual === 0 ? this.playlist.length - 1 : this.indiceActual - 1;
    
    if (this.estado.estado === "reproduciendo" || this.estado.estado === "pausado") {
      this.detener();
      return this.reproducir();
    }
    
    return true;
  }
  
  actualizarProgreso(progreso: number): boolean {
    if (this.estado.estado === "reproduciendo") {
      if (progreso >= 0 && progreso <= this.estado.duracion) {
        this.estado = { 
          ...this.estado, 
          progreso: progreso 
        };
        
        // Si terminó la canción
        if (progreso >= this.estado.duracion) {
          this.finalizarReproduccionActual();
          this.siguiente();
        }
        
        return true;
      }
    }
    return false;
  }
  
  obtenerEstado(): EstadoReproductor {
    return this.estado;
  }
  
  obtenerInfoEstado(): string {
    switch (this.estado.estado) {
      case "detenido":
        return "Reproductor detenido";
        
      case "reproduciendo":
        const progresoMin = Math.floor(this.estado.progreso / 60);
        const progresoSeg = Math.floor(this.estado.progreso % 60);
        const duracionMin = Math.floor(this.estado.duracion / 60);
        const duracionSeg = Math.floor(this.estado.duracion % 60);
        return `Reproduciendo: ${this.estado.cancion} (${progresoMin}:${progresoSeg.toString().padStart(2, '0')}/${duracionMin}:${duracionSeg.toString().padStart(2, '0')})`;
        
      case "pausado":
        const pausadoMin = Math.floor(this.estado.progreso / 60);
        const pausadoSeg = Math.floor(this.estado.progreso % 60);
        return `Pausado: ${this.estado.cancion} (${pausadoMin}:${pausadoSeg.toString().padStart(2, '0')})`;
        
      case "error":
        return `Error ${this.estado.codigoError}: ${this.estado.mensaje}`;
        
      default:
        return "Estado desconocido";
    }
  }
  
  agregarCancion(cancion: Cancion): void {
    this.playlist.push(cancion);
  }
  
  obtenerPlaylist(): Cancion[] {
    return [...this.playlist];
  }
  
  obtenerHistorial(): HistorialReproduccion[] {
    return [...this.historial];
  }
  
  private agregarAlHistorial(cancion: Cancion): void {
    this.historial.push({
      cancion,
      fechaInicio: new Date(),
      completada: false
    });
  }
  
  private finalizarReproduccionActual(): void {
    const ultimaReproduccion = this.historial[this.historial.length - 1];
    if (ultimaReproduccion && !ultimaReproduccion.fechaFin) {
      ultimaReproduccion.fechaFin = new Date();
      ultimaReproduccion.completada = this.estado.estado === "reproduciendo" && 
        this.estado.progreso >= this.estado.duracion * 0.8; // 80% para considerar completada
    }
  }
}

// Implementa funciones auxiliares
function puedeReproducir(estado: EstadoReproductor): boolean {
  return estado.estado === "detenido" || estado.estado === "pausado";
}

function puedePausar(estado: EstadoReproductor): boolean {
  return estado.estado === "reproduciendo";
}

function puedeDetener(estado: EstadoReproductor): boolean {
  return estado.estado === "reproduciendo" || estado.estado === "pausado";
}

function esEstadoConCancion(estado: EstadoReproductor): estado is 
  | { estado: "reproduciendo"; cancion: string; progreso: number; duracion: number }
  | { estado: "pausado"; cancion: string; progreso: number; duracion: number } {
  return estado.estado === "reproduciendo" || estado.estado === "pausado";
}

function obtenerProgresoFormateado(estado: EstadoReproductor): string | null {
  if (esEstadoConCancion(estado)) {
    const minutos = Math.floor(estado.progreso / 60);
    const segundos = Math.floor(estado.progreso % 60);
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  }
  return null;
}

function calcularPorcentajeProgreso(estado: EstadoReproductor): number | null {
  if (esEstadoConCancion(estado)) {
    return (estado.progreso / estado.duracion) * 100;
  }
  return null;
}
```

---

## 🧪 Casos de Prueba

```typescript
// Casos de prueba para el reproductor
const reproductor = new ReproductorMusica();

// Crear algunas canciones
const canciones: Cancion[] = [
  { id: "1", titulo: "Canción 1", artista: "Artista 1", duracion: 180, archivo: "cancion1.mp3" },
  { id: "2", titulo: "Canción 2", artista: "Artista 2", duracion: 200, archivo: "cancion2.mp3" },
  { id: "3", titulo: "Canción 3", artista: "Artista 3", duracion: 150, archivo: "cancion3.mp3" },
];

// Agregar canciones a la playlist
canciones.forEach(cancion => reproductor.agregarCancion(cancion));

// Probar transiciones
console.log("Estado inicial:", reproductor.obtenerInfoEstado());

// Reproducir
console.log("Reproduciendo:", reproductor.reproducir());
console.log("Estado:", reproductor.obtenerInfoEstado());

// Pausar
console.log("Pausando:", reproductor.pausar());
console.log("Estado:", reproductor.obtenerInfoEstado());

// Reanudar
console.log("Reanudando:", reproductor.reproducir());
console.log("Estado:", reproductor.obtenerInfoEstado());

// Actualizar progreso
reproductor.actualizarProgreso(90);
console.log("Progreso actualizado:", reproductor.obtenerInfoEstado());

// Detener
console.log("Deteniendo:", reproductor.detener());
console.log("Estado:", reproductor.obtenerInfoEstado());

// Probar funciones auxiliares
const estadoActual = reproductor.obtenerEstado();
console.log("¿Puede reproducir?", puedeReproducir(estadoActual));
console.log("¿Puede pausar?", puedePausar(estadoActual));
console.log("¿Puede detener?", puedeDetener(estadoActual));

// Ver historial
console.log("Historial:", reproductor.obtenerHistorial());
```

---

## 🏆 Criterios de Evaluación

- ✅ Discriminated unions correctamente implementadas
- ✅ Transiciones de estado válidas
- ✅ Manejo de datos específicos por estado
- ✅ Pattern matching con switch
- ✅ Funciones auxiliares implementadas

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../012-Parser/01-Parser_Datos.md)
