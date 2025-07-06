# 🔧 Ejercicios Módulo 2: Tipos Básicos

> Ejercicios prácticos para dominar el sistema de tipos de TypeScript

---

## 📋 Tabla de Contenidos

| # | Ejercicio | Tema | Dificultad | Tiempo |
|---|-----------|------|------------|--------|
| **1** | **Tipos Primitivos** | | | |
| 1.1 | [Validación Tipos Primitivos](./01-Primitivos/01-Validacion_Tipos_Primitivos.md) | string, number, boolean, bigint, symbol | 🟢 Principiante | 45 min |
| 1.2 | [Void y Never](./01-Primitivos/02-Void_Never.md) | Tipos especiales void y never | 🟢 Principiante | 30 min |
| 1.3 | [Unknown y Any](./01-Primitivos/03-Unknown_Any.md) | Tipos de escape y seguridad | 🟡 Intermedio | 40 min |
| **2** | **Tipos Compuestos** | | | |
| 2.1 | [Arrays y Tuplas](./02-Compuestos/01-Arrays_Tuplas.md) | Arrays tipados y tuplas | 🟢 Principiante | 40 min |
| 2.2 | [Interfaces y Objetos](./02-Compuestos/02-Interfaces_Objetos.md) | Interfaces y objetos tipados | 🟡 Intermedio | 50 min |
| 2.3 | [Union Types](./02-Compuestos/03-Union_Types.md) | Tipos unión | 🟡 Intermedio | 45 min |
| 2.4 | [Intersection Types](./02-Compuestos/04-Intersection_Types.md) | Tipos intersección | 🟡 Intermedio | 45 min |
| 2.5 | [Gestión de Usuarios](./02-Compuestos/05-Gestion_Usuarios.md) | Sistema CRUD con tipos | 🟡 Intermedio | 60 min |
| **3** | **Inferencia de Tipos** | | | |
| 3.1 | [Inferencia Inteligente](./03-Inferencia/01-Inferencia_Inteligente.md) | Type inference y código limpio | 🟡 Intermedio | 45 min |
| **4** | **Tipos Literales** | | | |
| 4.1 | [String Literals](./04-Literales/01-String_Literals.md) | Tipos literales de cadena | 🟡 Intermedio | 35 min |
| 4.2 | [Number y Boolean Literals](./04-Literales/02-Number_Boolean_Literals.md) | Tipos literales numéricos y booleanos | 🟡 Intermedio | 35 min |
| 4.3 | [Template Literal Types](./04-Literales/03-Template_Literal_Types.md) | Tipos de plantillas literales | 🔴 Avanzado | 50 min |
| **5** | **Enumeraciones** | | | |
| 5.1 | [Numeric Enums](./05-Enums/01-Numeric_Enums.md) | Enumeraciones numéricas | 🟢 Principiante | 30 min |
| 5.2 | [String Enums](./05-Enums/02-String_Enums.md) | Enumeraciones de cadena | 🟢 Principiante | 30 min |
| 5.3 | [Const Enums](./05-Enums/03-Const_Enums.md) | Enumeraciones constantes | 🟡 Intermedio | 35 min |
| 5.4 | [Enums vs Union Types](./05-Enums/04-Enums_vs_Union_Types.md) | Comparación y casos de uso | 🟡 Intermedio | 40 min |
| **6** | **Type Assertions y Guards** | | | |
| 6.1 | [Type Assertions](./06-Type_Assertions/01-Type_Assertions.md) | Aserciones de tipo | 🟡 Intermedio | 40 min |
| 6.2 | [Type Guards](./06-Type_Assertions/02-Type_Guards.md) | Guardas de tipo | 🟡 Intermedio | 45 min |
| 6.3 | [Typeof e Instanceof](./06-Type_Assertions/03-Typeof_Instanceof.md) | Operadores de tipo | 🟡 Intermedio | 40 min |
| 6.4 | [Discriminated Unions](./06-Type_Assertions/04-Discriminated_Unions.md) | Uniones discriminadas | 🔴 Avanzado | 55 min |
| **7** | **Sistemas Prácticos** | | | |
| 7.1 | [Sistema de Rutas](./07-Rutas_literal/01-Sistema_Rutas.md) | Routing con tipos literales | 🟡 Intermedio | 60 min |
| 7.2 | [Sistema de Estilos CSS](./08-Estilos_css/01-Sistema_Estilos.md) | CSS tipado con template literals | 🔴 Avanzado | 75 min |
| 7.3 | [Sistema de Tema](./09-Sistema_tema/01-Sistema_Tema.md) | Temas con tipos literales | 🟡 Intermedio | 60 min |
| 7.4 | [Estados de Pedido](./10-Estados_pedido/01-Estados_Pedido.md) | State machine con enums | 🟡 Intermedio | 75 min |
| 7.5 | [Sistema de Permisos](./11-Permisos/01-Sistema_Permisos.md) | Permisos con operaciones bitwise | 🔴 Avanzado | 90 min |
| 7.6 | [Sistema de Notificaciones](./12-Notificaciones/01-Sistema_Notificaciones.md) | Categorización con enums | 🟡 Intermedio | 60 min |
| **8** | **Conceptos Avanzados** | | | |
| 8.1 | [Sistema de Validación](./13-Validacion/01-Sistema_Validacion.md) | Validación con type guards | 🔴 Avanzado | 90 min |
| 8.2 | [State Machine](./14-State_machine/01-State_Machine.md) | Máquina de estados compleja | 🔴 Avanzado | 105 min |
| 8.3 | [Parser de Datos](./15-Parser/01-Parser_Datos.md) | Parser con type narrowing | 🔴 Avanzado | 120 min |

