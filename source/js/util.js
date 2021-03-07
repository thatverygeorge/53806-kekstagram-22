const INVALID_OUTLINE_STYLE = '2px solid red';

const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
}

const isEscEvent = function (evt) {
  return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = function (evt) {
  return evt.key === 'Enter';
};

const setMyCustomValidity = function (input, message, button) {
  input.setCustomValidity(message);
  input.style.outline = INVALID_OUTLINE_STYLE;
  button.disabled = true;
}

const removeMyCustomValidity = function (input, button) {
  input.setCustomValidity('');
  input.style.outline = '';
  button.disabled = false;
}

const debounce = function (cb, timeout) {
  let isTimeOut = false;
  let timeoutID = 0;

  return function (...args) {
    if (!isTimeOut) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(function () {
        cb(...args);
      }, timeout);
    }
  };
};

export {
  checkStringLength,
  isEscEvent,
  isEnterEvent,
  setMyCustomValidity,
  removeMyCustomValidity,
  debounce
};
