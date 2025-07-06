# 🎯 Ejercicio 5: Sistema de Gestión de Usuarios

> Implementa un sistema de gestión de usuarios con interfaces, arrays y funciones tipadas

---

## 📋 Descripción

Implementa un sistema de gestión de usuarios con interfaces, arrays y funciones tipadas.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 60 minutos

---

## 🎯 Objetivos

- Definir interfaces para modelar datos complejos
- Trabajar con arrays tipados
- Implementar funciones con parámetros y retornos tipados
- Manejar operaciones CRUD básicas

---

## 📋 Requerimientos

1. **Definir Interfaces:**
   - `User`: id, nombre, email, edad opcional
   - `UserWithMetadata`: extiende User con fechas de creación/actualización
   - `UserFilters`: filtros para búsqueda

2. **Implementar Funciones:**
   - `createUser`: crear nuevo usuario
   - `getUserById`: buscar por ID
   - `updateUser`: actualizar usuario existente
   - `deleteUser`: eliminar usuario
   - `filterUsers`: filtrar usuarios por criterios

3. **Manejo de Arrays:**
   - Lista de usuarios tipada
   - Operaciones de búsqueda y filtrado
   - Validación de datos

---

## 💡 Estructura Base

```typescript
interface User {
  // Define la estructura del usuario
}

interface UserWithMetadata extends User {
  // Añade metadatos
}

interface UserFilters {
  // Define filtros de búsqueda
}

// Implementa las funciones del sistema
function createUser(userData: Omit<User, 'id'>): User {
  // Tu implementación
}

function getUserById(users: User[], id: number): User | undefined {
  // Tu implementación
}

function updateUser(users: User[], id: number, updates: Partial<User>): User | null {
  // Tu implementación
}

function deleteUser(users: User[], id: number): boolean {
  // Tu implementación
}

function filterUsers(users: User[], filters: UserFilters): User[] {
  // Tu implementación
}
```

---

## 🧪 Casos de Prueba

```typescript
const users: User[] = [
  { id: 1, nombre: "Juan", email: "juan@example.com", edad: 25 },
  { id: 2, nombre: "María", email: "maria@example.com" },
  { id: 3, nombre: "Pedro", email: "pedro@example.com", edad: 30 },
];

// Prueba todas las funciones con estos datos
```

---

## 🏆 Criterios de Evaluación

- ✅ Interfaces bien definidas
- ✅ Funciones correctamente tipadas
- ✅ Manejo apropiado de arrays
- ✅ Validaciones de datos
- ✅ Casos de prueba funcionando

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../03-Inferencia/01-Inferencia_Inteligente.md)
