var express = require('express');
var router = express.Router();
var dataModel = require('../model/data.model');
var config = require ('../config.js');

var fs = require ('fs');

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/help', function(req, res) {
  res.render('help', { title: 'Express' });
});
router.get('/import_temp', function(req, res) {
  res.render('import_temp', { title: 'Express' });
});


router.post('/import_data', function(req, res) {
  var data = req.param('data');
  var data1 = JSON.parse(data);
  dataModel.import_rule(data1,function(returndata){

    res.send(JSON.stringify({result:'ok',data: returndata}));
  });
/*  var otype = req.query.otype;
  var eid = req.query.eid;
  var firstdate = req.query.firstdate;
  var seconddate = req.query.seconddate;
  var ruletemplate = req.query.ruletemplate;*/
/*  dataModel.run_cmd(reporttemplate, otype, eid, firstdate, seconddate, ruletemplate, function (outdata) {
      if(!outdata){
        res.send(JSON.stringify({result: 'err', data:''}));
      } else {
        res.send(JSON.stringify({result: 'ok', data: outdata}));
      }
    }
  );*/
});
router.get('/submit', function(req, res) {
  var reporttemplate = req.query.reporttemplate;
  var otype = req.query.otype;
  var eid = req.query.eid;
  var firstdate = req.query.firstdate;
  var seconddate = req.query.seconddate;
  var ruletemplate = req.query.ruletemplate;
  dataModel.run_cmd(reporttemplate, otype, eid, firstdate, seconddate, ruletemplate, function (outdata) {
      if(!outdata){
        res.send(JSON.stringify({result: 'err', data:''}));
      } else {
        dataModel.createOutFile( outdata ,function (result){
          res.send(JSON.stringify({result: 'ok', data: outdata, link:result})); 
        });
               
      }
    }
  );
});

module.exports = router;