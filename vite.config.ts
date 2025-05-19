import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { svgSpritemap } from 'vite-plugin-svg-spritemap';
import { setupPlugins } from '@responsive-image/vite-plugin';

export default {
  base: '/lucky-site/',
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%')),
    },
  },
  build: {
    cssMinify: 'lightningcss',
  },
  plugins: [
    svgSpritemap({
      pattern: 'src/assets/icons/*.svg',
    }),
    setupPlugins({
      include: /^[^?]+\.jpg\?.*responsive.*$/,
      placeholder: {
        type: 'none',
      },
    }),
  ],
  optimizeDeps: {
    include: ['tslib', '@responsive-image/wc'],
  },
};
