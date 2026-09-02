# Arcan Advisors — sitio corporativo

Sitio estático (Astro) de Arcan Advisors, consultora en inteligencia energética (México y Latinoamérica). Desplegado en GitHub Pages, sin backend.

## Requisitos previos

- [Node.js](https://nodejs.org) 20 o superior
- npm (viene con Node)

No hace falta Docker ni base de datos — el sitio compila a HTML/CSS/JS estático.

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Abre `http://localhost:4321/arcan-prototipo/` (el prefijo `/arcan-prototipo/` es el `base` configurado en `astro.config.mjs` mientras el sitio vive en `github.io/arcan-prototipo` — ver sección "Deploy" abajo).

## Build de producción

```bash
npm run build
```

Genera el sitio estático en `dist/`. Correr esto siempre antes de dar un cambio por terminado — el dev server no garantiza que el build de producción funcione igual.

Para revisar el build localmente antes de publicar:

```bash
npm run preview
```

## Deploy — GitHub Pages

El deploy es automático vía GitHub Actions (`.github/workflows/deploy.yml`, se agrega en una fase posterior): cada push a `main` dispara build + publicación en GitHub Pages.

**Fase actual (pre-aprobación de dominio):** el sitio publica en `https://addv-prototipos.github.io/arcan-prototipo/`.

**Cuando el cliente apruebe y se conecte `www.arcanadvisors.com`**, hay que tocar 4 lugares (comentados in-code con "FASE PRE-APROBACIÓN"):
1. Quitar `base` de `astro.config.mjs`.
2. Cambiar `site` en `astro.config.mjs` a `https://www.arcanadvisors.com`.
3. Crear `public/CNAME` con ese dominio.
4. Actualizar `SITE.url` en `src/data/site.js`.

## Estructura del proyecto

```
src/
  components/    componentes Astro reutilizables (Logo, cards, etc.)
  layouts/       layout base (head, SEO, skip link)
  pages/         rutas del sitio (index.astro = home)
  data/          datos centralizados (contacto, helper de WhatsApp)
  styles/        tokens.css (variables de marca) + global.css
public/          assets estáticos servidos tal cual (favicons, imágenes, CNAME cuando aplique)
```

## Estado del proyecto y contexto de marca

Ver `PROJECT_STATE.md` (qué fase está hecha, qué falta, decisiones tomadas) y `CLAUDE.md` (convenciones y reglas del proyecto).
