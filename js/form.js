const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштэгов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

// Вешаем валидацию пристин на нашу форму
const pristine = new window.Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Показ модального окна
const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown); // Обработчик закрытия мод.окна по нажатию клавиши
};

// Закрывает модальное окно
const hideModal = () => {
  form.reset(); // Сбрасываем значения формы
  pristine.reset(); // Очищаем инпуты от слушателей, чтобы не копились сообщения
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Чтобы не закрылось модальное окно при нажатии Esc, когда фокус в инпуте
const isTextFieldFocused = () =>
  document.activeElement === hashtagField || // Поле ввода хештега
  document.activeElement === commentField; // Поле ввода комментария

// Правила для нормализации тега
const normalizeTags = (tagString) => tagString
  .trim() // Убирает пустое пространство по краям
  .split(' ') // Добавляет пробел между тегами
  .filter((tag) => Boolean(tag.length)); // Убирает лишние пробелы между тегами

// Проверяет валидацию тегов
const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

// Проверяет максимальное количество тегов
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

// Проверяет уникальность тегов
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase()); // Приводит к нижнему регистру
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

// Закрываем мод.окно при нажатии клавиши Esc
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);
pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  true
);
pristine.addValidator(
  hashtagField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);

fileField.addEventListener('change', onFileInputChange);

// Закрытие по нажатию на крестик
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);

