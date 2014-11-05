var express = require('express');
var router = express.Router();
var dataModel = require('../model/data.model')
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/help', function(req, res) {
  res.render('help', { title: 'Express' });
});
router.get('/import_template', function(req, res) {
  res.render('import_template', { title: 'Express' });
});
/*router.get('/views/user_report.ejs', function(req, res) {
  res.render('user_report', { title: 'Express' });
});*/
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
        res.send(JSON.stringify({result: 'ok', data: outdata}));
      }
    }
  );
});

/*router.get('/')*/
module.exports = router;