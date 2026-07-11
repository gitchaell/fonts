# Fuentes Favoritas de Michaell & Guía de Configuración Tipográfica

Este documento sirve como la **fuente de verdad única** para la integración y configuración de tipografías en los proyectos web de Michaell. Contiene las directrices de uso, enlaces a los recursos binarios y las configuraciones de estilos recomendadas (incluyendo configuraciones avanzadas de fuentes variables y OpenType).

---

## Directrices para Modelos de IA (System Prompt)

Si eres un modelo de IA leyendo este archivo para implementar o modificar estilos en un proyecto, debes seguir estas reglas estrictamente:

1. **Ubicación de Recursos:**
   - Descarga o copia los archivos `.woff2` desde las URLs proveídas y colócalos en `public/fonts/<nombre-de-la-fuente>/`.
   - Si el proyecto usa un framework como Astro, Next.js, o un servidor estático, asegúrate de que las rutas relativas de los recursos en los estilos comiencen con `/fonts/`.
2. **Definición CSS (@font-face):**
   - Crea un archivo CSS individual para cada fuente en `src/styles/fonts/<nombre-de-la-fuente>.css` usando la sintaxis `@font-face` con formato `woff2-variations` (para fuentes variables).
   - Importa estos archivos individuales en tu archivo CSS global (`global.css` o `main.css`).
3. **Configuración de Tailwind CSS:**
   - Si el proyecto utiliza Tailwind CSS, extiende la configuración (`tailwind.config.mjs` o `tailwind.config.js`) agregando las familias tipográficas mapeadas correspondientemente.
4. **Optimización OpenType:**
   - Al aplicar las fuentes en los estilos base, configura `font-variation-settings` y `font-feature-settings` con los valores de optimización provistos para cada fuente. Esto garantiza la correcta renderización de ligaduras, números tabulares y variantes estilísticas.

---

## Estructura Estándar de Archivos

Los proyectos deben estructurarse de la siguiente manera para mantener la consistencia en el manejo de tipografías locales:

```text
nombre-del-proyecto/
├── public/
│   └── fonts/
│       ├── space-grotesk/
│       │   └── SpaceGroteskVariable.woff2
│       ├── geist-sans/
│       │   └── GeistSansVariable.woff2
│       └── geist-mono/
│           └── GeistMonoVariable.woff2
└── src/
    ├── styles/
    │   ├── global.css          # Archivo de entrada global que importa los CSS de fuentes
    │   └── fonts/
    │       ├── space-grotesk.css
    │       ├── geist-sans.css
    │       └── geist-mono.css
```

---

## Catálogo de Fuentes y Configuración

### 1. Space Grotesk (Para Títulos y Headings)

Una tipografía sans-serif geométrica con un carácter fuerte y moderno, ideal para captar la atención en encabezados y elementos gráficos destacados.

