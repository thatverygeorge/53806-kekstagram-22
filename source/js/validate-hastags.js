import { checkStringLength, setMyCustomValidity, removeMyCustomValidity } from './util.js';
import { onImageUploadOverlayEscKeydown } from './image-upload-overlay.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_NUMBER_OF_HASHTAGS = 5;
const LETTERS_NUMBERS_REG_EXP = /^[A-Za-zА-яа-я0-9]+$/;

const hashtagsInput = document.querySelector('.text__hashtags');
const imageUploadSubmit = document.querySelector('.img-upload__submit');

const clearTextHashtagsInput = function () {
  hashtagsInput.value = '';
}

const validateHashtags = function () {
  const hashtags = hashtagsInput.value.trim().split(' ');
  let message;

  if (hashtagsInput.value.length > 0) {
    hashtags.forEach(function (currentHashtag, currentHashtagIndex, array) {
      if (array.length > MAX_NUMBER_OF_HASHTAGS) {
        message = `Максимальное количество хэштегов: ${MAX_NUMBER_OF_HASHTAGS}.`;
        setMyCustomValidity(hashtagsInput, message, imageUploadSubmit);
      } else if (!currentHashtag.startsWith('#') || hashtagsInput.value.indexOf('  ') === 0) {
        message = 'Хэштег должен начинаться с символа #.';
        setMyCustomValidity(hashtagsInput, message, imageUploadSubmit);
      } else if (hashtagsInput.value.indexOf('  ') > 0) {
        message = 'Хэштеги должны разделяться одним пробелом.';
        setMyCustomValidity(hashtagsInput, message, imageUploadSubmit);
      } else if (!currentHashtag.slice(1).match(LETTERS_NUMBERS_REG_EXP)) {
        message = 'Хэштег должен состоять из букв и чисел.';
        setMyCustomValidity(hashtagsInput, message, imageUploadSubmit);
      } else if (!checkStringLength(currentHashtag, MAX_HASHTAG_LENGTH)) {
        message = 'Длина одного хэштега не должна превышать 20 симв.';
        setMyCustomValidity(hashtagsInput, message, imageUploadSubmit);
      } else {
        removeMyCustomValidity(hashtagsInput, imageUploadSubmit);
      }

      if (array.length > 1) {
        array.forEach(function (hashtag, hashtagIndex) {
          if (currentHashtagIndex !== hashtagIndex && currentHashtag.toLowerCase() === hashtag.toLowerCase()) {
            message = 'Один и тот же хэштег не может быть использован повторно.';
            setMyCustomValidity(hashtagsInput, message, imageUploadSubmit);
          }
        });
      }
    });
  } else {
    removeMyCustomValidity(hashtagsInput, imageUploadSubmit);
  }

  hashtagsInput.reportValidity();
}

hashtagsInput.addEventListener('input', validateHashtags);

hashtagsInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onImageUploadOverlayEscKeydown);
});

hashtagsInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onImageUploadOverlayEscKeydown);
});

export { clearTextHashtagsInput };
