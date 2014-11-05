require(['requirejs.config'], function () {
  'use strict';
  require(['jquery', 'bootstrap', 'cookie'], function ($) {
    $(function () {
      require(['view/rule.template.import'], function (Template_list) {
        Template_list.init();
      });
    });
  });
});
