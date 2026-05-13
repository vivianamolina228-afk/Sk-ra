/* ═══════════════════════════════════════════
   SKÝRA · TRAVEL AGENCY · MAIN SCRIPTS
   ═══════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════
   1. CUSTOM CURSOR
══════════════════════════════════════ */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
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

// Scale cursor on hoverable elements
document.querySelectorAll('a, button, .destino-card, .paquete-card, .testimonio-card, input, select, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width    = '20px';
    cursor.style.height   = '20px';
    follower.style.width  = '56px';
    follower.style.height = '56px';
    follower.style.borderColor = 'var(--gold)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width    = '10px';
    cursor.style.height   = '10px';
    follower.style.width  = '36px';
    follower.style.height = '36px';
    follower.style.borderColor = 'var(--gold)';
  });
});

/* ══════════════════════════════════════
   2. PARTICLES CANVAS
══════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 80;
  const particles = [];

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x     = Math.random() * canvas.width;
      this.y     = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.size  = Math.random() * 1.5 + 0.3;
      this.speedY = -(Math.random() * 0.4 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.twinkle = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      // Dragon/ember coloring
      const roll = Math.random();
      if (roll < 0.15) {
        this.color = `rgba(224, 92, 46,`;    // ember
      } else if (roll < 0.4) {
        this.color = `rgba(201, 168, 76,`;   // gold
      } else {
        this.color = `rgba(200, 215, 230,`;  // mist
      }
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.twinkle += this.twinkleSpeed;
      const tw = Math.sin(this.twinkle) * 0.3 + 0.7;
      this.currentOpacity = this.opacity * tw;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.currentOpacity + ')';
      ctx.fill();
    }
  }

  // Occasional "firefly" larger glow
  class Firefly extends Particle {
    constructor() { super(); }
    reset(initial = false) {
      super.reset(initial);
      this.size = Math.random() * 3 + 1.5;
      this.speedY = -(Math.random() * 0.2 + 0.05);
      this.color  = `rgba(201, 168, 76,`;
      this.glowSize = this.size * 5;
    }
    draw() {
      const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowSize);
      grd.addColorStop(0, this.color + this.currentOpacity + ')');
      grd.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(i % 12 === 0 ? new Firefly() : new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ══════════════════════════════════════
   3. NAVBAR SCROLL BEHAVIOR
══════════════════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ══════════════════════════════════════
   4. MOBILE MENU
══════════════════════════════════════ */
const menuToggle  = document.getElementById('menu-toggle');
const mobileMenu  = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* ══════════════════════════════════════
   5. INTERSECTION OBSERVER · REVEAL
══════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger children if grid
      const children = entry.target.querySelectorAll('.destino-card, .paquete-card, .testimonio-card');
      if (children.length) {
        children.forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 120);
        });
      } else {
        entry.target.classList.add('visible');
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.destino-card, .paquete-card, .testimonio-card, .destinos-grid, .paquetes-grid, .testimonios-grid'
).forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════
   6. COUNTER ANIMATION (Hero stats)
══════════════════════════════════════ */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step     = 16;
  const steps    = duration / step;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ══════════════════════════════════════
   7. PARALLAX · HERO
══════════════════════════════════════ */
const heroVideo = document.querySelector('.hero-video');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (heroVideo && scrolled < window.innerHeight) {
    heroVideo.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
}, { passive: true });

/* ══════════════════════════════════════
   8. CARD TILT EFFECT
══════════════════════════════════════ */
document.querySelectorAll('.destino-card, .paquete-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) *  6;
    card.style.transform    = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.transition   = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform 0.5s ease, border-color 0.4s, box-shadow 0.4s';
  });
});

/* ══════════════════════════════════════
   9. SMOOTH ACTIVE NAV LINK
══════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--gold)'
      : '';
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ══════════════════════════════════════
   10. FORM SUBMIT
══════════════════════════════════════ */
const ctaForm = document.getElementById('cta-form');
if (ctaForm) {
  ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = ctaForm.querySelector('.form-submit span');
    const originalText = btn.textContent;
    btn.textContent = '✦ Solicitud Enviada ✦';
    ctaForm.querySelector('.form-submit').style.background = 'var(--moss-light)';
    ctaForm.querySelector('.form-submit').style.pointerEvents = 'none';
    setTimeout(() => {
      btn.textContent = originalText;
      ctaForm.querySelector('.form-submit').style.background = '';
      ctaForm.querySelector('.form-submit').style.pointerEvents = '';
      ctaForm.reset();
    }, 4000);
  });
}

/* ══════════════════════════════════════
   11. RUNE RING MOUSE PARALLAX
══════════════════════════════════════ */
const heroSection = document.getElementById('hero');
const runeRings   = document.querySelectorAll('.rune-ring-1, .rune-ring-2');

if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const mx   = (e.clientX - rect.width  / 2) / rect.width;
    const my   = (e.clientY - rect.height / 2) / rect.height;
    runeRings.forEach((ring, i) => {
      const factor = (i + 1) * 20;
      ring.style.transform = `translate(calc(-50% + ${mx * factor}px), calc(-50% + ${my * factor}px)) rotate(${Date.now() * 0.001 * (i % 2 === 0 ? 1 : -1)}rad)`;
    });
  });
}

/* ══════════════════════════════════════
   12. GOLD EMBER TRAIL ON CLICK
══════════════════════════════════════ */
document.addEventListener('click', (e) => {
  for (let i = 0; i < 8; i++) {
    const spark = document.createElement('div');
    spark.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top:  ${e.clientY}px;
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      background: ${Math.random() > 0.5 ? 'var(--gold)' : 'var(--ember)'};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(spark);

    const angle    = (Math.random() * 360) * (Math.PI / 180);
    const distance = Math.random() * 60 + 20;
    const tx       = Math.cos(angle) * distance;
    const ty       = Math.sin(angle) * distance;

    spark.animate([
      { opacity: 1, transform: `translate(calc(-50% + 0px), calc(-50% + 0px)) scale(1)` },
      { opacity: 0, transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)` }
    ], { duration: 600 + Math.random() * 400, easing: 'cubic-bezier(0,0,0.2,1)' }).onfinish = () => spark.remove();
  }
});

/* ══════════════════════════════════════
   13. SECTION TITLE BOTANICAL UNDERLINE
══════════════════════════════════════ */
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.backgroundSize = '100% 2px';
      titleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(title => {
  title.style.backgroundImage = 'linear-gradient(to right, var(--gold), var(--ember))';
  title.style.backgroundRepeat = 'no-repeat';
  title.style.backgroundPosition = 'left bottom';
  title.style.backgroundSize = '0% 2px';
  title.style.paddingBottom = '8px';
  title.style.transition = 'background-size 0.8s ease';
  titleObserver.observe(title);
});

/* ══════════════════════════════════════
   14. VIDEO CINEMATIC OBSERVER
══════════════════════════════════════ */
document.querySelectorAll('video').forEach(video => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.2 });
  obs.observe(video);
});

/* ══════════════════════════════════════
   15. INIT LOG
══════════════════════════════════════ */
console.log(`
%c🐉 Skýra Travel Agency
%cWhere Dragons Guide Your Journey
%cBuilt with ❤️ and dragonfire
`,
'color: #c9a84c; font-size: 1.4rem; font-weight: bold;',
'color: #8a7a55; font-size: 0.9rem;',
'color: #555; font-size: 0.75rem;'
);
