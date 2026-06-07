// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.position = 'fixed';
  navLinks.style.top = '70px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.flexDirection = 'column';
  navLinks.style.background = '#0e0e0e';
  navLinks.style.padding = '24px';
  navLinks.style.gap = '20px';
  navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
  navLinks.style.zIndex = '999';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    navLinks.style.display = 'none';
  }
}));

// ===== FADE IN ON SCROLL =====
const observerOptions = { threshold: 0.12 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const fadeEls = [
  'hero-badge', 'hero-title', 'hero-sub', 'hero-pills', 'hero-cta', 'hero-trust', 'hero-visual',
  'services-grid', 'numbers-grid', 'testimonials-grid', 'rating-bar', 'testimonials-cta-btn',
  'contact-form'
];
fadeEls.forEach(id => {
  const el = document.getElementById(id);
  if (el) { el.classList.add('fade-in'); observer.observe(el); }
});

// Grid children staggered
['services-grid', 'numbers-grid', 'testimonials-grid'].forEach(gridId => {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  Array.from(grid.children).forEach((child, i) => {
    child.classList.add('fade-in');
    child.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(child);
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1600) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

const numbersSection = document.getElementById('numbers-grid');
let countersStarted = false;
const counterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    document.querySelectorAll('.number-value[data-target]').forEach(el => {
      animateCounter(el, parseInt(el.dataset.target));
    });
  }
}, { threshold: 0.3 });
if (numbersSection) counterObserver.observe(numbersSection);

// ===== FORM SUBMISSION =====
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('form-submit');
  btn.textContent = '✓ Mensagem enviada! Entraremos em contato em breve.';
  btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    btn.innerHTML = 'Quero meu diagnóstico gratuito <span class="btn-arrow">→</span>';
    btn.style.background = '';
    btn.style.pointerEvents = '';
  }, 4000);
});

// ===== SMOOTH SCROLL OFFSET FOR FIXED NAV =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== WHATSAPP MASK =====
const wpInput = document.getElementById('whatsapp');
if (wpInput) {
  wpInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 11);
    if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    e.target.value = v;
  });
}

