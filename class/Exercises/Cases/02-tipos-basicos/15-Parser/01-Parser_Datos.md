# 🎯 Ejercicio 1: Parser de Datos con Type Narrowing

> Implementa un parser que maneje diferentes tipos de datos usando type narrowing

---

## 📋 Descripción

Implementa un parser que maneje diferentes tipos de datos usando type narrowing para procesar datos de entrada variados.

**Dificultad:** 🔴 Avanzado | **Tiempo:** 120 minutos

---

## 🎯 Objetivos

- Implementar type narrowing avanzado
- Crear un parser robusto para diferentes tipos
- Manejar validación de datos complejos
- Procesar arrays de datos heterogéneos

---

## 📋 Requerimientos

1. **Definir Tipos de Entrada:**
   - Manejar string, number, boolean, object, array, null
   - Validar formatos específicos

2. **Implementar Parser:**
   - Identificar tipos automáticamente
   - Validar formatos específicos
   - Convertir datos según el tipo

3. **Validadores Específicos:**
   - Email, URL, fechas, números
   - Validación de objetos complejos

---

## 💡 Estructura Base

```typescript
// Define tipos de datos de entrada
type DatoEntrada = string | number | boolean | object | null | undefined;

// Define tipos de salida
interface ResultadoParseo {
  tipo: "string" | "number" | "boolean" | "object" | "array" | "null" | "undefined" | "date" | "email" | "url";
  valor: any;
  valido: boolean;
  errores: string[];
  metadatos?: Record<string, any>;
}

interface ConfiguracionParser {
  validarEmail: boolean;
  validarURL: boolean;
  validarFecha: boolean;
  validarJSON: boolean;
  estricto: boolean;
}

class Parser {
  private configuracion: ConfiguracionParser;
  
  constructor(configuracion: Partial<ConfiguracionParser> = {}) {
    this.configuracion = {
      validarEmail: true,
      validarURL: true,
      validarFecha: true,
      validarJSON: true,
      estricto: false,
      ...configuracion
    };
  }
  
  // Implementa el parser principal
  parsearDato(dato: DatoEntrada): ResultadoParseo {
    const resultado: ResultadoParseo = {
      tipo: "null",
      valor: null,
      valido: false,
      errores: []
    };
    
    // Manejar null y undefined
    if (dato === null) {
      resultado.tipo = "null";
      resultado.valor = null;
      resultado.valido = true;
      return resultado;
    }
    
    if (dato === undefined) {
      resultado.tipo = "undefined";
      resultado.valor = undefined;
      resultado.valido = true;
      return resultado;
    }
    
    // Type narrowing para diferentes tipos
    if (typeof dato === "string") {
      return this.parsearString(dato);
    }
    
    if (typeof dato === "number") {
      return this.parsearNumero(dato);
    }
    
    if (typeof dato === "boolean") {
      return this.parsearBoolean(dato);
    }
    
    if (Array.isArray(dato)) {
      return this.parsearArray(dato);
    }
    
    if (typeof dato === "object") {
      return this.parsearObjeto(dato);
    }
    
    resultado.errores.push("Tipo de dato no reconocido");
    return resultado;
  }
  
  private parsearString(valor: string): ResultadoParseo {
    const resultado: ResultadoParseo = {
      tipo: "string",
      valor: valor,
      valido: true,
      errores: [],
      metadatos: {}
    };
    
    // Validar si es un email
    if (this.configuracion.validarEmail && this.esEmail(valor)) {
      resultado.tipo = "email";
      resultado.metadatos!.dominio = valor.split('@')[1];
    }
    
    // Validar si es una URL
    else if (this.configuracion.validarURL && this.esURL(valor)) {
      resultado.tipo = "url";
      try {
        const url = new URL(valor);
        resultado.metadatos!.protocolo = url.protocol;
        resultado.metadatos!.host = url.host;
      } catch (error) {
        resultado.errores.push("URL malformada");
      }
    }
    
    // Validar si es una fecha
    else if (this.configuracion.validarFecha && this.esFecha(valor)) {
      resultado.tipo = "date";
      const fecha = new Date(valor);
      if (isNaN(fecha.getTime())) {
        resultado.errores.push("Fecha inválida");
        resultado.valido = false;
      } else {
        resultado.valor = fecha;
        resultado.metadatos!.timestamp = fecha.getTime();
      }
    }
    
    // Validar si es JSON
    else if (this.configuracion.validarJSON && this.esJSON(valor)) {
      try {
        const objetoJSON = JSON.parse(valor);
        resultado.tipo = "object";
        resultado.valor = objetoJSON;
        resultado.metadatos!.esJSON = true;
      } catch (error) {
        resultado.errores.push("JSON inválido");
        resultado.valido = false;
      }
    }
    
    // Validaciones adicionales para string
    if (resultado.tipo === "string") {
      resultado.metadatos!.longitud = valor.length;
      resultado.metadatos!.vacio = valor.trim().length === 0;
      resultado.metadatos!.soloEspacios = valor.trim().length === 0 && valor.length > 0;
    }
    
    return resultado;
  }
  
  private parsearNumero(valor: number): ResultadoParseo {
    const resultado: ResultadoParseo = {
      tipo: "number",
      valor: valor,
      valido: true,
      errores: [],
      metadatos: {}
    };
    
    // Validaciones de número
    if (isNaN(valor)) {
      resultado.errores.push("Valor NaN");
      resultado.valido = false;
    }
    
    if (!isFinite(valor)) {
      resultado.errores.push("Valor infinito");
      resultado.valido = false;
    }
    
    resultado.metadatos!.esEntero = Number.isInteger(valor);
    resultado.metadatos!.esPositivo = valor > 0;
    resultado.metadatos!.esNegativo = valor < 0;
    resultado.metadatos!.esCero = valor === 0;
    
    return resultado;
  }
  
  private parsearBoolean(valor: boolean): ResultadoParseo {
    return {
      tipo: "boolean",
      valor: valor,
      valido: true,
      errores: [],
      metadatos: {
        esVerdadero: valor === true,
        esFalso: valor === false
      }
    };
  }
  
  private parsearArray(valor: any[]): ResultadoParseo {
    const resultado: ResultadoParseo = {
      tipo: "array",
      valor: valor,
      valido: true,
      errores: [],
      metadatos: {}
    };
    
    resultado.metadatos!.longitud = valor.length;
    resultado.metadatos!.vacio = valor.length === 0;
    
    // Analizar tipos de elementos
    const tiposElementos = new Set<string>();
    valor.forEach(elemento => {
      const tipoElemento = this.obtenerTipoBasico(elemento);
      tiposElementos.add(tipoElemento);
    });
    
    resultado.metadatos!.tiposElementos = Array.from(tiposElementos);
    resultado.metadatos!.homogeneo = tiposElementos.size <= 1;
    
    return resultado;
  }
  
  private parsearObjeto(valor: object): ResultadoParseo {
    const resultado: ResultadoParseo = {
      tipo: "object",
      valor: valor,
      valido: true,
      errores: [],
      metadatos: {}
    };
    
    // Analizar propiedades del objeto
    const propiedades = Object.keys(valor);
    resultado.metadatos!.propiedades = propiedades;
    resultado.metadatos!.numeroPropiedades = propiedades.length;
    resultado.metadatos!.vacio = propiedades.length === 0;
    
    return resultado;
  }
  
  private obtenerTipoBasico(valor: any): string {
    if (valor === null) return "null";
    if (valor === undefined) return "undefined";
    if (Array.isArray(valor)) return "array";
    return typeof valor;
  }
  
  // Validadores específicos
  private esEmail(valor: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(valor);
  }
  
  private esURL(valor: string): boolean {
    try {
      new URL(valor);
      return true;
    } catch {
      return false;
    }
  }
  
  private esFecha(valor: string): boolean {
    // Patrones comunes de fecha
    const patronesFecha = [
      /^\d{4}-\d{2}-\d{2}$/,  // YYYY-MM-DD
      /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
      /^\d{2}-\d{2}-\d{4}$/,  // DD-MM-YYYY
    ];
    
    return patronesFecha.some(patron => patron.test(valor)) || !isNaN(Date.parse(valor));
  }
  
  private esJSON(valor: string): boolean {
    try {
      JSON.parse(valor);
      return true;
    } catch {
      return false;
    }
  }
}

// Implementa funciones auxiliares
function parsearArray(datos: DatoEntrada[]): ResultadoParseo[] {
  const parser = new Parser();
  return datos.map(dato => parser.parsearDato(dato));
}

function agruparPorTipo(resultados: ResultadoParseo[]): Record<string, ResultadoParseo[]> {
  const agrupados: Record<string, ResultadoParseo[]> = {};
  
  resultados.forEach(resultado => {
    if (!agrupados[resultado.tipo]) {
      agrupados[resultado.tipo] = [];
    }
    agrupados[resultado.tipo].push(resultado);
  });
  
  return agrupados;
}

function obtenerEstadisticas(resultados: ResultadoParseo[]): Record<string, any> {
  const estadisticas = {
    total: resultados.length,
    validos: resultados.filter(r => r.valido).length,
    invalidos: resultados.filter(r => !r.valido).length,
    porTipo: {} as Record<string, number>,
    erroresComunes: {} as Record<string, number>
  };
  
  resultados.forEach(resultado => {
    // Contar por tipo
    estadisticas.porTipo[resultado.tipo] = (estadisticas.porTipo[resultado.tipo] || 0) + 1;
    
    // Contar errores comunes
    resultado.errores.forEach(error => {
      estadisticas.erroresComunes[error] = (estadisticas.erroresComunes[error] || 0) + 1;
    });
  });
  
  return estadisticas;
}

// Implementa validadores específicos
function validarEmail(texto: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(texto);
}

function validarNumero(valor: unknown): valor is number {
  return typeof valor === 'number' && !isNaN(valor) && isFinite(valor);
}

function validarFecha(valor: string): boolean {
  const fecha = new Date(valor);
  return !isNaN(fecha.getTime());
}

function validarJSON(valor: string): boolean {
  try {
    JSON.parse(valor);
    return true;
  } catch {
    return false;
  }
}
```

