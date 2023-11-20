const COMMENTS_COUNT_SHOW = 5;

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const closePictureButton = bigPicture.querySelector('#picture-cancel');

const commentsList = bigPicture.querySelector('.social__comments');
const commentCunt = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentCount = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

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
    commentsLoader.classList.add('hidden');
    commentsCuntShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCuntShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentCunt.textContent = commentsCuntShown;
  totalCommentCount.textContent = comments.length;
};

const onCommentsLoaderClock = () => renderComments();

const hidePicture = () => {
  commentsCuntShown = 0;
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onClosePictureButtonClik = () => {
  hidePicture();
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hidePicture();
  }
}

const renderPicture = ({ url, description, likes }) => {
  const imagePicture = bigPicture.querySelector('.big-picture__img img');
  imagePicture.src = url;
  imagePicture.alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showPicture = (pictureData) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  comments = pictureData.comments;
  if (comments.length > 0) {
    renderComments();
  }

  renderPicture(pictureData);
};

closePictureButton.addEventListener('click', onClosePictureButtonClik);
commentsLoader.addEventListener('click', onCommentsLoaderClock);

export { showPicture };
