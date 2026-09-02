# Estado del proyecto — Arcan Advisors

Última actualización: 2026-09-01 (logos Nav/Footer y og-image renovados con assets del cliente)

## Reposicionamiento completo del sitio (2026-08-25)

Implementado en una sola pasada el brief de reposicionamiento del cliente (`clientCom.md`, 30 secciones): de "consultora de inteligencia energética / ESG / transición energética / LATAM" a **"especialista senior en estrategia de compra de energía para grandes consumidores industriales y participantes del Mercado Eléctrico Mayorista en México"**.

**Contenido:**
- Hero: nuevo headline ("Conocemos el mercado eléctrico desde adentro"), subtítulo, 3 badges.
- Nosotros: reescrito completo (encabezado, trayectoria, modelo, enfoque — sección 5), Propósito/Misión/Visión nuevos (sección 7), valores reducidos de 5 a 3 (Integridad/Innovación/Independencia — sección 6).
- Servicios (`src/data/services.js`): servicio 1 renombrado a "Asesoría en licitaciones de suministro eléctrico" + bullet nuevo de gestión de contratos vigentes (pedido puntual del cliente antes del brief completo); servicio 2 reforzado con la línea "impartida por quien operó el mercado..."; servicio 3 renombrado con I-REC/GDOs/créditos de carbono (ya no "bonos de carbono"); servicio 4 reescrito sin ARCAN Intelligence™.
- `Producto.astro`: reemplazado completo — ya no es "ARCAN Intelligence™" (herramienta propietaria), ahora presenta **Quanten** como plataforma de un aliado tecnológico bajo licenciamiento máster de Arcan, con link a `quanten.com.mx`.
- Nueva sección `src/components/sections/CapacidadesAliados.astro` (`#capacidades`, enlazada en Nav/Footer): 3 capacidades (datos de mercado vía Quanten —único aliado con nombre/link—, certificados de origen renovable, créditos de carbono — estos dos últimos sin nombrar aliados, por regla explícita del cliente).
- `src/components/sections/CasosExito.astro`: arquitectura preparada (cards con sector/reto/intervención/resultado/rango), array de casos vacío, **no importada en `index.astro`** — queda lista para activar cuando existan casos reales, sin rediseño.
- Contacto: devoseo completo (Argentina → México) en copy visible y mensajes de validación del form.
- Footer: CTA final actualizado, texto de marca sin "transición energética"/Latinoamérica.
- SEO: title/description del `<title>`/meta actualizados, JSON-LD `areaServed` de `['México','Latinoamérica']` a `'México'`, `manifest.webmanifest` actualizado.
- Logo (`Logo.astro`): alt text del logo real cambiado de "Arcan Advisors — Inteligencia Energética" a "Arcan Advisors"; tagline "INTELIGENCIA ENERGÉTICA" sacado del isólogo SVG de fallback.

**Gap conocido — requiere revisión humana:** los assets raster reales del logo (`public/logo-arcan-advisors.webp` en Nav, `public/logo-footer.webp` en Footer) tienen el texto "INTELIGENCIA ENERGÉTICA" **quemado en los píxeles** (no es texto editable en código). El brief pide eliminar esa tagline de "cualquier componente", pero según la regla del proyecto no se rediseña el logo a mano — se necesita que el cliente entregue un `favicon-package`/lockup actualizado sin esa línea para reemplazar el archivo (mismo proceso que `scripts/generate-icons.mjs` ya usa). **Resuelto 2026-09-01** — ver sección abajo, el cliente entregó lockups nuevos sin la tagline.

## Logos Nav/Footer y og-image renovados con assets del cliente (2026-09-01)

