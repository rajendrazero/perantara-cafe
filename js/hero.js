gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   HERO TIMELINE – PERANTARA
   ========================================================= */

const heroTL = gsap.timeline({
    defaults: {
        ease: "power3.out",
        duration: 1
    }
});

/* -----------------------------------------
   OVERLAY (biar halus)
----------------------------------------- */
heroTL.from(".hero-overlay", {
    opacity: 0,
    duration: 1.2
});

/* -----------------------------------------
   INTRO HEADER
----------------------------------------- */
heroTL.from(
    ".intro-header",
    {
        y: 20,
        opacity: 0
    },
    "-=0.6"
);

/* -----------------------------------------
   HERO TITLE
----------------------------------------- */
heroTL.from(
    ".hero-content-header h1",
    {
        y: 60,
        opacity: 0,
        duration: 1.2
    },
    "-=0.4"
);

/* -----------------------------------------
   SOCIAL (KANAN → KIRI)
----------------------------------------- */
heroTL.from(
    ".hero-header-blog-text li",
    {
        x: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6
    },
    "-=0.6"
);

/* -----------------------------------------
   CTA BUTTON
----------------------------------------- */
heroTL.from(
    ".hero-cta",
    {
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.8
    },
    "-=0.4"
);

/* -----------------------------------------
   FOTO 1 (BELAKANG JUDUL)
----------------------------------------- */
heroTL.from(
    ".decor-1",
    {
        x: -40,
        y: 20,
        opacity: 0,
        scale: 0.96,
        duration: 1.2
    },
    "-=0.6"
);

/* -----------------------------------------
   FOTO 2 (BELAKANG TEKS)
----------------------------------------- */
heroTL.from(
    ".decor-2",
    {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 1.2
    },
    "-=0.8"
);

gsap.fromTo(
    ".hero-shadow",
    { opacity: 0 },
    {
        opacity: 1,
        scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "top center",
            scrub: true
        }
    }
);
