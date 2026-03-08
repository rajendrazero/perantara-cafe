new Swiper(".menu-img", {
  loop: true,
  speed: 800,

  autoplay: false,

  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },

  grabCursor: true
});
