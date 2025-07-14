# 🎯 Ejercicio 3.1.2: Validador de Formularios

## 📋 Descripción

Desarrolla un sistema de validación de formularios que utilice parámetros opcionales, function overloads y tipado estricto para validar diferentes tipos de campos de forma robusta y type-safe.

## 🎯 Objetivos

- Implementar funciones de validación con parámetros opcionales
- Usar function overloads para diferentes tipos de validación
- Crear interfaces para reglas de validación tipadas
- Manejar errores de validación de forma estructurada

## 📊 Dificultad: 🟡 Intermedio

**Tiempo estimado:** 25 minutos

## 📝 Requisitos

### 1. Tipos Base

```typescript
interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

interface ValidationError {
  field: string;
  message: string;
  code: string;
}

interface FieldConfig {
  name: string;
  type: 'text' | 'email' | 'password' | 'number';
  rules: ValidationRule;
}
```

### 2. Funciones de Validación

Implementa las siguientes funciones con overloads:

```typescript
// Overload para validar un campo individual
function validate(value: string, rules: ValidationRule): ValidationError[];
function validate(value: number, rules: ValidationRule): ValidationError[];

// Overload para validar múltiples campos
function validate(data: Record<string, any>, config: FieldConfig[]): ValidationError[];

// Validadores específicos
function validateEmail(email: string, required?: boolean): ValidationError[];
function validatePassword(password: string, minLength?: number, requireSpecial?: boolean): ValidationError[];
function validateAge(age: number, min?: number, max?: number): ValidationError[];
```

### 3. Utilidades de Formulario

```typescript
// Función para crear configuración de campo
function createFieldConfig(
  name: string,
  type: FieldConfig['type'],
  rules?: Partial<ValidationRule>
): FieldConfig;

// Función para formatear errores
function formatErrors(errors: ValidationError[]): string;
function formatErrors(errors: ValidationError[], asHTML: true): string;

// Función para verificar si hay errores
function hasErrors(errors: ValidationError[]): boolean;
function getErrorsByField(errors: ValidationError[], field: string): ValidationError[];
```

## 💡 Estructura Base para Implementar

```typescript
// TODO: Implementa las interfaces base
interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string) => boolean;
  // TODO: Agrega más propiedades según necesites
}

interface ValidationError {
  field: string;
  message: string;
  code: string;
}

interface FieldConfig {
  name: string;
  type: 'text' | 'email' | 'number' | 'password';
  rules: ValidationRule;
}

// TODO: Implementa las funciones de validación con overloads
function validate(value: string, rules: ValidationRule): ValidationError[];
function validate(value: number, rules: ValidationRule): ValidationError[];
function validate(data: Record<string, any>, config: FieldConfig[]): ValidationError[];
function validate(valueOrData: any, rulesOrConfig: any): ValidationError[] {
  // TODO: Implementa la lógica usando type guards
  // Tip: Verifica el tipo de parámetros para determinar qué validación usar
  // Tip: Usa Array.isArray() para distinguir entre config individual y múltiple
}

// TODO: Implementa validadores específicos
function validateEmail(email: string, required?: boolean): ValidationError[] {
  // TODO: Validación de email con regex
  // Tip: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

function validatePassword(password: string, minLength = 8, requireSpecial = false): ValidationError[] {
  // TODO: Validación de contraseña
  // Tip: Verifica longitud y caracteres especiales si es requerido
}

// TODO: Implementa el resto de funciones siguiendo el mismo patrón
```

## 🧪 Casos de Prueba

### Caso 1: Validación Individual

```typescript
// Validar campo de texto
const textErrors = validate("Juan", { required: true, minLength: 2, maxLength: 50 });
console.log(textErrors); // []

const textErrors2 = validate("", { required: true });
console.log(textErrors2); // [{ field: "field", message: "Field is required", code: "REQUIRED" }]

// Validar número
const numberErrors = validate(25, { required: true });
console.log(numberErrors); // []
```

### Caso 2: Validación de Formulario

```typescript
const formConfig: FieldConfig[] = [
  createFieldConfig("name", "text", { required: true, minLength: 2 }),
  createFieldConfig("email", "email", { required: true }),
  createFieldConfig("age", "number", { required: true })
];

const formData = {
  name: "Juan Pérez",
  email: "juan@email.com",
  age: 25
};

const formErrors = validate(formData, formConfig);
console.log(formErrors); // []

const invalidData = {
  name: "",
  email: "invalid-email",
  age: -5
};

const invalidErrors = validate(invalidData, formConfig);
console.log(invalidErrors.length > 0); // true
```

### Caso 3: Validadores Específicos

```typescript
// Email
const emailErrors = validateEmail("test@example.com");
console.log(emailErrors); // []

const emailErrors2 = validateEmail("invalid-email");
console.log(emailErrors2.length > 0); // true

// Password
const passErrors = validatePassword("SecurePass123!", 8, true);
console.log(passErrors); // []

const passErrors2 = validatePassword("123", 8);
console.log(passErrors2.length > 0); // true

// Age
const ageErrors = validateAge(25, 18, 65);
console.log(ageErrors); // []

const ageErrors2 = validateAge(16, 18);
console.log(ageErrors2.length > 0); // true
```

## ✅ Criterios de Evaluación

- [ ] **Function Overloads**: Implementación correcta de múltiples signatures
- [ ] **Parámetros Opcionales**: Uso apropiado de parámetros opcionales con defaults
- [ ] **Type Safety**: Tipos estrictos sin uso de `any`
- [ ] **Interfaces**: Diseño apropiado de interfaces para datos estructurados
- [ ] **Validaciones**: Implementación completa de todas las reglas de validación
- [ ] **Error Handling**: Manejo consistente y tipado de errores

## 🎓 Puntos de Aprendizaje

1. **Function Overloads**: Cómo crear múltiples signatures para flexibilidad
2. **Optional Parameters**: Parámetros opcionales con valores por defecto
3. **Interface Design**: Estructuración de datos con interfaces
4. **Type Guards**: Distinción entre tipos en runtime
5. **Regular Expressions**: Validación de patrones con regex en TypeScript

## 🗂️ Recursos

- [Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)
- [Optional Parameters](https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters)
- [Interface vs Type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

## 🗂️ Archivos a Crear

```text
02-Validador_Formularios/
├── solution.ts          # Tu implementación aquí
├── types.ts            # Interfaces y tipos
└── tests.ts            # Casos de prueba (opcional)
```

---

## 🧭 Navegación

[⬅️ Ejercicio Anterior](01-Calculadora_Tipada.md) | [📚 Índice](../README.md) | [➡️ Ejercicio Siguiente](03-Parser_Comandos.md)

---

💡 **Tip**: Empieza definiendo las interfaces y luego implementa los overloads. Usa type guards para distinguir entre validación individual y múltiple.
