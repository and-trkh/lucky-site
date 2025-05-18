// Импортируем объект с данными изображений
import { imageSources } from './image-data.js';

/**
 * @function initResponsiveImages
 * @description Инициализирует все адаптивные изображения на странице,
 * используя data-атрибуты для связи HTML элементов с импортированными данными изображений.
 */
const initResponsiveImages = () => {
  // Находим все элементы <responsive-image> с классом 'js-responsive-image'
  const responsiveImageElements = document.querySelectorAll(
    '.js-responsive-image',
  );

  if (!responsiveImageElements.length) {
    // console.warn('Не найдены элементы <responsive-image> с классом "js-responsive-image".');
    return;
  }

  responsiveImageElements.forEach((element) => {
    // Получаем имя изображения из data-атрибута
    const imageName = element.dataset.imageName; // dataset.imageName соответствует data-image-name

    if (imageName && imageSources[imageName]) {
      // Если имя есть и для него загружены данные, устанавливаем src
      element.src = imageSources[imageName];
    } else if (!imageName) {
      console.warn(
        'Элемент <responsive-image> не имеет атрибута data-image-name:',
        element,
      );
    } else {
      console.warn(
        `Данные для изображения с именем "${imageName}" не найдены в imageSources. Проверьте импорты и ключи в image-data.js.`,
        element,
      );
    }
  });
};

export { initResponsiveImages };
