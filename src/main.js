import "./scss/main.scss";
import { BgVideo } from "./js/BgVideo";
import { Header } from "./js/Header";
import { Animation } from "./js/Animation";
import { ConsultationForm } from "./js/ConsultationForm";
import { HeroSlider, ProjectsSlider } from "./js/Sliders";
import { RequestForm } from "./js/RequestForm";

document.addEventListener("DOMContentLoaded", () => {
  new BgVideo(); // hero bg video

  new Header();

  new Animation(); // scroll animation

  HeroSlider();

  ProjectsSlider();

  new RequestForm();

  // popup / consultation form
  new ConsultationForm();
});
