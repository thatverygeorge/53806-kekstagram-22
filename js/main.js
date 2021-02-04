'use strict';

const MAX_COMMENT_LENGTH = 140;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Торин',
  'Бифур',
  'Бофур',
  'Бомбур',
  'Оин',
  'Глоин',
  'Балин',
  'Двалин',
  'Дори',
  'Нори',
  'Ори',
  'Фили',
  'Килиб',
];
const DESCRIPTION = 'Lorem ipsum dolor sit amet.';

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min >= 0 && max >=0) {
    if (max < min) {
      min = min + max;
      max = min - max;
      min = min - max;
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

let commentIDs = [];

const createComment = function () {
  const ID = getUniqueID(commentIDs, 1, 1000);
  let message = '';
  const NUMBER_OF_MESSAGES = getRandomNumber(1, 2);

  do {
    message = (NUMBER_OF_MESSAGES === 1) ? getRandomElement(MESSAGES) :
      getRandomElement(MESSAGES) + ' ' + getRandomElement(MESSAGES);
  } while (!checkStringLength(message, MAX_COMMENT_LENGTH))

  return {
    id: ID,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: message,
    name: getRandomElement(NAMES),
  };
}

let descriptionID = 0;
let photoID = 0;

const createDescriptions = function () {
  return {
    id: ++descriptionID,
    url: `photos/${++photoID}.jpg`,
    description: DESCRIPTION,
    likes: getRandomNumber(15, 200),
    comments: new Array(getRandomNumber(1, 5)).fill(null).map(function () {return createComment()}),
  }
};

const descriptions = new Array(25)
  .fill(null)
  .map(function () {
    return createDescriptions()
  });

// eslint-disable-next-line no-console
console.log(descriptions);
