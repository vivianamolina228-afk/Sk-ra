// EFECTO PARALLAX SUAVE

window.addEventListener("mousemove", (e) => {

  const cards = document.querySelectorAll(".floating-card");

  let x = e.clientX / window.innerWidth;
  let y = e.clientY / window.innerHeight;

  cards.forEach((card, index) => {

    let speed = (index + 1) * 10;

    card.style.transform = `
      translate(
        ${x * speed}px,
        ${y * speed}px
      )
    `;
  });

});

// APARICION SUAVE

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting) {
      entry.target.classList.add("show");
    }

  });

});

document.querySelectorAll(
  ".destination-card, .glass-panel, .cta-box"
).forEach((el) => {
  observer.observe(el);
});
