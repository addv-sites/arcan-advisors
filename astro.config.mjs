import { defineConfig } from 'astro/config';

// Detecta repo en CI (GITHUB_REPOSITORY lo setea Actions automáticamente).
// - DEV: addv-prototipos/arcan-prototipo -> site addv-prototipos.github.io, base /arcan-prototipo/
// - PROD: addv-sites/arcan-advisors       -> site addv-sites.github.io,       base /arcan-advisors/
// Local (sin env) cae en DEV, que es el `npm run dev` habitual.
const isProdRepo = process.env.GITHUB_REPOSITORY === 'addv-sites/arcan-advisors';

const site = isProdRepo ? 'https://addv-sites.github.io' : 'https://addv-prototipos.github.io';
const base = isProdRepo ? '/arcan-advisors/' : '/arcan-prototipo/';

// FASE PRE-APROBACIÓN (dominio propio www.arcanadvisors.com):
//   1. Quitar `base` o poner '/' y cambiar `site` a 'https://www.arcanadvisors.com'.
//   2. Recrear public/CNAME con ese dominio.
//   3. Actualizar SITE.url en src/data/site.js y public/robots.txt/sitemap/manifest.
export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  output: 'static',
});
