define(function () {
  'use strict';
  return {
    ajax :function (url, type, data, anddothis, object) {
      $.ajax({
        url: url,
        type: type,
        dataType: 'json',
        data: data
      }).done(function (result) {
        anddothis.call(object, result);
      });
    }
  };
});