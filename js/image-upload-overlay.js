import { isEscEvent } from './util.js';
import { setScaleValue } from './set-scale-value.js';
import { resetEffect } from './effect-level-slider.js';
import { clearTextDescriptionInput } from './validate-comment.js';
import { clearTextHashtagsInput } from './validate-hastags.js';
import { sendData } from './api.js';

const INITIAL_IMAGE_SCALE = 100;

const imageUploadForm = document.querySelector('.img-upload__form');
const efectLevelFieldset = document.querySelector('.img-upload__effect-level');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');

const successPopup = document.querySelector('#success').content.querySelector('.success');
const errorPopup = document.querySelector('#error').content.querySelector('.error');

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
  setScaleValue(INITIAL_IMAGE_SCALE);
  resetEffect();
  clearTextDescriptionInput();
  clearTextHashtagsInput();
  document.removeEventListener('keydown', onImageUploadOverlayEscKeydown);
}

const openImageUploadOverlay = function () {
  imageUploadOverlay.classList.remove('hidden');
  efectLevelFieldset.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  imageUploadCancel.addEventListener('click', onImageUploadCancelClick);
  document.addEventListener('keydown', onImageUploadOverlayEscKeydown);
  setScaleValue(INITIAL_IMAGE_SCALE);
}

imageUploadInput.addEventListener('change', openImageUploadOverlay);

imageUploadForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const data = new FormData(evt.target);
  sendData(data, closeImageUploadOverlay, closeImageUploadOverlay, successPopup, errorPopup);
});

export { onImageUploadOverlayEscKeydown };
