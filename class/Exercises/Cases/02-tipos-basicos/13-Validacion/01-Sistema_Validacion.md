# 🎯 Ejercicio 1: Sistema de Validación con Type Guards

> Implementa un sistema de validación usando type guards y narrowing

---

## 📋 Descripción

Implementa un sistema de validación usando type guards para validar diferentes tipos de datos de forma segura.

**Dificultad:** 🔴 Avanzado | **Tiempo:** 90 minutos

---

## 🎯 Objetivos

- Implementar type guards personalizados
- Usar narrowing para validación de tipos
- Crear un sistema de validación robusto
- Manejar datos de entrada desconocidos

---

## 📋 Requerimientos

1. **Definir Interfaces:**
   - `Usuario`: con propiedades específicas
   - `Producto`: con propiedades específicas

2. **Implementar Type Guards:**
   - Guards para cada tipo de dato
   - Validación de propiedades requeridas
   - Manejo de tipos opcionales

3. **Sistema de Validación:**
   - Procesar datos desconocidos
   - Separar por tipo de dato
   - Reportar errores de validación

---

## 💡 Estructura Base

```typescript
// Define estas interfaces
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad?: number;
  activo?: boolean;
}

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  disponible?: boolean;
}

interface ResultadoValidacion<T> {
  esValido: boolean;
  dato?: T;
  errores: string[];
}

// Implementa type guards
function esUsuario(obj: unknown): obj is Usuario {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  
  const usuario = obj as Record<string, unknown>;
  
  // Validar propiedades requeridas
  if (typeof usuario.id !== 'number' || 
      typeof usuario.nombre !== 'string' || 
      typeof usuario.email !== 'string') {
    return false;
  }
  
  // Validar propiedades opcionales
  if (usuario.edad !== undefined && typeof usuario.edad !== 'number') {
    return false;
  }
  
  if (usuario.activo !== undefined && typeof usuario.activo !== 'boolean') {
    return false;
  }
  
  return true;
}

function esProducto(obj: unknown): obj is Producto {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  
  const producto = obj as Record<string, unknown>;
  
  // Validar propiedades requeridas
  if (typeof producto.id !== 'string' || 
      typeof producto.nombre !== 'string' || 
      typeof producto.precio !== 'number' || 
      typeof producto.categoria !== 'string') {
    return false;
  }
  
  // Validar propiedades opcionales
  if (producto.disponible !== undefined && typeof producto.disponible !== 'boolean') {
    return false;
  }
  
  return true;
}

function esArray(obj: unknown): obj is unknown[] {
  return Array.isArray(obj);
}

function esString(obj: unknown): obj is string {
  return typeof obj === 'string';
}

function esNumber(obj: unknown): obj is number {
  return typeof obj === 'number' && !isNaN(obj);
}

function esBoolean(obj: unknown): obj is boolean {
  return typeof obj === 'boolean';
}

// Implementa funciones de validación
function validarUsuario(obj: unknown): ResultadoValidacion<Usuario> {
  const resultado: ResultadoValidacion<Usuario> = {
    esValido: false,
    errores: []
  };
  
  if (!esUsuario(obj)) {
    resultado.errores.push("El objeto no es un usuario válido");
    return resultado;
  }
  
  // Validaciones adicionales
  if (obj.id <= 0) {
    resultado.errores.push("El ID debe ser mayor a 0");
  }
  
  if (obj.nombre.trim().length === 0) {
    resultado.errores.push("El nombre no puede estar vacío");
  }
  
  if (!validarEmail(obj.email)) {
    resultado.errores.push("El email no tiene un formato válido");
  }
  
  if (obj.edad !== undefined && (obj.edad < 0 || obj.edad > 150)) {
    resultado.errores.push("La edad debe estar entre 0 y 150 años");
  }
  
  if (resultado.errores.length === 0) {
    resultado.esValido = true;
    resultado.dato = obj;
  }
  
  return resultado;
}

function validarProducto(obj: unknown): ResultadoValidacion<Producto> {
  const resultado: ResultadoValidacion<Producto> = {
    esValido: false,
    errores: []
  };
  
  if (!esProducto(obj)) {
    resultado.errores.push("El objeto no es un producto válido");
    return resultado;
  }
  
  // Validaciones adicionales
  if (obj.id.trim().length === 0) {
    resultado.errores.push("El ID no puede estar vacío");
  }
  
  if (obj.nombre.trim().length === 0) {
    resultado.errores.push("El nombre no puede estar vacío");
  }
  
  if (obj.precio <= 0) {
    resultado.errores.push("El precio debe ser mayor a 0");
  }
  
  if (obj.categoria.trim().length === 0) {
    resultado.errores.push("La categoría no puede estar vacía");
  }
  
  if (resultado.errores.length === 0) {
    resultado.esValido = true;
    resultado.dato = obj;
  }
  
  return resultado;
}

function validarDatos(data: unknown): Usuario | Producto | null {
  if (esUsuario(data)) {
    const resultado = validarUsuario(data);
    return resultado.esValido ? resultado.dato! : null;
  }
  
  if (esProducto(data)) {
    const resultado = validarProducto(data);
    return resultado.esValido ? resultado.dato! : null;
  }
  
  return null;
}

function procesarDatos(data: unknown[]): { usuarios: Usuario[]; productos: Producto[]; invalidos: unknown[] } {
  const resultado = {
    usuarios: [] as Usuario[],
    productos: [] as Producto[],
    invalidos: [] as unknown[]
  };
  
  data.forEach(item => {
    if (esUsuario(item)) {
      const validacion = validarUsuario(item);
      if (validacion.esValido) {
        resultado.usuarios.push(validacion.dato!);
      } else {
        resultado.invalidos.push(item);
      }
    } else if (esProducto(item)) {
      const validacion = validarProducto(item);
      if (validacion.esValido) {
        resultado.productos.push(validacion.dato!);
      } else {
        resultado.invalidos.push(item);
      }
    } else {
      resultado.invalidos.push(item);
    }
  });
  
  return resultado;
}

// Implementa validadores específicos
function validarEmail(texto: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(texto);
}

function validarNumero(valor: unknown): valor is number {
  return typeof valor === 'number' && !isNaN(valor) && isFinite(valor);
}

function validarTextoNoVacio(valor: unknown): valor is string {
  return typeof valor === 'string' && valor.trim().length > 0;
}

function validarRango(valor: number, min: number, max: number): boolean {
  return valor >= min && valor <= max;
}

// Función auxiliar para obtener el tipo de un valor
function obtenerTipo(valor: unknown): string {
  if (valor === null) return 'null';
  if (Array.isArray(valor)) return 'array';
  if (valor instanceof Date) return 'date';
  return typeof valor;
}
```

