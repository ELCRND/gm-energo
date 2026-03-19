export class BgVideo {
  constructor() {
    this.CONTAINER = document.querySelector(".hero__bg");
    this.VIDEO = this.CONTAINER.querySelector(".hero__bg-video");
    this.POSTER = this.CONTAINER.querySelector(".hero__bg-poster");
    if (!this.VIDEO) return;

    this.desktopSrc = this.VIDEO.getAttribute("data-src");
    this.mobileSrc = this.VIDEO.getAttribute("data-src-mobile");
    this.mobileSize = 767; // до 767px подключаем мобильную версию
    this.timeoutPlay = 0; // ms

    this.isLoaded = false;
    this.source = null;

    this.init();
  }

  get isMobile() {
    return window.innerWidth <= this.mobileSize;
  }

  init() {
    if (document.readyState === "complete") {
      this.loadVideo();
    } else {
      window.addEventListener("load", () => this.loadVideo(), { once: true });
    }
  }

  createSource(src, media = null) {
    const source = document.createElement("source");
    source.src = src;
    source.type = "video/webm";

    if (media) source.media = media;

    return source;
  }

  loadVideo() {
    if (this.isLoaded || !this.VIDEO) return;

    if (this.isMobile) {
      this.source = this.createSource(
        this.mobileSrc,
        `(max-width: ${this.mobileSize}px)`,
      );
    } else {
      this.source = this.createSource(this.desktopSrc);
    }

    // загрузка видео
    setTimeout(() => {
      this.VIDEO.appendChild(this.source);

      this.VIDEO.load();
      this.VIDEO.classList.add("hero__bg-video--loaded");
    }, this.timeoutPlay);

    // скрываем постер
    // this.VIDEO.addEventListener(
    //   "loadeddata",
    //   () => {
    //     this.POSTER.style.opacity = "0";
    //     setTimeout(() => {
    //       if (this.POSTER) this.POSTER.style.display = "none";
    //     }, 800);
    //   },
    //   { once: true },
    // );

    this.isLoaded = true;
  }
}
