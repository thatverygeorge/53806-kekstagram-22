import { getData } from './api.js';
import { showPopup } from './show-popup.js';
import { getUniqueID } from './util.js';
import { debounce } from './util.js';

const NUMBER_OF_RANDOM_PICTURES = 10;
const RERENDER_DELAY = 500;

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const errorPopup = document.querySelector('#pictures-error').content.querySelector('.pictures-error');

const imageFilters = document.querySelector('.img-filters');
const imageFiltersForm = document.querySelector('.img-filters__form');
const imageFiltersButtons = document.querySelectorAll('.img-filters__button');

let descriptions;

const renderPictures = function (json = descriptions, isOrderOriginal = false) {
  const pictures = document.querySelectorAll('.picture');
  const picturesListFragment = document.createDocumentFragment();

  if (isOrderOriginal) {
    descriptions = json;
  }

  json.forEach(function (description) {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = description.url;
    pictureElement.querySelector('.picture__likes').textContent = description.likes;
    pictureElement.querySelector('.picture__comments').textContent = description.comments.length;
    picturesListFragment.appendChild(pictureElement);
  });

  pictures.forEach(function (picture) {
    picturesList.removeChild(picture);
  });

  picturesList.appendChild(picturesListFragment);

  imageFilters.classList.remove('img-filters--inactive');
};

const getTenRandomPictures = function () {
  let randomIDs = [];
  let randomPictures = [];

  for (let i = 0; i < NUMBER_OF_RANDOM_PICTURES; i++) {
    getUniqueID(randomIDs, 0, descriptions.length - 1);
  }

  randomIDs.forEach(function (id) {
    randomPictures.push(descriptions[id]);
  });

  return randomPictures;
}

const comparePicturesByNumberOfComments = function (pictureA, pictureB) {
  const numberOfCommentsA = pictureA.comments.length;
  const numberOfCommentsB = pictureB.comments.length;

  return numberOfCommentsB - numberOfCommentsA;
}

const debouncedRenderPictures = debounce(renderPictures, RERENDER_DELAY);

getData(
  function (json) {
    renderPictures(json, true);
    setImageFiltersFormHandler(debouncedRenderPictures);
  },
  function () {
    showPopup(errorPopup);
  });

const setImageFiltersFormHandler = function (cb) {
  imageFiltersForm.addEventListener('click', function (evt) {
    if (evt.target.matches('#filter-default')) {
      imageFiltersButtons.forEach(function (button) {
        button.classList.remove('img-filters__button--active');
      })
      evt.target.classList.add('img-filters__button--active');
      cb();
    }

    if (evt.target.matches('#filter-random')) {
      imageFiltersButtons.forEach(function (button) {
        button.classList.remove('img-filters__button--active');
      })
      evt.target.classList.add('img-filters__button--active');
      const randomPictures = getTenRandomPictures();
      cb(randomPictures);
    }

    if (evt.target.matches('#filter-discussed')) {
      imageFiltersButtons.forEach(function (button) {
        button.classList.remove('img-filters__button--active');
      })
      evt.target.classList.add('img-filters__button--active');
      const sortedPictures = descriptions.slice().sort(comparePicturesByNumberOfComments);
      cb(sortedPictures);
    }
  });
}

export { descriptions };
