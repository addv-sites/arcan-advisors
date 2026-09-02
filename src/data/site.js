// Datos reales de contacto — Brand Book Arcan Advisors v1.0 (pág. 09, "Firma de correo").
// URL base-aware: en CI lee GITHUB_REPOSITORY para no hardcodear DEV/PROD.
// Local (sin env) cae en DEV.
const isProdRepo = typeof process !== 'undefined' && process.env.GITHUB_REPOSITORY === 'addv-sites/arcan-advisors';
const prodUrl = 'https://addv-sites.github.io/arcan-advisors/';
const devUrl = 'https://addv-prototipos.github.io/arcan-prototipo/';

export const SITE = {
  name: 'Arcan Advisors',
  tagline: 'Conocemos el mercado eléctrico mexicano desde adentro',
  legalName: 'Arcan Advisors',
  // FASE PRE-APROBACIÓN: cambiar a 'https://www.arcanadvisors.com' cuando se conecte el dominio propio.
  url: isProdRepo ? prodUrl : devUrl,
  email: 'contacto@arcanadvisors.com',
  whatsapp: '+525652508354',
  whatsappDisplay: '+52 56 5250 8354',
  address: {
    street: 'Blvd. Ávila Camacho No.36',
    floor: 'Piso 10',
    neighborhood: 'Col. Lomas de Chapultepec',
    city: 'CDMX',
    zip: 'C.P. 11000',
    country: 'México',
  },
};

export function getWhatsAppLink({ nombre = '', empresa = '', correo = '', telefono = '', servicio = '', mensaje = '' } = {}) {
  const lines = [
    'Nuevo contacto desde Arcan Advisors',
    '',
    `Nombre: ${nombre}`,
    `Empresa: ${empresa}`,
    `Correo: ${correo}`,
    `Teléfono: ${telefono}`,
    `Servicio de interés: ${servicio}`,
    `Mensaje: ${mensaje}`,
  ];
  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${SITE.whatsapp.replace('+', '')}?text=${text}`;
}
