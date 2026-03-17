import "./scss/main.scss";
import { BgVideo } from "./js/BgVideo";
import { Header } from "./js/Header";
import { Animation } from "./js/Animation";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
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
    speed: 1000, // скорость прокрутки

    autoplay: {
      delay: 5000, // пауза
    },
    grabCursor: true,

    pagination: {
      el: ".hero__partners-pagination",
      clickable: true,
    },
  });

  // popup / consultation form
  new ConsultationForm();
});
