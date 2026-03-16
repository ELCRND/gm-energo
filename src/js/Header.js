export class Header {
  constructor() {
    this.MENU = document.querySelector(".header__menu");
    this.MENU_OPEN = document.querySelector(".header__menu-open");

    this.init();
  }

  init() {
    this.on();
  }

  on() {
    this.MENU_OPEN.addEventListener("click", () => {
      this.MENU.classList.toggle("header__menu--active");
      this.MENU_OPEN.classList.toggle("header__menu-open--active");
    });

    document.querySelectorAll(".header__navigation-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.MENU.classList.remove("header__menu--active");
        this.MENU_OPEN.classList.remove("header__menu-open--active");
      });
    });
  }
}
