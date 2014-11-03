define(['model/mail.model'], function (g_Mail) {
  'use strict';
  var Select_Template_View = function () {
    var elem;
    this.init = function (opt) {
      elem = opt.elem;
     /* EC.register('mail.show', this);
      EC.on('mail.show', 'show', show);*/
    };
  };
  var show_template = function () {
     elem.base_dom.html('');
     var choose = elem.base_dom.find('#choose_templ');
  }


  };
  return new Template_Show_View();
});
