# 3.1.1 Declaración y Expresiones

## 🎯 Objetivos

- Comprender las diferencias entre function declarations y expressions
- Dominar el tipado de arrow functions
- Implementar parámetros opcionales y por defecto
- Manejar rest parameters y spread operator con tipos

## 🧠 Fundamentos Teóricos

### ¿Por qué existen diferentes formas de declarar funciones?

JavaScript evolucionó a lo largo de décadas, y cada forma de declarar funciones resuelve problemas específicos:

1. **Function Declarations**: La forma original, con *hoisting* que permite flexibilidad organizacional
2. **Function Expressions**: Mayor control sobre cuándo la función está disponible
3. **Arrow Functions**: Sintaxis más concisa y comportamiento predecible del contexto `this`

TypeScript mantiene estas opciones pero agrega **type safety** a cada una, permitiendo que elijas la forma más apropiada para tu caso de uso sin sacrificar seguridad de tipos.

## 📚 Contenido

### Function Declarations vs Expressions

#### La Diferencia Fundamental: Hoisting

**Function Declarations** son completamente *hoisted* en JavaScript, lo que significa que están disponibles en todo el scope donde se declaran, incluso antes de la línea donde aparecen en el código.

**Function Expressions** no tienen hoisting completo - la variable existe pero es `undefined` hasta que se ejecuta la asignación.

**¿Por qué importa esto en TypeScript?**

- **Organización de código**: Las declarations permiten definir funciones auxiliares al final del archivo
- **Predictibilidad**: Las expressions garantizan que las dependencias estén claras y en orden
- **Debugging**: Las expressions son más fáciles de debuggear porque el flujo es lineal

#### Function Declarations

```typescript
// ✅ Esto funciona - puede llamarse antes de su definición
const resultado = suma(5, 3); // 8

// Function Declaration - Se puede llamar antes de su definición (hoisting)
function suma(a: number, b: number): number {
  return a + b;
}

// Tipado explícito del retorno para documentación y verificación
function saludar(nombre: string): string {
  return `Hola, ${nombre}!`;
}

// Función sin retorno explícito - TypeScript infiere 'void'
function log(mensaje: string): void {
  console.log(mensaje);
  // No retorna nada, o retorna undefined implícitamente
}
```

#### Function Expressions

Las function expressions ofrecen más control sobre cuándo y cómo se crean las funciones:

```typescript
// ❌ Esto fallaría - no se puede usar antes de la definición
// const resultado = multiplicar(5, 3); // ReferenceError

// Function Expression - Solo disponible después de la asignación
const multiplicar = function(a: number, b: number): number {
  return a * b;
};

// Function Expression con tipo explícito - útil para documentación
const dividir: (a: number, b: number) => number = function(a, b) {
  return a / b;
};

// Named function expression - útil para recursión y debugging
const factorial = function calcularFactorial(n: number): number {
  if (n <= 1) return 1;
  return n * calcularFactorial(n - 1); // Puede llamarse a sí misma por nombre
};
```

**¿Cuándo usar cada una?**

- **Declarations**: Para funciones principales y utilities que quieres que estén disponibles en todo el scope
- **Expressions**: Para asignaciones condicionales, callbacks y cuando quieres control explícito sobre el timing

### Arrow Functions con Tipos

#### La Revolución de ES6 en TypeScript

Las **Arrow Functions** introdujeron una sintaxis más concisa y, más importante, un comportamiento consistente del contexto `this`. En TypeScript, también proporcionan inferencia de tipos mejorada en muchas situaciones.

**Ventajas de Arrow Functions:**

1. **Sintaxis concisa**: Menos código para funciones simples
2. **Lexical this**: No necesita `.bind()` en muchos casos
3. **Mejor inferencia**: TypeScript puede inferir tipos más fácilmente en callbacks
4. **Consistency**: Comportamiento predecible en todos los contextos

#### Sintaxis Básica

```typescript
// Arrow function simple - TypeScript infiere el tipo de retorno
const restar = (a: number, b: number): number => a - b;

// Arrow function con bloque - útil para lógica más compleja
const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Arrow function sin parámetros - paréntesis obligatorios
const obtenerTimestamp = (): number => Date.now();

// Arrow function con un parámetro - paréntesis opcionales pero recomendados para consistencia
const duplicar = (n: number): number => n * 2;

// Arrow function que retorna objeto - necesita paréntesis para evitar ambigüedad
const crearUsuario = (nombre: string): { nombre: string; timestamp: number } => ({
  nombre,
  timestamp: Date.now()
});
```

