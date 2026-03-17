export class ConsultationForm {
  constructor() {
    this.POPUP = document.querySelector("#consultation-popup");
    this.POPUP_OPEN = document.querySelector(".hero__action");
    this.SUCCESS_POPUP = document.querySelector("#success-popup");
    this.FORM = document.querySelector(".popup__form");

    if (!this.FORM) return;

    this.INPUTS = this.FORM.querySelectorAll(".field__input");
    this.SUBMIT_BTN = this.FORM.querySelector(".popup__submit");

    this.init();
  }

  init() {
    this.on();
  }

  on() {
    this.POPUP_OPEN.addEventListener("click", () => this.open());

    // закрытие по крестику
    document.querySelectorAll(".popup__close").forEach((btn) => {
      btn.addEventListener("click", () => this.closeAll());
    });

    // закрытие по оверлею
    document.querySelectorAll(".popup__overlay").forEach((overlay) => {
      overlay.addEventListener("click", () => this.closeAll());
    });

    // закрытие по Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeAll();
    });

    // валидация при вводе
    this.INPUTS.forEach((input) => {
      input.addEventListener("input", () => this.validateField(input));
      input.addEventListener("blur", () => this.validateField(input));
    });

    // отправка формы
    this.FORM.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  validateField(input) {
    const field = input.closest(".field");
    const value = input.value.trim();

    if (input.required && value === "") {
      field.classList.add("field--error");
      return false;
    }

    // phone validation
    if (input.type === "tel" && value !== "") {
      const phoneRegex = /^[\d\s+()-]{7,18}$/;
      if (!phoneRegex.test(value)) {
        field.classList.add("field--error");
        field.classList.remove("field--correct");
        return false;
      }
    }

    if (value !== "") {
      field.classList.add("field--correct");
    }

    field.classList.remove("field--error");
    return true;
  }

  validateForm() {
    let isValid = true;
    this.INPUTS.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    return isValid;
  }

  handleSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.SUBMIT_BTN.disabled = true;
    this.SUBMIT_BTN.textContent = "Отправка...";

    // имитация запроса
    setTimeout(() => {
      this.showSuccess();
      this.FORM.reset();
      this.INPUTS.forEach((input) => {
        input.closest(".field").classList.remove("field--error");
      });
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
