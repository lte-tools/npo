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
});/*router.get('/views/user_report.ejs', function(req, res) {
  res.render('user_report', { title: 'Express' });
});*/
router.get('/submit', function(req, res) {
  	var reporttemplate = req.query.reporttemplate;
    var type = req.query.type;
    var eids = req.query.eids;
    var firstdate = req.query.firstdate;
    var seconddate = req.query.seconddate;
/*    console.log(req.query.reporttemplate);
    console.log(req.query.type);
    console.log(req.query.eids);
    console.log(req.query.firstdate);
    console.log(req.query.seconddate);*/

    dataModel.run_cmd(reporttemplate,type,eids,firstdate,seconddate);

});
/*router.get('/')*/
module.exports = router;
