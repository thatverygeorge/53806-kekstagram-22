import {
  getRandomNumber,
  checkStringLength,
  getRandomElement,
  getUniqueID
} from './util.js';

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

const createComment = function () {
  let commentIDs = [];
  let message = '';

  return function () {
    const ID = getUniqueID(commentIDs, 1, 1000);
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
  };
};

export { createComment };
