import Swiper from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function HeroSlider() {
  const partnersSlider = new Swiper(".hero__partners", {
    init: false,
    modules: [Autoplay, Pagination],
    loop: true,
    slidesPerView: "auto",
    speed: 4000, // скорость прокрутки
    // grabCursor: true,

    autoplay: {
      delay: 0, // пауза
      disableOnInteraction: false, // останока после ручного свайпа
    },

    pagination: {
      el: ".hero__partners-pagination",
      clickable: true,
    },
  });

  // ускорение при пагинации
  partnersSlider.on("init", function (e) {
    document
      .querySelectorAll(".hero__partners-pagination .swiper-pagination-bullet")
      .forEach((bullet) => {
        bullet.addEventListener("click", () => {
          partnersSlider.params.speed = 400;

          setTimeout(() => {
            partnersSlider.params.speed = 4000;
          }, 350);
        });
      });
  });
  partnersSlider.init();
}

export function ProjectsSlider() {
  const projectsSlider = new Swiper(".projects__slider", {
    modules: [Navigation],
    slidesPerView: "auto",
    speed: 2000, // скорость прокрутки

    breakpoints: {
      1280: {
        allowTouchMove: false, // влючить перетаскивание
      },
    },

    navigation: {
      nextEl: ".projects__slider-next",
      prevEl: ".projects__slider-prev",
    },
  });
}
