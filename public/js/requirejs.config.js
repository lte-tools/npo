define(function () {
  'use strict';
  return (function () {
    require.config({
      baseUrl: '/js',
      paths: {
        'jquery': '//172.24.186.245/jslib/jquery/jquery-1.9.1.min',
        'bootstrap': '//172.24.186.245/jslib/bootstrap/bootstrap3.0.3/dist/js/bootstrap.min',
        'cookie': '//172.24.186.245/jslib/jquery/jquery.cookie',
        'summernote': 'summernote',
        'datepicker': 'bootstrap-datepicker',
        'codemirror': '//172.24.186.245/jslib/bootstrap/summernote/0.5.1/include/codemirror.min',
        'codemirror-xml': '//172.24.186.245/jslib/bootstrap/summernote/0.5.1/include/xml.min',
        'codemirror-formatting': '//172.24.186.245/jslib/bootstrap/summernote/0.5.1/include/formatting.min',
        'tagsinput': '//172.24.186.245/jslib/bootstrap/bootstrap-tagsinput-0.3.9/dist/bootstrap-tagsinput',
        'typeahead': '//172.24.186.245/jslib/typeahead.js-0.10.2/dist/typeahead.jquery',
        'bootbox': '//172.24.186.245/jslib/bootstrap/bootbox-4.2.0/bootbox.min',
        'conn': 'util/conn'
      },
      shim: {
        'bootstrap':  ['jquery'],
        'cookie': ['jquery'],
        'codemirror-xml': ['codemirror'],
        'codemirror-formatting': ['codemirror'],
        'summernote': ['bootstrap', 'codemirror'],
        'tagsinput': ['bootstrap'],
        'typeahead': ['tagsinput'],
        'bootbox': ['bootstrap'],
        'datepicker': ['jquery', 'bootstrap']
      }
    });
  }());
});
