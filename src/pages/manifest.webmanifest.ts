import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const base = import.meta.env.BASE_URL;
  const manifest = {
    name: 'Arcan Advisors — Estrategia de compra de energía',
    short_name: 'Arcan Advisors',
    description:
      'Asesoría estratégica en compra de energía para grandes consumidores y participantes del Mercado Eléctrico Mayorista en México.',
    start_url: base,
    scope: base,
    display: 'standalone',
    background_color: '#031c0e',
    theme_color: '#031c0e',
    lang: 'es-MX',
    icons: [
      { src: `${base}icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${base}icon-512.png`, sizes: '512x512', type: 'image/png' },
    ],
  };
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
