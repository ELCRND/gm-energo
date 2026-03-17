export class ConsultationForm {
  constructor() {
    this.POPUP = document.querySelector("#consultation-popup");
    this.POPUP_OPEN = document.querySelector(".hero__action");
    this.SUCCESS_POPUP = document.querySelector("#success-popup");
    this.FORM = document.querySelector(".consult-form");

    if (!this.FORM) return;

    this.inputs = this.FORM.querySelectorAll(".field__input");
    this.submitBtn = this.FORM.querySelector(".consult-form__submit");

    this.init();
  }

  init() {
    this.on();
  }

  on() {
    this.POPUP_OPEN.addEventListener("click", () => this.open());

    // Закрытие по крестику
    document
      .querySelectorAll(".popup__close, .success-popup__close")
      .forEach((btn) => {
        btn.addEventListener("click", () => this.closeAll());
      });

    // Закрытие по оверлею
    document
      .querySelectorAll(".popup__overlay, .success-popup__overlay")
      .forEach((overlay) => {
        overlay.addEventListener("click", () => this.closeAll());
      });

    // Закрытие по Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeAll();
    });

    // Валидация при вводе
    this.inputs.forEach((input) => {
      input.addEventListener("input", () => this.validateField(input));
      input.addEventListener("blur", () => this.validateField(input));
    });

    // Отправка формы
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
    this.inputs.forEach((input) => {
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

    this.submitBtn.disabled = true;
    this.submitBtn.textContent = "Отправка...";

    // Здесь должна быть реальная отправка (fetch / axios)
    // Имитация запроса
    setTimeout(() => {
      this.showSuccess();
      this.FORM.reset();
      this.inputs.forEach((input) => {
        input.closest(".field").classList.remove("field--error");
      });
    }, 1200);
  }

  showSuccess() {
    this.POPUP.classList.remove("popup--active");
    this.SUCCESS_POPUP.classList.add("popup--active");
    this.submitBtn.disabled = false;
    this.submitBtn.textContent = "Получить консультацию";
  }

  closeAll() {
    this.POPUP.classList.remove("popup--active");
    this.SUCCESS_POPUP.classList.remove("popup--active");
  }

  open() {
    this.POPUP.classList.add("popup--active");
  }
}