#### Tipos de Función Explícitos

**¿Cuándo definir tipos explícitos para funciones?**

Los tipos explícitos son especialmente útiles cuando:

1. **Creamos contratos reutilizables**: El mismo tipo se usa en múltiples lugares
2. **Documentamos APIs públicas**: Los tipos actúan como documentación formal
3. **Forzamos consistencia**: Múltiples implementaciones deben seguir el mismo contrato
4. **Mejoramos IntelliSense**: El editor puede dar mejores sugerencias

```typescript
// Definiendo el tipo de función como contrato reutilizable
type OperacionMatematica = (a: number, b: number) => number;

// Ahora podemos usar este tipo en múltiples lugares
const operacion: OperacionMatematica = (x, y) => x + y;
const otraOperacion: OperacionMatematica = (x, y) => x * y;

// Usando interface para estructuras más complejas
interface Calculadora {
  sumar: (a: number, b: number) => number;
  restar: (a: number, b: number) => number;
  operacion?: (a: number, b: number) => number; // Opcional - puede no estar presente
  configurar?(modo: 'simple' | 'avanzado'): void; // Método opcional
}

const calc: Calculadora = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b
  // operacion y configurar son opcionales
};

// Ejemplo de función que acepta una Calculadora
function usarCalculadora(calc: Calculadora, a: number, b: number): number {
  return calc.sumar(a, b);
}
```

### Parámetros Opcionales y Por Defecto

#### La Filosofía del Diseño de APIs Flexibles

Los parámetros opcionales y por defecto representan un equilibrio fundamental en el diseño de APIs: **máxima flexibilidad con mínima complejidad**. En lugar de sobrecargar funciones o crear múltiples versiones, TypeScript nos permite crear una sola función que se adapta elegantemente a diferentes casos de uso.

#### Parámetros Opcionales: Flexibilidad Controlada

Los **parámetros opcionales** (`?`) le dicen a TypeScript: "Este parámetro puede no estar presente, pero si está, debe cumplir con el tipo especificado".

**¿Por qué es esto poderoso?**

1. **Evolución de APIs**: Puedes agregar nuevos parámetros sin romper código existente
2. **Configuraciones progresivas**: Los usuarios pueden especificar solo lo que necesitan
3. **Backwards compatibility**: Las funciones pueden crecer manteniendo compatibilidad

```typescript
// Parámetros opcionales (deben ir al final por sintaxis de JavaScript)
function saludar(nombre: string, apellido?: string): string {
  if (apellido) {
    return `Hola ${nombre} ${apellido}`;
  }
  return `Hola ${nombre}`;
}

// Flexibilidad en el uso
saludar('Juan');        // ✅ "Hola Juan"
saludar('Juan', 'Pérez'); // ✅ "Hola Juan Pérez"

// Múltiples parámetros opcionales para configuraciones complejas
function configurarConexion(
  host: string,              // Requerido - siempre necesario
  puerto?: number,           // Opcional - tiene valor por defecto sensato
  ssl?: boolean              // Opcional - comportamiento por defecto
): string {
  const puertoFinal = puerto ?? 80;
  const protocolo = ssl ? 'https' : 'http';
  return `${protocolo}://${host}:${puertoFinal}`;
}
```

#### Parámetros por Defecto: Valores Sensatos Automáticos

Los **parámetros por defecto** van un paso más allá: "Si no me das un valor, usaré este valor sensato". Esto elimina la necesidad de verificaciones manuales y hace el código más limpio.

**Ventajas clave:**

1. **Menos código**: No necesitas verificar `undefined` manualmente
2. **Valores sensatos**: Comportamiento predecible cuando se omiten valores
3. **Type inference**: TypeScript infiere automáticamente los tipos de los valores por defecto

```typescript
// Parámetros con valores por defecto - TypeScript infiere tipos automáticamente
function crearUsuario(
  nombre: string,
  edad: number = 18,          // Por defecto: mayoría de edad
  activo: boolean = true      // Por defecto: usuarios activos
): { nombre: string; edad: number; activo: boolean } {
  return { nombre, edad, activo };
}

// Ejemplos que muestran la flexibilidad
const usuario1 = crearUsuario('Ana');                    // edad: 18, activo: true
const usuario2 = crearUsuario('Carlos', 25);             // activo: true
const usuario3 = crearUsuario('Luis', 30, false);        // Todos especificados

