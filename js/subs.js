gsap.registerPlugin(ScrollTrigger);

gsap.from("#subscribe .subscribe-box", {
  scrollTrigger: {
    trigger: "#subscribe",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});