---

## 🎯 Objetivos del Módulo

Al completar estos ejercicios, serás capaz de:

### 🎯 Conceptos Fundamentales

- ✅ Dominar todos los tipos primitivos de TypeScript
- ✅ Trabajar con tipos compuestos: arrays, tuplas, interfaces
- ✅ Entender y aplicar union e intersection types
- ✅ Manejar tipos opcionales y null safety

### 🎯 Conceptos Intermedios

- ✅ Utilizar tipos literales y template literals efectivamente
- ✅ Implementar enumeraciones para diferentes casos de uso
- ✅ Aplicar type guards y type assertions correctamente
- ✅ Trabajar con discriminated unions

### 🎯 Conceptos Avanzados

- ✅ Implementar sistemas complejos con tipado estricto
- ✅ Crear parsers y validadores robustos
- ✅ Diseñar máquinas de estado con tipos
- ✅ Aplicar inferencia de tipos avanzada

---

## 🚀 Cómo Empezar

### 📋 Prerrequisitos

- Completar los ejercicios del Módulo 1 (Introducción)
- Tener TypeScript configurado en tu entorno
- Editor con soporte para TypeScript (VS Code recomendado)

### 📈 Progreso Recomendado

#### 📅 Semana 1: Fundamentos (Ejercicios 1-3)

- **Día 1-2:** Tipos Primitivos (1.1-1.3)
- **Día 3-5:** Tipos Compuestos (2.1-2.5)
- **Día 6:** Inferencia de Tipos (3.1)

#### 📅 Semana 2: Tipos Avanzados (Ejercicios 4-6)

- **Día 1-2:** Tipos Literales (4.1-4.3)
- **Día 3-4:** Enumeraciones (5.1-5.4)
- **Día 5-7:** Type Assertions y Guards (6.1-6.4)

#### 📅 Semana 3: Sistemas Prácticos (Ejercicios 7)

- **Día 1:** Sistema de Rutas (7.1)
- **Día 2-3:** Sistema de Estilos CSS (7.2)
- **Día 4:** Sistema de Tema (7.3)
- **Día 5-6:** Estados de Pedido (7.4)
- **Día 7:** Sistema de Permisos (7.5)

#### 📅 Semana 4: Conceptos Avanzados (Ejercicios 8)

- **Día 1-2:** Sistema de Validación (8.1)
- **Día 3-4:** State Machine (8.2)
- **Día 5-7:** Parser de Datos (8.3)

### 🎯 Metodología de Estudio

1. **Lee el ejercicio completo** antes de comenzar
2. **Entiende los objetivos** y casos de uso
3. **Implementa paso a paso** siguiendo las instrucciones
4. **Prueba tu código** con los casos de prueba
5. **Experimenta** con variaciones y casos límite
6. **Revisa la solución** para comparar enfoques

---

## 📊 Estadísticas del Módulo

### 📈 Métricas Generales

- **Total de ejercicios:** 29
- **Tiempo estimado:** 22-25 horas
- **Conceptos cubiertos:** 40+
- **Proyectos prácticos:** 8

### 📊 Distribución por Dificultad

- 🟢 **Principiante:** 7 ejercicios (24%)
- 🟡 **Intermedio:** 16 ejercicios (55%)
- 🔴 **Avanzado:** 6 ejercicios (21%)

### 📊 Distribución por Tiempo

- ⚡ **Rápidos (< 45 min):** 13 ejercicios
- 🏃 **Medianos (45-75 min):** 10 ejercicios
- 🎯 **Largos (75+ min):** 6 ejercicios

---

## 🗂️ Estructura de Carpetas

