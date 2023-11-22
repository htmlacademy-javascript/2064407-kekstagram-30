import { resetScale } from './scale.js';
import { init as initEffect, reset as resetEffect } from './effect.js';
import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
// import { preview } from 'vite';
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштэгов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег'
};
const SubmitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const photoPreview = form.querySelector('.img-upload__preview img');
const effectsPreviews = form.querySelectorAll('.effects__preview');

const url = null;

function toggleSubmitButton(isDisabled) {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? SubmitButtonCaption.SUBMITTING
    : SubmitButtonCaption.IDLE;
}

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
  document.addEventListener('keydown', onDocumentKeydown); // Обработчик закрытия модал.окна по нажатию клавиши
};

// Закрывает модальное окно
const hideModal = () => {
  form.reset(); // Сбрасываем значения формы
  resetScale();
  resetEffect();
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

function isErrorMessageExists() {
  return Boolean(document.querySelector('.error'));
}

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

// Закрываем модал.окно при нажатии клавиши Esc
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  const file = fileField.files[0];
  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  showModal();
};

async function sendForm(formElement) {
  if (!pristine.validate()) {
    return;
  }
  try {
    toggleSubmitButton(true);
    await sendPicture(new FormData(formElement));
    toggleSubmitButton(false);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
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
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
initEffect();
