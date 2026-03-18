export class Animation {
  constructor() {
    this.elements = document.querySelectorAll("[data-anim]");
    this.observer = null;
    this.init();
  }

  init() {
    this.prepareElements();

    requestAnimationFrame(() => {
      this.enableTransitions();

      this.startObserving();
      requestAnimationFrame(() => {
        this.elements.forEach((el) => {
          if (this.isInViewport(el)) {
            this.animateElement(el);
          }
        });
      });
    });
  }

  prepareElements() {
    this.elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transition = "none";
      const animType = el.dataset.anim;
      const distance = el.dataset.distance || "50px";

      switch (animType) {
        case "fade-up":
          el.style.transform = `translateY(${distance})`;
          break;
        case "fade-down":
          el.style.transform = `translateY(-${distance})`;
          break;
        case "fade-left":
          el.style.transform = `translateX(${distance})`;
          break;
        case "fade-right":
          el.style.transform = `translateX(-${distance})`;
          break;
        case "fade-in":
          el.style.transform = "none";
          break;
        default:
          el.style.transform = `translateY(${distance})`;
      }
    });
  }

  enableTransitions() {
    this.elements.forEach((el) => {
      const duration = el.dataset.duration || "0.4s";
      const delay = el.dataset.delay || "0s";
      const easing = el.dataset.easing || "ease-out";
      el.style.transition = `opacity ${duration} ${easing} ${delay}, transform ${duration} ${easing} ${delay}`;
    });
  }

  startObserving() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        root: null,
        threshold: 0.55,
        rootMargin: "80px 0px",
      },
    );

    this.elements.forEach((el) => this.observer.observe(el));
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.animateElement(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  animateElement(el) {
    el.classList.add("visible");
  }

  isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
