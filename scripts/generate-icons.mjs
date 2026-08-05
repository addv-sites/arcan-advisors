// Utilidad de build-time: arma favicons/manifest icons/OG image reales a
// partir del logo real que entregó el cliente en public/favicon-package/
// (generado por él con su propia herramienta — no se toca ese diseño acá,
// solo se convierte a los tamaños/formatos que el sitio necesita).
// Correr de nuevo si el cliente entrega un favicon-package actualizado:
// `node scripts/generate-icons.mjs`.
import sharp from 'sharp';
import { copyFileSync } from 'node:fs';

const FOREST = '#031c0e'; // Forest Green corregido por el cliente 2026-08-05, ver tokens.css
const OLIVE = '#3b4c38';
const GOLD = '#c18613'; // Gold corregido por el cliente 2026-08-05, ver tokens.css
const WHITE = '#ffffff';

const PKG = 'public/favicon-package/';

// 1. Favicons / manifest icons — conversión directa del paquete real,
//    sin redibujar el logo.
await sharp(`${PKG}favicon-16x16.png`).toFile('public/favicon-16.png');
await sharp(`${PKG}favicon-32x32.png`).toFile('public/favicon-32.png');
await sharp({ create: { width: 180, height: 180, channels: 3, background: FOREST } })
  .composite([{ input: `${PKG}apple-touch-icon.png` }])
  .png()
  .toFile('public/apple-touch-icon.png');
await sharp(`${PKG}android-chrome-192x192.png`).toFile('public/icon-192.png');
await sharp(`${PKG}android-chrome-512x512.png`).toFile('public/icon-512.png');
copyFileSync(`${PKG}favicon.ico`, 'public/favicon.ico');
console.log('✓ favicons/manifest icons (desde favicon-package real)');

// 2. OG image — fondo/patrón/texto propios del sitio + el logo real
//    (favicon-1024x1024.png) compuesto encima, en vez del isólogo dibujado.
function ogBackgroundSvg(width, height) {
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
      <text x="${width / 2}" y="${height / 2 + 150}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700" fill="${WHITE}" letter-spacing="4">ARCAN ADVISORS</text>
      <text x="${width / 2}" y="${height / 2 + 200}" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" letter-spacing="8" fill="${GOLD}">INTELIGENCIA ENERGÉTICA</text>
    </svg>
  `;
}

const OG_W = 1200;
const OG_H = 630;
const markSize = 220;

await sharp(Buffer.from(ogBackgroundSvg(OG_W, OG_H)))
  .composite([
    {
      input: await sharp(`${PKG}favicon-1024x1024.png`).resize(markSize, markSize).toBuffer(),
      left: Math.round(OG_W / 2 - markSize / 2),
      top: Math.round(OG_H / 2 - markSize / 2 - 60),
    },
  ])
  .png()
  .toFile('public/og-image.png');
console.log('✓ public/og-image.png (con logo real)');
