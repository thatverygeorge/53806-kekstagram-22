import { checkStringLength, setMyCustomValidity, removeMyCustomValidity } from './util.js';
import { onImageUploadOverlayEscKeydown } from './image-upload-overlay.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_NUMBER_OF_HASHTAGS = 5;
const LETTERS_NUMBERS_REG_EXP = /^[A-Za-zА-яа-я0-9]+$/;

const textHashtagsInput = document.querySelector('.text__hashtags');
const imageUploadSubmit = document.querySelector('.img-upload__submit');

const clearTextHashtagsInput = function () {
  textHashtagsInput.value = '';
}

const validateHashtags = function () {
  const hashtags = textHashtagsInput.value.trim().split(' ');
  let message;

  if (textHashtagsInput.value.length > 0) {
    hashtags.forEach(function (currentHashtag, currentHashtagIndex, array) {
      if (array.length > MAX_NUMBER_OF_HASHTAGS) {
        message = `Максимальное количество хэштегов: ${MAX_NUMBER_OF_HASHTAGS}.`;
        setMyCustomValidity(textHashtagsInput, message, imageUploadSubmit);
      } else if (!currentHashtag.startsWith('#') || textHashtagsInput.value.indexOf('  ') === 0) {
        message = 'Хэштег должен начинаться с символа #.';
        setMyCustomValidity(textHashtagsInput, message, imageUploadSubmit);
      } else if (textHashtagsInput.value.indexOf('  ') > 0) {
        message = 'Хэштеги должны разделяться одним пробелом.';
        setMyCustomValidity(textHashtagsInput, message, imageUploadSubmit);
      } else if (!currentHashtag.slice(1).match(LETTERS_NUMBERS_REG_EXP)) {
        message = 'Хэштег должен состоять из букв и чисел.';
        setMyCustomValidity(textHashtagsInput, message, imageUploadSubmit);
      } else if (!checkStringLength(currentHashtag, MAX_HASHTAG_LENGTH)) {
        message = 'Длина одного хэштега не должна превышать 20 симв.';
        setMyCustomValidity(textHashtagsInput, message, imageUploadSubmit);
      } else {
        removeMyCustomValidity(textHashtagsInput, imageUploadSubmit);
      }

      if (array.length > 1) {
        array.forEach(function (hashtag, hashtagIndex) {
          if (currentHashtagIndex !== hashtagIndex && currentHashtag.toLowerCase() === hashtag.toLowerCase()) {
            message = 'Один и тот же хэштег не может быть использован повторно.';
            setMyCustomValidity(textHashtagsInput, message, imageUploadSubmit);
          }
        });
      }
    });
  } else {
    removeMyCustomValidity(textHashtagsInput, imageUploadSubmit);
  }

  textHashtagsInput.reportValidity();
}

textHashtagsInput.addEventListener('input', validateHashtags);

textHashtagsInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onImageUploadOverlayEscKeydown);
});

textHashtagsInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onImageUploadOverlayEscKeydown);
});

export { clearTextHashtagsInput };
