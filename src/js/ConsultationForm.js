import { FormManager } from "./FormManager";

export class ConsultationForm extends FormManager {
  constructor() {
    super(".popup__form");

    this.POPUP = document.querySelector("#consultation-popup");
    this.SUCCESS_POPUP = document.querySelector("#success-popup");
    this.SUBMIT_BTN = this.FORM.querySelector(".popup__submit");

    this.init();
  }

  init() {
    this.on();
  }

  on() {
    // открыть
    document
      .querySelectorAll(".hero__action, .equipment__action")
      .forEach((btn) => {
        btn.addEventListener("click", () => this.open());
      });

    // закрытие по крестику
    document.querySelectorAll(".popup__close").forEach((btn) => {
      btn.addEventListener("click", () => this.closeAll());
    });

    // закрытие по оверлею
    document.querySelectorAll(".popup__overlay").forEach((overlay) => {
      overlay.addEventListener("click", () => this.closeAll());
    });

    // закрытие по esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeAll();
    });
  }

  // отправка формы
  handleSubmit(e) {
    if (!this.validateForm()) {
      return;
    }

    this.SUBMIT_BTN.disabled = true;
    this.SUBMIT_BTN.textContent = "Отправка...";

    // имитация запроса
    setTimeout(() => {
      // сбор данных из формы
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      alert(JSON.stringify(data));

      // уведомление об успешной отравке
      this.showSuccess();
      // сброс формы
      this.FORM.reset();
    }, 1200);
  }

  showSuccess() {
    this.POPUP.classList.remove("popup--active");
    this.SUCCESS_POPUP.classList.add("popup--active");
    this.SUBMIT_BTN.disabled = false;
    this.SUBMIT_BTN.textContent = "Получить консультацию";
  }

  closeAll() {
    this.POPUP.classList.remove("popup--active");
    this.SUCCESS_POPUP.classList.remove("popup--active");
  }

  open() {
    this.POPUP.classList.add("popup--active");
  }
}
