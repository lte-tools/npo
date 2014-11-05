define(['model/query.model'], function (query) {
  'use strict';
  var Select_Template_View = function () {
    var btn_query_report=$(document).find('#btn-query-report');
    var dialog = $(document).find('#modal-select-template');
    var btn_template = $(document).find('#btn-select-template');
    var btn_add = $(document).find('#btn-add-temp');
    var btn_del = $(document).find('#btn-del-temp');
    var btn_modify = $(document).find('#btn-modify-temp');


    var showDialog = function () {
      /*var dialog = $(document).find('#modal-select-template');*/
      dialog.modal('show');
      btn_add.on('click',function (){});
    };
    var submitQuery = function () {
      var iframe = $(window.frames["iframe-outdata"].document);
      var templateName = $(document).find('#template-name').val();
      var otype = $(document).find('#otype').val();
      var eid = $(document).find('#eid').val();
      var firstDate = $(document).find('#first-date').val();
      var secondDate = $(document).find('#second-date').val();
      var ruleTemplate = $(document).find('#rule-name').val();
      var data = {
        reporttemplate:templateName,
        otype:otype,
        eid:eid,
        firstdate:firstDate,
        seconddate:secondDate,
        ruletemplate:ruleTemplate
      }

      query.ajaxGet('/submit', data, function (r) {
        if (r.result === 'ok') {
          console.log(r.data);
          var i;
          iframe.find('#body').html('');
          for(i = 0; i < r.data.length; i += 1){
             iframe.find('#body').append(r.data[i]+'<br>');
          }
        } else {
          console.log('err');
        }
      }, this);
    };
    this.init = function () {
      /*btn_template.on('click',showDialog);*/

      btn_query_report.on('click',submitQuery);
    };
  };
  return new Select_Template_View();
});
