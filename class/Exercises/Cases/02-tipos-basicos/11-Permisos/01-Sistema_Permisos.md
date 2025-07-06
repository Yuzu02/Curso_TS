# 🎯 Ejercicio 1: Sistema de Permisos con Enums

> Crea un sistema de permisos usando enums con operaciones bitwise

---

## 📋 Descripción

Crea un sistema de permisos usando enums con operaciones bitwise para manejar múltiples permisos eficientemente.

**Dificultad:** 🔴 Avanzado | **Tiempo:** 90 minutos

---

## 🎯 Objetivos

- Definir enums con valores de potencias de 2
- Implementar operaciones bitwise para permisos
- Crear un sistema de usuarios con permisos
- Manejar combinaciones de permisos

---

## 📋 Requerimientos

1. **Definir Enum de Permisos:**
   - Usar potencias de 2 para permitir combinaciones
   - Permisos: Leer, Escribir, Ejecutar, Eliminar, Administrar

2. **Implementar Clase Usuario:**
   - Manejar permisos con operaciones bitwise
   - Agregar y quitar permisos
   - Verificar permisos específicos

3. **Funciones Auxiliares:**
   - Combinar múltiples permisos
   - Verificar permisos específicos

---

## 💡 Estructura Base

```typescript
// Define el enum de permisos usando potencias de 2
enum Permisos {
  NINGUNO = 0,
  LEER = 1,        // 2^0 = 1
  ESCRIBIR = 2,    // 2^1 = 2
  EJECUTAR = 4,    // 2^2 = 4
  ELIMINAR = 8,    // 2^3 = 8
  ADMINISTRAR = 16, // 2^4 = 16
  TODOS = LEER | ESCRIBIR | EJECUTAR | ELIMINAR | ADMINISTRAR
}

interface PerfilUsuario {
  id: string;
  nombre: string;
  email: string;
  permisos: Permisos;
  fechaCreacion: Date;
}

// Implementa la clase de usuario
class Usuario {
  private perfil: PerfilUsuario;
  
  constructor(id: string, nombre: string, email: string, permisos: Permisos = Permisos.LEER) {
    this.perfil = {
      id,
      nombre,
      email,
      permisos,
      fechaCreacion: new Date()
    };
  }
  
  agregarPermiso(permiso: Permisos): void {
    // Implementa usando operaciones bitwise (OR)
    this.perfil.permisos |= permiso;
  }
  
  quitarPermiso(permiso: Permisos): void {
    // Implementa usando operaciones bitwise (AND + NOT)
    this.perfil.permisos &= ~permiso;
  }
  
  tienePermiso(permiso: Permisos): boolean {
    // Implementa usando operaciones bitwise (AND)
    return (this.perfil.permisos & permiso) === permiso;
  }
  
  tieneAlgunPermiso(permisos: Permisos): boolean {
    // Verifica si tiene al menos uno de los permisos
    return (this.perfil.permisos & permisos) !== 0;
  }
  
  obtenerPermisos(): Permisos {
    return this.perfil.permisos;
  }
  
  obtenerPermisosTexto(): string[] {
    // Convierte los permisos a texto legible
    const permisos: string[] = [];
    
    if (this.tienePermiso(Permisos.LEER)) permisos.push("Leer");
    if (this.tienePermiso(Permisos.ESCRIBIR)) permisos.push("Escribir");
    if (this.tienePermiso(Permisos.EJECUTAR)) permisos.push("Ejecutar");
    if (this.tienePermiso(Permisos.ELIMINAR)) permisos.push("Eliminar");
    if (this.tienePermiso(Permisos.ADMINISTRAR)) permisos.push("Administrar");
    
    return permisos;
  }
  
  obtenerPerfil(): PerfilUsuario {
    return { ...this.perfil };
  }
}

// Implementa funciones auxiliares
function combinarPermisos(...permisos: Permisos[]): Permisos {
  // Combina múltiples permisos usando OR
  return permisos.reduce((acc, permiso) => acc | permiso, Permisos.NINGUNO);
}

function verificarPermiso(permisos: Permisos, permisoRequerido: Permisos): boolean {
  return (permisos & permisoRequerido) === permisoRequerido;
}

function describirPermisos(permisos: Permisos): string {
  // Convierte permisos numéricos a descripción textual
  const descripciones: string[] = [];
  
  if (permisos & Permisos.LEER) descripciones.push("Leer");
  if (permisos & Permisos.ESCRIBIR) descripciones.push("Escribir");
  if (permisos & Permisos.EJECUTAR) descripciones.push("Ejecutar");
  if (permisos & Permisos.ELIMINAR) descripciones.push("Eliminar");
  if (permisos & Permisos.ADMINISTRAR) descripciones.push("Administrar");
  
  return descripciones.join(", ") || "Sin permisos";
}
```

---

## 🧪 Casos de Prueba

```typescript
// Casos de prueba para el sistema de permisos
const usuario1 = new Usuario("001", "Juan", "juan@example.com");

// Agregar permisos
usuario1.agregarPermiso(Permisos.ESCRIBIR);
usuario1.agregarPermiso(Permisos.EJECUTAR);

console.log(usuario1.tienePermiso(Permisos.LEER)); // true (por defecto)
console.log(usuario1.tienePermiso(Permisos.ESCRIBIR)); // true
console.log(usuario1.tienePermiso(Permisos.ELIMINAR)); // false

// Quitar permisos
usuario1.quitarPermiso(Permisos.EJECUTAR);
console.log(usuario1.tienePermiso(Permisos.EJECUTAR)); // false

// Combinar permisos
const permisosEditor = combinarPermisos(Permisos.LEER, Permisos.ESCRIBIR);
const permisosAdmin = combinarPermisos(Permisos.LEER, Permisos.ESCRIBIR, Permisos.ELIMINAR, Permisos.ADMINISTRAR);

const editor = new Usuario("002", "María", "maria@example.com", permisosEditor);
const admin = new Usuario("003", "Pedro", "pedro@example.com", permisosAdmin);

console.log("Permisos del editor:", editor.obtenerPermisosTexto());
console.log("Permisos del admin:", admin.obtenerPermisosTexto());

// Verificar permisos específicos
console.log(admin.tienePermiso(Permisos.ADMINISTRAR)); // true
console.log(editor.tienePermiso(Permisos.ADMINISTRAR)); // false
```

---

## 🏆 Criterios de Evaluación

- ✅ Enum con potencias de 2 correcto
- ✅ Operaciones bitwise implementadas
- ✅ Clase Usuario funcional
- ✅ Funciones auxiliares implementadas
- ✅ Casos de prueba funcionando

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../09-Notificaciones/01-Sistema_Notificaciones.md)
