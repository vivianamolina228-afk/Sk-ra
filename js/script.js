const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    if(window.scrollY > 50){

        navbar.style.background =
        'rgba(8,8,10,0.75)';

    }else{

        navbar.style.background =
        'rgba(10,10,12,0.35)';
    }
});

/* ANIMACIONES */

const cards = document.querySelectorAll(
'.destination-card, .floating-card, .promo-card, .booking-card'
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.style.opacity = '1';

            entry.target.style.transform =
            'translateY(0)';
        }
    });

},{
    threshold:0.15
});

cards.forEach((card) => {

    card.style.opacity = '0';

    card.style.transform =
    'translateY(40px)';

    card.style.transition =
    'all 1s ease';

    observer.observe(card);
});

/* PARALLAX SUAVE */

const hero = document.querySelector('.hero');

window.addEventListener('mousemove', (e) => {

    let x =
    (window.innerWidth / 2 - e.pageX) / 80;

    let y =
    (window.innerHeight / 2 - e.pageY) / 80;

    hero.style.transform =
    `translate(${x}px, ${y}px)`;
});
