import { isEscEvent } from './util.js';
import { setScaleValue } from './set-scale-value.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');

const INITIAL_IMAGE_SCALE = 100;

const onImageUploadCancelClick = function () {
  closeImageUploadOverlay();
}

const onImageUploadOverlayEscKeydown = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeImageUploadOverlay();
  }
}

const closeImageUploadOverlay = function () {
  imageUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imageUploadInput.value = null;
  document.removeEventListener('keydown', onImageUploadOverlayEscKeydown);
}

const openImageUploadOverlay = function () {
  imageUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  imageUploadCancel.addEventListener('click', onImageUploadCancelClick);
  document.addEventListener('keydown', onImageUploadOverlayEscKeydown);
  setScaleValue(INITIAL_IMAGE_SCALE);
}

imageUploadInput.addEventListener('change', openImageUploadOverlay);

export { onImageUploadOverlayEscKeydown };
