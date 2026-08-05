// Utilidad de build-time: rasteriza el isólogo (misma geometría que
// src/components/Logo.astro) a favicons/manifest icons/OG image reales.
// Correr manualmente si el logo cambia: `node scripts/generate-icons.mjs`.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const FOREST = '#2b3929';
const OLIVE = '#3b4c38';
const GOLD = '#af932f';
const WHITE = '#ffffff';
const LIGHT_GRAY = '#e5e5e5';

mkdirSync('public', { recursive: true });

// Isotipo: mismos 3 polígonos que Logo.astro (viewBox 0 0 140 100).
const mark = (fill = GOLD) => `
  <polygon points="18,90 38,90 62,10 52,10" fill="${fill}"/>
  <polygon points="58,90 78,90 102,10 92,10" fill="${fill}"/>
  <polygon points="86,90 106,90 106,52 92,52" fill="${fill}"/>
`;

function squareIconSvg(size, { padding = 0.2 } = {}) {
  const pad = size * padding;
  const inner = size - pad * 2;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="${FOREST}"/>
      <g transform="translate(${pad}, ${pad + inner * 0.09}) scale(${inner / 140})">
        ${mark(GOLD)}
      </g>
    </svg>
  `;
}

function faviconSvg(size) {
  // Favicon chico: fondo transparente, mark dorado solo (más legible a 16-32px).
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 140 100">
      ${mark(GOLD)}
    </svg>
  `;
}

function ogImageSvg(width, height) {
  const cx = width * 0.5;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${FOREST}"/>
          <stop offset="100%" stop-color="${OLIVE}"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      <g stroke="${GOLD}" stroke-width="1" opacity="0.35">
        <line x1="80" y1="120" x2="340" y2="240"/>
        <line x1="340" y1="240" x2="640" y2="140"/>
        <line x1="340" y1="240" x2="460" y2="470"/>
        <line x1="640" y1="140" x2="960" y2="270"/>
        <line x1="460" y1="470" x2="800" y2="540"/>
      </g>
      <g fill="${GOLD}" opacity="0.6">
        <circle cx="80" cy="120" r="5"/>
        <circle cx="340" cy="240" r="6"/>
        <circle cx="640" cy="140" r="5"/>
        <circle cx="460" cy="470" r="5"/>
        <circle cx="960" cy="270" r="6"/>
      </g>
      <g transform="translate(${cx - 90}, ${height / 2 - 130}) scale(1.3)">
        ${mark(GOLD)}
      </g>
      <text x="${cx}" y="${height / 2 + 60}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700" fill="${WHITE}" letter-spacing="4">ARCAN ADVISORS</text>
      <text x="${cx}" y="${height / 2 + 110}" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" letter-spacing="8" fill="${GOLD}">INTELIGENCIA ENERGÉTICA</text>
    </svg>
  `;
}

const jobs = [
  { svg: faviconSvg(64), out: 'public/favicon-32.png', size: 32 },
  { svg: faviconSvg(64), out: 'public/favicon-16.png', size: 16 },
  { svg: squareIconSvg(180), out: 'public/apple-touch-icon.png', size: 180 },
  { svg: squareIconSvg(192), out: 'public/icon-192.png', size: 192 },
  { svg: squareIconSvg(512), out: 'public/icon-512.png', size: 512 },
];

for (const job of jobs) {
  await sharp(Buffer.from(job.svg)).resize(job.size, job.size).png().toFile(job.out);
  console.log('✓', job.out);
}

await sharp(Buffer.from(ogImageSvg(1200, 630))).png().toFile('public/og-image.png');
console.log('✓ public/og-image.png');

await sharp(Buffer.from(faviconSvg(64))).resize(64, 64).png().toFile('public/favicon.ico.png');
console.log('✓ public/favicon.ico.png (renombrar/usar como favicon.ico si se necesita formato .ico real)');
