gsap.registerPlugin(ScrollTrigger);

gsap.from(".gallery-item", {
  scrollTrigger: {
    trigger: "#gallery",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  scale: 0.95,
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.12
});
