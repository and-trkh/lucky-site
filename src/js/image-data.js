// Импортируем данные для каждого адаптивного изображения
// Пути должны быть верны относительно этого файла (src/js/image-data.js)
import slide1ImageData from '../assets/images/slide-1.jpg?responsive';
import slide2ImageData from '../assets/images/slide-2.jpg?responsive';
import slide3ImageData from '../assets/images/slide-4.jpg?responsive';
import slide4ImageData from '../assets/images/slide-4.jpg?responsive';
// Добавьте сюда импорты для других изображений, если они есть
// import anotherImageData from '../assets/images/another-image.jpg?responsive';

/**
 * @description Объект, содержащий импортированные данные изображений.
 * Ключи объекта должны соответствовать значениям атрибута data-image-name в HTML.
 */
const imageSources = {
  slide1: slide1ImageData,
  slide2: slide2ImageData,
  slide3: slide3ImageData,
  slide4: slide4ImageData,
};

export { imageSources };