---

## 🧪 Casos de Prueba

```typescript
// Casos de prueba para el sistema de validación
const datosTest: unknown[] = [
  // Usuarios válidos
  { id: 1, nombre: "Juan", email: "juan@example.com", edad: 25 },
  { id: 2, nombre: "María", email: "maria@example.com" },
  
  // Productos válidos
  { id: "PROD-001", nombre: "Laptop", precio: 999.99, categoria: "Electrónicos" },
  { id: "PROD-002", nombre: "Mouse", precio: 29.99, categoria: "Accesorios", disponible: true },
  
  // Datos inválidos
  { id: "invalid", nombre: "Usuario", email: "invalid-email" }, // Usuario con email inválido
  { id: "", nombre: "Producto", precio: -10, categoria: "Test" }, // Producto con precio negativo
  { id: 0, nombre: "", email: "test@example.com" }, // Usuario con nombre vacío
  "texto simple", // No es objeto
  null, // Null
  undefined, // Undefined
  123, // Número simple
];

// Procesar todos los datos
const resultado = procesarDatos(datosTest);

console.log("Usuarios válidos:", resultado.usuarios);
console.log("Productos válidos:", resultado.productos);
console.log("Datos inválidos:", resultado.invalidos);

// Validar datos individuales
const usuarioTest = { id: 1, nombre: "Test", email: "test@example.com", edad: 30 };
const validacionUsuario = validarUsuario(usuarioTest);
console.log("Validación usuario:", validacionUsuario);

const productoTest = { id: "TEST-001", nombre: "Producto Test", precio: 50, categoria: "Test" };
const validacionProducto = validarProducto(productoTest);
console.log("Validación producto:", validacionProducto);

// Pruebas con datos inválidos
const usuarioInvalido = { id: -1, nombre: "", email: "invalid-email" };
const validacionInvalida = validarUsuario(usuarioInvalido);
console.log("Validación inválida:", validacionInvalida);
```

---

## 🏆 Criterios de Evaluación

- ✅ Type guards correctamente implementados
- ✅ Validación robusta de datos
- ✅ Manejo de casos límite
- ✅ Separación correcta de tipos
- ✅ Mensajes de error descriptivos

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../011-State_machine/01-State_Machine.md)
