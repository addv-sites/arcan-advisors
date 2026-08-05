# Estado del proyecto — Arcan Advisors

Última actualización: 2026-08-05 (cierre Fase 5)

**Nota de identidad:** este proyecto es el sitio del cliente **Arcan Advisors**. No tiene relación con "ADDV" (agencia propia de quien lo desarrolla) — ninguna referencia a ADDV debe aparecer en el sitio.

## Qué es esto

Sitio corporativo estático para **Arcan Advisors** (consultora en inteligencia energética, CDMX). Astro, `output: 'static'`, deploy en GitHub Pages. Sin backend, sin Docker, sin pruebas unitarias (excepción explícita del usuario para este proyecto — ver "Excepciones" abajo).

## Fuente de verdad de marca

`I:\Unidades compartidas\008 - Arcan Advisor\Proyectos\Pagina premium\ADDV Generado\Material\Branding\` — Brand Book v1.0 (julio 2026), láminas 01-09 + `MockUp site.png`. Cualquier duda de color/tipografía/copy se resuelve ahí, no se inventa.

## Estado por fase

| Fase | Estado | Contenido |
|---|---|---|
| 1 — Fundaciones técnicas | ✅ Completada 2026-08-05 | Scaffold Astro, tokens de marca, logo (SVG reconstruido), datos de sitio, layout base. Build verificado (`npm run build` OK). |
| 2 — Nav + Hero (Inicio) | ✅ Completada 2026-08-05 | Nav sticky glassmórfico (IntersectionObserver, menú móvil accesible), Hero con patrón "red de energía", copy literal de MockUp + lámina 04, animación emergente on-scroll (`data-reveal`, progressive enhancement). Build OK. |
| 3 — Nosotros / Servicios / Producto | ✅ Completada 2026-08-05 | Nosotros (Esencia de marca + Propósito/Misión/Visión + 5 Valores, lit. lámina 02 y 04), Servicios (4 líneas completas con bullets, lit. lámina 05), Producto (ARCAN Intelligence™, lit. servicio 04 + disclaimer de posicionamiento del cliente). Build OK, copy verificado en `dist/index.html`. |
| 4 — Contacto, WhatsApp form, SEO técnico | ✅ Completada 2026-08-05 | Form con validación cliente → WhatsApp (no pierde datos si falla validación), footer, botón flotante WhatsApp, favicons/OG image reales (generados desde el isólogo con `scripts/generate-icons.mjs` + sharp), JSON-LD Organization+ProfessionalService+ContactPoint, robots.txt, sitemap.xml, manifest.webmanifest. Build OK, paths base-aware verificados en `dist/`. |
| 5 — Accesibilidad, performance, verificación | ✅ Completada 2026-08-05 | Ver detalle abajo ("Auditoría Fase 5"). Build OK, `npm audit` en 0 vulnerabilidades. |
| 6 — Prompts de imágenes + mapeo de carpetas | ⏳ Pendiente | Para assets que no se pueden generar directamente |

**2026-08-05:** usuario autorizó terminar todas las fases restantes seguidas, sin pausar a pedir confirmación por fase, y hacer commit+push al cerrar cada una. Sigue vigente la regla de no incluir nada no pedido/inventado.

## Decisiones ya tomadas

- Stack: Astro sobre vanilla HTML/Web Components y Vite+React (mejor fit componentización + SEO nativo + Lighthouse).
- Proyecto canónico: `D:\srv\arcan-site`. Existe un segundo proyecto en `C:\Users\Antonio\Desktop\stitch_arcan_advisors_premium_site` (HTML/CSS/JS plano, mismo remote GitHub) que queda **solo como referencia**, no se mergea ni se pushea.
- Deploy pre-aprobación: `https://antonioprado-sketch.github.io/arcan-prototipo/` (`base` en `astro.config.mjs`). Post-aprobación de dominio propio, tocar: `astro.config.mjs` (quitar `base`, cambiar `site`), `src/data/site.js` (`SITE.url`), agregar `public/CNAME`, **y ahora también** `public/robots.txt` (URL del Sitemap), `public/sitemap.xml` (`<loc>`), `public/manifest.webmanifest` (`start_url`/`scope`/`icons[].src`, están hardcodeados a `/arcan-prototipo/` porque es un JSON estático, no procesado por Astro).
- JSON-LD (Fase 4) incluye Organization + ProfessionalService + ContactPoint. Se omiten a propósito: `GeoCoordinates` (no hay lat/long verificada, no se inventa), `BreadcrumbList` (sitio de una sola página con anclas, no aplica jerarquía real), `FAQPage` (no hay contenido de preguntas frecuentes en el brandbook, inventarlo sería spam de SEO).
- Logo (Fase 4, ajuste de fidelidad): el wordmark "ARCAN ADVISORS" en el arte de marca es serif, no Lato (Lato es la tipografía corporativa para contenido, no la del logotipo). `Logo.astro` se corrigió para usar un stack serif (`Georgia, 'Times New Roman', serif`) solo en el wordmark del logo — regla del brandbook "no modificar tipografía del logo" (lámina 06).
- Navegación: 5 secciones (Inicio, Nosotros, Servicios, Producto, Contacto) por instrucción explícita del usuario, no las 6 del MockUp ni las de la lámina 09 (ambas ilustrativas, no spec de contenido).
- Cifras de impacto del MockUp (150+, 80+, 7 países, +5GW) **omitidas** — no están confirmadas en el brandbook, usuario decidió no inventar.
- Tipografía: Lato (principal) + Tahoma con fallback `Verdana, sans-serif` (sin archivo de fuente licenciado disponible).
- No push a GitHub sin permiso explícito, cada vez.
- Nosotros (Fase 3) no incluye los "5 pilares estratégicos" (Entendemos/Analizamos/Diseñamos/Transformamos, lámina 04) ni repite la cita de propuesta de valor ya usada en el Hero — decisión de curaduría para bajar carga cognitiva, no alteración de copy (esos bloques siguen disponibles en el brandbook si se piden después).

