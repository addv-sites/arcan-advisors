// Datos reales de contacto — Brand Book Arcan Advisors v1.0 (pág. 09, "Firma de correo").
export const SITE = {
  name: 'Arcan Advisors',
  tagline: 'Conocemos el mercado eléctrico mexicano desde adentro',
  legalName: 'Arcan Advisors',
  // FASE PRE-APROBACIÓN: cambiar a 'https://www.arcanadvisors.com' cuando se conecte el dominio propio.
  url: 'https://addv-prototipos.github.io/arcan-prototipo/',
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
