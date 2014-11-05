define(function () {
  'use strict';
  return {
    ajaxGet :function (url, data, anddothis, object) {
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: data
      }).done(function (result) {
        anddothis.call(object, result);
      });
    }
  };
});