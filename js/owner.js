gsap.registerPlugin();

/* WAVE MOTION */
gsap.to(".wave-svg path", {
  x: -120,
  duration: 12,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true,
  stagger: 1
});

/* GOLD CLOUD FLOAT */
gsap.to(".cloud-1", {
  x: 120,
  y: 60,
  duration: 18,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

gsap.to(".cloud-2", {
  x: -100,
  y: -80,
  duration: 22,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});