---

## 🧪 Casos de Prueba

```typescript
// Casos de prueba para el parser
const parser = new Parser({
  validarEmail: true,
  validarURL: true,
  validarFecha: true,
  validarJSON: true,
  estricto: false
});

const datosTest: DatoEntrada[] = [
  // Strings básicos
  "Hola mundo",
  "",
  "   ",
  
  // Emails
  "usuario@ejemplo.com",
  "correo-invalido",
  
  // URLs
  "https://www.ejemplo.com",
  "ftp://servidor.com/archivo.txt",
  "url-invalida",
  
  // Fechas
  "2024-01-15",
  "15/01/2024",
  "2024-01-15T10:30:00Z",
  "fecha-invalida",
  
  // JSON
  '{"nombre": "Juan", "edad": 30}',
  '[1, 2, 3, 4, 5]',
  '{"malformado": }',
  
  // Números
  42,
  3.14159,
  0,
  -100,
  NaN,
  Infinity,
  
  // Booleanos
  true,
  false,
  
  // Arrays
  [1, 2, 3],
  ["a", "b", "c"],
  [1, "texto", true, null],
  [],
  
  // Objetos
  { nombre: "Juan", edad: 30 },
  { propiedades: { anidada: "valor" } },
  {},
  
  // Null y undefined
  null,
  undefined,
];

// Parsear todos los datos
const resultados = parsearArray(datosTest);

// Mostrar resultados
console.log("=== RESULTADOS DEL PARSER ===");
resultados.forEach((resultado, indice) => {
  console.log(`\nDato ${indice + 1}:`, datosTest[indice]);
  console.log(`Tipo: ${resultado.tipo}`);
  console.log(`Válido: ${resultado.valido}`);
  if (resultado.errores.length > 0) {
    console.log(`Errores: ${resultado.errores.join(", ")}`);
  }
  if (resultado.metadatos && Object.keys(resultado.metadatos).length > 0) {
    console.log(`Metadatos:`, resultado.metadatos);
  }
});

// Agrupar por tipo
const agrupados = agruparPorTipo(resultados);
console.log("\n=== AGRUPACIÓN POR TIPO ===");
Object.entries(agrupados).forEach(([tipo, items]) => {
  console.log(`${tipo}: ${items.length} elementos`);
});

// Obtener estadísticas
const estadisticas = obtenerEstadisticas(resultados);
console.log("\n=== ESTADÍSTICAS ===");
console.log(`Total: ${estadisticas.total}`);
console.log(`Válidos: ${estadisticas.validos}`);
console.log(`Inválidos: ${estadisticas.invalidos}`);
console.log("Por tipo:", estadisticas.porTipo);
console.log("Errores comunes:", estadisticas.erroresComunes);

// Pruebas específicas
console.log("\n=== PRUEBAS ESPECÍFICAS ===");
console.log("¿Es email válido?", validarEmail("test@example.com"));
console.log("¿Es número válido?", validarNumero(42));
console.log("¿Es fecha válida?", validarFecha("2024-01-15"));
console.log("¿Es JSON válido?", validarJSON('{"test": true}'));
```

---

## 🏆 Criterios de Evaluación

- ✅ Type narrowing correctamente implementado
- ✅ Parser robusto para diferentes tipos
- ✅ Validación de formatos específicos
- ✅ Manejo de errores y metadatos
- ✅ Casos de prueba completos funcionando

---

[🔙 Volver al Módulo](../README.md) | [🏠 Inicio del Curso](../../../README.md)