El cliente entregó `public/logo-arcan-advisors.png` (lockup limpio, 2172x724, sin la tagline "INTELIGENCIA ENERGÉTICA" — cierra el gap de arriba) y una versión nueva de `public/LogoFooter.png` (con efecto glow, 1536x1024). Ambos con wordmark "ARCAN" en negro/oscuro (pensado para fondo claro) y fondo transparente real (confirmado por canal alfa). `scripts/optimize-brand-images.mjs` se generalizó: la función de recoloreo que antes solo aplicaba a `LogoFooter.png` (`recolorFooterLogo` → `recolorDarkWordmark`) ahora corre para ambos archivos, con `trim()` agregado antes de recolorear/redimensionar para descartar el padding transparente de la fuente (relevante en `LogoFooter.png`, que trae mucho aire alrededor del mark por el glow). Resultado: `logo-arcan-advisors.webp` (709x180, 28KB) y `logo-footer.webp` (329x255, 20KB), wordmark blanco legible sobre Forest Green — verificado componiendo ambos sobre `#031c0e` antes de dar por bueno el resultado. `src/components/Logo.astro` actualizado con los nuevos `width`/`height` intrínsecos.

El cliente también entregó `public/og-image.png` ya diseñado (fondo Forest Green + patrón "Red de Energía" + wordmark), reemplazando el que generaba `scripts/generate-icons.mjs`. Se redimensionó a 1200x630 (ratio OG estándar) y se comprimió de 1.55MB a 182KB (`sharp` con `palette:true`). Ojo: si se vuelve a correr `generate-icons.mjs`, ese script todavía dibuja su propia versión programática de `og-image.png` y sobreescribiría este diseño del cliente — no correrlo sin avisar.

**Verificación:** `npm run build` OK, `npm audit` en 0 vulnerabilidades. Commiteado y pusheado (`c594b33`).

**Verificación:** `npm run build` OK, `npm audit` en 0 vulnerabilidades (se corrigió 1 alta de `nanoid` con `npm audit fix`), revisado visualmente en `npm run preview` (Hero, Nosotros, Servicios, Producto/Quanten, Capacidades, Contacto, Footer), sin errores de consola. Búsqueda global confirmó cero residuales de "ARCAN Intelligence™", "Inteligencia Energética" (como posicionamiento), "Latinoamérica"/"América Latina"/"LATAM", "bonos de carbono" y voseo en `src/` y `dist/`.

**No commiteado ni pusheado todavía** — pendiente de revisión final de Alejandro antes de sync a GitHub Pages.

## Logo real en Nav/Footer — gap de "logo vectorial" resuelto parcialmente (2026-08-05)

El usuario aportó `public/BannerArcan.png` (lockup completo real, tipografía sans-serif geométrica — distinta al serif que parecía en las láminas del brandbook comprimidas, se prioriza este asset real por ser más confiable que mi lectura visual de un JPG). Igual que con `LogoRB.png` antes: el fondo "transparente" era en realidad un patrón de cuadros dibujado (`hasAlpha:false` en los metadatos), no transparencia real. Se reconstruyó por chroma (dorado, saturación alta) + brillo (blanco casi puro, >250) — funciona bien sobre fondos oscuros (Nav/Footer), que es el único uso actual. Resultado: `public/logo-arcan-advisors.webp` (~55KB).

`Logo.astro` ahora usa este asset real para `variant="negativa"` (Nav y Footer, únicos consumidores de esa variante) vía `existsSync`, con fallback al isólogo SVG reconstruido si el archivo no está. Los variants `principal` y `mono` siguen sin asset real — **gap de logo vectorial sigue parcialmente abierto** para esos dos casos.

`BannerArcan.png` (el original, ~950KB) se borró después de generar el derivado optimizado — mismo criterio que las fotos de Hero/Servicios.

## Primer deploy a GitHub Pages — LIVE (2026-08-05)

**El sitio está publicado:** https://addv-prototipos.github.io/arcan-prototipo/

