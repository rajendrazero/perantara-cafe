gsap.registerPlugin(ScrollTrigger);

/* SECTION ANIMATION */
gsap.from(".alamat", {
  scrollTrigger: {
    trigger: ".alamat",
    start: "top 75%",
  },
  opacity: 0,
  y: 80,
  duration: 1,
  ease: "power3.out",
});

/* MAP ZOOM IN */
gsap.from(".alamat-map iframe", {
  scrollTrigger: {
    trigger: ".alamat",
    start: "top 75%",
  },
  scale: 1.15,
  duration: 1.4,
  ease: "power3.out",
});

/* INFO STAGGER */
gsap.from(".alamat-info > *", {
  scrollTrigger: {
    trigger: ".alamat",
    start: "top 70%",
  },
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out",
});