// Valores por defecto con tipos complejos
function crearConfiguracion(
  nombre: string,
  opciones: { tema: string; idioma: string } = { tema: 'claro', idioma: 'es' }
): { nombre: string; opciones: { tema: string; idioma: string } } {
  return { nombre, opciones };
}
```

#### Combinando Estrategias: El Patrón de Configuración Progresiva

La verdadera potencia surge al combinar parámetros opcionales y por defecto, creando APIs que pueden ser simples para casos básicos pero flexibles para casos avanzados:

```typescript
// Patrón: Configuración progresiva
function configurarServidor(
  host: string,                    // Siempre requerido
  puerto?: number,                 // Opcional - se calculará automáticamente
  ssl: boolean = false,            // Por defecto - comportamiento seguro
  timeout: number = 5000           // Por defecto - valor sensato
): string {
  // Lógica inteligente: puerto por defecto depende de SSL
  const puertoFinal = puerto ?? (ssl ? 443 : 80);
  return `${ssl ? 'https' : 'http'}://${host}:${puertoFinal} (timeout: ${timeout}ms)`;
}

// Casos de uso que muestran la progresión de complejidad:
configurarServidor('localhost');                          // Caso simple
configurarServidor('example.com', 8080);                  // Puerto personalizado
configurarServidor('secure.com', undefined, true);        // HTTPS con puerto automático
configurarServidor('api.com', 3000, false, 10000);       // Control total
```

### Rest Parameters y Spread: Manejando Argumentos Variables

#### La Evolución de Arguments Variable

En JavaScript pre-ES6, manejar un número variable de argumentos requería usar el objeto `arguments`, que tenía varios problemas:

- No era type-safe
- No funcionaba con arrow functions
- No era un array real
- Comportamiento inconsistente

Los **Rest Parameters** (`...`) resuelven todos estos problemas proporcionando una forma type-safe y consistente de manejar argumentos variables.

#### Rest Parameters: Arrays Tipados Dinámicos

**¿Qué hace el operador rest?**

El operador rest (`...`) convierte argumentos variables en un array tipado, permitiendo que TypeScript:

1. **Verifique tipos**: Todos los argumentos adicionales deben ser del tipo especificado
2. **Proporcione IntelliSense**: El editor sabe que es un array y sugiere métodos apropiados
3. **Garantice consistencia**: Funciona igual en todas las formas de declarar funciones

```typescript
// Rest parameters básicos - agrupan argumentos en un array tipado
function sumarTodos(...numeros: number[]): number {
  // TypeScript sabe que 'numeros' es number[], así que tenemos todos los métodos de array
  return numeros.reduce((acc, num) => acc + num, 0);
}

// Combinando parámetros fijos con rest parameters
function log(nivel: string, ...mensajes: string[]): void {
  // El primer parámetro es fijo, el resto se agrupa en un array
  console.log(`[${nivel}]`, ...mensajes);
}

// Rest parameters genéricos para máxima reutilización
function combinarArrays<T>(...arrays: T[][]): T[] {
  // T se infiere del uso, permitiendo trabajar con cualquier tipo
  return arrays.flat();
}

// Ejemplos que demuestran la flexibilidad y type safety
const resultado = sumarTodos(1, 2, 3, 4, 5);           // ✅ 15
const resultadoVacio = sumarTodos();                    // ✅ 0 (array vacío)
// sumarTodos(1, 2, "3");                              // ❌ Error: string no es number

log('INFO', 'Usuario conectado', 'ID: 123', 'Timestamp: ' + Date.now());
const combinado = combinarArrays([1, 2], [3, 4], [5, 6]); // [1, 2, 3, 4, 5, 6]
```

#### Patrones Avanzados con Rest Parameters

Los rest parameters brillan en patrones de programación funcional y cuando necesitas APIs flexibles:

```typescript
// Rest parameters con destructuring de objetos
function procesarDatos(
  principal: string,
  ...resto: Array<{ id: number; valor: string }>
): { principal: string; items: typeof resto } {
  return {
    principal,
    items: resto
  };
}

// Uso que muestra la flexibilidad del tipado
const resultado = procesarDatos(
  'main',
  { id: 1, valor: 'a' },
  { id: 2, valor: 'b' },
  { id: 3, valor: 'c' }
);

