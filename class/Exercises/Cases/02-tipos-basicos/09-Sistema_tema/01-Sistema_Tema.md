# 🎯 Ejercicio 1: Sistema de Tema con Literales

> Implementa un sistema de temas usando literal types y template literals

---

## 📋 Descripción

Implementa un sistema de temas usando literal types para crear configuraciones tipadas.

**Dificultad:** 🟡 Intermedio | **Tiempo:** 60 minutos

---

## 🎯 Objetivos

- Crear tipos literales para configuraciones
- Usar template literals para generar claves
- Implementar un sistema de temas completo
- Manejar configuraciones tipadas

---

## 📋 Requerimientos

1. **Definir Tipos Base:**
   - `TemaColor`: claro, oscuro, auto
   - `TamañoFuente`: pequeño, mediano, grande
   - `Idioma`: es, en, fr

2. **Sistema de Configuración:**
   - Claves de configuración con template literals
   - Funciones para aplicar y validar temas
   - Persistencia de configuración

---

## 💡 Estructura Base

```typescript
// Define estos tipos
type TemaColor = "claro" | "oscuro" | "auto";
type TamañoFuente = "pequeño" | "mediano" | "grande";
type Idioma = "es" | "en" | "fr";

// Usa template literals para crear claves de configuración
type ClaveConfiguracion = `${TemaColor}-${TamañoFuente}-${Idioma}`;

interface ConfiguracionTema {
  tema: TemaColor;
  tamañoFuente: TamañoFuente;
  idioma: Idioma;
  clave: ClaveConfiguracion;
}

interface ColoresTema {
  fondo: string;
  texto: string;
  accent: string;
  border: string;
}

interface ConfiguracionCompleta extends ConfiguracionTema {
  colores: ColoresTema;
  fuentes: Record<TamañoFuente, string>;
  textos: Record<string, string>;
}

// Implementa funciones para manejar la configuración
function crearConfiguracion(
  tema: TemaColor,
  tamañoFuente: TamañoFuente,
  idioma: Idioma
): ConfiguracionTema {
  // Tu implementación
}

function aplicarTema(configuracion: ConfiguracionTema): void {
  // Tu implementación
}

function validarConfiguracion(configuracion: unknown): configuracion is ConfiguracionTema {
  // Tu implementación
}

function obtenerColores(tema: TemaColor): ColoresTema {
  // Tu implementación
}

function obtenerTextos(idioma: Idioma): Record<string, string> {
  // Tu implementación
}
```

---

## 🧪 Casos de Prueba

```typescript
// Casos de prueba para configuraciones válidas
const configuraciones: ConfiguracionTema[] = [
  crearConfiguracion("claro", "mediano", "es"),
  crearConfiguracion("oscuro", "grande", "en"),
  crearConfiguracion("auto", "pequeño", "fr"),
];

// Prueba aplicación de temas
configuraciones.forEach(config => {
  console.log(`Aplicando tema: ${config.clave}`);
  aplicarTema(config);
});

// Prueba validación
const configInvalida = { tema: "invalid", tamañoFuente: "xl", idioma: "es" };
console.log(validarConfiguracion(configInvalida)); // false

// Prueba colores por tema
const coloresClaro = obtenerColores("claro");
const coloresOscuro = obtenerColores("oscuro");
console.log({ coloresClaro, coloresOscuro });
```

---

## 🏆 Criterios de Evaluación

- ✅ Tipos literales correctamente definidos
- ✅ Template literal types para claves
- ✅ Sistema de temas funcional
- ✅ Validación de configuraciones
- ✅ Casos de prueba funcionando

---

[🔙 Volver al Módulo](../README.md) | [➡️ Siguiente Ejercicio](../07-Estados_pedido/01-Estados_Pedido.md)
