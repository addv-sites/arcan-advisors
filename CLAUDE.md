# CLAUDE.md — contexto operativo para este repo

Sitio corporativo estático de **Arcan Advisors**. Astro (`output: 'static'`) → GitHub Pages. Sin backend, sin Docker, sin pruebas unitarias (excepción explícita de este proyecto, ver `PROJECT_STATE.md`).

## Comandos

```bash
npm install
npm run dev       # servidor local
npm run build     # build de producción a dist/ — correr siempre antes de dar una fase por cerrada
npm run preview   # sirve el build de dist/ localmente
```

No hay `npm test` ni Docker en este proyecto — no los propongas ni los asumas.

## Arquitectura

- `astro.config.mjs` — `base: '/arcan-prototipo/'` mientras el sitio vive en `github.io/arcan-prototipo`. Cuando se conecte `www.arcanadvisors.com`: quitar `base`, cambiar `site`, agregar `public/CNAME`. Está comentado in-code.
- `src/styles/tokens.css` — variables CSS de marca (color/tipografía/spacing/radios). Fuente: Brand Book Arcan Advisors v1.0. **No modificar valores sin validar contra el brandbook.**
- `src/styles/global.css` — reset + utilidades base, importa `tokens.css`.
- `src/components/Logo.astro` — isólogo con 3 variantes (`principal` | `negativa` | `mono`) vía prop `variant`, y prop `markOnly` para isotipo solo. Es una reconstrucción SVG best-effort (sin vectorial fuente disponible) — ver gap en `PROJECT_STATE.md`.
- `src/data/site.js` — contacto real (email, WhatsApp, dirección) + `getWhatsAppLink()` para el formulario de contacto (sin backend, arma mensaje y abre WhatsApp).
- `src/layouts/BaseLayout.astro` — head base (Lato vía Google Fonts, meta viewport, skip link), importa `src/scripts/reveal.js`. SEO completo (JSON-LD, OG, sitemap) llega en Fase 4.
- `src/scripts/reveal.js` — animación emergente on-scroll vía `IntersectionObserver` sobre `[data-reveal]`. Progressive enhancement: el CSS solo oculta esos elementos si `<html>` tiene `.reveal-ready` (la agrega el propio script) — si el JS falla, el contenido queda visible por default.
- `src/components/Nav.astro` — sticky, glass **siempre** (no solo al hacer scroll — medido contra el MockUp), 5 secciones, menú móvil accesible (`aria-expanded`, cierre con Escape).
- `src/components/EnergyPattern.astro` — patrón de marca "Red de Energía" (líneas/puntos dorados), reusado en Hero y en la banda CTA del footer. No duplicarlo a mano si aparece en un tercer lugar.
- `src/components/sections/` — `Hero.astro`, `Nosotros.astro`, `Servicios.astro`, `Producto.astro`, `Contacto.astro`. Patrones compartidos (`.section`, `.cards-grid`, `.card`, `.banner`) viven en `global.css`, no se duplican por componente.
- `src/components/Footer.astro`, `src/components/WhatsAppFloat.astro` — footer y botón flotante, ambos fuera de `<main>` en `src/pages/index.astro`.
- `src/components/sections/Contacto.astro` — formulario sin backend, valida en cliente y arma el link de `getWhatsAppLink()` (`src/data/site.js`) al enviar. No navega ni limpia el form si falla validación — el usuario nunca pierde lo que escribió.
- `scripts/generate-icons.mjs` — genera favicons/apple-touch-icon/manifest icons/`og-image.png` reales (rasteriza el isólogo con `sharp`, ya en `node_modules` como dependencia de Astro). Correr `node scripts/generate-icons.mjs` de nuevo si el logo cambia.
- `src/layouts/BaseLayout.astro` — SEO completo: canonical, OG/Twitter, JSON-LD (Organization+ProfessionalService+ContactPoint) armado desde `SITE` (`src/data/site.js`), icons/manifest linkeados con `import.meta.env.BASE_URL` (nunca hardcodear `/algo`, ver regla 2).
- `public/robots.txt`, `public/sitemap.xml`, `public/manifest.webmanifest` — estáticos, no procesados por Astro. Tienen el `base` actual (`/arcan-prototipo/`) hardcodeado — ver lista de "4 lugares" en `PROJECT_STATE.md` para la fase post-aprobación de dominio.
- **Patrón de imagen opcional (Hero, Servicios):** el componente chequea `existsSync` en build-time sobre `public/images/.../archivo.webp` — si existe, `<img>` real; si no, fondo/placeholder de marca. Nunca un `<img src>` apuntando a un archivo que no existe. Al agregar una imagen nueva: **optimizarla primero** (WebP, `sharp`, ver `scripts/generate-icons.mjs` como referencia) — las que llegan del cliente pueden pesar 2-3MB sin comprimir y cuelgan el navegador.
- **`public/favicon-package/`** — favicon-package real que entregó el cliente (logo real, no el reconstruido). `scripts/generate-icons.mjs` lo convierte a los formatos/tamaños del sitio. Si el cliente entrega un paquete actualizado, reemplazar esta carpeta y volver a correr el script — no rediseñar el logo a mano.
- **Al comparar contra el MockUp con muestreo de píxeles: evitar texto/botones.** Ya pasó una vez — un muestreo cayó justo en el botón dorado del nav y en bordes de letras blancas, y eso se leyó como "transparencia" cuando en realidad eran artefactos de anti-aliasing/UI. Medir en huecos limpios del fondo, lejos de cualquier glifo o elemento sólido.
- **Nav sólida siempre, sin transparencia/glass** — corregido explícitamente por el cliente contra el `MockUp site.png`. No reintroducir `backdrop-filter`/transparencia en `Nav.astro` sin que lo pidan de nuevo.
- **Footer usa Forest Green, no Charcoal** — mismo criterio, corrección explícita del cliente comparando contra la paleta oficial (lámina "03. Sistema Visual").

