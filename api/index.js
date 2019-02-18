import $ from 'jquery';

export function _api (url, method = 'POST', data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      dataType: 'json',
      data,
      method,
      url,
    })
      .done(resolve)
      .fail(reject);
  });
}

export function genericGetUrl (url) {
  return _api(url, 'GET');
}

export function genericPostUrl (url, data) {
  return _api(url, 'POST', data);
}