## Auditoría Fase 5 (2026-08-05)

**Contraste (WCAG AA, calculado real, no estimado):**
- Gold (#af932f) sobre fondos claros daba 2.98:1 en texto chico (eyebrows, `.card-number`) — no pasa el mínimo 4.5:1. Se cambiaron esos textos a Forest Green (12.21:1) en fondos claros y a White en fondos oscuros. Gold se conserva sin tocar el hex — solo se dejó de usar como color de texto chico, sigue usándose en fondos/bordes/íconos/el acento grande del H1 (ahí sí pasa, 4.09:1 ≥ 3:1 de "large text").
- Botones primarios (Forest Green sobre Gold) daban 4.09:1, no pasa texto normal — texto cambiado a Charcoal (5.83:1).
- Footer (Medium Gray sobre Charcoal) daba 3.03:1 — cambiado a Light Gray (13.82:1).
- `Producto.astro`: se sacó un `opacity: 0.8` que arriesgaba bajar el contraste del texto legal por debajo de AA.
- Nada de esto cambió ningún valor hex de la paleta de marca — solo dónde se usa cada color como texto.

**Estructura/semántica:**
- Jerarquía de headings corregida: H1 único (Hero) → H2 por sección → H3 (Misión/Visión/Propósito, valor de servicio, "Información de contacto") → H4 (cada valor). Se agregó el H3 "Nuestros valores" que faltaba antes de la grilla de valores.
- `aria-hidden="true"` agregado a todos los íconos SVG decorativos que no lo tenían (Nosotros, Servicios).
- `Logo.astro`: el mark SVG tenía `role="img" aria-label="Arcan Advisors"` fijo, duplicando el anuncio de lector de pantalla cuando el wordmark en texto real ya está visible al lado. Ahora solo lleva `role`/`aria-label` en uso `markOnly` (isotipo solo); si el wordmark está presente, el mark queda `aria-hidden`.
- Touch targets del menú móvil: los links no tenían padding/alto mínimo — se agregó `padding-block` + `min-height:24px` (WCAG 2.2 SC 2.5.8).
- `prefers-reduced-motion` ya cubierto de forma global desde Fase 2 — no hizo falta tocar nada por componente.

**Seguridad (`npm audit`):**
- Estaba en 3 vulnerabilidades (1 low, 2 high) en Astro `<=7.0.9` (XSS/SSRF varios) y `sharp <0.35.0` (CVEs de libvips). Se subió Astro a `7.1.6` (breaking version, se verificó con build real que no rompió nada — sigue en `output:'static'`, mismo `dist/` estático) y se corrió `npm audit fix` para el resto. **Resultado: 0 vulnerabilidades.**

**Performance:**
- Payload actual: `index.html` (~33KB) + 1 CSS (~18KB) ≈ 51KB sin comprimir, sin JS de framework, sin imágenes raster todavía (ver gap de fotografía). Muy por debajo de cualquier presupuesto de Core Web Vitals.
- Fuentes: Lato vía Google Fonts con `preconnect` + `display=swap` (sin bloqueo de render).
- **No se pudo correr Lighthouse en vivo** — la extensión de Chrome no está conectada en esta sesión. Recomendado: `npm run build && npm run preview` y correr Lighthouse desde Chrome DevTools, o reconectar la extensión para que se corra acá.

## Gaps de asset pendientes (bloquean fidelidad 100%)

1. **Logo vectorial**: no existe `.ai`/`.eps`/`.svg` fuente en el material entregado, solo capturas de slide. `src/components/Logo.astro` es una reconstrucción best-effort en SVG (geometría de 3 polígonos). Reemplazar si el diseñador entrega el vectorial original.
2. **Fuente Tahoma**: sin archivo licenciado. Implementado como font-stack de sistema, no embebido.
3. **Fotografía real** de servicios/hero: pendiente de Fase 6 (prompts de generación + mapeo de carpetas) salvo que el usuario provea fotografía propia.

## Excepciones al protocolo addv-web-app (2026-08-05)

Por pedido explícito del usuario, para este proyecto puntual:
- **Sin Docker** — sitio 100% estático, sin contenedores.
- **Sin pruebas unitarias** — no aplica dado el alcance (sin lógica de negocio compleja, sin backend).

El resto del piso de calidad del protocolo (UX/UI, accesibilidad, rendimiento, seguridad, sin regresiones, build real verificado) sigue vigente sin excepción.
