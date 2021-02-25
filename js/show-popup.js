import { isEscEvent } from './util.js';

const main = document.querySelector('main');

const closePopup = function (popup) {
  popup.remove();
}

const onPopupEscKeydown = function (evt, popup) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup(popup);
  }
}

const showPopup = function (popup) {
  main.appendChild(popup);

  const button = popup.querySelector('button');

  button.addEventListener('click', function () {
    closePopup(popup);
    document.removeEventListener('keydown', onPopupEscKeydown);
  })

  document.addEventListener('keydown', function (evt) {
    onPopupEscKeydown(evt, popup);
  });

  popup.addEventListener('click', function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  })
}

export { showPopup };
