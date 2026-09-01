// Copy actualizado según brief de reposicionamiento del cliente (clientCom.md,
// sección 9) — reemplaza el copy original del Brand Book v1.0.
// Fuente única: Servicios.astro (render) y BaseLayout.astro (JSON-LD Service)
// consumen este mismo array — evita que el schema.org se desincronice del
// copy real si cambia una línea de servicio.
export const SERVICIOS = [
  {
    title: 'Asesoría en licitaciones de suministro eléctrico',
    text: 'Diseñamos y gestionamos procesos de licitación energética con enfoque estratégico, técnico y regulatorio.',
    items: [
      'Diseño y estructuración de RFPs',
      'Acompañamiento integral en licitaciones',
      'Evaluación técnica y económica',
      'Cumplimiento regulatorio',
      'Gestión de riesgos y optimización de ofertas',
    ],
    icon: 'M9 3h6v3H9V3Z M6 6h12v15H6V6Z M9 13l2 2 4-4',
    image: 'servicio-01-licitaciones.webp',
  },
  {
    title: 'Formación en Mercado Eléctrico Mayorista',
    text: 'Formamos profesionales y empresas con conocimiento práctico y actualizado del mercado eléctrico. Impartida por quien operó el mercado desde el lado del suministrador.',
    items: ['Cursos y talleres especializados', 'Programas in-company', 'Capacitación regulatoria y operativa', 'Análisis de mercado y casos reales'],
    icon: 'M12 3 2 8l10 5 10-5-10-5Z M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5',
    image: 'servicio-02-formacion.webp',
  },
  {
    title: 'Comercialización de Productos Ambientales (I-REC, GDOs, créditos de carbono)',
    text: 'Intermediamos instrumentos ambientales como capacidad complementaria a la estrategia de compra de energía.',
    items: ['Certificados de Energía Renovable (I-REC)', 'Garantías de Origen (GDOs)', 'Créditos de carbono'],
    icon: 'M12 2c4 3 6 6 6 10a6 6 0 1 1-12 0c0-4 2-7 6-10Z',
    image: 'servicio-03-ambientales.webp',
  },
  {
    title: 'Consultoría Estratégica en Energía',
    text: 'Estrategia de compra, análisis de mercado y evaluación de alternativas para que el cliente negocie desde una posición informada.',
    items: [
      'Gestión de contratos de suministro eléctrico vigentes',
      'Evaluación de alternativas de suministro',
      'Análisis de contratos y riesgos',
      'Análisis de costos y posición competitiva',
      'Soporte para la toma de decisiones',
    ],
    icon: 'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3',
    image: 'servicio-04-consultoria.webp',
  },
];
