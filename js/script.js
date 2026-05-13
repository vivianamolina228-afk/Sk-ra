const destinations = document.querySelectorAll(".destination");

destinations.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateX(10px) scale(1.02)";
        card.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateX(0px) scale(1)";
        card.style.boxShadow = "none";

    });

});

const buttons = document.querySelectorAll(
".primary-btn, .secondary-btn, .book-btn"
);

buttons.forEach((button)=>{

    button.addEventListener("mouseenter", ()=>{

        button.style.transform = "translateY(-3px)";

    });

    button.addEventListener("mouseleave", ()=>{

        button.style.transform = "translateY(0px)";

    });

});

window.addEventListener("scroll", ()=>{

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){

        navbar.style.background = "rgba(5,5,10,0.6)";
        navbar.style.backdropFilter = "blur(12px)";
        navbar.style.position = "sticky";
        navbar.style.top = "0";

    } else {

        navbar.style.background = "transparent";

    }

});