Se agregó `.github/workflows/deploy.yml` (build + `actions/deploy-pages`, dispara en push a `main`). Los primeros 3 intentos fallaron:
- Los primeros 2: Pages todavía no estaba configurado como "GitHub Actions" en Settings → Pages → Source (el usuario lo activó después).
- El 3ro: falló en el paso "Build" sin causa clara — no pude ver el log real (GitHub devuelve 403 sin permisos de admin, y no hay `gh` CLI/token en este entorno para pedirlo por API). Reproduje `npm ci` + `npm run build` en un clon limpio localmente y funcionó perfecto, así que no pude confirmar la causa exacta. Cambié el workflow de Node 20 a Node 22 (Node 20 ya estaba deprecado en Actions, según un warning que sí pude ver) y el 4to intento corrió limpio. No hay certeza de que ese cambio haya sido la causa real vs. algo transitorio — si vuelve a fallar, pedir el log completo del paso "Build" directo del usuario (es la única forma de verlo, no tengo acceso).

**Nota para próximos deploys:** cada push a `main` dispara un build+deploy automático. `public/BannerArcan.png` quedó sin trackear a propósito (el usuario confirmó que está mal — dice "ARCANA" en vez de "ARCAN") — no agregarlo a git sin que lo reemplacen.

URL esperada una vez prendido: `https://addv-prototipos.github.io/arcan-prototipo/`.

## Fix cards de Servicios, 3er ajuste (2026-08-05)

Quedaban 2 problemas reales:
1. **Alturas asimétricas** → fotos escalonadas en vez de alineadas en fila. Causa: el texto real (literal del brandbook) varía mucho de largo entre los 4 servicios (servicio 04 es bastante más largo que los otros 3), y sin nada que lo compense cada card terminaba de una altura distinta. Fix: `.card-body` con `min-height:320px` + `display:flex;flex-direction:column` + `.card-explore{margin-top:auto}` — el link "Explorar" (y todo lo que sigue) queda siempre al fondo del bloque de texto, así las fotos alinean en fila sin importar cuánto texto tenga cada servicio.
2. **Botón "ver más/menos servicios" sacado** — quedan las 4 cards visibles siempre. Se sacó el HTML, el CSS del toggle y el JS del grid-collapse. El botón "Explorar" por card (que expande/colapsa los bullets) se mantiene, es otra cosa.

Detalle menor conocido, no crítico: si se expande una sola card con "Explorar", las otras 3 quedan con espacio en blanco abajo (el grid estira toda la fila a la altura de la card expandida). No se optimizó porque el mockup no muestra un estado expandido de referencia — es un agregado propio para no perder los bullets.

**Nota de proceso:** todavía no está commiteado.

## Fix cards de Servicios (2026-08-05, mismo día)

El usuario marcó que las cards de Servicios no seguían el MockUp. Comparé recorte contra recorte y encontré 4 diferencias reales:
1. Orden invertido: mockup = ícono arriba → título → texto → "Explorar →" → foto abajo. Yo tenía foto arriba con ícono superpuesto.
2. Header de la sección era 1 columna; el mockup usa 2 (título izq., bajada corta a la derecha con divisor dorado vertical).
3. Yo tenía un número de card (01/02/03/04) que el mockup no muestra — sacado.
4. Ícono: el mockup usa badge circular oscuro (casi negro) con ícono dorado — yo tenía el tinte claro de forest-green (`.card-icon` base de `global.css`, pensado para Nosotros/Producto, no para esto).

Corregido todo excepto el link "Explorar →": no hay páginas individuales por servicio en un sitio de una sola página, así que mantuve la lista de bullets (contenido literal real del brandbook, ya establecido como requisito) en el lugar donde iría ese link. Decisión de adaptación, no un olvido.

**2do ajuste, mismo día:** el usuario marcó que seguía mal. Hice un zoom real a una card del MockUp (no solo el recorte general) y encontré lo que faltaba: **todo el contenido va centrado** (ícono, título, texto, "Explorar"), y **los bullets no se muestran por default** — solo texto corto + link "Explorar →", sin lista visible.

