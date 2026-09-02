import { defineConfig } from 'astro/config';

// Detecta repo en CI (GITHUB_REPOSITORY lo setea Actions automáticamente).
// - DEV: addv-prototipos/arcan-prototipo -> site addv-prototipos.github.io, base /arcan-prototipo/
// - PROD: addv-sites/arcan-advisors       -> dominio propio www.arcanadvisors.com, sin base
// Local (sin env) cae en DEV, que es el `npm run dev` habitual.
const isProdRepo = process.env.GITHUB_REPOSITORY === 'addv-sites/arcan-advisors';

const site = isProdRepo ? 'https://www.arcanadvisors.com' : 'https://addv-prototipos.github.io';
const base = isProdRepo ? '/' : '/arcan-prototipo/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  output: 'static',
});
