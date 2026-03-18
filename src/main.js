import "./scss/main.scss";
import { BgVideo } from "./js/BgVideo";
import { Header } from "./js/Header";
import { Animation } from "./js/Animation";
import Swiper from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ConsultationForm } from "./js/ConsultationForm";

document.addEventListener("DOMContentLoaded", () => {
  new BgVideo(); // hero bg video

  new Header();

  new Animation(); // scroll animation

  // hero carousel
  const partnersSlider = new Swiper(".hero__partners", {
    modules: [Autoplay, Pagination],
    loop: true,
    slidesPerView: "auto",
    speed: 4000, // скорость прокрутки
    grabCursor: true,

    autoplay: {
      delay: 0, // пауза
      disableOnInteraction: false, // останока после ручного свайпа
    },

    pagination: {
      el: ".hero__partners-pagination",
      clickable: true,
    },
  });

  // projects
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

  // popup / consultation form
  new ConsultationForm();
});
