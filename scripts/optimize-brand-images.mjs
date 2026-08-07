// Redimensiona/comprime assets reales de marca al tamaño de uso real —
// PageSpeed Insights marcó logo-arcan-advisors.webp (1350x436, servido a
// height:59px) y logo-footer.webp (558x555, servido a height:85px) como
// muy pesados para su tamaño mostrado. Regenera desde las fuentes limpias
// (con alfa real, sin el problema de checkerboard resuelto antes) a ~3x el
// tamaño de display (retina) en vez de servir el archivo original completo.
// Mismo tratamiento para las fotos de Servicios (900x675, mostradas a
// ~637x478). Volver a correr si cambia algún asset fuente.
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

async function main() {
  await resizeTo('public/logosf.png', 'public/logo-arcan-advisors.webp', { height: 180, quality: 85 });
  await resizeTo('public/LogoFooter.png', 'public/logo-footer.webp', { height: 255, quality: 85 });

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
