import { defineConfig } from 'astro/config';
import postcssMergeQueries from "postcss-merge-queries";
import image from "@astrojs/image";
// import relativeLinks from "astro-relative-links";//相対パスを有効にする。。？

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  routes: [{
    path: '/',
    template: 'src/pages/index.astro'
  }, {
    path: '/about',
    template: 'src/pages/about.astro'
  }],
  outputOptions: {
    out: 'public',
    html: {
      filename: '[name].html',
      directory: '.'
    }
  },
  build: {
    format: 'file',
    assets: 'assets/images'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: assetInfo => {
            let extType = assetInfo.name.split('.')[1];
            if (/png|jpe?g|svg|gif|webp|tiff|bmp|ico/i.test(extType)) {
              extType = 'images';
            }
            //ビルド時のCSS名を明記してコントロールする
            if (extType === 'css') {
              return `assets/css/style.css`;
            }
            return `assets/${extType}/[name][extname]`;
          },
          entryFileNames: 'assets/js/[name].js'
        }
      }
      // minify:false,
    },

    css: {
      postcss: {
        plugins: [postcssMergeQueries]
      }
    }
  },
  // integrations: [relativeLinks()]
  integrations: [image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), react()]
});