import { defineConfig } from 'astro/config';

// FASE PRE-APROBACIÓN: publica en https://addv-prototipos.github.io/arcan-prototipo/
// Cuando el cliente apruebe y se conecte www.arcanadvisors.com:
//   1. Quitar `base` de este archivo.
//   2. Cambiar `site` a 'https://www.arcanadvisors.com'.
//   3. Recrear public/CNAME con ese dominio.
//   4. Actualizar SITE.url en src/data/site.js y public/robots.txt.
export default defineConfig({
  site: 'https://addv-prototipos.github.io',
  base: '/arcan-prototipo/',
  trailingSlash: 'ignore',
  output: 'static',
});
