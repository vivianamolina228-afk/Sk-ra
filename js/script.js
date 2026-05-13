/* NAVBAR TRANSPARENCIA */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    if(window.scrollY > 50){

        navbar.style.background =
        'rgba(10,10,12,0.78)';

    }else{

        navbar.style.background =
        'rgba(15,15,18,0.55)';
    }
});

/* ANIMACION CARDS */

const cards =
document.querySelectorAll('.card');

const observer =
new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.style.opacity = '1';

            entry.target.style.transform =
            'translateY(0)';
        }
    });

},{
    threshold:0.2
});

cards.forEach((card) => {

    card.style.opacity = '0';

    card.style.transform =
    'translateY(50px)';

    card.style.transition =
    'all 1s ease';

    observer.observe(card);
});

/* HERO PARALLAX */

const hero =
document.querySelector('.hero-card-image');

window.addEventListener('mousemove', (e) => {

    let x =
    (window.innerWidth / 2 - e.pageX) / 80;

    let y =
    (window.innerHeight / 2 - e.pageY) / 80;

    hero.style.transform =
    `translate(${x}px, ${y}px)`;
});
