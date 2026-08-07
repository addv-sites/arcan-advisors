// Genera variantes responsive de la foto del Hero para srcset/sizes —
// el archivo original (1920px) se servía igual a mobile que a desktop,
// principal contribuyente al LCP alto detectado en PageSpeed Insights
// (mobile, red/CPU throttled). Solo agrega las variantes más chicas: la
// de 1920 (public/images/hero/hero-energia.webp) queda intacta, no se
// recomprime de nuevo para no perder calidad.
// Volver a correr si el cliente entrega una foto de Hero nueva:
// `node scripts/generate-hero-sizes.mjs`.
import sharp from 'sharp';

const SRC = 'public/images/hero/hero-energia.webp';
const SIZES = [640, 1024];

async function main() {
  for (const width of SIZES) {
    const out = `public/images/hero/hero-energia-${width}.webp`;
    await sharp(SRC).resize({ width }).webp({ quality: 82 }).toFile(out);
    console.log(`✓ ${out}`);
  }
}

main();
