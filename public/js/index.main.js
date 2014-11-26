require(['requirejs.config'], function () {
  'use strict';
  require(['jquery', 'bootstrap', 'cookie'], function ($) {
    $(function () {
      require(['view/index.view'], function (Template_list) {
        Template_list.init();
      });
    });
  });
});
