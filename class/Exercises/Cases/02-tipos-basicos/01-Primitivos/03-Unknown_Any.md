# 🎯 Ejercicio 3: Unknown vs Any

> Aprende cuándo usar `unknown` y cuándo evitar `any`

---

## 📋 Descripción

Explora las diferencias entre `unknown` y `any`, entendiendo cuándo usar cada uno y por qué `unknown` es más seguro.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 45 minutos

---

## 🎯 Objetivos

- Entender la diferencia entre `unknown` y `any`
- Saber cuándo usar `unknown` en lugar de `any`
- Implementar type guards para trabajar con `unknown`
- Entender los riesgos de `any`

---

## 📋 Requerimientos

1. **Trabajar con Unknown:**
   - Recibir datos de tipo unknown
   - Validar antes de usar
   - Implementar type guards

2. **Comparar con Any:**
   - Mostrar los riesgos de any
   - Migrar de any a unknown
   - Implementar validaciones seguras

---

## 💡 Estructura Base

```typescript
// 1. Funciones que reciben unknown
function procesarDatoDesconocido(dato: unknown): string {
  // Tu implementación aquí
  // Pista: necesitas validar el tipo antes de usarlo
}

function validarYProcesar(valor: unknown): boolean {
  // Tu implementación aquí
  // Valida si el valor es un número positivo
}

// 2. Comparación any vs unknown
function funcionInsegura(dato: any): void {
  // Esta función usa any - muestra por qué es peligroso
  console.log(dato.toUpperCase()); // ¿Qué pasa si dato no es string?
  console.log(dato.length); // ¿Qué pasa si dato no tiene length?
}

function funcionSegura(dato: unknown): void {
  // Tu implementación aquí
  // Convierte la función anterior para usar unknown de forma segura
}

// 3. Type guards para unknown
function esString(valor: unknown): valor is string {
  // Tu implementación aquí
}

function esNumero(valor: unknown): valor is number {
  // Tu implementación aquí
}

function esObjeto(valor: unknown): valor is object {
  // Tu implementación aquí
}

// 4. Ejercicio práctico: Parser JSON seguro
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

function parseUsuarioSeguro(jsonString: string): Usuario | null {
  try {
    const parsed: unknown = JSON.parse(jsonString);
    
    // Tu implementación aquí
    // Valida que parsed sea un Usuario válido
    
    return null; // Placeholder
  } catch {
    return null;
  }
}

// 5. Migración de any a unknown
class ApiClient {
  // Función original con any (insegura)
  private procesarRespuestaAny(response: any): void {
    console.log(response.data.items.length);
    response.data.items.forEach((item: any) => {
      console.log(item.name.toUpperCase());
    });
  }

  // Tu implementación aquí
  // Convierte la función anterior para usar unknown de forma segura
  procesarRespuestaSegura(response: unknown): void {
    // Tu implementación aquí
  }
}
```

---

## 🧪 Casos de Prueba

```typescript
// Prueba tus implementaciones
const datos: unknown[] = [
  "hello world",
  42,
  true,
  { id: 1, nombre: "Juan", email: "juan@example.com" },
  null,
  undefined,
  [1, 2, 3],
];

// Prueba procesarDatoDesconocido
datos.forEach(dato => {
  console.log(procesarDatoDesconocido(dato));
});

// Prueba el parser JSON
const jsonValido = '{"id": 1, "nombre": "Juan", "email": "juan@example.com"}';
const jsonInvalido = '{"id": "no-es-numero", "nombre": "Juan"}';

console.log(parseUsuarioSeguro(jsonValido));
console.log(parseUsuarioSeguro(jsonInvalido));

// Prueba API client
const apiClient = new ApiClient();
const respuestaApi = {
  data: {
    items: [
      { name: "Item 1" },
      { name: "Item 2" }
    ]
  }
};

apiClient.procesarRespuestaSegura(respuestaApi);
```

---

## 🏆 Criterios de Evaluación

- ✅ Uso correcto de unknown vs any
- ✅ Type guards implementados
- ✅ Validaciones antes de usar unknown
- ✅ Migración segura de any a unknown

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../02-Compuestos/01-Arrays_Tuplas.md)