Implementado: `.card-body { text-align: center }`, y el link "Explorar" ahora es un botón real que expande/colapsa los bullets (`.card-items`, oculto vía `html.reveal-ready` — mismo patrón de progressive enhancement que el resto del sitio: si el JS falla, los bullets quedan visibles, nunca se pierde contenido). Flecha rota 90° al expandir, label cambia a "Ocultar". Verificado clickeando en el navegador — funciona.

**Nota de proceso:** todavía no está commiteado.

## Ronda 3 de fidelidad al MockUp (2026-08-05)

4 fases, todas verificadas visualmente en navegador:

1. **Nav glass real** — medí píxeles del MockUp con cuidado de no caer en texto/botones (primer intento cayó en el botón dorado y en bordes de texto, dio falso positivo). Con muestras limpias: el nav sobre el Hero es un tinte oscuro semi-transparente (~75-80% opacidad), no sólido ni transparente puro. `Nav.astro` ahora usa `color-mix(...80%...) + backdrop-filter: blur(12px)` **siempre** (no solo al hacer scroll).
2. **Hero alineado a la izquierda real** — medido: el título arrancaba al 28% del viewport (encerrado en el `.container` centrado de 1280px), el MockUp arranca al ~4%. Se sacó `.hero-content` del `.container` estándar, ahora usa `padding-left: clamp(24px, 6vw, 96px)` propio. Verificado: quedó en 6%, calza con nav/logo. De paso corregí el overlay del Hero, que tenía el verde/negro viejo hardcodeado en vez de las variables actuales.
3. **Servicios colapsable** — 2 cards visibles por default, botón "Ver más servicios" expande a las 4 (toggle de clase + `aria-expanded`). Progressive enhancement: si el JS falla, se ven las 4 igual (mismo patrón que `reveal.js`).
4. **Banner "Soluciones inteligentes..."** — mismo texto de siempre, restyle con fade negro→Forest Green (`#031C0E` sin tocar el tono), sin agregar las cifras del MockUp (ver decisión abajo).
5. **Banda CTA "¿Listo para generar valor...?"** — estilo exacto del MockUp + foto real: reusa `hero-energia.webp` (mismo asset del Hero, recorte distinto vía `object-position: right center` + fade), evita pedir un asset nuevo. Un componente nuevo `src/components/EnergyPattern.astro` extrae el patrón "Red de Energía" (antes duplicado a mano) para reusarlo acá y en el Hero.
6. **Fondo de Contacto** → `#E5E5E5` explícito (antes blanco por default de `.section`). La card de contacto (`.contact-info`) pasó de light-gray a blanco para no quedar invisible contra el nuevo fondo del mismo tono.

**Decisión explícita del usuario:** el banner de "Impacto" del MockUp (150+, 80+, 7 países, +5GW) **no se agrega** — sigue siendo placeholder no confirmado. Lo que se pidió fue el *efecto visual* (fade negro→verde), no los datos — se aplicó ese estilo al banner de texto ya existente en vez de crear una sección nueva con cifras.

**Nota de proceso:** todavía no está commiteado — sigue vigente que no se hace `git commit`/`push` sin pedido puntual.

## Corrección de colores reales (2026-08-05)

El usuario corrigió explícitamente 2 colores contra lo que decía el PDF del brandbook — **estos son ahora los valores reales, no volver a los del PDF sin que el usuario lo pida** (documentado en el comentario de `src/styles/tokens.css`, única fuente de ambos colores):

- `--color-forest-green`: PDF `#2b3929` → real **`#031C0E`**.
- `--color-gold`: PDF `#af932f` → real **`#C18613`**.

Cascada automática a nav, footer, hero, banner, sombras, `theme-color`, `manifest.webmanifest`, OG image (`scripts/generate-icons.mjs` actualizado) y el placeholder de fondo de las cards de Servicios (tenía el gold viejo hardcodeado en RGB decimal, no en la variable — corregido también).

