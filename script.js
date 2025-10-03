// Navegación responsive
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const expanded = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', String(expanded));
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar al navegar (mobile)
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Año dinámico en footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Formulario: abre cliente de correo con contenido prellenado
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('name') || {}).value?.trim() || '';
    const email = (document.getElementById('email') || {}).value?.trim() || '';
    const message = (document.getElementById('message') || {}).value?.trim() || '';

    if (!name || !email || !message) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const subject = encodeURIComponent(`Contacto desde web: ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`);
    window.location.href = `mailto:hola@danielagullo.com?subject=${subject}&body=${body}`;
  });
}

// Botón de pedir demo (ejemplo)
const demoBtn = document.getElementById('demo-btn');
if (demoBtn) {
  demoBtn.addEventListener('click', () => {
    const subject = encodeURIComponent('Solicitud de demo — Daniel Agulló');
    const body = encodeURIComponent('Hola Daniel,\n\nMe gustaría agendar una demo para ver propuestas.\n\nGracias.');
    window.location.href = `mailto:hola@danielagullo.com?subject=${subject}&body=${body}`;
  });
}

/* Scroll reveal */
const reveals = document.querySelectorAll('.reveal');
const observerOptions = { root: null, rootMargin: '0px 0px -12% 0px', threshold: 0.12 };

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach((el, idx) => {
    el.style.transitionDelay = `${(idx % 8) * 35}ms`;
    io.observe(el);
  });
} else {
  // Fallback simple
  reveals.forEach(el => el.classList.add('in-view'));
}

/* THEME (modo claro/oscuro) */
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') {
    root.classList.add('dark');
    themeToggle?.setAttribute('aria-pressed', 'true');
    themeToggle?.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    themeToggle?.setAttribute('aria-pressed', 'false');
    themeToggle?.setAttribute('data-theme', 'light');
  }
}

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

let currentTheme = getPreferredTheme();
applyTheme(currentTheme);

// Cambios del sistema (con fallback para navegadores antiguos)
if (window.matchMedia) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = (e) => {
    if (localStorage.getItem('theme') === null) applyTheme(e.matches ? 'dark' : 'light');
  };
  mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
}

themeToggle?.addEventListener('click', () => {
  currentTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(currentTheme);
  localStorage.setItem('theme', currentTheme);
});
