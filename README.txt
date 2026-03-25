ИНСТРУКЦИЯ по запуску рабочей области:
    1.  Убедиться что в корне присутствует package.json
    2.  Установить dev зависимости >>> npm i <<<
    3.  Запуск:
            Dev режи __>>> npm run dev <<<__
            Сборка __>>> npm run build <<<__
            Посмотреть результат сборки >>> npm run preview <<<__


КОНВЕРТАЦИЯ ИЗОБРАЖЕНИЙ
    1. Убедиться в наличии файла convert-images.js
    2. В dev зависимостях должен быть установлен sharp
    3. Команды:
            __>>> npm run convert:images <<<__ (или __>>> node convert-images.js <<<__) - конвертация всех изображений в папке public в avif и webp
            __>>> npm run convert:images-webp <<<__ (или __>>> node convert-images.js webp <<<__) - только webp формат
            __>>> npm run convert:images-avif <<<__ (или __>>> node convert-images.js avif <<<__) - только avif формат
            __>>> node convert-images.js ./public/images/hero/hero-bg.png webp <<<__ - указание конкретного изображения и формата


УПРАВЛЕНИЕ АНИМАЦИЯМИ
    1. В html разметке для тэга необходимо добавить data аттрибут __>>> data-anim="fade-up" <<<__
    2. __>>> data-anim <<<__ возможные значения:
        fade-up - выезд вверх;
        fade-down - выезд вниз;
        fade-left - выезд влево;
        fade-right - выезд вправо;
        fade-in - появление без смещения.
    3. __>>> data-delay="0.2s" <<<__ - задержка в мс. По умолчанию "0s"
    4. __>>> data-distance="50px" <<<__ - смещение перед появлением\расстояние анимации. По умолчанию "50px"
    5. __>>> data-duration="0.4s" <<<__ - длительность анимации. По умолчанию "0.4s"
    6. __>>> data-easing="ease-out" <<<__ - тип анимации. По умолчанию "ease-out"


КАК УЙТИ ОТ ИСПОЛЬЗОВАНИЯ vite.js
    ➜➜➜ Первый вариант (вытаскиваем файлы вручную, потребуется отдельное подключение swiper js. Все файлы в первоначальном виде) -
        1. Забрать файлы из корня проекта, не из папки dist
            - index.html
            - собрать любым удобным способом scss в css(Плагины VsCode, сборка через vite js, онлайн инструменты)
            - картинки
            - шрифты
            - js
        2. Заменить пути к ресурсам (должны быть относительные пути - "/images..." заменить на "./images...")
            - index.html
                - пути в <head></head> (favicon, шрифты)
                - подключить стили в head - <link rel="stylesheet" crossorigin href="./css/main.css">
                - все пути к картинкам. "/images..." заменить на "./images...". В VsCode удобно использовать массовое переименование - выделить "/images" и нажать ctrl + f2
            - css
                - изменить пути к шрифтам "/fonts/Geologica-Light.woff2" на "../fonts/Geologica-Light.woff2"
            - js
                - удалить import "./scss/main.scss"; 
                - к каждому импортируемому скрипту добавить ".js" - import { Header } from "./js/Header"; ➜➜➜ ".js" - import { Header } from "./js/Header.js". Скрипты с формами также содержат импорты
                - для лучших показателей Google page speed лучше отказать от импортов и собрать все скрипты в одном файле
        3. Подключить swiper
            - через CDN 
                - добавить перед основным js файлом
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
                    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" async defer></script>
                - удалить все импорты из Sliders.js и свойства modules (modules: [Autoplay, Pagination]).

    ➜➜➜ Второй вариант (сборка с минимальными изменениями) -
        1. Установить vite js
        2. Заменить содержимое vite.config.js (ниже)
        3. Не обязаельно, но если нужен css без всего, убрать файл postcss.config.js, можно переименовать в .txt
        4. Запустить сборку __>>> npm run build <<<__
    
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
    cssMinify: false,

    css: {
      lightningcss: false,
      postcss: false,
    },

    terserOptions: {
      compress: false,
      mangle: false,
    },

    rolldownOptions: {
      output: {
        codeSplitting: false,

        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },

    sourcemap: false,

    target: "esnext",
  },
});
