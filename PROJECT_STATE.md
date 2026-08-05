# Estado del proyecto — Arcan Advisors

Última actualización: 2026-08-05 (cierre Fase 1)

## Qué es esto

Sitio corporativo estático para **Arcan Advisors** (consultora en inteligencia energética, CDMX). Astro, `output: 'static'`, deploy en GitHub Pages. Sin backend, sin Docker, sin pruebas unitarias (excepción explícita del usuario para este proyecto — ver "Excepciones" abajo).

## Fuente de verdad de marca

`I:\Unidades compartidas\008 - Arcan Advisor\Proyectos\Pagina premium\ADDV Generado\Material\Branding\` — Brand Book v1.0 (julio 2026), láminas 01-09 + `MockUp site.png`. Cualquier duda de color/tipografía/copy se resuelve ahí, no se inventa.

## Estado por fase

| Fase | Estado | Contenido |
|---|---|---|
| 1 — Fundaciones técnicas | ✅ Completada 2026-08-05 | Scaffold Astro, tokens de marca, logo (SVG reconstruido), datos de sitio, layout base. Build verificado (`npm run build` OK). |
| 2 — Nav + Hero (Inicio) | ⏳ Pendiente | Glassmórfico, fiel a MockUp, copy literal lámina 01 |
| 3 — Nosotros / Servicios / Producto | ⏳ Pendiente | Copy literal láminas 04 y 05, Producto = ARCAN Intelligence™ |
| 4 — Contacto, WhatsApp form, SEO técnico | ⏳ Pendiente | Form sin backend → WhatsApp, JSON-LD, sitemap, robots, manifest |
| 5 — Accesibilidad, performance, verificación | ⏳ Pendiente | WCAG 2.2 AA, Lighthouse, build real |
| 6 — Prompts de imágenes + mapeo de carpetas | ⏳ Pendiente | Para assets que no se pueden generar directamente |

Cada fase requiere confirmación explícita del usuario ("implementá fase N") antes de tocar código — no se avanza sola.

## Decisiones ya tomadas

- Stack: Astro sobre vanilla HTML/Web Components y Vite+React (mejor fit componentización + SEO nativo + Lighthouse).
- Proyecto canónico: `D:\srv\arcan-site`. Existe un segundo proyecto en `C:\Users\Antonio\Desktop\stitch_arcan_advisors_premium_site` (HTML/CSS/JS plano, mismo remote GitHub) que queda **solo como referencia**, no se mergea ni se pushea.
- Deploy pre-aprobación: `https://antonioprado-sketch.github.io/arcan-prototipo/` (`base` en `astro.config.mjs`). Post-aprobación de dominio propio: quitar `base`, cambiar `site` a `https://www.arcanadvisors.com`, agregar `public/CNAME`.
- Navegación: 5 secciones (Inicio, Nosotros, Servicios, Producto, Contacto) por instrucción explícita del usuario, no las 6 del MockUp ni las de la lámina 09 (ambas ilustrativas, no spec de contenido).
- Cifras de impacto del MockUp (150+, 80+, 7 países, +5GW) **omitidas** — no están confirmadas en el brandbook, usuario decidió no inventar.
- Tipografía: Lato (principal) + Tahoma con fallback `Verdana, sans-serif` (sin archivo de fuente licenciado disponible).
- No push a GitHub sin permiso explícito, cada vez.

## Gaps de asset pendientes (bloquean fidelidad 100%)

1. **Logo vectorial**: no existe `.ai`/`.eps`/`.svg` fuente en el material entregado, solo capturas de slide. `src/components/Logo.astro` es una reconstrucción best-effort en SVG (geometría de 3 polígonos). Reemplazar si el diseñador entrega el vectorial original.
2. **Fuente Tahoma**: sin archivo licenciado. Implementado como font-stack de sistema, no embebido.
3. **Fotografía real** de servicios/hero: pendiente de Fase 6 (prompts de generación + mapeo de carpetas) salvo que el usuario provea fotografía propia.

## Excepciones al protocolo addv-web-app (2026-08-05)

Por pedido explícito del usuario, para este proyecto puntual:
- **Sin Docker** — sitio 100% estático, sin contenedores.
- **Sin pruebas unitarias** — no aplica dado el alcance (sin lógica de negocio compleja, sin backend).

El resto del piso de calidad del protocolo (UX/UI, accesibilidad, rendimiento, seguridad, sin regresiones, build real verificado) sigue vigente sin excepción.
