/* global noUiSlider:readonly */

const efectLevelFieldset = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsPreviewNone = document.querySelector('.effects__preview--none');
const uploadPreviewImage = document.querySelector('.img-upload__preview img');

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
  uploadPreviewImage.style.filter = 'none';
  effectsPreviewNone.click();
}

const sliderHandler = function (effect) {
  effectLevelSlider.noUiSlider.on('update', function (values, handle) {
    switch (effect) {
      case 'chrome':
        uploadPreviewImage.style.filter = 'none';
        uploadPreviewImage.style.filter = `grayscale(${values[handle]})`;
        break;
      case 'sepia':
        uploadPreviewImage.style.filter = 'none';
        uploadPreviewImage.style.filter = `sepia(${values[handle]})`;
        break;
      case 'marvin':
        uploadPreviewImage.style.filter = 'none';
        uploadPreviewImage.style.filter = `invert(${values[handle]}%)`;
        break;
      case 'phobos':
        uploadPreviewImage.style.filter = 'none';
        uploadPreviewImage.style.filter = `blur(${values[handle]}px)`;
        break;
      case 'heat':
        uploadPreviewImage.style.filter = 'none';
        uploadPreviewImage.style.filter = `brightness(${values[handle]})`;
        break;
      case 'none':
        uploadPreviewImage.style.filter = 'none';
        destroySlider();
        break;
    }

    effectLevelValue.value = values[handle];
  });
}

effectsList.addEventListener('change', function (evt) {
  if (evt.target.matches('.effects__radio')) {
    if (effectLevelSlider.noUiSlider) {
      destroySlider();
    }

    switch (evt.target.value) {
      case 'chrome':
      case 'sepia':
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
      case 'none':
        createSlider();
        break;
    }

    uploadPreviewImage.classList.forEach(function (currentClass) {
      uploadPreviewImage.classList.remove(currentClass);
    });
    uploadPreviewImage.classList.add(`effects__preview--${evt.target.value}`);
    sliderHandler(evt.target.value);
  }
});

export { resetEffect };
