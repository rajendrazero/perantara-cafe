// ============================
// animasi.js (Global, Efek Masuk Terus Muncul)
// ============================

gsap.registerPlugin(ScrollTrigger);

// ============================
// REGISTRY ANIMASI
// ============================
const animasiRegistry = {
    "fade-up": () => ({ y: 30, opacity: 0, duration: 1, ease: "power3.out" }),
    "fade-down": () => ({ y: -30, opacity: 0, duration: 1, ease: "power3.out" }),
    "fade-left": () => ({ x: -40, opacity: 0, duration: 1, ease: "power3.out" }),
    "fade-right": () => ({ x: 40, opacity: 0, duration: 1, ease: "power3.out" }),
    "zoom-in": () => ({ scale: 0.8, opacity: 0, duration: 1, ease: "power3.out" }),
    "zoom-out": () => ({ scale: 1.2, opacity: 0, duration: 1, ease: "power3.out" }),
    "slide-up": () => ({ y: 50, opacity: 0, duration: 1.2, ease: "power3.out" }),
    "slide-down": () => ({ y: -50, opacity: 0, duration: 1.2, ease: "power3.out" }),
    "slide-left": () => ({ x: -50, opacity: 0, duration: 1.2, ease: "power3.out" }),
    "slide-right": () => ({ x: 50, opacity: 0, duration: 1.2, ease: "power3.out" }),

    // ---- efek teks ----
    "text-fade-up": () => ({ opacity: 0, y: 40, duration: 1, ease: "power3.out", stagger: 0.05 }),
    "text-fade-down": () => ({ opacity: 0, y: -40, duration: 1, ease: "power3.out", stagger: 0.05 }),
    "text-scale-up": () => ({ opacity: 0, scale: 0.5, duration: 1, ease: "elastic.out(1,0.5)", stagger: 0.05 }),
    "text-rotate": () => ({ opacity: 0, rotationX: -90, y: 20, duration: 1, ease: "back.out(1.7)", stagger: 0.05 }),
    "text-skew-slide": () => ({ opacity: 0, x: -50, skewX: 15, duration: 1, ease: "power3.out", stagger: 0.05 }),
    "text-blur-in": () => ({
        opacity: 0,
        filter: "blur(8px)",
        y: 20,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        onUpdate() {
            this.targets().forEach(t => {
                const blurValue = this.targets()[0]._gsap.vars.filter.replace("blur(", "").replace(")", "");
                t.style.filter = `blur(${blurValue}px)`;
            });
        }
    }),
    "text-slide-up-scale": () => ({ opacity: 0, y: 30, scale: 0.8, duration: 1, ease: "power3.out", stagger: 0.05 }),
    "text-slide-down-scale": () => ({ opacity: 0, y: -30, scale: 1.2, duration: 1, ease: "power3.out", stagger: 0.05 }),
    "text-rotate-fade": () => ({ opacity: 0, rotation: -20, scale: 0.8, duration: 1, ease: "power3.out", stagger: 0.05 }),
};

// ============================
// FUNCTION GLOBAL: Efek Masuk Berulang
// ============================
function animasiGlobalByClass() {
    Object.keys(animasiRegistry).forEach(animClass => {
        const elements = document.querySelectorAll("." + animClass);
        if (!elements.length) return;

        elements.forEach(el => {
            const opts = animasiRegistry[animClass]();

            // override lewat data attribute
            if (el.dataset.duration) opts.duration = parseFloat(el.dataset.duration);
            if (el.dataset.stagger) opts.stagger = parseFloat(el.dataset.stagger);

            // split text otomatis kalau efek teks
            if (animClass.startsWith("text-") && !el.dataset.split) {
                el.dataset.split = "true";
                el.innerHTML = el.textContent.replace(/\S/g, "<span class='split-char'>$&</span>");
            }

            const tl = gsap.timeline({ paused: true });

            // animasi masuk
            if (opts.stagger && el.children.length) {
                tl.from(el.children, opts);
            } else {
                tl.from(el, opts);
            }

            // ScrollTrigger tanpa exit, efek muncul selalu
            ScrollTrigger.create({
                trigger: el,
                start: el.dataset.start ?? "top 80%",
                end: el.dataset.end ?? "bottom 20%",
                onEnter: () => tl.restart(true),
                onEnterBack: () => tl.restart(true),
                // hilangkan onLeave / onLeaveBack
            });
        });
    });
}

// ============================
// COUNTER GLOBAL
// ============================
function counterGlobalByClass() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach(el => {
        const targetId = el.dataset.target;
        if (!targetId) return;
        const endVal = parseInt(el.dataset.end) || 100;
        const startVal = parseInt(el.dataset.start) || 0;
        const duration = parseFloat(el.dataset.duration) || 2;

        const obj = { val: startVal };
        const anim = gsap.to(obj, {
            val: endVal,
            duration: duration,
            roundProps: "val",
            paused: true,
            onUpdate: () => {
                document.querySelector(targetId).textContent = obj.val;
            }
        });

        ScrollTrigger.create({
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => anim.restart(),
            onEnterBack: () => anim.restart(),
        });
    });
}

// ============================
// INIT SEMUA
// ============================
document.addEventListener("DOMContentLoaded", () => {
    animasiGlobalByClass();
    counterGlobalByClass();
});
