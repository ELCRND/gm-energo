export class BgVideo {
  constructor() {
    this.video = document.querySelector(".hero__bg-video");

    this.init();
  }

  init() {
    if (!this.video) return;

    setTimeout(() => {
      this.video.preload = "auto";
      this.video.load();

      this.video.addEventListener(
        "canplay",
        () => {
          this.video.classList.add("hero__bg-video--loaded");
          // video.removeAttribute("poster");
        },
        { once: true },
      );
    }, 1200);
  }
}
