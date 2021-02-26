import { getData } from './api.js';

const errorPopup = document.querySelector('#pictures-error').content.querySelector('.pictures-error');

let descriptions;

const renderPictures = function (json) {
  descriptions = json;
  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesListFragment = document.createDocumentFragment();

  json.forEach(function (description) {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = description.url;
    pictureElement.querySelector('.picture__likes').textContent = description.likes;
    pictureElement.querySelector('.picture__comments').textContent = description.comments.length;
    picturesListFragment.appendChild(pictureElement);
  });

  picturesList.appendChild(picturesListFragment);
};

getData(renderPictures, errorPopup);

export { descriptions };