Contraste recalculado con ambos valores nuevos, sin regresiones (mejoras en casi todos los casos):
- White sobre Forest Green: 17.85:1
- Gold sobre Forest Green: 5.68:1 (antes 4.09:1 — ahora pasa AA de texto normal, no solo "large text")
- Light Gray sobre Forest Green: 14.17:1
- Charcoal sobre Gold (texto de botón primario): 5.54:1

**Nota de proceso:** todavía no está commiteado — el usuario revocó la autorización de commit/push automático (ver [[feedback_workflow_rules]]), ahora requiere pedido puntual cada vez.

## Ronda 2 de fidelidad al MockUp (2026-08-05)

Usuario marcó 3 cosas puntuales comparando contra `MockUp site.png`:

1. **Nav con transparencia** — el estado `.is-scrolled` tenía glassmorphism (`backdrop-filter`/`color-mix`) inspirado en el `DESIGN.md` no-oficial del prototipo de Desktop. Se sacó: `Nav.astro` ahora es sólido Forest Green siempre, en todo momento.
2. **Footer no igual al mockup** — le faltaba la banda CTA ("¿Listo para generar valor en tu negocio?", copy literal del mockup) antes del footer. Se agregó con un solo botón "Contáctanos" (el mockup tiene también "Agenda una reunión", pero no hay link real de agenda — usuario confirmó omitirlo, no inventar uno). Sin íconos sociales (no hay URLs reales de Arcan Advisors — usuario confirmó no ponerlos).
3. **Paleta no respetada en el footer** — usaba Charcoal (`#1a1a1a`) en vez de Forest Green (`#2b3929`). Corregido. De paso, el hover de los links del footer usaba Gold como texto (fallaba AA, 4.09:1) — cambiado a White (12.21:1), mismo criterio que el resto del sitio.

**Favicons/OG image con el logo real (2026-08-05):** el usuario generó su propio favicon-package (con herramienta externa, a partir del logo real — no el reconstruido a mano) y lo puso en `public/favicon-package/`. `scripts/generate-icons.mjs` se reescribió para convertir esos archivos reales a los tamaños que el sitio necesita (favicons, apple-touch-icon, manifest icons, favicon.ico) y componer el OG image con el logo real en vez del isólogo dibujado a polígonos. El gap de "logo vectorial" del `Logo.astro` (Nav/Footer) **sigue abierto** — el favicon-package es raster, no vector, no sirve para reemplazar el SVG escalable del componente.

**Nota:** durante esta ronda los archivos `public/*.png` (favicons/OG previos) desaparecieron del disco fuera de mi control — se regeneraron sin pérdida real (eran artefactos de build reproducibles). Si vuelve a pasar algo similar con un archivo que no sea reproducible, parar y preguntar antes de regenerar/asumir.

## Post-fase 6: fotografía real + gaps de fidelidad al MockUp (2026-08-05)

Usuario comparó el sitio contra `MockUp site.png` y marcó que no coincidía. Se corrigieron 3 gaps estructurales y se integró la fotografía real que el usuario generó con los prompts de `IMAGENES_PENDIENTES.md`:

1. **Hero**: foto real (turbinas/paneles al amanecer, `public/images/hero/hero-energia.webp`) como fondo, con overlay más fuerte del lado del texto (antes era gradiente de marca sin foto). `Hero.astro` usa `existsSync` en build-time — si el archivo no está, cae a fondo sin foto, nunca un `<img>` roto.
2. **Servicios**: cards ahora llevan foto arriba + ícono superpuesto (estilo mockup), con el mismo patrón de `existsSync` — 4 fotos ya puestas en `public/images/servicios/`.
3. **Footer**: 4 columnas (Marca / Enlaces / Servicios / Contacto) en vez de 2 — nombres de servicio reales, sin inventar íconos sociales (no hay URLs reales).

