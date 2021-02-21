const swapNumbers = function (min, max) {
  min = min + max;
  max = min - max;
  min = min - max;

  return [min, max];
}

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min >= 0 && max >= 0) {
    if (max < min) {
      [min, max] = swapNumbers(min, max);
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
}

const getRandomElement = function (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

const getUniqueID = function (array, startIndex, endIndex) {
  let id;

  do {
    id = getRandomNumber(startIndex, endIndex);
  } while (array.indexOf(id) >= 0)

  array.push(id);

  return id;
}

const isEscEvent = function (evt) {
  return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = function (evt) {
  return evt.key === 'Enter';
};

const setMyCustomValidity = function (input, message, button) {
  const INVALID_OUTLINE_STYLE = '2px solid red';

  input.setCustomValidity(message);
  input.style.outline = INVALID_OUTLINE_STYLE;
  button.disabled = true;
}

const removeMyCustomValidity = function (input, button) {
  input.setCustomValidity('');
  input.style.outline = '';
  button.disabled = false;
}

export {
  swapNumbers,
  getRandomNumber,
  checkStringLength,
  getRandomElement,
  getUniqueID,
  isEscEvent,
  isEnterEvent,
  setMyCustomValidity,
  removeMyCustomValidity
};
