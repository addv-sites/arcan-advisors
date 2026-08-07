// Copy literal — Brand Book Arcan Advisors v1.0, lámina "05. Nuestros Servicios".
// Fuente única: Servicios.astro (render) y BaseLayout.astro (JSON-LD Service)
// consumen este mismo array — evita que el schema.org se desincronice del
// copy real si cambia una línea de servicio.
export const SERVICIOS = [
  {
    title: 'Asesoría en Licitaciones Energéticas',
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
    text: 'Formamos profesionales y empresas con conocimiento práctico y actualizado del mercado eléctrico.',
    items: ['Cursos y talleres especializados', 'Programas in-company', 'Capacitación regulatoria y operativa', 'Análisis de mercado y casos reales'],
    icon: 'M12 3 2 8l10 5 10-5-10-5Z M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5',
    image: 'servicio-02-formacion.webp',
  },
  {
    title: 'Comercialización de Productos Ambientales',
    text: 'Desarrollamos e intermediamos instrumentos ambientales que impulsan la sostenibilidad y generan valor.',
    items: ['Certificados de Energía Renovable (I-REC)', 'Bonos de carbono', 'Garantías de origen renovable'],
    icon: 'M12 2c4 3 6 6 6 10a6 6 0 1 1-12 0c0-4 2-7 6-10Z',
    image: 'servicio-03-ambientales.webp',
  },
  {
    title: 'Consultoría Estratégica en Energía',
    text: 'Utilizamos ARCAN Intelligence™, nuestra herramienta propietaria de análisis de datos y construcción de RFPs que transforma información en decisiones estratégicas de alto impacto.',
    items: [
      'Análisis avanzado de datos energéticos',
      'Construcción inteligente de RFPs con ARCAN Intelligence™',
      'Modelado de escenarios y simulaciones predictivas',
      'Evaluación de riesgos y oportunidades',
    ],
    icon: 'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3',
    image: 'servicio-04-consultoria.webp',
  },
];
