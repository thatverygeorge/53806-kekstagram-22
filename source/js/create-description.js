import { getRandomNumber } from './util.js';
import { createComment } from './create-comment.js';

const createDescription = function () {
  let descriptionID = 0;
  let photoID = 0;
  const DESCRIPTION = 'Lorem ipsum dolor sit amet.';

  return function () {
    return {
      id: ++descriptionID,
      url: `photos/${++photoID}.jpg`,
      description: DESCRIPTION,
      likes: getRandomNumber(15, 200),
      comments: new Array(getRandomNumber(5, 15)).fill(null).map(createComment),
    };
  };
};

export { createDescription };