**Imágenes que llegaron:** el usuario las generó con los prompts del doc y las soltó directo en las carpetas. Llegaron como PNG pesados (1.9-2.8MB c/u, algunos con doble extensión `.jpg.png`) — se optimizaron a WebP (~80-145KB c/u, ~20x más chicas) antes de integrarlas; los originales pesados no se commitean.

**Bug encontrado en el proceso — dev server con CSS viejo en caché:** después de editar `Footer.astro`, el dev server (Vite/Astro) seguía sirviendo el CSS de ANTES del cambio (`.footer-links` en vez de `.footer-col`) incluso en pestañas nuevas — confirmado con `getComputedStyle` en el navegador. El build de producción (`dist/`) siempre tuvo el CSS correcto — era puramente un problema de caché del dev server. Se resolvió matando el proceso viejo y arrancando uno nuevo. **Si algo se ve raro en `npm run dev` después de editar estilos y el build sí está bien, reiniciar el dev server antes de asumir que es un bug real.**

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
| 6 — Prompts de imágenes + mapeo de carpetas | ✅ Completada 2026-08-05 | Ver `IMAGENES_PENDIENTES.md` — 5 prompts (hero + 4 servicios) con ruta de destino exacta y checklist de integración. No se agregaron `<img>` sin archivo real detrás (evita el error de OG image ya pisado antes). |

**2026-08-05:** usuario autorizó terminar todas las fases restantes seguidas, sin pausar a pedir confirmación por fase. **Actualización (mismo día, más tarde):** la parte de "commit+push automático al cerrar cada fase" quedó revocada — ahora no se hace `git commit`/`git push` sin que el usuario lo pida puntualmente cada vez. Sigue vigente la regla de no incluir nada no pedido/inventado.

## Decisiones ya tomadas

- Stack: Astro sobre vanilla HTML/Web Components y Vite+React (mejor fit componentización + SEO nativo + Lighthouse).
- Proyecto canónico: `D:\srv\arcan-site`. Existe un segundo proyecto en `C:\Users\Antonio\Desktop\stitch_arcan_advisors_premium_site` (HTML/CSS/JS plano, mismo remote GitHub) que queda **solo como referencia**, no se mergea ni se pushea.
- Deploy pre-aprobación: `https://addv-prototipos.github.io/arcan-prototipo/` (`base` en `astro.config.mjs`). Post-aprobación de dominio propio, tocar: `astro.config.mjs` (quitar `base`, cambiar `site`), `src/data/site.js` (`SITE.url`), agregar `public/CNAME`, **y ahora también** `public/robots.txt` (URL del Sitemap), `public/sitemap.xml` (`<loc>`), `public/manifest.webmanifest` (`start_url`/`scope`/`icons[].src`, están hardcodeados a `/arcan-prototipo/` porque es un JSON estático, no procesado por Astro).
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
3. ~~**Fotografía real** de servicios/hero~~ — **resuelto 2026-08-05**. Las 5 imágenes (hero + 4 servicios) ya están integradas y optimizadas a WebP.

## Todas las fases planeadas (1-6) completas — 2026-08-05

Sitio funcional de punta a punta: Nav, Hero, Nosotros, Servicios, Producto, Contacto (form→WhatsApp), Footer, SEO técnico, accesibilidad AA verificada, 0 vulnerabilidades npm, prompts de imágenes documentados. Lo que sigue es iterar sobre los 3 gaps de arriba (logo vectorial real, fuente Tahoma licenciada, fotografía) a medida que el cliente los provea — no hay más fases de construcción base pendientes.

## Excepciones al protocolo addv-web-app (2026-08-05)

Por pedido explícito del usuario, para este proyecto puntual:
- **Sin Docker** — sitio 100% estático, sin contenedores.
- **Sin pruebas unitarias** — no aplica dado el alcance (sin lógica de negocio compleja, sin backend).

El resto del piso de calidad del protocolo (UX/UI, accesibilidad, rendimiento, seguridad, sin regresiones, build real verificado) sigue vigente sin excepción.
