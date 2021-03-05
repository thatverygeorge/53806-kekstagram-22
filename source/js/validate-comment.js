import { checkStringLength, setMyCustomValidity, removeMyCustomValidity } from './util.js';
import { onImageUploadOverlayEscKeydown } from './image-upload-overlay.js';

const MAX_COMMENT_LENGTH = 140;

const commentInput = document.querySelector('.text__description');
const imageUploadSubmit = document.querySelector('.img-upload__submit');

const clearTextDescriptionInput = function () {
  commentInput.value = '';
}

const validateComment = function () {
  let message;

  if (!checkStringLength(commentInput.value, MAX_COMMENT_LENGTH)) {
    message = `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} симв.`;
    setMyCustomValidity(commentInput, message, imageUploadSubmit);
  } else {
    removeMyCustomValidity(commentInput, imageUploadSubmit);
  }

  commentInput.reportValidity();
}

commentInput.addEventListener('input', validateComment);

commentInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onImageUploadOverlayEscKeydown);
});

commentInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onImageUploadOverlayEscKeydown);
});

export { clearTextDescriptionInput };
