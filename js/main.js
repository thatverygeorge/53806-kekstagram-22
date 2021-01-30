'use strict';

const MAX_COMMENT_LENGTH = 140;

let comment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim';

//https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min >= 0 && max >=0) {
    if (max < min) {
      let temp = max;
      max = min;
      min = temp;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

alert(getRandomNumber(0, 10));

const checkStringLength = function (string, maxLength) {
  return string.length <= maxLength;
}

alert(checkStringLength(comment, MAX_COMMENT_LENGTH));
