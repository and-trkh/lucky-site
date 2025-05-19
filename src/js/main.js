import '@responsive-image/wc';
import { initTabs } from './init-tabs';
import { initSlider } from './slider';
import { initTabIconToggler } from './tab-icon-toggler';
import { initResponsiveImages } from './image-loader';
import { initSuccessPopup } from './popup';
import { initFormValidation } from './form-validation';

window.addEventListener('DOMContentLoaded', () => {
  // Инициализируем адаптивные изображения, как только DOM готов
  initResponsiveImages();
  initSuccessPopup();
  initFormValidation(); // Инициализируем кастомную валидацию формы

  // Остальные инициализации можно оставить в событии 'load',
  // если они зависят от полной загрузки всех ресурсов (включая стили, обычные img и т.д.)
  window.addEventListener('load', () => {
    initTabs();
    initSlider();
    initTabIconToggler();
  });
});
