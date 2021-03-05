import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const efectLevelFieldset = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectInputNone = document.querySelector('#effect-none');
const previewImage = document.querySelector('.img-upload__preview img');

const createSlider = function (min = 0, max = 1, start = 1, step = 0.1) {
  efectLevelFieldset.classList.remove('hidden');

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
}

const destroySlider = function () {
  efectLevelFieldset.classList.add('hidden');
  effectLevelSlider.noUiSlider.destroy();
}

const resetEffect = function () {
  previewImage.style.filter = 'none';
  effectInputNone.click();
}

const setSliderHandler = function (effect) {
  effectLevelSlider.noUiSlider.on('update', function (values, handle) {
    switch (effect) {
      case 'chrome':
        previewImage.style.filter = 'none';
        previewImage.style.filter = `grayscale(${values[handle]})`;
        break;
      case 'sepia':
        previewImage.style.filter = 'none';
        previewImage.style.filter = `sepia(${values[handle]})`;
        break;
      case 'marvin':
        previewImage.style.filter = 'none';
        previewImage.style.filter = `invert(${values[handle]}%)`;
        break;
      case 'phobos':
        previewImage.style.filter = 'none';
        previewImage.style.filter = `blur(${values[handle]}px)`;
        break;
      case 'heat':
        previewImage.style.filter = 'none';
        previewImage.style.filter = `brightness(${values[handle]})`;
        break;
      case 'none':
        previewImage.style.filter = 'none';
        destroySlider();
        break;
    }

    effectLevelValue.value = values[handle];
  });
}

let currentEffect;

effectsList.addEventListener('change', function (evt) {
  if (evt.target.matches('.effects__radio')) {
    if (effectLevelSlider.noUiSlider) {
      destroySlider();
    }

    switch (evt.target.value) {
      case 'chrome':
      case 'sepia':
      case 'none':
        createSlider();
        break;
      case 'marvin':
        createSlider(0, 100, 100, 1);
        break;
      case 'phobos':
        createSlider(0, 3, 3, 0.1);
        break;
      case 'heat':
        createSlider(1, 3, 3, 0.1);
        break;
    }

    if (currentEffect) {
      previewImage.classList.remove(currentEffect);
    }
    currentEffect = `effects__preview--${evt.target.value}`
    previewImage.classList.add(`effects__preview--${evt.target.value}`);

    setSliderHandler(evt.target.value);
  }
});

export { resetEffect };
