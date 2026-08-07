// Regenera public/logo-arcan-advisors.webp (logo real del Nav, variant="negativa")
// a partir de public/logo-arcan-advisors.jpg (pese a la extensión, un PNG sin
// alfa real: usa un checkerboard tipo Photoshop como placeholder de
// transparencia, tonos casi acromáticos ~(247,247,247)/~(232,232,232)).
//
// El intento previo (commit 53984e4) reconstruía el alfa por chroma+brillo,
// pero esos dos tonos del checkerboard caen en el mismo rango de brillo que
// el antialiasing de los bordes del texto blanco y de la marca dorada — no
// se pueden separar solo por color sin más. Resultado: celdas del checkerboard
// mal clasificadas como opacas, horneadas como manchas blancas en el .webp.
//
// Fix: el histograma de valores acromáticos del archivo fuente muestra un
// valle claro en 250-252 entre el pico del checkerboard (~246-247) y el pico
// del blanco sólido del texto (~254-255) — ver análisis. Se usa ese corte
// (no la posición de grilla, que sufre drift de fase y genera falsos
// positivos) para separar fondo de contenido; el contenido se fija a los dos
// colores sólidos de marca (elimina el ruido interno del checkerboard).
// Volver a correr si el cliente entrega un BannerArcan.png actualizado:
// `node scripts/fix-logo-nav.mjs`.
import sharp from 'sharp';

const SRC = 'public/logo-arcan-advisors.jpg';
const OUT = 'public/logo-arcan-advisors.webp';

const GOLD = [0xc1, 0x86, 0x13]; // --color-gold, src/styles/tokens.css
const WHITE = [0xff, 0xff, 0xff];

const ACHROMATIC_TOL = 4; // mx-mn máximo para considerar un píxel acromático
const WHITE_MIN = 250; // umbral acromático: >= esto es blanco sólido, no checker
const MIN_BLOB_AREA = 20; // componentes de "contenido" más chicas que esto: ruido aislado del checkerboard, no logo real
const TARGET_HEIGHT = 180; // Nav lo muestra a 59px de alto — ~3x cubre retina/zoom sin heredar el aliasing de reducir 8x un borde casi-duro en el navegador

// Componentes conexas (4-vecinos) sobre una máscara binaria (Uint8Array 0/1).
// Devuelve, para cada componente, su área y la lista de índices de píxel.
function connectedComponents(mask, width, height) {
  const visited = new Uint8Array(width * height);
  const components = [];
  const stack = new Int32Array(width * height);
  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || visited[start]) continue;
    let sp = 0;
    stack[sp++] = start;
    visited[start] = 1;
    const pixels = [start];
    while (sp > 0) {
      const p = stack[--sp];
      const x = p % width;
      const y = (p / width) | 0;
      if (x > 0 && mask[p - 1] && !visited[p - 1]) { visited[p - 1] = 1; stack[sp++] = p - 1; pixels.push(p - 1); }
      if (x < width - 1 && mask[p + 1] && !visited[p + 1]) { visited[p + 1] = 1; stack[sp++] = p + 1; pixels.push(p + 1); }
      if (y > 0 && mask[p - width] && !visited[p - width]) { visited[p - width] = 1; stack[sp++] = p - width; pixels.push(p - width); }
      if (y < height - 1 && mask[p + width] && !visited[p + width]) { visited[p + width] = 1; stack[sp++] = p + width; pixels.push(p + width); }
    }
    components.push(pixels);
  }
  return components;
}

async function main() {
  const src = sharp(SRC).removeAlpha();
  const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const rgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const mx = Math.max(r, g, b);
      const mn = Math.min(r, g, b);
      const isAchromatic = mx - mn <= ACHROMATIC_TOL;
      const isBackground = isAchromatic && r < WHITE_MIN;

      const o = (y * width + x) * 4;
      if (isBackground) {
        rgba[o] = 0;
        rgba[o + 1] = 0;
        rgba[o + 2] = 0;
        rgba[o + 3] = 0;
      } else {
        const [cr, cg, cb] = isAchromatic ? WHITE : GOLD;
        rgba[o] = cr;
        rgba[o + 1] = cg;
        rgba[o + 2] = cb;
        rgba[o + 3] = 255;
      }
    }
  }

  // Motas y racimos chicos de blanco pegados al borde del dorado: sobras de
  // antialiasing entre el checkerboard y el trazo que cayeron del lado
  // "blanco" del corte, hasta ~9px de largo — conectados por alfa al bloque
  // dorado grande, así que el despeckle por componentes (más abajo) no los ve.
  // Filtro de mayoría iterativo (radio 3, ventana 7x7): un píxel blanco cuyo
  // vecindario es claramente dorado se reclasifica a dorado. El texto blanco
  // real nunca entra acá — sus vecinos son abrumadoramente blancos.
  const MAJORITY_RADIUS = 3;
  const MAJORITY_ITERATIONS = 4;
  for (let iter = 0; iter < MAJORITY_ITERATIONS; iter++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const o = (y * width + x) * 4;
        if (rgba[o + 3] === 0 || !(rgba[o] === 0xff && rgba[o + 1] === 0xff && rgba[o + 2] === 0xff)) continue;
        let gold = 0;
        let white = 0;
        for (let dy = -MAJORITY_RADIUS; dy <= MAJORITY_RADIUS; dy++) {
          const ny = y + dy;
          if (ny < 0 || ny >= height) continue;
          for (let dx = -MAJORITY_RADIUS; dx <= MAJORITY_RADIUS; dx++) {
            const nx = x + dx;
            if (nx < 0 || nx >= width) continue;
            const no = (ny * width + nx) * 4;
            if (rgba[no + 3] === 0) continue;
            if (rgba[no] === 0xff && rgba[no + 1] === 0xff && rgba[no + 2] === 0xff) white++;
            else gold++;
          }
        }
        if (gold > white * 2) {
          rgba[o] = GOLD[0];
          rgba[o + 1] = GOLD[1];
          rgba[o + 2] = GOLD[2];
        }
      }
    }
  }

  const contentMask = new Uint8Array(width * height);
  for (let p = 0; p < width * height; p++) contentMask[p] = rgba[p * 4 + 3] > 0 ? 1 : 0;
  for (const pixels of connectedComponents(contentMask, width, height)) {
    if (pixels.length < MIN_BLOB_AREA) {
      for (const p of pixels) {
        rgba[p * 4] = 0;
        rgba[p * 4 + 1] = 0;
        rgba[p * 4 + 2] = 0;
        rgba[p * 4 + 3] = 0;
      }
    }
  }

  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] > 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const pad = 4;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const right = Math.min(width, maxX + pad + 1);
  const bottom = Math.min(height, maxY + pad + 1);
  const cropW = right - left;
  const cropH = bottom - top;

  // Downscale con lanczos3 desde el canvas de bordes duros directo al tamaño
  // de uso real (Nav a 59px de alto): el resampling promedia la geometría
  // real del borde (antialiasing por supersampling) y evita que el
  // navegador tenga que reducir ~8x un borde casi-duro (eso es lo que
  // generaba el aliasing/"puntos" que se veían con el export anterior).
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract({ left, top, width: cropW, height: cropH })
    .resize({ height: TARGET_HEIGHT, kernel: 'lanczos3' })
    .webp({ lossless: true })
    .toFile(OUT);

  const final = await sharp(OUT).metadata();
  console.log(`✓ ${OUT} (${final.width}x${final.height})`);
}

main();
