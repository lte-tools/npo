require(['requirejs.config'], function () {
  'use strict';
  require(['jquery', 'bootstrap', 'cookie', 'uploadify'], function ($) {
    $(function () {
      require(['view/import.temp'], function (Template_list) {
        Template_list.init();
      });
    });
  });
});
