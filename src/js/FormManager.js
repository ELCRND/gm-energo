export class FormManager {
  constructor(formTarget) {
    this.FORM = document.querySelector(formTarget);

    if (!this.FORM) return;

    this.INPUTS = this.FORM.querySelectorAll(".field__input");
    this.SUBMIT_BTN = this.FORM.querySelector(".popup__submit");

    this.INPUTS.forEach((input) => {
      input.addEventListener("input", () => this.validateField(input));
      input.addEventListener("blur", () => this.validateField(input));
    });

    // отправка формы
    this.FORM.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit(e);
    });
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

    // email validation
    if (input.type === "email" && value !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
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
}
