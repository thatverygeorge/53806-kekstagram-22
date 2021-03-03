const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadPreviewImage = document.querySelector('.img-upload__preview img');

let scaleValue = 100;

const setScaleValue = function (value) {
  scaleValue = value;
  scaleControlValue.value = `${value}%`;
  uploadPreviewImage.style.transform = `scale(${value / 100})`;
}

scaleControlSmaller.addEventListener('click', function () {
  if ((scaleValue - SCALE_STEP) >= MIN_SCALE) {
    scaleValue -= SCALE_STEP;
  }

  setScaleValue(scaleValue);
});

scaleControlBigger.addEventListener('click', function () {
  if ((scaleValue + SCALE_STEP) <= MAX_SCALE) {
    scaleValue += SCALE_STEP;
  }

  setScaleValue(scaleValue);
});

export { setScaleValue };
