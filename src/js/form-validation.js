// Функция для валидации формы
const initFormValidation = () => {
  const form = document.querySelector('.form');

  if (!form) return;

  // Отключаем нативную валидацию
  form.setAttribute('novalidate', '');

  // Элементы формы
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const agreementCheckbox = document.getElementById('agreement');
  const submitButton = form.querySelector('.form__button');

  // Объект для хранения состояния валидации
  const validationState = {
    name: false,
    phone: false,
    agreement: false,
  };

  // Функция для создания и отображения сообщения об ошибке
  const showError = (input, message) => {
    // Удаляем предыдущее сообщение об ошибке, если оно есть
    const existingError = input.parentElement.querySelector('.form__error');
    if (existingError) {
      existingError.remove();
    }

    // Создаем элемент с сообщением об ошибке
    const errorElement = document.createElement('span');
    errorElement.className = 'form__error';
    errorElement.textContent = message;

    // Добавляем класс ошибки для инпута
    input.classList.add('form__input--error');

    // Вставляем сообщение после инпута
    input.parentElement.appendChild(errorElement);
  };

  // Функция для удаления сообщения об ошибке
  const removeError = (input) => {
    const existingError = input.parentElement.querySelector('.form__error');
    if (existingError) {
      existingError.remove();
    }

    // Удаляем класс ошибки у инпута
    input.classList.remove('form__input--error');
  };

  // Функция для сброса всех ошибок формы
  const resetAllErrors = () => {
    // Удаляем все сообщения об ошибках
    const errorMessages = form.querySelectorAll('.form__error');
    errorMessages.forEach((error) => error.remove());

    // Удаляем классы ошибок у всех инпутов
    const errorInputs = form.querySelectorAll('.form__input--error');
    errorInputs.forEach((input) =>
      input.classList.remove('form__input--error'),
    );

    // Удаляем класс ошибки у чекбокса
    const checkboxLabel = document.querySelector('.form__checkbox-label');
    if (checkboxLabel) {
      checkboxLabel.classList.remove('form__checkbox-label--error');
    }
  };

  // Функция для проверки валидности имени
  const validateName = () => {
    const value = nameInput.value.trim();

    if (value === '') {
      showError(nameInput, 'Пожалуйста, введите ваше имя');
      validationState.name = false;
    } else if (value.length < 2) {
      showError(nameInput, 'Имя должно содержать не менее 2 символов');
      validationState.name = false;
    } else {
      removeError(nameInput);
      validationState.name = true;
    }

    updateSubmitButton();
  };

  // Функция для проверки валидности телефона
  const validatePhone = () => {
    // Получаем только цифры из номера для проверки
    const digitsOnly = phoneInput.value.replace(/\D/g, '');

    if (digitsOnly === '') {
      showError(phoneInput, 'Пожалуйста, введите номер телефона');
      validationState.phone = false;
    } else if (digitsOnly.length < 11) {
      showError(phoneInput, 'Номер телефона должен содержать 11 цифр');
      validationState.phone = false;
    } else {
      removeError(phoneInput);
      validationState.phone = true;
    }

    updateSubmitButton();
  };

  // Функция для проверки согласия
  const validateAgreement = () => {
    if (!agreementCheckbox.checked) {
      // Для чекбокса показываем ошибку немного иначе
      const label = document.querySelector('.form__checkbox-label');
      label.classList.add('form__checkbox-label--error');
      validationState.agreement = false;
    } else {
      const label = document.querySelector('.form__checkbox-label');
      label.classList.remove('form__checkbox-label--error');
      validationState.agreement = true;
    }

    updateSubmitButton();
  };

  // Функция для обновления состояния кнопки отправки
  const updateSubmitButton = () => {
    const isFormValid =
      validationState.name &&
      validationState.phone &&
      validationState.agreement;
    submitButton.disabled = !isFormValid;

    // Визуальное отображение состояния кнопки
    if (isFormValid) {
      submitButton.classList.remove('button--disabled');
    } else {
      submitButton.classList.add('button--disabled');
    }
  };

  // Функция для применения маски телефона
  const applyPhoneMask = (e) => {
    // Сохраняем позицию курсора
    const cursorPosition = e.target.selectionStart;
    const value = e.target.value;

    // Получаем только цифры из введенного значения
    let digitsOnly = value.replace(/\D/g, '');

    // Ограничиваем до 11 цифр (для российского номера)
    if (digitsOnly.length > 11) {
      digitsOnly = digitsOnly.substring(0, 11);
    }

    // Формируем номер в формате +7 (XXX) XXX-XX-XX
    let formattedValue = '';

    if (digitsOnly.length > 0) {
      // Первая цифра всегда 7 для российского формата
      formattedValue = '+7';

      if (digitsOnly.length > 1) {
        // Код города/оператора
        formattedValue +=
          ' (' + digitsOnly.substring(1, Math.min(4, digitsOnly.length));
      }

      if (digitsOnly.length > 4) {
        // Первая часть номера
        formattedValue +=
          ') ' + digitsOnly.substring(4, Math.min(7, digitsOnly.length));
      }

      if (digitsOnly.length > 7) {
        // Вторая часть номера
        formattedValue +=
          '-' + digitsOnly.substring(7, Math.min(9, digitsOnly.length));
      }

      if (digitsOnly.length > 9) {
        // Последняя часть номера
        formattedValue += '-' + digitsOnly.substring(9, 11);
      }
    }

    // Устанавливаем отформатированное значение
    e.target.value = formattedValue;

    // Пытаемся восстановить позицию курсора с учетом добавленных символов форматирования
    // Это сложная логика, которая может потребовать доработки в зависимости от поведения
    const newCursorPosition = calculateCursorPosition(
      value,
      formattedValue,
      cursorPosition,
    );
    e.target.setSelectionRange(newCursorPosition, newCursorPosition);
  };

  // Вспомогательная функция для расчета новой позиции курсора
  const calculateCursorPosition = (oldValue, newValue, oldPosition) => {
    // Простая эвристика: если курсор был в конце, оставляем его в конце
    if (oldPosition === oldValue.length) {
      return newValue.length;
    }

    // Иначе пытаемся сохранить относительную позицию
    // Это упрощенная логика, которая может не работать идеально во всех случаях
    const digitsBeforeCursor = oldValue
      .substring(0, oldPosition)
      .replace(/\D/g, '').length;

    // Ищем позицию после digitsBeforeCursor цифр в новом значении
    let newPosition = 0;
    let digitCount = 0;

    for (let i = 0; i < newValue.length; i++) {
      if (/\d/.test(newValue[i])) {
        digitCount++;
      }
      if (digitCount > digitsBeforeCursor) {
        break;
      }
      newPosition = i + 1;
    }

    return newPosition;
  };

  // Обработчик фокуса для поля телефона
  phoneInput.addEventListener('focus', function (e) {
    // Если поле пустое, устанавливаем начальное значение маски
    if (!e.target.value) {
      e.target.value = '+7';
    }
  });

  // Обработчик ввода для поля телефона
  phoneInput.addEventListener('input', applyPhoneMask);

  // Добавляем обработчики событий для валидации
  nameInput.addEventListener('blur', validateName);
  nameInput.addEventListener('input', validateName);

  phoneInput.addEventListener('blur', validatePhone);
  phoneInput.addEventListener('input', validatePhone);

  agreementCheckbox.addEventListener('change', validateAgreement);

  // Обработчик отправки формы
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Проверяем все поля перед отправкой
    validateName();
    validatePhone();
    validateAgreement();
    resetAllErrors();

    // Если форма валидна, показываем попап успеха
    if (
      validationState.name &&
      validationState.phone &&
      validationState.agreement
    ) {
      const successPopup = document.getElementById('successPopup');
      if (successPopup) {
        // Сбрасываем все ошибки перед показом попапа
        resetAllErrors();

        // Показываем попап успеха
        successPopup.showModal();

        // Очищаем форму
        form.reset();

        // Сбрасываем состояние валидации
        validationState.name = false;
        validationState.phone = false;
        validationState.agreement = false;

        // Обновляем состояние кнопки
        updateSubmitButton();
      }
    }
  });

  // Инициализация начального состояния кнопки
  updateSubmitButton();
};

export { initFormValidation };
