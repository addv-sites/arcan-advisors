// Animación "emergente" on-scroll para elementos [data-reveal].
// Progressive enhancement: el CSS solo oculta [data-reveal] cuando esta
// clase confirma que el JS corrió — si el script falla, el contenido
// queda visible por default (nunca se pierde contenido por un fallo de JS).
document.documentElement.classList.add('reveal-ready');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
}
