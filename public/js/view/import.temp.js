define(['model/query.model'], function (query) {
  'use strict';
  var Rule_Template_Import = function () {
    var btnCreateBlankTemp =$(document).find("create-blank-temp");
    var btnImportTemplate=$(document).find("upload-template");

  
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
    var createBlankTemp = function () {

    }
    this.init = function () {
      btnCreateBlankTemp.on('click',createBlankTemp);
      btnImportTemplate.on('click', ruleFormat);
    };
  };
  return new Rule_Template_Import();
});
