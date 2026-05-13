const heroCard = document.querySelector('.hero-card');

window.addEventListener('mousemove', (e) => {

    const x =
    (window.innerWidth / 2 - e.pageX) / 50;

    const y =
    (window.innerHeight / 2 - e.pageY) / 50;

    heroCard.style.transform =
    `rotateY(${x}deg) rotateX(${-y}deg)`;
});

/* PROMO HOVER */

const promoCards =
document.querySelectorAll('.promo-card');

promoCards.forEach((card) => {

    card.addEventListener('mouseenter', () => {

        card.style.boxShadow =
        '0 20px 40px rgba(214,176,107,0.15)';
    });

    card.addEventListener('mouseleave', () => {

        card.style.boxShadow = 'none';
    });
});
