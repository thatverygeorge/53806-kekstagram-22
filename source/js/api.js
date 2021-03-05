const sendData = function (data, onSuccess, onError) {
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
        return response.json();
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then(function () {
      onSuccess();
    })
    .catch(function () {
      onError();
    });
}

const getData = function (onSuccess, onError) {
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

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then(function (json) {
      onSuccess(json);
    })
    .catch(function () {
      onError();
    });
}

export { sendData, getData };
