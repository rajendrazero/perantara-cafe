console.clear();
gsap.registerPlugin(ScrollTrigger);

/* =====================================================
   HERO PIN + EXIT (TERKUNCI)
===================================================== */

document.querySelectorAll('[data-parallax~="pin"]').forEach(section => {
    const exitTL = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200%", // ⬅️ RUANG UNTUK EXIT
            scrub: true,
            pin: true,
            pinSpacing: false
        }
    });

    /* ======================
       HERO EXIT SEQUENCE
    ====================== */

    exitTL
        .to(".intro-header", {
            y: -60,
            opacity: 0
        })
        .to(
            ".hero-content-header h1",
            {
                y: -140,
                opacity: 0
            },
            "<"
        )
        .to(
            ".hero-header-blog-text",
            {
                x: -100,
                opacity: 0
            },
            "<"
        )
        .to(
            ".hero-cta",
            {
                y: 100,
                opacity: 0
            },
            "<"
        )
        .to(
            ".decor-1",
            {
                x: 160,
                y: -60,
                opacity: 0,
                scale: 0.95
            },
            "<"
        )
        .to(
            ".decor-2",
            {
                x: -180,
                y: 100,
                opacity: 0,
                scale: 0.95
            },
            "<"
        );
});

/* =====================================================
   REVEAL ENGINE (MENIMPA, SETELAH EXIT)
===================================================== */

document.querySelectorAll('[data-parallax~="reveal"]').forEach(section => {
    const prev = section.previousElementSibling;
    if (!prev) return;

    gsap.fromTo(
        section,
        { yPercent: 100 },
        {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
                trigger: prev,
                start: "bottom top",
                end: "+=100%",
                scrub: true
            }
        }
    );
});

/* ==========================
   PARALLAX LAYER ENGINE
========================== */
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
    document
        .querySelectorAll('[data-parallax~="parallax"]')
        .forEach(section => {
            const bg = section.querySelector('[data-parallax="bg"]');
            const content = section.querySelector('[data-parallax="content"]');
            const float = section.querySelector('[data-parallax="float"]');

            /* BACKGROUND – PALING LAMBAT */
            if (bg) {
                gsap.fromTo(
                    bg,
                    { yPercent: -20 },
                    {
                        yPercent: 20,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            }

            /* CONTENT – SEDANG */
            if (content) {
                gsap.fromTo(
                    content,
                    { yPercent: 10 },
                    {
                        yPercent: -10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            }

            /* FLOAT – PALING CEPAT */
            if (float) {
                gsap.fromTo(
                    float,
                    { yPercent: 30 },
                    {
                        yPercent: -30,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            }
        });
});
