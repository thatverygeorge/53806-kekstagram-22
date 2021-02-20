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
  if (scaleValue >= 50 ) {
    scaleValue -= 25;
  }

  setScaleValue(scaleValue);
});

scaleControlBigger.addEventListener('click', function () {
  if (scaleValue <= 75) {
    scaleValue += 25;
  }

  setScaleValue(scaleValue);
});

export { setScaleValue };
