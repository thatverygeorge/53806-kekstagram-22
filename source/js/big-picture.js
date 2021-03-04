import { getDescriptions } from './render-pictures.js';
import { clearComments, renderComments } from './render-comments.js';
import { isEscEvent, isEnterEvent } from './util.js';

const bodyElement = document.querySelector('body');
const picturesList = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const onCommentsLoaderClick = function () {
  addComments();
}

const closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  clearComments();
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

const onBigPictureCancelClick = function () {
  closeBigPicture();
}

const onBigPictureEscKeydown = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

let addComments;

const setBigPicture = function (picture) {
  bigPicture.classList.remove('hidden');

  const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  bigPictureImage.src = picture.url;

  const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  bigPictureLikesCount.textContent = picture.likes;

  const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  bigPictureCommentsCount.textContent = picture.comments.length;

  const bigPictureDescription = bigPicture.querySelector('.social__caption');
  bigPictureDescription.textContent = picture.description;

  bodyElement.classList.add('modal-open');

  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onBigPictureEscKeydown);

  clearComments();
  addComments = renderComments(picture);
  addComments();

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
}

const openBigPicture = function (evt) {
  const descriptions = getDescriptions();
  const target = evt.target.closest('.picture');
  let picture;
  let element;

  if (target) {
    evt.preventDefault();

    Array.from(target.children).forEach(function (child, index, array) {
      if (child.classList.contains('picture__img')) {
        element = array[index];
      }
    });

    picture = descriptions.find(function (description) {
      return element.src.includes(description.url);
    });

    setBigPicture(picture);
  }
}

picturesList.addEventListener('click', function (evt) {
  openBigPicture(evt);
});

picturesList.addEventListener('keydown', function (evt) {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
    openBigPicture(evt);
  }
});
