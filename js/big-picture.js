import { descriptions } from './render-pictures.js';
import { clearComments, renderComments } from './render-comments.js';
import { isEscEvent, isEnterEvent } from './util.js';

const picturesList = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const onBigPictureCancelClick = function () {
  closeBigPicture();
}

const onBigPictureEscKeydown = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const bigPictureHandler = function (picture) {
  bigPicture.classList.remove('hidden');

  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  bigPictureImage.src = picture.url;

  const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  bigPictureLikesCount.textContent = picture.likes;

  const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  bigPictureCommentsCount.textContent = picture.comments.length;

  const bigPictureDescription = bigPicture.querySelector('.social__caption');
  bigPictureDescription.textContent = picture.description;

  document.querySelector('body').classList.add('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onBigPictureEscKeydown);

  renderComments(picture);
}

const openBigPicture = function (evt) {
  let picture;

  if (evt.target.matches('.picture')) {
    picture = descriptions.find(function (description) {
      return evt.target.querySelector('.picture__img').src.includes(description.url);
    });

    bigPictureHandler(picture);
  }

  if (evt.target.matches('.picture__img')) {
    picture = descriptions.find(function (description) {
      return evt.target.src.includes(description.url);
    });

    bigPictureHandler(picture);
  }
}

const closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  clearComments();
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

picturesList.addEventListener('click', function (evt) {
  evt.preventDefault();
  openBigPicture(evt);
});

picturesList.addEventListener('keydown', function (evt) {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
    openBigPicture(evt);
  }
});
