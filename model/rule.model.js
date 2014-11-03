'use strict';

var
  connection = require('./db.model').connection,
  mongoose = require('mongoose'),

  rules = new mongoose.Schema({
   casename:String,
   rule:[String],
 }),
  templates = new mongoose.Schema({
    templatename:String,
    rule_collect:[String]
  });
  

var
  Rule = connection.model('rules', rules),
  Template = connection.model('templates', templates);



var queryRuleByID = function(id, length, rules, tabledata) {
  if(length !== 0){
    Rule
      .find({'_id': id[length - 1]}, 'casename rule')
      .exec(function (err, data) {     
        if (err) {
          console.log(err);
        } else {
          rules.push(data[0]);
        }
        queryRuleByID (id, length - 1, rules, tabledata);
      });
      
  } else {
    console.log('rules:');
    console.log(rules);
    analyzeData(tabledata, rules);
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
              if((tabledata[i][1] == 'N/A')) {
                outSign = true;
              }
              break;
            default:
              console.log('illegal rule');
          }
        }
        console.log('outSign:'+ outSign);
        if(outSign){
            outData.push(tabledata[i]);
            break;
        }
      }
    }
  }
  console.log('outdata:'+outData);
  
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
  console.log('value 1, law, value2:'+value1 + law + value2);
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
}


exports.queryTemplateByName = function (tempName, tabledata) {
  Template
    .find({'templatename': tempName}, 'rule_collect')
    .exec(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var ruleArray = new Array();
        queryRuleByID(data[0].rule_collect,data[0].rule_collect.length,ruleArray,tabledata);
      }
    });
};

exports.test = function () {
  Template
    .find({'templatename': 'temp1'}, '_id templatename rule_collect')
    .sort('templatename')
    .exec(function (err, docs) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(docs);
      return;
    });
};
