// Функция для инициализации логики всплывающего окна успешной отправки формы
export function initSuccessPopup() {
  const form = document.querySelector('.form'); // Получаем форму
  const successPopup = document.getElementById('successPopup'); // Получаем диалоговое окно
  const closePopupButton = successPopup.querySelector(
    '.success-popup__close-button',
  ); // Получаем кнопку закрытия

  // Проверяем, что все элементы найдены
  if (!form || !successPopup || !closePopupButton) {
    console.error(
      'Не удалось найти все необходимые элементы для всплывающего окна.',
    );
    return; // Прерываем выполнение, если что-то не найдено
  }

  // Обработчик отправки формы
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвращаем стандартную отправку формы
    // Здесь может быть логика отправки данных формы на сервер
    // Например, с использованием fetch() или XMLHttpRequest

    // Показываем всплывающее окно
    successPopup.showModal();
    document.body.classList.add('popup-open');
    form.reset(); // Очищаем форму
  });

  // Обработчик клика по кнопке закрытия всплывающего окна
  closePopupButton.addEventListener('click', () => {
    successPopup.close(); // Закрываем диалоговое окно
    document.body.classList.remove('popup-open');
  });

  // Дополнительно: закрытие диалога при клике на фон (если это стандартное поведение dialog, может не требоваться)
  // или при нажатии Escape (это стандартное поведение dialog)
  successPopup.addEventListener('click', (event) => {
    if (event.target === successPopup) {
      successPopup.close();
    }
  });
}
