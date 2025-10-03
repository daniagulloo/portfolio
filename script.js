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

// Botón de pedir demo (ejemplo)
const demoBtn = document.getElementById('demo-btn');
demoBtn.addEventListener('click', () => {
  const subject = encodeURIComponent('Solicitud de demo — Daniel Agulló');
  const body = encodeURIComponent('Hola Daniel,\n\nMe gustaría agendar una demo para ver propuestas.\n\nGracias.');
  window.location.href = `mailto:hola@danielagullo.com?subject=${subject}&body=${body}`;
});
