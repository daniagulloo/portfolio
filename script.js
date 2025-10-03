// Navegación responsive
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  const expanded = nav.classList.contains('open');
  navToggle.setAttribute('aria-expanded', expanded);
});

// Año dinámico en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Formulario: abre cliente de correo con contenido prellenado
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

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

/* Scroll reveal: añade la clase .in-view cuando el elemento entra en pantalla.
   Aplica un pequeño stagger para elementos en la misma sección. */
const reveals = document.querySelectorAll('.reveal');
const observerOptions = { root: null, rootMargin: '0px 0px -12% 0px', threshold: 0.12 };

let io = new IntersectionObserver((entries) => {
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

// Cerrar menú al hacer click en un enlace (mobile)
document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

/* THEME (modo claro/oscuro)
   - Detecta preferencia del sistema.
   - Lee/guarda en localStorage 'theme' = 'dark' | 'light'.
   - Toggle manual con botón #theme-toggle.
*/
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'dark') {
    root.classList.add('dark');
    themeToggle.setAttribute('aria-pressed', 'true');
    themeToggle.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    themeToggle.setAttribute('aria-pressed', 'false');
    themeToggle.setAttribute('data-theme', 'light');
  }
}

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  // fallback to system preference
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

// Inicializar tema
let currentTheme = getPreferredTheme();
applyTheme(currentTheme);

// Escucha cambios de preferencia del sistema (si usuario no tenía elección guardada)
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const stored = localStorage.getItem('theme');
  if (stored === null) { // only change if user hasn't chosen
    const newTheme = e.matches ? 'dark' : 'light';
    applyTheme(newTheme);
  }
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    currentTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
  });
}
