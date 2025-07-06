# 🎯 Ejercicio 1: Sistema de Estados de Pedido con Enums

> Implementa un sistema de estados para pedidos usando enums

---

## 📋 Descripción

Implementa un sistema de estados para pedidos con transiciones válidas usando enums.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 75 minutos

---

## 🎯 Objetivos

- Definir enums para estados de pedidos
- Implementar reglas de transición
- Crear una clase para manejar pedidos
- Validar cambios de estado

---

## 📋 Requerimientos

1. **Definir Enum de Estados:**
   - Estados: Pendiente, Confirmado, Preparando, Enviado, Entregado, Cancelado

2. **Implementar Clase Pedido:**
   - Manejar estado actual
   - Validar transiciones
   - Historial de cambios

3. **Reglas de Transición:**
   - Definir qué transiciones son válidas
   - Implementar lógica de negocio

---

## 💡 Estructura Base

```typescript
// Define el enum de estados
enum EstadoPedido {
  PENDIENTE = "pendiente",
  CONFIRMADO = "confirmado",
  PREPARANDO = "preparando",
  ENVIADO = "enviado",
  ENTREGADO = "entregado",
  CANCELADO = "cancelado"
}

interface CambioEstado {
  estadoAnterior: EstadoPedido;
  estadoNuevo: EstadoPedido;
  fecha: Date;
  razon?: string;
}

// Implementa la clase Pedido
class Pedido {
  private estado: EstadoPedido;
  private historial: CambioEstado[];
  private id: string;
  private fechaCreacion: Date;
  
  constructor(id: string) {
    this.id = id;
    this.estado = EstadoPedido.PENDIENTE;
    this.fechaCreacion = new Date();
    this.historial = [];
  }
  
  cambiarEstado(nuevoEstado: EstadoPedido, razon?: string): boolean {
    // Implementa las reglas de transición
    // No todos los cambios de estado son válidos
    if (!this.puedeTransicionarA(nuevoEstado)) {
      return false;
    }
    
    const cambio: CambioEstado = {
      estadoAnterior: this.estado,
      estadoNuevo: nuevoEstado,
      fecha: new Date(),
      razon
    };
    
    this.historial.push(cambio);
    this.estado = nuevoEstado;
    return true;
  }
  
  private puedeTransicionarA(nuevoEstado: EstadoPedido): boolean {
    return puedeTransicionar(this.estado, nuevoEstado);
  }
  
  obtenerEstado(): EstadoPedido {
    return this.estado;
  }
  
  obtenerHistorial(): CambioEstado[] {
    return [...this.historial];
  }
  
  obtenerInfo() {
    return {
      id: this.id,
      estado: this.estado,
      fechaCreacion: this.fechaCreacion,
      historial: this.historial
    };
  }
}

// Implementa funciones auxiliares
function puedeTransicionar(
  estadoActual: EstadoPedido,
  nuevoEstado: EstadoPedido
): boolean {
  // Define las reglas de transición
  const transicionesValidas: Record<EstadoPedido, EstadoPedido[]> = {
    [EstadoPedido.PENDIENTE]: [EstadoPedido.CONFIRMADO, EstadoPedido.CANCELADO],
    [EstadoPedido.CONFIRMADO]: [EstadoPedido.PREPARANDO, EstadoPedido.CANCELADO],
    [EstadoPedido.PREPARANDO]: [EstadoPedido.ENVIADO, EstadoPedido.CANCELADO],
    [EstadoPedido.ENVIADO]: [EstadoPedido.ENTREGADO],
    [EstadoPedido.ENTREGADO]: [], // Estado final
    [EstadoPedido.CANCELADO]: [] // Estado final
  };
  
  return transicionesValidas[estadoActual].includes(nuevoEstado);
}

function obtenerEstadosValidos(estadoActual: EstadoPedido): EstadoPedido[] {
  // Tu implementación
}
```

---

## 🧪 Casos de Prueba

```typescript
// Casos de prueba para el sistema de pedidos
const pedido1 = new Pedido("PED-001");

// Transiciones válidas
console.log(pedido1.cambiarEstado(EstadoPedido.CONFIRMADO)); // true
console.log(pedido1.cambiarEstado(EstadoPedido.PREPARANDO)); // true
console.log(pedido1.cambiarEstado(EstadoPedido.ENVIADO)); // true
console.log(pedido1.cambiarEstado(EstadoPedido.ENTREGADO)); // true

// Transición inválida
const pedido2 = new Pedido("PED-002");
console.log(pedido2.cambiarEstado(EstadoPedido.ENVIADO)); // false (desde PENDIENTE)

// Historial de cambios
console.log(pedido1.obtenerHistorial());
```

---

## 🏆 Criterios de Evaluación

- ✅ Enum correctamente definido
- ✅ Clase Pedido funcional
- ✅ Reglas de transición implementadas
- ✅ Historial de cambios funcional
- ✅ Validaciones correctas

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../08-Permisos/01-Sistema_Permisos.md)
