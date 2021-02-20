import { createDescription } from './create-description.js';

const descriptions = new Array(25).fill(null).map(createDescription);

const renderPictures = function () {
  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesListFragment = document.createDocumentFragment();

  descriptions.forEach(function (description) {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = description.url;
    pictureElement.querySelector('.picture__likes').textContent = description.likes;
    pictureElement.querySelector('.picture__comments').textContent = description.comments.length;
    picturesListFragment.appendChild(pictureElement);
  });

  picturesList.appendChild(picturesListFragment);
};

renderPictures();

export { descriptions };
