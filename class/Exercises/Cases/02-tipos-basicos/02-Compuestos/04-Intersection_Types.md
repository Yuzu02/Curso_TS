# 🎯 Ejercicio 4: Intersection Types

> Aprende a combinar tipos usando Intersection Types (&)

---

## 📋 Descripción

Domina el uso de Intersection Types (&) para combinar múltiples tipos en uno solo.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 50 minutos

---

## 🎯 Objetivos

- Entender qué son los Intersection Types
- Combinar tipos de objetos
- Crear tipos complejos a partir de tipos simples
- Implementar mixins con Intersection Types

---

## 📋 Requerimientos

1. **Intersection Types Básicos:**
   - Combinar tipos de objetos
   - Crear tipos compuestos
   - Trabajar con propiedades combinadas

2. **Casos Prácticos:**
   - Mixins y composición
   - Extensión de tipos
   - Combinación de funcionalidades

---

## 💡 Estructura Base

```typescript
// 1. Define tipos base
type Persona = {
  nombre: string;
  edad: number;
};

type Trabajador = {
  empresa: string;
  puesto: string;
  salario: number;
};

type Estudiante = {
  escuela: string;
  carrera: string;
  semestre: number;
};

// 2. Crea Intersection Types
type PersonaTrabajadora = /* tu definición aquí */;
type PersonaEstudiante = /* tu definición aquí */;
type EstudianteTrabajador = /* tu definición aquí */;

// 3. Implementa funciones que usen Intersection Types
function crearPersonaTrabajadora(
  datosPersona: Persona,
  datosTrabajo: Trabajador
): PersonaTrabajadora {
  // Tu implementación aquí
}

function procesarPerfilCompleto(perfil: EstudianteTrabajador): string {
  // Tu implementación aquí
  // Usa todas las propiedades del intersection type
}

// 4. Mixins con Intersection Types
type ConTimestamp = {
  createdAt: Date;
  updatedAt: Date;
};

type ConID = {
  id: string;
};

type ConEstado = {
  activo: boolean;
};

// Combina estos tipos
type EntidadCompleta<T> = /* tu definición aquí */;

function crearEntidad<T>(data: T): EntidadCompleta<T> {
  // Tu implementación aquí
}

// 5. Intersection Types con funciones
type Logger = {
  log: (message: string) => void;
};

type Formatter = {
  format: (data: any) => string;
};

type LoggerFormateado = /* tu definición aquí */;

function crearLoggerFormateado(): LoggerFormateado {
  // Tu implementación aquí
}

// 6. Ejercicio práctico: Sistema de permisos
type PermisosLectura = {
  leer: boolean;
};

type PermisosEscritura = {
  escribir: boolean;
  editar: boolean;
};

type PermisosAdmin = {
  administrar: boolean;
  eliminar: boolean;
};

type PermisosCompletos = /* tu definición aquí */;
type PermisosEditor = /* tu definición aquí */;

function validarPermisos(permisos: PermisosCompletos, accion: string): boolean {
  // Tu implementación aquí
}

function crearPerfilEditor(): PermisosEditor {
  // Tu implementación aquí
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba tus implementaciones
const persona: Persona = { nombre: "Ana", edad: 25 };
const trabajador: Trabajador = { empresa: "TechCorp", puesto: "Developer", salario: 5000 };
const estudiante: Estudiante = { escuela: "Universidad", carrera: "Ingeniería", semestre: 6 };

const personaTrabajadora = crearPersonaTrabajadora(persona, trabajador);
console.log(personaTrabajadora);

const estudianteTrabajador: EstudianteTrabajador = {
  ...persona,
  ...trabajador,
  ...estudiante
};

console.log(procesarPerfilCompleto(estudianteTrabajador));

// Prueba entidades
const usuario = crearEntidad({ nombre: "Juan", email: "juan@example.com" });
console.log(usuario);

// Prueba logger
const logger = crearLoggerFormateado();
logger.log("Mensaje de prueba");
console.log(logger.format({ test: "data" }));

// Prueba permisos
const permisosCompletos: PermisosCompletos = {
  leer: true,
  escribir: true,
  editar: true,
  administrar: false,
  eliminar: false
};

console.log(validarPermisos(permisosCompletos, "escribir"));
console.log(crearPerfilEditor());
```

---

## 🏆 Criterios de Evaluación

- ✅ Intersection Types correctamente definidos
- ✅ Combinación de tipos funcionando
- ✅ Mixins implementados apropiadamente
- ✅ Funciones que usan tipos combinados
- ✅ Casos prácticos resueltos

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../../03-Inferencia/01-Inferencia_Inteligente.md)
