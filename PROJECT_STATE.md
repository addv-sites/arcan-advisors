# Estado del proyecto — Arcan Advisors

Última actualización: 2026-08-05 (cierre Fase 4)

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
| 5 — Accesibilidad, performance, verificación | ⏳ Pendiente | WCAG 2.2 AA, Lighthouse, build real |
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

## Gaps de asset pendientes (bloquean fidelidad 100%)

1. **Logo vectorial**: no existe `.ai`/`.eps`/`.svg` fuente en el material entregado, solo capturas de slide. `src/components/Logo.astro` es una reconstrucción best-effort en SVG (geometría de 3 polígonos). Reemplazar si el diseñador entrega el vectorial original.
2. **Fuente Tahoma**: sin archivo licenciado. Implementado como font-stack de sistema, no embebido.
3. **Fotografía real** de servicios/hero: pendiente de Fase 6 (prompts de generación + mapeo de carpetas) salvo que el usuario provea fotografía propia.

## Excepciones al protocolo addv-web-app (2026-08-05)

Por pedido explícito del usuario, para este proyecto puntual:
- **Sin Docker** — sitio 100% estático, sin contenedores.
- **Sin pruebas unitarias** — no aplica dado el alcance (sin lógica de negocio compleja, sin backend).

El resto del piso de calidad del protocolo (UX/UI, accesibilidad, rendimiento, seguridad, sin regresiones, build real verificado) sigue vigente sin excepción.
