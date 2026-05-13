const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    if(window.scrollY > 50){

        navbar.style.background =
        'rgba(255,255,255,0.92)';

    }else{

        navbar.style.background =
        'rgba(255,255,255,0.78)';
    }
});

/* ANIMACION TARJETAS */

const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries) => {

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

    card.style.transform = 'translateY(40px)';

    card.style.transition =
    'all 1s ease';

    observer.observe(card);
});
