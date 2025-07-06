# 🎯 Ejercicio 2: Interfaces y Objetos

> Domina las interfaces básicas y tipos de objetos en TypeScript

---

## 📋 Descripción

Aprende a definir interfaces básicas y trabajar con tipos de objetos de manera efectiva.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 50 minutos

---

## 🎯 Objetivos

- Definir interfaces básicas
- Trabajar con propiedades opcionales
- Implementar índice de propiedades
- Extender interfaces

---

## 📋 Requerimientos

1. **Interfaces Básicas:**
   - Definir propiedades requeridas y opcionales
   - Usar readonly properties
   - Implementar métodos en interfaces

2. **Objetos Complejos:**
   - Objetos anidados
   - Index signatures
   - Herencia de interfaces

---

## 💡 Estructura Base

```typescript
// 1. Interfaces básicas
interface Usuario {
  // Define las propiedades básicas de un usuario
  // id (requerido), nombre (requerido), email (requerido), edad (opcional)
}

interface Producto {
  // Define las propiedades de un producto
  // id (requerido), nombre (requerido), precio (requerido), descripcion (opcional)
}

// 2. Propiedades readonly
interface ConfiguracionApp {
  // Define propiedades readonly para configuración
  // nombre, version, ambiente
}

// 3. Interfaces con métodos
interface Calculadora {
  // Define métodos para operaciones básicas
  // sumar, restar, multiplicar, dividir
}

class CalculadoraBasica implements Calculadora {
  // Tu implementación aquí
}

// 4. Interfaces anidadas
interface Direccion {
  // Define propiedades de dirección
  // calle, ciudad, codigoPostal, pais
}

interface Empresa {
  // Define propiedades de empresa
  // nombre, direccion (usando la interfaz Direccion), telefono
}

// 5. Index signatures
interface Diccionario {
  // Define un diccionario que acepta cualquier string como clave
  // y devuelve un string como valor
}

interface Configuracion {
  // Define configuración con propiedades conocidas y desconocidas
  // nombre (requerido), version (requerido)
  // y cualquier otra propiedad como string
}

// 6. Herencia de interfaces
interface Animal {
  // Define propiedades básicas de un animal
  // nombre, edad
}

interface Mamifero extends Animal {
  // Extiende Animal y agrega propiedades específicas
  // tipoSangre, tienePelo
}

interface Perro extends Mamifero {
  // Extiende Mamifero y agrega propiedades específicas
  // raza, color
}

// 7. Ejercicio práctico: Sistema de biblioteca
interface Autor {
  // Define propiedades de autor
}

interface Libro {
  // Define propiedades de libro
  // incluye uno o más autores
}

interface Biblioteca {
  // Define propiedades de biblioteca
  // incluye colección de libros
}

class GestorBiblioteca {
  private biblioteca: Biblioteca;

  constructor(nombre: string) {
    // Tu implementación aquí
  }

  agregarLibro(libro: Libro): void {
    // Tu implementación aquí
  }

  buscarPorAutor(nombreAutor: string): Libro[] {
    // Tu implementación aquí
  }

  buscarPorTitulo(titulo: string): Libro | undefined {
    // Tu implementación aquí
  }
}

// 8. Tipos de objetos inline
function procesarUsuario(usuario: { id: number; nombre: string; activo?: boolean }): void {
  // Tu implementación aquí
}

function crearReporte(datos: { 
  titulo: string; 
  contenido: string; 
  metadata: { autor: string; fecha: Date } 
}): string {
  // Tu implementación aquí
}

// 9. Propiedades computadas
interface FormularioContacto {
  [key: `campo_${string}`]: string;
  nombre: string;
  email: string;
}

function validarFormulario(formulario: FormularioContacto): boolean {
  // Tu implementación aquí
  // Valida que nombre y email no estén vacíos
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba interfaces básicas
const usuario: Usuario = {
  id: 1,
  nombre: "Juan Pérez",
  email: "juan@example.com",
  edad: 30
};

const producto: Producto = {
  id: "PROD-001",
  nombre: "Laptop",
  precio: 999.99,
  descripcion: "Laptop de alta gama"
};

// Prueba calculadora
const calc = new CalculadoraBasica();
console.log(calc.sumar(5, 3)); // 8
console.log(calc.dividir(10, 2)); // 5

// Prueba objetos anidados
const empresa: Empresa = {
  nombre: "Tech Corp",
  direccion: {
    calle: "Av. Principal 123",
    ciudad: "Buenos Aires",
    codigoPostal: "1000",
    pais: "Argentina"
  },
  telefono: "+54 11 1234-5678"
};

// Prueba biblioteca
const biblioteca = new GestorBiblioteca("Biblioteca Central");
biblioteca.agregarLibro({
  titulo: "El Quijote",
  isbn: "978-84-376-0494-7",
  autores: [{ nombre: "Miguel de Cervantes", nacionalidad: "España" }],
  anioPublicacion: 1605
});

const librosQuijote = biblioteca.buscarPorTitulo("El Quijote");
console.log(librosQuijote);

// Prueba formulario
const formulario: FormularioContacto = {
  nombre: "Ana García",
  email: "ana@example.com",
  campo_telefono: "+54 11 9876-5432",
  campo_empresa: "Mi Empresa S.A."
};

console.log(validarFormulario(formulario));
```

---

## 🏆 Criterios de Evaluación

- ✅ Interfaces correctamente definidas
- ✅ Propiedades opcionales y readonly
- ✅ Index signatures implementadas
- ✅ Herencia de interfaces funcional
- ✅ Objetos anidados manejados correctamente

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](03-Funciones_Tipadas.md)
