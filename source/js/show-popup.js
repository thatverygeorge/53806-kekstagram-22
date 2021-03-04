import { isEscEvent } from './util.js';

const main = document.querySelector('main');

let popup;

const closePopup = function () {
  popup.remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const onPopupEscKeydown = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup(popup);
  }
}

const showPopup = function (element) {
  popup = element;

  main.appendChild(popup);

  const button = popup.querySelector('button');

  button.addEventListener('click', function () {
    closePopup();
    document.removeEventListener('keydown', onPopupEscKeydown);
  })

  document.addEventListener('keydown', onPopupEscKeydown);

  popup.addEventListener('click', function (evt) {
    if (evt.target === popup) {
      closePopup();
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  })
}

export { showPopup };
