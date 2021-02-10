import { getRandomNumber } from './util.js';
import { createComment } from './create-comment.js';

const DESCRIPTION = 'Lorem ipsum dolor sit amet.';

const createDescription = function () {
  let descriptionID = 0;
  let photoID = 0;

  return function () {
    return {
      id: ++descriptionID,
      url: `photos/${++photoID}.jpg`,
      description: DESCRIPTION,
      likes: getRandomNumber(15, 200),
      comments: new Array(getRandomNumber(1, 5)).fill(null).map(createComment),
    };
  };
}();

export { createDescription };
