'use strict';

/* CURSOR */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});
function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .destino-card, .paquete-card, .testimonio-card, input, select, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='20px'; cursor.style.height='20px'; follower.style.width='56px'; follower.style.height='56px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='10px'; cursor.style.height='10px'; follower.style.width='36px'; follower.style.height='36px'; });
});

/* PARTICLES */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedY = -(Math.random() * 0.4 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.twinkle = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      const roll = Math.random();
      this.color = roll < 0.15 ? 'rgba(224,92,46,' : roll < 0.4 ? 'rgba(201,168,76,' : 'rgba(200,215,230,';
    }
    update() {
      this.x += this.speedX; this.y += this.speedY;
      this.twinkle += this.twinkleSpeed;
      this.currentOpacity = this.opacity * (Math.sin(this.twinkle) * 0.3 + 0.7);
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.currentOpacity + ')';
      ctx.fill();
    }
  }

  class Firefly extends Particle {
    reset(initial = false) {
      super.reset(initial);
      this.size = Math.random() * 3 + 1.5;
      this.speedY = -(Math.random() * 0.2 + 0.05);
      this.color = 'rgba(201,168,76,';
      this.glowSize = this.size * 5;
    }
    draw() {
      const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowSize);
      grd.addColorStop(0, this.color + this.currentOpacity + ')');
      grd.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.beginPath(); ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();
    }
  }

  const particles = Array.from({length: 80}, (_, i) => i % 12 === 0 ? new Firefly() : new Particle());
  function loop() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(loop); }
  loop();
})();

/* NAVBAR */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 60); }, { passive: true });

/* MOBILE MENU */
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => { mobileMenu.classList.remove('open'); menuToggle.classList.remove('active'); document.body.style.overflow = ''; });
});

/* INTERSECTION OBSERVER — REVEAL */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const children = entry.target.querySelectorAll('.destino-card, .paquete-card, .testimonio-card');
    if (children.length) {
      children.forEach((child, i) => setTimeout(() => child.classList.add('visible'), i * 120));
    } else {
      entry.target.classList.add('visible');
    }
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.destino-card, .paquete-card, .testimonio-card, .destinos-grid, .paquetes-grid, .testimonios-grid').forEach(el => revealObserver.observe(el));

/* COUNTERS */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const steps = 1800 / 16;
  const increment = target / steps;
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); }
    else { el.textContent = Math.floor(current).toLocaleString(); }
  }, 16);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.querySelectorAll('.stat-num').forEach(animateCounter); statsObserver.unobserve(entry.target); } });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* PARALLAX HERO */
const heroVideo = document.querySelector('.hero-video');
window.addEventListener('scroll', () => {
  if (heroVideo && window.scrollY < window.innerHeight) heroVideo.style.transform = `translateY(${window.scrollY * 0.3}px)`;
}, { passive: true });

/* CARD TILT */
document.querySelectorAll('.destino-card, .paquete-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.transition = 'transform 0.5s ease, border-color 0.4s, box-shadow 0.4s'; });
});

/* ACTIVE NAV */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navAnchors.forEach(a => { a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold)' : ''; });
}, { passive: true });

/* FORM */
const ctaForm = document.getElementById('cta-form');
if (ctaForm) {
  ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = ctaForm.querySelector('.form-submit');
    const span = btn.querySelector('span');
    span.textContent = '✦ Solicitud Enviada ✦';
    btn.style.background = '#6b9e65';
    btn.style.pointerEvents = 'none';
    setTimeout(() => { span.textContent = 'Enviar mi Solicitud'; btn.style.background = ''; btn.style.pointerEvents = ''; ctaForm.reset(); }, 4000);
  });
}

/* EMBER CLICK SPARKS */
document.addEventListener('click', (e) => {
  for (let i = 0; i < 8; i++) {
    const spark = document.createElement('div');
    const angle = Math.random() * Math.PI * 2;
    const dist  = Math.random() * 60 + 20;
    spark.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:${Math.random()*6+2}px;height:${Math.random()*6+2}px;background:${Math.random()>0.5?'var(--gold)':'var(--ember)'};border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%)`;
    document.body.appendChild(spark);
    spark.animate([
      { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' },
      { opacity: 0, transform: `translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px)) scale(0)` }
    ], { duration: 600 + Math.random() * 400, easing: 'cubic-bezier(0,0,0.2,1)' }).onfinish = () => spark.remove();
  }
});

/* SECTION TITLE UNDERLINE */
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.backgroundSize = '100% 2px'; titleObserver.unobserve(entry.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('.section-title').forEach(t => {
  Object.assign(t.style, { backgroundImage:'linear-gradient(to right,var(--gold),var(--ember))', backgroundRepeat:'no-repeat', backgroundPosition:'left bottom', backgroundSize:'0% 2px', paddingBottom:'8px', transition:'background-size 0.8s ease' });
  titleObserver.observe(t);
});

/* VIDEO AUTOPLAY ON VIEWPORT */
document.querySelectorAll('video').forEach(video => {
  new IntersectionObserver((entries) => {
    entries.forEach(e => { e.isIntersecting ? video.play().catch(()=>{}) : video.pause(); });
  }, { threshold: 0.2 }).observe(video);
});