- **Casos de Uso:** Encabezados (`h1`, `h2`, `h3`), hero sections, y textos de alta jerarquía visual.
- **Archivos y Recursos:**
  - **Archivo WOFF2 (Descarga):** [SpaceGroteskVariable.woff2](https://github.com/gitchaell/fonts/raw/refs/heads/main/public/fonts/space-grotesk/SpaceGroteskVariable.woff2)
  - **CSS fontface de referencia:** [space-grotesk.css](https://raw.githubusercontent.com/gitchaell/fonts/refs/heads/main/src/styles/fonts/space-grotesk.css)

#### Integración CSS

```css
/* Declaración (@font-face) */
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk/SpaceGroteskVariable.woff2') format('woff2-variations');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}

/* Ejemplo de uso recomendado */
.heading-primary {
  font-family: 'Space Grotesk', sans-serif;
  font-variation-settings: 'wght' 500;
  font-feature-settings: 
    'liga' 1,  /* Habilitar ligaduras estándar */
    'tnum' 1,  /* Números tabulares (monocastigados) */
    'zero' 1,  /* Cero barrado */
    'salt' 1,  /* Alternativas estilísticas */
    'ss05' 1;  /* Conjunto estilístico 5 */
}
```

---

### 2. Geist Sans (Para Párrafos y Cuerpo de Texto)

Diseñada por Vercel, es una tipografía sans-serif optimizada para legibilidad extrema en interfaces de usuario y lecturas prolongadas.

- **Casos de Uso:** Cuerpo de texto (`p`), etiquetas de UI, botones, menús de navegación y contenido general.
- **Archivos y Recursos:**
  - **Archivo WOFF2 (Descarga):** [GeistSansVariable.woff2](https://github.com/gitchaell/fonts/raw/refs/heads/main/public/fonts/geist-sans/GeistSansVariable.woff2)
  - **CSS fontface de referencia:** [geist-sans.css](https://raw.githubusercontent.com/gitchaell/fonts/refs/heads/main/src/styles/fonts/geist-sans.css)

#### Integración CSS

```css
/* Declaración (@font-face) */
@font-face {
  font-family: 'Geist Sans';
  src: url('/fonts/geist-sans/GeistSansVariable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

/* Aplicación global en el cuerpo del documento */
body {
  font-family: 'Geist Sans', sans-serif;
  font-variation-settings: 'wght' 400;
  font-feature-settings: 
    'liga' 1,  /* Habilitar ligaduras estándar */
    'dlig' 1,  /* Ligaduras discrecionales */
    'tnum' 1,  /* Números tabulares */
    'ss02' 1,  /* Conjunto estilístico 2 */
    'ss05' 1,  /* Conjunto estilístico 5 */
    'ss09' 1;  /* Conjunto estilístico 9 */
}
```

---

### 3. Geist Mono (Para Código, Fechas y Datos Numéricos)

Una fuente monoespaciada de alta precisión, diseñada específicamente para pantallas de código y elementos de UI que requieren un espaciado regular de caracteres.

- **Casos de Uso:** Bloques de código (`pre`, `code`), comandos de terminal, fechas, tablas financieras y datos estructurados de ancho constante.
- **Archivos y Recursos:**
  - **Archivo WOFF2 (Descarga):** [GeistMonoVariable.woff2](https://github.com/gitchaell/fonts/raw/refs/heads/main/public/fonts/geist-mono/GeistMonoVariable.woff2)
  - **CSS fontface de referencia:** [geist-mono.css](https://raw.githubusercontent.com/gitchaell/fonts/refs/heads/main/src/styles/fonts/geist-mono.css)

#### Integración CSS

```css
/* Declaración (@font-face) */
@font-face {
  font-family: 'Geist Mono';
  src: url('/fonts/geist-mono/GeistMonoVariable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

/* Aplicación en elementos de texto con ancho fijo */
code, pre, .mono-text {
  font-family: 'Geist Mono', monospace;
  font-variation-settings: 'wght' 400;
  font-feature-settings: 
    'liga' 1,  /* Ligaduras básicas de programación */
    'ss02' 1,  /* Conjunto estilístico 2 */
    'ss03' 1;  /* Conjunto estilístico 3 */
}
```

---

## Configuración en Frameworks y Herramientas

### A. Integración con Tailwind CSS (v4+)

En Tailwind CSS v4 la configuración se realiza de forma declarativa directamente dentro de tu archivo CSS utilizando la directiva `@theme`. Ya no se requiere un archivo de configuración de Javascript (`tailwind.config.js` o `tailwind.config.mjs`).

Agrega las definiciones de las fuentes dentro del bloque `@theme`:

```css
@import "tailwindcss";

@theme {
  /* Sobrescribe la familia sans por defecto (utilidad font-sans) */
  --font-sans: "Geist Sans", sans-serif;

  /* Sobrescribe la familia mono por defecto (utilidad font-mono) */
  --font-mono: "Geist Mono", monospace;

  /* Registra una nueva utilidad personalizada (utilidad font-display) */
  --font-display: "Space Grotesk", sans-serif;
}
```

> [!NOTE]
> En Tailwind CSS v4, cualquier propiedad personalizada CSS definida bajo `@theme` usando el prefijo `--font-` se mapeará automáticamente a una clase de utilidad tipo `font-*` (por ejemplo, `font-display`).

---

### B. Carga en CSS Global (`src/styles/global.css`)

Para centralizar las tipografías en el bundle final de la aplicación, importa los estilos individuales en el punto de entrada de CSS de tu aplicación:

```css
/* Importar declaraciones de fuentes individuales */
@import "./fonts/geist-sans.css";
@import "./fonts/geist-mono.css";
@import "./fonts/space-grotesk.css";

/* Estilos base del documento */
@layer base {
  body {
    font-family: 'Geist Sans', sans-serif;
    font-variation-settings: 'wght' 400;
    font-feature-settings: 'liga' 1, 'dlig' 1, 'tnum' 1, 'ss02' 1, 'ss05' 1, 'ss09' 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', sans-serif;
    font-variation-settings: 'wght' 600; /* Peso semi-bold por defecto para títulos */
    font-feature-settings: 'liga' 1, 'tnum' 1, 'zero' 1, 'salt' 1, 'ss05' 1;
  }

  code, pre {
    font-family: 'Geist Mono', monospace;
    font-variation-settings: 'wght' 400;
    font-feature-settings: 'liga' 1, 'ss02' 1, 'ss03' 1;
  }
}
```
