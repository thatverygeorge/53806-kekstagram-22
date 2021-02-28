import { getData } from './api.js';
import { showPopup } from './show-popup.js';
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

const renderPictures = function (json = descriptions) {
  const pictures = document.querySelectorAll('.picture');
  const picturesListFragment = document.createDocumentFragment();

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
};

const comparePicturesByNumberOfComments = function (pictureA, pictureB) {
  const numberOfCommentsA = pictureA.comments.length;
  const numberOfCommentsB = pictureB.comments.length;

  return numberOfCommentsB - numberOfCommentsA;
}

const shufflePictures = function () {
  return Math.random() - 0.5;
}

const debouncedRenderPictures = debounce(renderPictures, RERENDER_DELAY);

getData(
  function (json) {
    renderPictures(json);
    setImageFiltersFormHandler(debouncedRenderPictures);
    descriptions = json;
    imageFilters.classList.remove('img-filters--inactive');
  },
  function () {
    showPopup(errorPopup);
  });

const imageFilterButtonHandler = function (filterButton) {
  imageFiltersButtons.forEach(function (button) {
    button.classList.remove('img-filters__button--active');
  })
  filterButton.classList.add('img-filters__button--active');
}

const setImageFiltersFormHandler = function (cb) {
  imageFiltersForm.addEventListener('click', function (evt) {
    if (evt.target.matches('#filter-default')) {
      imageFilterButtonHandler(evt.target);
      cb();
    }

    if (evt.target.matches('#filter-random')) {
      imageFilterButtonHandler(evt.target);
      const randomPictures = descriptions.slice().sort(shufflePictures).slice(0, NUMBER_OF_RANDOM_PICTURES);
      cb(randomPictures);
    }

    if (evt.target.matches('#filter-discussed')) {
      imageFilterButtonHandler(evt.target);
      const sortedPictures = descriptions.slice().sort(comparePicturesByNumberOfComments);
      cb(sortedPictures);
    }
  });
}

export { descriptions };