```
02-tipos-basicos/
├── 01-Primitivos/           # Tipos primitivos básicos
│   ├── 01-Validacion_Tipos_Primitivos.md
│   ├── 02-Void_Never.md
│   └── 03-Unknown_Any.md
├── 02-Compuestos/           # Tipos compuestos
│   ├── 01-Arrays_Tuplas.md
│   ├── 02-Interfaces_Objetos.md
│   ├── 03-Union_Types.md
│   ├── 04-Intersection_Types.md
│   └── 05-Gestion_Usuarios.md
├── 03-Inferencia/           # Inferencia de tipos
│   └── 01-Inferencia_Inteligente.md
├── 04-Literales/            # Tipos literales
│   ├── 01-String_Literals.md
│   ├── 02-Number_Boolean_Literals.md
│   └── 03-Template_Literal_Types.md
├── 05-Enums/                # Enumeraciones
│   ├── 01-Numeric_Enums.md
│   ├── 02-String_Enums.md
│   ├── 03-Const_Enums.md
│   └── 04-Enums_vs_Union_Types.md
├── 06-Type_Assertions/      # Type assertions y guards
│   ├── 01-Type_Assertions.md
│   ├── 02-Type_Guards.md
│   ├── 03-Typeof_Instanceof.md
│   └── 04-Discriminated_Unions.md
├── 07-Rutas_literal/        # Sistema de rutas
│   └── 01-Sistema_Rutas.md
├── 08-Estilos_css/          # Sistema de estilos CSS
│   └── 01-Sistema_Estilos.md
├── 09-Sistema_tema/         # Sistema de tema
│   └── 01-Sistema_Tema.md
├── 10-Estados_pedido/       # Estados de pedido
│   └── 01-Estados_Pedido.md
├── 11-Permisos/             # Sistema de permisos
│   └── 01-Sistema_Permisos.md
├── 12-Notificaciones/       # Sistema de notificaciones
│   └── 01-Sistema_Notificaciones.md
├── 13-Validacion/           # Sistema de validación
│   └── 01-Sistema_Validacion.md
├── 14-State_machine/        # Máquina de estados
│   └── 01-State_Machine.md
├── 15-Parser/               # Parser de datos
│   └── 01-Parser_Datos.md
└── README.md                # Este archivo
```

---

## 🎓 Conceptos Cubiertos

### � Tipos Básicos

- **Primitivos:** string, number, boolean, bigint, symbol
- **Especiales:** void, never, unknown, any
- **Compuestos:** arrays, tuplas, interfaces, objetos

### 📚 Tipos Avanzados

- **Literales:** string, number, boolean, template literals
- **Enumeraciones:** numeric, string, const enums
- **Uniones:** union types, intersection types
- **Discriminated unions:** pattern matching

### � Type Safety

- **Type guards:** typeof, instanceof, user-defined
- **Type assertions:** as, angle bracket syntax
- **Narrowing:** control flow analysis
- **Validation:** runtime type checking

### � Sistemas Prácticos

- **Routing:** literal types para rutas
- **Theming:** sistemas de tema tipados
- **State management:** máquinas de estado
- **Data parsing:** validación y transformación

---

## 🔗 Enlaces Útiles

- [📚 Volver al índice de ejercicios](../README.md)
- [🏠 README principal del curso](../../../README.md)
- [📖 Contenido teórico del módulo](../../Modules/Tipos/README.md)
- [✅ Ver soluciones](../../Solutions/02-tipos-basicos/)

---

## 🤝 Contribuir

¿Tienes ideas para mejorar los ejercicios? ¡Contribuye!

1. **Fork el repositorio**
2. **Crea tu solución** en `Solutions/02-tipos-basicos/contributors/tu-nombre/`
3. **Añade mejoras** a los ejercicios existentes
4. **Envía un Pull Request**

### � Guías de Contribución

- Mantén la estructura de carpetas existente
- Sigue el formato de README establecido
- Incluye casos de prueba en tus soluciones
- Documenta cualquier dependencia adicional

---

## 🏆 Logros y Certificaciones

### 🥉 Bronce: Fundamentos

- Completar ejercicios 1-3 (Tipos básicos)
- Tiempo objetivo: 1 semana

### 🥈 Plata: Intermedio

- Completar ejercicios 1-6 (Hasta type assertions)
- Tiempo objetivo: 2 semanas

### 🥇 Oro: Avanzado

- Completar ejercicios 1-7 (Sistemas prácticos)
- Tiempo objetivo: 3 semanas

### 💎 Diamante: Experto

- Completar todos los ejercicios (1-8)
- Tiempo objetivo: 4 semanas
- Implementar al menos 2 variaciones propias

---

## 📞 Soporte

¿Necesitas ayuda? Aquí tienes opciones:

1. **Revisa la documentación** de cada ejercicio
2. **Consulta las soluciones** en la carpeta Solutions
3. **Busca en los issues** del repositorio
4. **Crea un issue** si encuentras un problema

---

## 🎯 Próximos Pasos

Una vez completes este módulo, estarás listo para:

- **Módulo 3:** Funciones y Métodos Avanzados
- **Módulo 4:** Programación Orientada a Objetos
- **Módulo 5:** Genéricos y Utility Types
- **Módulo 6:** Modules y Namespaces

---

**💡 Tip Final:** Los tipos en TypeScript son la base de todo lo demás. Invertir tiempo en dominar estos conceptos te dará una ventaja enorme en los módulos más avanzados. ¡No te apresures y practica mucho!

---

**🏁 ¡Comienza tu viaje hacia la maestría en TypeScript!** 🚀
