const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    if(window.scrollY > 50){

        navbar.style.background =
        'rgba(255,255,255,0.92)';

    }else{

        navbar.style.background =
        'rgba(255,255,255,0.75)';
    }
});

/* MENU MOBILE */

const menuToggle =
document.getElementById('menuToggle');

const mobileMenu =
document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {

    mobileMenu.classList.toggle('active');
});

/* ANIMACION HERO */

const heroTitle =
document.querySelector('.hero h1');

window.addEventListener('mousemove', (e) => {

    let x =
    (window.innerWidth / 2 - e.pageX) / 50;

    let y =
    (window.innerHeight / 2 - e.pageY) / 50;

    heroTitle.style.transform =
    `translate(${x}px, ${y}px)`;
});
