require(['requirejs.config'], function () {
  'use strict';
  require(['jquery', 'bootstrap', 'cookie', 'datepicker'], function ($) {
    $(function () {
      require(['view/select.template.view'], function (Template_list) {
        Template_list.init({
          elem: {
            base: $('#modal-show-template'),      
            base_dom: $('#select_tabs'),
            base_iframe_dom: $('#tdiframe')
          }
        });
      });
    });
  });
});
