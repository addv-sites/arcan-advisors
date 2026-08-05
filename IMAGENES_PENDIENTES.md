# Imágenes pendientes — Fase 6

Fotografía real que falta para terminar de igualar el MockUp (`MockUp site.png`) y el estilo "consultora internacional" del brief. No se generaron acá porque no hay herramienta de generación de imágenes en este entorno ni fotografía licenciada entregada — esto es la lista de qué falta, el prompt para generarlas (ChatGPT/DALL·E) y dónde va cada archivo.

El sitio funciona y se ve bien sin estas imágenes (Hero usa el patrón de marca "red de energía", las cards de Servicios son icon-first) — son una mejora, no un bloqueante.

## Cómo integrarlas al agregarlas

1. Generar la imagen con el prompt de abajo.
2. Convertir a `.webp` (mejor peso/calidad) — cualquier conversor sirve, o `npx @squoosh/cli --webp auto archivo.png`.
3. Guardar en la ruta indicada.
4. Avisar — la integración en el componente (`<img>`/`<picture>` con `loading="lazy"`, `width`/`height`, `alt` descriptivo) toma minutos una vez que el archivo existe. No se agrega antes porque un `<img src>` apuntando a un archivo que no existe rompe silenciosamente en producción (ya pasó una vez en este proyecto, ver `PROJECT_STATE.md`).

---

## 1. Hero (Inicio) — fondo

**Destino:** `public/images/hero/hero-energia.jpg` (luego `.webp`)
**Dónde se integra:** `src/components/sections/Hero.astro`, detrás de `.hero-pattern` (ya tiene el comentario `TODO-IMG` marcando el lugar exacto).
**Tamaño sugerido:** 2400×1600px mínimo (hero a ancho completo, se comprime con `loading="eager"` + `fetchpriority="high"` por ser LCP).

**Prompt:**
> Fotografía aérea profesional al amanecer de un paisaje energético en México: turbinas eólicas y un campo de paneles solares sobre colinas verdes, cielo despejado con tonos dorados y verdes al amanecer, niebla ligera en el valle, luz cálida rasante, composición panorámica, fotografía editorial de alta gama estilo consultora internacional (McKinsey/BCG), sin texto, sin logos, espacio negativo a la izquierda para superponer texto blanco/dorado, alta resolución, fotorrealista, 16:9.

---

## 2. Servicio 01 — Asesoría en Licitaciones Energéticas

**Destino:** `public/images/servicios/servicio-01-licitaciones.jpg`
**Dónde se integra:** `src/components/sections/Servicios.astro`, card `01` (agregar `.card-media` arriba del ícono).
**Tamaño sugerido:** 800×600px (ratio 4:3) o 16:9, se usa como imagen de card.

**Prompt:**
> Fotografía de un campo solar industrial visto desde el suelo al atardecer, con torres de transmisión eléctrica de fondo, tonos cálidos dorados y verde oscuro, atmósfera profesional y estratégica, fotografía corporativa de alta gama, sin personas, sin texto, 4:3, fotorrealista.

## 3. Servicio 02 — Formación en Mercado Eléctrico Mayorista

**Destino:** `public/images/servicios/servicio-02-formacion.jpg`

**Prompt:**
> Fotografía corporativa de una sala de capacitación profesional: un instructor presentando frente a una pantalla con gráficos de mercado eléctrico, audiencia de profesionales en traje de negocios tomando notas, iluminación cálida y natural, ambiente serio y aspiracional, estilo editorial de consultora internacional, sin texto visible en pantalla, 4:3, fotorrealista.

## 4. Servicio 03 — Comercialización de Productos Ambientales

**Destino:** `public/images/servicios/servicio-03-ambientales.jpg`

**Prompt:**
> Fotografía aérea de un bosque denso y verde en México con un río serpenteante, luz natural suave, sensación de sostenibilidad y naturaleza prístina, tonos verdes profundos, composición limpia y editorial, sin texto, sin personas, 4:3, fotorrealista.

## 5. Servicio 04 — Consultoría Estratégica en Energía (ARCAN Intelligence™)

**Destino:** `public/images/servicios/servicio-04-consultoria.jpg`

**Prompt:**
> Visualización abstracta de datos sobre un mapa de México de noche, puntos de luz dorada conectados por líneas finas representando una red de inteligencia energética, fondo verde bosque muy oscuro casi negro, estética tecnológica y sofisticada, sin texto, sin logos, 4:3, fotorrealista o render 3D limpio.

---

## Ya resuelto sin fotografía (no requiere esta lista)

- **Favicons / apple-touch-icon / manifest icons** — generados programáticamente desde el isólogo real (`scripts/generate-icons.mjs` + sharp). No hace falta IA generativa.
- **OG image (`public/og-image.png`)** — ídem, tarjeta de marca generada desde el isólogo + patrón de red, usada en Open Graph/Twitter Card.