// TypeScript sabe exactamente qué tipo retorna
console.log(resultado.principal);     // string
console.log(resultado.items[0].id);   // number
```

#### Spread Operator: De Arrays a Argumentos

El **spread operator** es el inverso del rest: convierte un array en argumentos individuales. Esto es especialmente útil cuando tienes datos en arrays pero necesitas pasarlos a funciones que esperan argumentos separados:

```typescript
// Función que espera argumentos separados
function multiplicarTres(a: number, b: number, c: number): number {
  return a * b * c;
}

// Datos en formato array
const numeros: [number, number, number] = [2, 3, 4];

// Spread convierte el array en argumentos individuales
const resultado = multiplicarTres(...numeros); // 24

// Especialmente útil con rest parameters
const palabras = ['Hola', 'mundo', 'TypeScript'];
const frase = concatenarStrings(' ', ...palabras); // "Hola mundo TypeScript"

function concatenarStrings(separador: string, ...strings: string[]): string {
  return strings.join(separador);
}
```

#### Type Safety en Acción

La combinación de rest parameters y spread operator con TypeScript proporciona verificación de tipos en tiempo de compilación que previene errores comunes:

```typescript
// Función que acepta múltiples callbacks
function ejecutarCallbacks<T>(valor: T, ...callbacks: Array<(x: T) => void>): void {
  callbacks.forEach(callback => callback(valor));
}

// Uso type-safe
const numero = 42;
ejecutarCallbacks(
  numero,
  (n) => console.log('Número:', n),     // TypeScript sabe que n es number
  (n) => console.log('Doble:', n * 2),  // Operaciones numéricas permitidas
  // (n) => console.log(n.toUpperCase()) // ❌ Error: number no tiene toUpperCase
);
```

}

const numeros: [number, number, number] = [2, 3, 4];
const resultado = multiplicarTres(...numeros); // 24

// Spread con rest parameters
function concatenarStrings(separador: string, ...strings: string[]): string {
  return strings.join(separador);
}

const palabras = ['Hola', 'mundo', 'TypeScript'];
const frase = concatenarStrings(' ', ...palabras); // "Hola mundo TypeScript"

```

### Patrones Avanzados

#### Union Types en Parámetros

```typescript
// Función que acepta diferentes tipos
function formatear(valor: string | number | boolean): string {
  if (typeof valor === 'string') {
    return valor.toUpperCase();
  }
  if (typeof valor === 'number') {
    return valor.toFixed(2);
  }
  return valor ? 'SÍ' : 'NO';
}

// Uso
console.log(formatear('hola')); // "HOLA"
console.log(formatear(3.14159)); // "3.14"
console.log(formatear(true)); // "SÍ"
```

#### Funciones con Conditional Types

```typescript
// Tipo condicional basado en parámetros
type ReturnType<T> = T extends string 
  ? string 
  : T extends number 
    ? number 
    : T extends boolean 
      ? boolean 
      : never;

function procesar<T extends string | number | boolean>(
  input: T
): ReturnType<T> {
  if (typeof input === 'string') {
    return input.toUpperCase() as ReturnType<T>;
  }
  if (typeof input === 'number') {
    return (input * 2) as ReturnType<T>;
  }
  return (!input) as ReturnType<T>;
}

// Uso type-safe
const stringResult = procesar('hello'); // string
const numberResult = procesar(42); // number
const booleanResult = procesar(true); // boolean
```

## 💡 Conceptos Clave

1. **Hoisting**: Function declarations vs expressions
2. **Type Inference**: TypeScript infiere tipos automáticamente
3. **Optional Parameters**: Flexibilidad en llamadas de función
4. **Rest Parameters**: Manejo de argumentos variables con tipo seguro

## 🔍 Casos de Uso Comunes

- **APIs flexibles** que aceptan diferentes combinaciones de parámetros
- **Funciones de utilidad** con comportamiento adaptativo
- **Event handlers** con parámetros variables
- **Configuración** con valores por defecto

## 🔗 Navegación

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| [3.1 Tipado de Funciones](01-tipado-funciones.md) | **3.1.1 Declaración y Expresiones** | [3.1.2 Overloads y Signatures](01-2-overloads-signatures.md) |

## ➡️ Siguiente Tema

Continúa con [3.1.2 Overloads y Signatures](01-2-overloads-signatures.md) para aprender sobre sobrecarga de funciones y firmas avanzadas.
