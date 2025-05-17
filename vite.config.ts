import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { svgSpritemap } from 'vite-plugin-svg-spritemap';

export default {
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
      pattern: 'src/icons/*.svg',
    }),
  ],
};
