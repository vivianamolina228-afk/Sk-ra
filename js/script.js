const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    if(window.scrollY > 50){

        navbar.style.background = 'rgba(255,255,255,0.82)';
        navbar.style.borderBottom =
        '1px solid rgba(0,0,0,0.12)';

    }else{

        navbar.style.background = 'rgba(255,255,255,0.55)';
        navbar.style.borderBottom =
        '1px solid rgba(0,0,0,0.08)';
    }
});

/* ANIMACIONES CARDS */

const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add('show');
        }
    });

},{
    threshold:0.2
});

cards.forEach((card) => {

    observer.observe(card);
});

/* EFECTO TITULO */

const heroTitle = document.querySelector('.hero h1');

window.addEventListener('mousemove', (e) => {

    let x =
    (window.innerWidth / 2 - e.pageX) / 40;

    let y =
    (window.innerHeight / 2 - e.pageY) / 40;

    heroTitle.style.transform =
    `translate(${x}px, ${y}px)`;
});

/* MENU MOBILE */

const menuToggle =
document.getElementById('menuToggle');

const mobileMenu =
document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {

    mobileMenu.classList.toggle('active');
});

/* CERRAR MENU */

const mobileLinks =
document.querySelectorAll('.mobile-menu a');

mobileLinks.forEach((link) => {

    link.addEventListener('click', () => {

        mobileMenu.classList.remove('active');
    });
});
