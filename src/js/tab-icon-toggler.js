/**
 * Инициализирует переключение иконок для табов.
 * Иконка меняется с 'arrow' на 'close' когда таб активен (имеет класс 'is-active'),
 * и обратно, когда таб неактивен.
 */
const initTabIconToggler = () => {
  // Находим все элементы управления табами
  const tabControls = document.querySelectorAll(
    '.tabs__control[data-tabs="control"]',
  );

  if (!tabControls.length) {
    console.warn(
      'Переключатель иконок табов: не найдены элементы управления табами.',
    );
    return;
  }

  /**
   * Обновляет иконку для конкретного элемента управления табом.
   * @param {HTMLElement} tabControl Элемент управления табом (<button class="tabs__control">).
   */
  const updateIconState = (tabControl) => {
    // Находим контейнер иконки-стрелки/крестика внутри текущего таба
    const iconContainer = tabControl.querySelector('.tabs__control-button');
    if (!iconContainer) {
      // console.warn('Не найден контейнер .tabs__control-button для иконки в табе:', tabControl);
      return;
    }

    // Находим сам элемент <use>
    const useElement = iconContainer.querySelector('svg use');
    if (!useElement) {
      // console.warn('Не найден элемент <use> для иконки в табе:', tabControl);
      return;
    }

    // Проверяем, активен ли таб
    if (tabControl.classList.contains('is-active')) {
      // Если активен, устанавливаем иконку "close"
      useElement.setAttribute('href', './spritemap.svg#close');
      // Атрибут xlink:href устарел, но для старых браузеров можно оставить:
      // useElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './spritemap.svg#close');
    } else {
      // Если неактивен, устанавливаем иконку "arrow"
      useElement.setAttribute('href', './spritemap.svg#arrow');
      // useElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './spritemap.svg#arrow');
    }
  };

  // Первоначальная установка правильных иконок для всех табов при загрузке страницы
  tabControls.forEach((tabControl) => {
    updateIconState(tabControl);
  });

  // Настраиваем MutationObserver для каждого элемента управления табом,
  // чтобы отслеживать изменения в его атрибуте 'class'.
  tabControls.forEach((tabControl) => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        // Нас интересуют только изменения атрибута 'class'
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          // Элемент, у которого изменился класс, доступен через mutation.target
          updateIconState(mutation.target);
        }
      }
    });

    // Начинаем наблюдение за изменениями атрибутов
    observer.observe(tabControl, { attributes: true });

    // Примечание: MutationObserver будет автоматически отключен, если элемент удаляется из DOM.
    // Если вы динамически добавляете/удаляете табы, вам может потребоваться управлять observer.disconnect().
  });
};

export { initTabIconToggler };
