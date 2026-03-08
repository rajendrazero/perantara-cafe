const loader = document.getElementById("loader");
const dots = document.querySelectorAll(".loader-dots span");
const wrap = document.querySelector(".loader-wrap");

/* DOT ANIMATION */
gsap.to(dots, {
    opacity: 1,
    stagger: 0.2,
    duration: 0.4,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut"
});

/* EXIT ANIMATION */
window.addEventListener("load", () => {

    gsap.to(wrap, {
        opacity: 0,
        duration: 1,
        delay: 1.2,
        ease: "power2.out"
    });

    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        delay: 1.4,
        ease: "power2.out",
        onComplete: () => {
            loader.style.display = "none";
        }
    });

});