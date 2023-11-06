// Переменные для закрытия и открытия попапа
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.social__comments-loader');
const imageElement = bigPicture.querySelector('.big-picture__img img');
const descriptionElement = bigPicture.querySelector('.social__caption');
const likesElement = bigPicture.querySelector('.likes-count');
const commentsElement = bigPicture.querySelector('.social__comments');
const commentElement = bigPicture.querySelector('.social__comment');

//Закрывает попап по кнопке
const modalCloseButton = document.querySelector('#picture-cancel');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

modalCloseButton.addEventListener('click', () => {
  closeBigPicture();
});

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach(({ avatar, message, name }) => {
    const commentTemplate = commentElement.cloneNode(true);
    const autorAvatar = commentTemplate.querySelector('.social__picture');
    autorAvatar.src = avatar;
    autorAvatar.alt = name;
    commentTemplate.querySelector('.social__text').textContent = message;
    fragment.append(commentTemplate);
  });
  commentsElement.innerHTML = '';
  commentsElement.append(fragment);
};

const renderBigPicture = ({ url, description, comments, likes }) => {
  imageElement.src = url;
  descriptionElement.textContent = description;
  likesElement.textContent = likes;
  renderComments(comments);
};

const openModal = (picture) => {
  renderBigPicture(picture);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  // commentCount.classList.add('hidden');
  // commentLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

export { openModal };
