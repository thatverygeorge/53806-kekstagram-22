const switchNumbers = function (min, max) {
  min = min + max;
  max = min - max;
  min = min - max;

  return [min, max];
}

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min >= 0 && max >=0) {
    if (max < min) {
      [min, max] = switchNumbers(min, max);
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

export {
  switchNumbers,
  getRandomNumber,
  checkStringLength,
  getRandomElement,
  getUniqueID
};
