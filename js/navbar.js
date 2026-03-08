gsap.registerPlugin(ScrollTrigger);

/* ======================================================
   ELEMENTS
====================================================== */
const navbar = document.querySelector(".navbar");
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-menu");
const links = menu.querySelectorAll("a");

const logo = document.querySelector(".logo");
const logoText = logo.querySelector(".logo-text");
const logoIcon = logo.querySelector(".logo-icon");

let isOpen = false;

/* ======================================================
   INITIAL STATE (WAJIB & PENTING)
   - Logo text SELALU terlihat saat idle
====================================================== */
gsap.set(logoText, {
    scaleX: 1,
    opacity: 1,
    x: 0,
    transformOrigin: "left center"
});

gsap.set(logoIcon, {
    opacity: 0,
    x: -8
});

/* ======================================================
   PAGE LOAD ANIMATION
====================================================== */
gsap.from(navbar, {
    y: -24,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from(links, {
    y: 8,
    opacity: 0,
    stagger: 0.08,
    duration: 0.6,
    ease: "power2.out",
    delay: 0.4
});

gsap.from(logoText, {
    y: 8,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
});

/* ======================================================
   TOGGLE MENU (MOBILE)
====================================================== */
toggle.addEventListener("click", () => {
    isOpen = !isOpen;
    navbar.classList.toggle("is-open", isOpen);

    gsap.to(menu, {
        autoAlpha: isOpen ? 1 : 0,
        y: isOpen ? 0 : -10,
        duration: isOpen ? 0.4 : 0.3,
        ease: isOpen ? "power2.out" : "power2.in",
        onStart: () => {
            if (isOpen) menu.style.pointerEvents = "auto";
        },
        onComplete: () => {
            if (!isOpen) menu.style.pointerEvents = "none";
        }
    });
});

/* ======================================================
   LOGO HOVER – TYPE DELETE → ICON → REVEAL TEXT
====================================================== */
const logoTL = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out" }
});

logoTL
    // hapus teks (efek mengetik terhapus)
    .to(logoText, {
        scaleX: 0,
        duration: 0.35,
        ease: "steps(8)"
    })
    // munculkan icon kopi
    .to(
        logoIcon,
        {
            opacity: 1,
            x: 0,
            duration: 0.25
        },
        "-=0.15"
    )
    // munculkan teks lagi dari arah berlawanan
    .fromTo(
        logoText,
        { x: 12, opacity: 0 },
        {
            scaleX: 1,
            x: 0,
            opacity: 1,
            duration: 0.4
        }
    );

/* EVENT LOGO */
logo.addEventListener("mouseenter", () => {
    logoTL.play(0);
});

logo.addEventListener("mouseleave", () => {
    logoTL.pause(0);

    // reset HALUS ke state default
    gsap.to(logoIcon, {
        opacity: 0,
        x: -8,
        duration: 0.2,
        ease: "power2.in"
    });

    gsap.to(logoText, {
        scaleX: 1,
        opacity: 1,
        x: 0,
        duration: 0.2,
        ease: "power2.in"
    });
});

/* ======================================================
   MENU CLICK – ACTIVE STATE + MICRO FEEDBACK
====================================================== */
links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(l => l.classList.remove("is-active"));
        link.classList.add("is-active");

        // micro interaction (press feedback)
        gsap.fromTo(
            link,
            { y: 0 },
            {
                y: -2,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: "power1.out"
            }
        );

        // auto close menu on mobile
        if (isOpen) {
            isOpen = false;
            navbar.classList.remove("is-open");

            gsap.to(menu, {
                autoAlpha: 0,
                y: -10,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    menu.style.pointerEvents = "none";
                }
            });
        }
    });
});

/* ======================================================
   SCROLL SPY – ACTIVE MENU BY SECTION POSITION
====================================================== */
links.forEach(link => {
    const targetId = link.getAttribute("href");
    if (!targetId || !targetId.startsWith("#")) return;

    const section = document.querySelector(targetId);
    if (!section) return;

    ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(link),
        onEnterBack: () => setActive(link)
    });
});

function setActive(activeLink) {
    links.forEach(l => l.classList.remove("is-active"));
    activeLink.classList.add("is-active");
}


/* ======================================================
   NAVBAR AUTO HIDE – DESKTOP ONLY
====================================================== */

const isTouchDevice =
  window.matchMedia("(hover: none)").matches ||
  navigator.maxTouchPoints > 0;

let idleTimer = null;
let navbarHidden = false;

/* timeline navbar hide/show */
const navbarTL = gsap.timeline({ paused: true });

navbarTL.to(navbar, {
  y: "-100%",
  autoAlpha: 0,
  duration: 0.6,
  ease: "power3.inOut"
});

/* show navbar */
function showNavbar() {
  if (navbarHidden) {
    navbarTL.reverse();
    navbarHidden = false;
  }
}

/* hide navbar */
function hideNavbar() {
  if (!navbarHidden && !isOpen) {
    navbarTL.play();
    navbarHidden = true;
  }
}

/* reset idle timer */
function resetIdleTimer() {
  showNavbar();
  clearTimeout(idleTimer);

  idleTimer = setTimeout(() => {
    hideNavbar();
  }, 3000); // ⏱ 3 detik
}

/* ======================================================
   EVENT LISTENER (DESKTOP)
====================================================== */

if (!isTouchDevice) {
  // saat mouse bergerak
  window.addEventListener("mousemove", resetIdleTimer);

  // saat mouse masuk navbar
  navbar.addEventListener("mouseenter", showNavbar);

  // start idle timer pertama kali
  resetIdleTimer();
}
