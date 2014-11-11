define(['model/query.model'], function (query) {
  'use strict';
  var Rule_Template_Import = function () {
    var btnImportTemplate=$(document).find('#btn-import-template');
    var ruleText = $(document).find('#rule-text');
    var ruleTemplateName = $(document).find('#new-template-name');
  
  
    var ruleFormat = function () {
      var uploadTemplate = new Array();
      uploadTemplate.push(ruleTemplateName.val());
      var rule = ruleText.val().split(';');
      var i;
      if(rule[rule.length - 1] == ''){
        rule.length -= 1;
      };
      console.log(rule.length);
      for (i = 0; i < rule.length; i += 1){
        uploadTemplate.push(rule[i]);
        /*var item = rule[0].split(',');*/
      }
      console.log(uploadTemplate);
      var uploadData = {
        data:JSON.stringify(uploadTemplate)
      };
      console.log(uploadData);
      query.ajax('/import_data', 'POST', uploadData, function (r) {
        if (r.result === 'ok') {
        } else {
          console.log('err');
        }
      }, this);      
    }
    this.init = function () {
      btnImportTemplate.on('click', ruleFormat);
    //var template = document.getElementById('right_area');
    };
  };
  return new Rule_Template_Import();
});
