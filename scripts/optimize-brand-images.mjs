// Redimensiona/comprime assets reales de marca al tamaño de uso real —
// PageSpeed Insights marcó logo-arcan-advisors.webp (servido a height:59px)
// y logo-footer.webp (servido a height:85px) como muy pesados para su
// tamaño mostrado. Regenera desde las fuentes que aporta el cliente
// (public/logo-arcan-advisors.png, public/LogoFooter.png) a ~3x el tamaño
// de display (retina) en vez de servir el archivo original completo.
// Mismo tratamiento para las fotos de Servicios (900x675, mostradas a
// ~637x478). Volver a correr si el cliente entrega una versión nueva de
// alguna de estas fuentes.
import sharp from 'sharp';

async function resizeTo(src, out, { height, width, quality = 82 }) {
  // src y out pueden ser el mismo archivo (servicios): escribe a un
  // .tmp y listo — Node fs.copyFileSync/renameSync fallan en este entorno
  // Windows al sobreescribir el destino (bloqueo transitorio de
  // antivirus/indexado); el swap final .tmp -> destino se hace aparte
  // (PowerShell Copy-Item, que sí puede).
  const target = src === out ? `${out}.tmp` : out;
  await sharp(src).resize(height ? { height } : { width }).webp({ quality }).toFile(target);
  const meta = await sharp(target).metadata();
  console.log(`✓ ${target} (${meta.width}x${meta.height})`);
}

// Los lockups reales que aporta el cliente traen el wordmark "ARCAN" en
// negro/oscuro (pensado para fondo claro) — el dorado de la marca queda
// intacto (nunca cae por debajo de mx~140, confirmado con un scan de la
// fuente), así que un umbral simple de brillo alcanza para distinguir texto
// de marca sin tocar el dorado. Sin este paso, el wordmark queda oscuro
// sobre el Forest Green del Nav/footer — invisible. trim() antes de
// recolorear/redimensionar recorta el padding transparente de la fuente
// (relevante sobre todo en LogoFooter.png, que trae mucho aire/glow
// alrededor del mark) para no arrastrar ese padding al tamaño final.
async function recolorDarkWordmark(src) {
  const { data, info } = await sharp(src).trim().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let p = 0; p < width * height; p++) {
    const o = p * channels;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const mx = Math.max(r, g, b);
    const mn = Math.min(r, g, b);
    if (mx - mn <= 20 && mx < 150) {
      data[o] = 255;
      data[o + 1] = 255;
      data[o + 2] = 255;
    }
  }
  return sharp(data, { raw: { width, height, channels } });
}

async function main() {
  const navRecolored = await recolorDarkWordmark('public/logo-arcan-advisors.png');
  await navRecolored.resize({ height: 180 }).webp({ quality: 85 }).toFile('public/logo-arcan-advisors.webp.tmp');
  console.log('✓ public/logo-arcan-advisors.webp.tmp');

  const footerRecolored = await recolorDarkWordmark('public/LogoFooter.png');
  await footerRecolored.resize({ height: 255 }).webp({ quality: 85 }).toFile('public/logo-footer.webp.tmp');
  console.log('✓ public/logo-footer.webp.tmp');

  const servicios = [
    'servicio-01-licitaciones.webp',
    'servicio-02-formacion.webp',
    'servicio-03-ambientales.webp',
    'servicio-04-consultoria.webp',
  ];
  for (const file of servicios) {
    const path = `public/images/servicios/${file}`;
    await resizeTo(path, path, { width: 720, quality: 80 });
  }
}

main();
