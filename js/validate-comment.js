import { checkStringLength, setMyCustomValidity, removeMyCustomValidity } from './util.js';
import { onImageUploadOverlayEscKeydown } from './image-upload-overlay.js';

const MAX_COMMENT_LENGTH = 140;

const textDescriptionInput = document.querySelector('.text__description');
const imageUploadSubmit = document.querySelector('.img-upload__submit');

const clearTextDescriptionInput = function () {
  textDescriptionInput.value = '';
}

const validateComment = function () {
  let message;

  if (!checkStringLength(textDescriptionInput.value, MAX_COMMENT_LENGTH)) {
    message = `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} симв.`;
    setMyCustomValidity(textDescriptionInput, message, imageUploadSubmit);
  } else {
    removeMyCustomValidity(textDescriptionInput, imageUploadSubmit);
  }

  textDescriptionInput.reportValidity();
}

textDescriptionInput.addEventListener('input', validateComment);

textDescriptionInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onImageUploadOverlayEscKeydown);
});

textDescriptionInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onImageUploadOverlayEscKeydown);
});

export { clearTextDescriptionInput };
