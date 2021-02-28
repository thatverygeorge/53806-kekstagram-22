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
        onSuccess();
        return response.json();
      }

      onError();
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

      onError();
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then(function (json) {
      onSuccess(json);
      return json;
    })
    .catch(function (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    });
}

export { sendData, getData };
