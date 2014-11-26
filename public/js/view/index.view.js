define(['model/query.model'], function (query) {
  'use strict';
  var Select_Template_View = function () {
    var btn_query_report=$(document).find('#btn-query-report');
    var outData = $(document).find("#outdata");
    var submitQuery = function () {
/*      var iframe = $(window.frames["iframe-outdata"].document);*/
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
      query.ajax('/submit', 'GET', data, function (r) {
        if (r.result === 'ok') {
          console.log(r.data);
          console.log(r.link);
          outData.html('');
          var link = r.link.split('/');
          var filelink = '/'+link[link.length-2]+'/'+link[link.length-1];

          outData.append(
              $('<li class="out-data-item list-group-item"></li>').append(
                $('<span class="item-casename"></span>').html('Case Name'),
                $('<span class="item-outdata"></span>').html("Output Data")
                ));
          var i;
          for(i = 0; i < r.data.length; i += 1){
            outData.append(
              $('<li class="out-data-item list-group-item"></li>').append(
                $('<span class="item-casename"></span>').html(r.data[i][0]),
                $('<span class="item-outdata"></span>').html(r.data[i][1])
                ));
          }
          outData.append($('<a></a>').html('Download File').addClass('download-link').attr('href',filelink));
     } else {
          console.log('err');
        }
      }, this);
    };

    this.init = function () {

      btn_query_report.on('click',submitQuery);
    };
  };
  return new Select_Template_View();
});
