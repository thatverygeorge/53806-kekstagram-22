import { showPopup } from './show-popup.js'

const sendData = function (data, onSuccess, onError, successPopup, errorPopup) {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      credentials: 'same-origin',
      body: data,
    },
  )
    .then(function (response) {
      if (response.ok) {
        onSuccess();
        showPopup(successPopup);
        return response.json();
      }

      onError();
      showPopup(errorPopup);
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then(function (json) {
      // eslint-disable-next-line no-console
      console.log(json);
    })
    .catch(function (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    });
}

const getData = function (onSuccess, errorPopup) {
  fetch(
    'https://22.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }

      showPopup(errorPopup);
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then(function (json) {
      onSuccess(json);
    })
    .catch(function (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    });
}

export { sendData, getData };
