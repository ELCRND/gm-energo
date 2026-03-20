import { FormManager } from "./FormManager";

export class ContactsForm extends FormManager {
  constructor() {
    super(".contacts__form");

    this.SUBMIT_BTN = this.FORM.querySelector(".contacts__submit");
    this.MOSCOW_IMAGE = document.querySelector(".contacts__image--moscow");
    this.CRIMEA_IMAGE = document.querySelector(".contacts__image--crimea");
    this.TOGGLERS = document.querySelectorAll(
      ".contacts__toggler-action input",
    );

    this.init();
  }

  init() {
    this.on();
  }

  on() {
    // переключение картинок
    this.TOGGLERS.forEach((toggler) => {
      toggler.addEventListener("change", (e) => {
        if (e.target.value === "moscow") {
          this.MOSCOW_IMAGE.classList.add("contacts__image--active");
          this.CRIMEA_IMAGE.classList.remove("contacts__image--active");
        } else if (e.target.value === "crimea") {
          this.CRIMEA_IMAGE.classList.add("contacts__image--active");
          this.MOSCOW_IMAGE.classList.remove("contacts__image--active");
        }
      });
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
    this.SUBMIT_BTN.disabled = false;
    this.SUBMIT_BTN.textContent = "Задать вопрос";
  }
}
