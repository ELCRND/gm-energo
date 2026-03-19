import { defineConfig } from "vite";
import { resolve } from "path";
import PluginCritical from "rollup-plugin-critical";

// npm install -D sass terser autoprefixer postcss postcss-preset-env cssnano sharp

export default defineConfig({
  // Базовый путь для продакшена
  base: "./",

  // Настройки сервера разработки
  server: {
    port: 3000,
    open: true, // Автоматически открывать браузер
  },

  // Сборка
  build: {
    // Выходная директория
    outDir: "dist",
    cssCodeSplit: false,

    // Оптимизация chunk'ов
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        // about: resolve(__dirname, 'about.html'),
      },
      output: {
        // Имена файлов без хешей для простоты
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        // assetFileNames: (assetInfo) => {
        //   const info = assetInfo.name.split(".");
        //   const ext = info[info.length - 1];

        //   if (/\.(css|scss)$/.test(assetInfo.name)) {
        //     return "assets/[name].[ext]";
        //   }

        //   if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(assetInfo.name)) {
        //     return "assets/images/[name].[ext]";
        //   }

        //   if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
        //     return "assets/fonts/[name].[ext]";
        //   }

        //   return "assets/[name].[ext]";
        // },
      },
    },

    // Минификация
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Удалить console.log в продакшене
      },
    },

    // Оптимизация исходных карт
    sourcemap: false,
  },

  // Плагины
  plugins: [
    // PluginCritical({
    //   criticalUrl: "http://localhost:4173/",
    //   criticalBase: "./dist/",
    //   criticalPages: [
    //     {
    //       uri: "", // главная страница
    //       template: "index", // имя без .html
    //     },
    //   ],
    //   criticalConfig: {
    //     inline: true,
    //     extract: true,
    //     width: 1920,
    //     height: 1080,
    //     penthouse: {
    //       timeout: 60000,
    //       blockJSRequests: false,
    //     },
    //   },
    // }),
  ],

  // CSS препроцессинг
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        //   @use "sass:math";
        //   @import "./src/styles/variables.scss";
        //   @import "./src/styles/mixins.scss";
        `,
        charset: false,
      },
    },
    postcss: "./postcss.config.js",
  },

  // Оптимизация зависимостей
  optimizeDeps: {
    include: [],
  },
});
