import { isEscape } from './util.js';

const COMMENTS_COUNT_SHOW = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButtonElement = bigPictureElement.querySelector('#picture-cancel');

const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentCuntElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');

let commentsCuntShown = 0;
let comments = [];

const createComment = ({ avatar, message, name }) => {
  const newComment = commentElement.cloneNode(true);
  const socialPictureElement = newComment.querySelector('.social__picture');
  socialPictureElement.src = avatar;
  socialPictureElement.alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = () => {
  commentsCuntShown += COMMENTS_COUNT_SHOW;

  if (commentsCuntShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsCuntShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCuntShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);
  commentCuntElement.textContent = commentsCuntShown;
  totalCommentCountElement.textContent = comments.length;
};

const onCommentsLoaderClock = () => renderComments();

const hidePicture = () => {
  commentsCuntShown = 0;
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onClosePictureButtonClick = () => {
  hidePicture();
};

function onDocumentKeydown(evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    hidePicture();
  }
}

const renderPicture = ({ url, description, likes }) => {
  const imagePicture = bigPictureElement.querySelector('.big-picture__img img');
  imagePicture.src = url;
  imagePicture.alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showPicture = (pictureData) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  comments = pictureData.comments;
  if (comments.length > 0) {
    renderComments();
  }

  renderPicture(pictureData);
};

closePictureButtonElement.addEventListener('click', onClosePictureButtonClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClock);

export { showPicture };
