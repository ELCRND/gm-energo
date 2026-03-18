import { FormManager } from "./FormManager";

export class RequestForm extends FormManager {
  constructor() {
    super(".request__form");

    this.SUBMIT_BTN = this.FORM.querySelector(".request__submit");
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
    this.SUBMIT_BTN.textContent = "Заказать расчет";
  }
}
