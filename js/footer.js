gsap.from("#footer .footer-brand, #footer .footer-col", {
  scrollTrigger: {
    trigger: "#footer",
    start: "top 80%"
  },
  opacity: 0,
  y: 40,
  duration: 1,
  ease: "power3.out",
  stagger: 0.15
});

/* subtle float on hover */
document.querySelectorAll("#footer a").forEach(link => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, { x: 6, duration: 0.25 });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(link, { x: 0, duration: 0.25 });
  });
});