## Reglas del protocolo (no negociables en este repo)

1. **Fidelidad de marca absoluta.** Colores, tipografía (Lato + Tahoma, no alternativas "similares"), copy institucional (Misión/Visión/Servicios/Producto) van literal desde el brandbook — no resumir, no reinterpretar, no inventar cifras sin confirmar.
2. **Compatibilidad GitHub Pages siempre.** Sin Node/backend en producción, rutas base-aware (`import.meta.env.BASE_URL` o `Astro.url`, nunca `href="/algo"` a mano), build real verificado antes de cerrar cualquier cambio.
3. **Fases con confirmación explícita.** No se implementa nada sin un "implementá fase N" del usuario. Plan/alternativas se presentan primero.
4. **No `git push` sin permiso explícito**, cada vez.
5. **`PROJECT_STATE.md` y este archivo se actualizan al cerrar cada fase** — no esperar al final del proyecto.
6. **`npm run build` real antes de reportar una fase como terminada** — no alcanza con que el dev server funcione.
7. **`npm audit` en 0 vulnerabilidades antes de cerrar una fase de verificación.** Astro está fijado en `^7.1.6` (subido desde 5.x en Fase 5 por 2 CVEs high) — no bajar la versión sin volver a auditar.
8. **Colores de marca no se tocan, pero dónde se usan como texto sí importa.** Gold (`#af932f`) falla AA como texto chico sobre fondos claros (2.98:1) — usarlo solo en fondos/bordes/íconos/texto grande (≥24px), nunca en labels/eyebrows chicos sobre blanco. Ver auditoría de contraste completa en `PROJECT_STATE.md`.

## Imágenes pendientes

Ver `IMAGENES_PENDIENTES.md` — prompts + ruta de destino exacta para la fotografía que falta (hero + 4 cards de servicios). No agregar `<img src>` sin el archivo real ya puesto en esa ruta.

## Dónde está la fuente de verdad de marca

`I:\Unidades compartidas\008 - Arcan Advisor\Proyectos\Pagina premium\ADDV Generado\Material\Branding\` — Brand Book v1.0, láminas 01-09 + `MockUp site.png`. Ante cualquier duda de diseño o copy, se resuelve ahí.

## Proyecto paralelo (solo referencia, no tocar)

`C:\Users\Antonio\Desktop\stitch_arcan_advisors_premium_site` — prototipo HTML/CSS/JS con el mismo remote de GitHub. No es el proyecto canónico, no se mergea ni se pushea desde ahí. Su tipografía (Montserrat/Source Sans) es incorrecta contra el brandbook real — no copiarla.
