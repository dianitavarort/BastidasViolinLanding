/* ============================================================
   BASTIDAS VIOLIN — Landing de eventos
   JS puro y mínimo: WhatsApp, menú móvil, reveals y año.
   ============================================================ */

// Número centralizado de WhatsApp (Colombia)
const WHATSAPP_NUMBER = '573162910191';

// Mensajes pre-rellenados por contexto
const WA_MESSAGES = {
  general:    'Hola Enmanuel 👋 Vi tu página y me gustaría tener violín en vivo en mi evento. ¿Me cuentas más?',
  boda:       'Hola Enmanuel 👋 Quiero cotizar violín en vivo para una boda 💒 ¿Me ayudas con disponibilidad y repertorio?',
  serenata:   'Hola Enmanuel 👋 Me encantaría cotizar una serenata con violín 🌹 ¿Cómo funciona?',
  fiesta:     'Hola Enmanuel 👋 Quiero violín en vivo para una fiesta privada 🎂 ¿Me cuentas las opciones?',
  corporativo:'Hola Enmanuel 👋 Organizo un evento corporativo y queremos violín en vivo 🏢 ¿Me envías una propuesta?'
};

/* ---------- Enlaces de WhatsApp ---------- */
// Todos los .wa-link tienen data-wa-key (clave del mensaje).
// JS reemplaza el href base por wa.me con el mensaje codificado.
document.querySelectorAll('.wa-link').forEach((link) => {
  const key = link.dataset.waKey || 'general';
  const msg = WA_MESSAGES[key] || WA_MESSAGES.general;
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
});

/* ---------- Menú móvil ---------- */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

function closeMenu() {
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  });

  // Cerrar al hacer clic en un enlace
  mainNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });
}

/* ---------- Sombra del header al hacer scroll ---------- */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Animaciones de entrada (reveal) ---------- */
// Solo si el usuario no prefiere movimiento reducido.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
}

/* ---------- Videos: cargar solo al hacer clic ---------- */
// Los embeds de TikTok/Instagram se cargan únicamente cuando el visitante
// hace clic. Evita el error "overload protect" de TikTok (el embed no se
// satura al recargar la página) y acelera la carga inicial.
document.querySelectorAll('.video-facade').forEach((facade) => {
  const embedUrl = facade.dataset.embedUrl;
  if (!embedUrl) return;

  const loadEmbed = () => {
    if (facade.classList.contains('is-loaded')) return;

    // Reservar espacio para la barra inferior del reproductor embebido.
    // Importante: medir la altura ANTES de quitar el aspect-ratio
    // (si no, el contenedor colapsa y el video queda pequeñísimo).
    const extra = parseInt(facade.dataset.embedExtra || '0', 10);
    if (extra > 0) {
      const targetHeight = facade.offsetHeight + extra;
      facade.style.aspectRatio = 'auto';
      facade.style.height = targetHeight + 'px';
    }

    facade.classList.add('is-loaded');
    facade.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.title = facade.dataset.embedTitle || 'Video';
    iframe.loading = 'lazy';
    iframe.setAttribute('scrolling', 'no');
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    facade.appendChild(iframe);
  };

  facade.addEventListener('click', loadEmbed);
  facade.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      loadEmbed();
    }
  });
});

/* ---------- Año del footer ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
