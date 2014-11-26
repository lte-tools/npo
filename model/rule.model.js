'use strict';
var async = require('async');
var
  connection = require('./db.model').connection,
  mongoose = require('mongoose'),

  rules = new mongoose.Schema({
   casename:String,
   rule:[String]
 }),
  templates = new mongoose.Schema({
    templatename:String,
    rule_collect:[String]
  });
  

var
  Rule = connection.model('rules', rules),
  Template = connection.model('templates', templates);

var insertRule = function(rules, length,ruleID, next) {
  if(length != 0){
    var insertItem = rules[length - 1];
    var itemName = insertItem.shift();
    var ruleItem = new Rule({
      casename:itemName,
      rule:insertItem
    })
    ruleItem.save(
      function (err) {
        ruleID.push(ruleItem._id);
        insertRule(rules,length - 1, ruleID, function(from){next(from);});
        next(ruleID);
      }
    );
  } else {
    next(ruleID);
  }
}

var queryRuleByID = function(id, length, rules, next) {
  if(length !== 0){
    Rule
      .find({'_id': id[length - 1]}, 'casename rule')
      .exec(function (err, data) {     
        if (err) {
          console.log(err);
        } else {
          rules.push(data[0]);
        }
        queryRuleByID (id, length - 1, rules, function (from) {
           next(from);
        }); 
      });      
  } else {
    next(rules);
  }
}

var analyzeData = function (tabledata,rules) {
  var i;
  var outData = new Array;
  for(i = 0 ; i <= tabledata.length -1; i += 1) {
    var j;
    for (j = 0 ; j <= rules.length - 1; j += 1) {
      if(outData.length != 0){
        if(outData[outData.length - 1][0] == tabledata[i][0]) {
          break;
        }
      }
      if(tabledata[i][0] == rules[j].casename) {
        var k;
        var outSign = true;
        for(k = 0; (k <= rules[j].rule.length -1) && outSign; k += 1){
          var judgement = rules[j].rule[k];
          var ruleValue = judgement.substr(2,judgement.length - 2);
/*          console.log("ruleValue:");
          console.log(ruleValue);*/
          switch(judgement.substr(0,2)){
            case '<<':
              outSign = compareValue(tabledata[i][1],'<<',ruleValue);
              break;
            case '<=':
              outSign = compareValue(tabledata[i][1],'<=',ruleValue);
              break;
            case '==':
              outSign = compareValue(tabledata[i][1],'==',ruleValue);
              break;
            case '!=':
              outSign = compareValue(tabledata[i][1],'!=',ruleValue);
              break;
            case '>>':
              outSign = compareValue(tabledata[i][1],'>>',ruleValue);
              break;
            case '>=':
              outSign = compareValue(tabledata[i][1],'>=',ruleValue);
              break;
            case '<>':
              outSign = true;
              break;
            case '><':
              if(tabledata[i][1] == 'Nerr') {
                outSign = true;
              }
              break;
            case '!!':
              if(tabledata[i][1] == 'N/A') {
                outSign = true;
              }
              break;
            default:
              console.log('illegal rule');
          }
        }
        if(outSign){
            outData.push(tabledata[i]);
            break;
        }
      }
    }
  }
/*  console.log("outData:");
  console.log(outData);*/
  return outData;
};

var compareValue = function (arg1, law, arg2) {
  var value1,value2;
  if((arg1.substr((arg1.length - 1),1) == '%') && (arg2.substr((arg2.length - 1),1) == '%')){
    value1 = parseFloat(arg1.substr(0,(arg1.length - 1)));
    value2 = parseFloat(arg2.substr(0,(arg2.length - 1)));
  } else if((arg1.substr((arg1.length - 1),1) == '%') || (arg2.substr((arg2.length - 1),1) == '%')){
    console.log('error');
    return false;
  } else {
    value1 = parseFloat(arg1);
    value2 = parseFloat(arg2);
  }

  switch(law){
    case '>>':
      if(value1 > value2) {
        return true;
      } else {
        break;
      }
    case '<<':
      if(value1 < value2) {
        return true;
      } else {
        break;
      }
    case '<=':
      if(value1 <= value2) {
        return true;
      } else {
        break;
      }
    case '>=':
      if(value1 >= value2) {
        return true;
      } else {
        break;
      }
    case '==':
      if(value1 == value2) {
        return true;
      } else {
        break;
      }
    case '!=':
      if(value1 != value2) {
        return true;
      } else {
        break;
      }
    default:
      return false; 
  }
  return false;
};


exports.importTemplate = function (name, ruleid, next) {
/*  async.waterfall([ function(callback){
    Template.find({'templatename': name},{'rule_collect'})
            .exec(function (err, data))
  }])*/
  Template
    .update({'templatename':name},
            {$set:{'rule_collect':ruleid}},
            {upsert:true},
    function (err, docs) {
      next(docs);
  });
/*  var templateItem = new Template({
    templatename:name,
    rule_collect:ruleid
  });
  async.waterfall([ function (callback) {
    Template
      .find({'templatename': name})
      .exec(function (err, data) {
        console.log('find result');
        console.log(data);
        callback(null, data);
    })
  }], function (err, data) {
    console.log(" find template item length:");
    console.log(data.length);
    if (data.length > 0){
      Template
      .update({'templatename':name},{$set:{'rule_collect':ruleid}},
      {},
      function (err, docs) {
        console.log('err&item1');
        console.log(err);
        console.log(Template.db.collection.templatename);
        console.log(Template.db.schema.templatename);
        next(docs);
      });
    } else {
      templateItem.save(function (err, item) {
        console.log('err&item2');
        console.log(err);
        console.log(templateItem);
        next(item);
      });
    }
  }); */
}

exports.importRules = function (rules, next){
  var ruleIDArray = new Array();
  async.waterfall([
    function(callback){
      insertRule(rules,rules.length,ruleIDArray,function(result){
        callback(null, result);
      });
    }
  ],
    function (err,result){
      next(result);     
    }
  );
}

exports.queryTemplateByName = function (tempName, tabledata, next) {
  async.waterfall([
    function(callback){
     Template
        .find({'templatename': tempName}, 'rule_collect')
        .exec(function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var ruleArray = new Array();
          if(!data[0]){
            console.log('templatename error!');
            next(null);
          } else {
            callback(null,data[0].rule_collect,data[0].rule_collect.length,ruleArray,tabledata);
          }
        }
      });
    },
    function(id, length, rules, tabledata, callback){
      var rules = new Array();
      queryRuleByID(id, length, rules, function(result){
        callback(null, result);
      });
    },
  ],
    function (err, result) {
      if(result.length == 0) {
        console.log('empty rules!');
        next(null);
      } else {
        var outData = analyzeData(tabledata , result);
        next(outData);
      }
    });
};