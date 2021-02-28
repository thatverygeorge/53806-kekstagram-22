import { isEscEvent } from './util.js';
import { setScaleValue } from './set-scale-value.js';
import { resetEffect } from './effect-level-slider.js';
import { clearTextDescriptionInput } from './validate-comment.js';
import { clearTextHashtagsInput } from './validate-hastags.js';
import { sendData } from './api.js';
import { showPopup } from './show-popup.js'

const INITIAL_IMAGE_SCALE = 100;
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];

const imageUploadForm = document.querySelector('.img-upload__form');
const effectLevelFieldset = document.querySelector('.img-upload__effect-level');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');

const successPopup = document.querySelector('#success').content.querySelector('.success');
const errorPopup = document.querySelector('#error').content.querySelector('.error');

const uploadPreviewImage = document.querySelector('.img-upload__preview img');
const effectsPreviewMiniatures = document.querySelectorAll('.effects__preview');

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
  effectLevelFieldset.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  imageUploadCancel.addEventListener('click', onImageUploadCancelClick);
  document.addEventListener('keydown', onImageUploadOverlayEscKeydown);
  setScaleValue(INITIAL_IMAGE_SCALE);
}

const setMiniatures = function (url) {
  effectsPreviewMiniatures.forEach(function (miniature) {
    miniature.style.backgroundImage = `url('${url}')`;
  });
}

imageUploadInput.addEventListener('change', function (evt) {
  openImageUploadOverlay();

  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const isValidFile = FILE_TYPES.some(function (type) {
    return fileName.endsWith(type);
  })

  if (isValidFile) {
    const reader = new FileReader();

    reader.addEventListener('load', function () {
      uploadPreviewImage.src = reader.result;
      setMiniatures(reader.result);
    });

    reader.readAsDataURL(file);
  }
});

imageUploadForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const data = new FormData(evt.target);
  sendData(
    data,
    function () {
      closeImageUploadOverlay();
      showPopup(successPopup);
    },
    function () {
      closeImageUploadOverlay();
      showPopup(errorPopup);
    });
});

export { onImageUploadOverlayEscKeydown };
