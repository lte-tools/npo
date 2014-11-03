var child_process = require ('child_process');
var fs = require ('fs');
var config = require ('../config.js');
var rule = require('./rule.model');

var getNowFormatDate = function () {
	var day = new Date(); 
	var Year = 0; 
	var Month = 0; 
	var Day = 0; 
	var CurrentDate = ""; 
	Year = day.getFullYear();
	Month = day.getMonth() + 1; 
	Day = day.getDate(); 
	CurrentDate += Year; 
	if (Month >= 10 ) {
		CurrentDate += Month; 
	} else {
		CurrentDate += "0" + Month;
	} 
	if (Day >= 10 ) {
		CurrentDate += Day; 
	} else {
		CurrentDate += "0" + Day ; 
	} 
	return CurrentDate; 
};

var getNowFormatTime = function () {
	var day = new Date(); 
	var Hour = 0; 
	var Minute = 0; 
	var Second = 0; 
	var Millisecond = 0; 
	var CurrentTime = ""; 
	Hour = day.getHours();
	Minute = day.getMinutes(); 
	Second= day.getSeconds(); 
	Millisecond= day.getMilliseconds();  
	if (Hour >= 10 ) {
		CurrentTime += Hour; 
	} else {
		CurrentTime += "0" + Hour;
	} 
	if (Minute >= 10 ) {
		CurrentTime += Minute; 
	} else {
		CurrentTime += "0" + Minute; 
	} 
	if (Second >= 10 ) {
		CurrentTime += Second; 
	} else {
		CurrentTime += "0" + Second; 
	} 
	if (Millisecond >= 100 ) {
		CurrentTime += Millisecond; 
	} else if (Millisecond >= 10 ) {
		CurrentTime += "00" + Millisecond; 
	} else if (Millisecond >= 0 ) {
		CurrentTime += "000" + Millisecond;
	} 
	return CurrentTime; 
}; 


var readCSV = function (path, name){
	fs.readFile(path + name, function (error, data){
		var csvdata = new Array();
		var csvrow = data.toString().split('\n');
		var i; 
		for(i = 0; i < csvrow.length - 1; i += 1) {
			var csvspan = csvrow[i].split(',');
			csvspan.length = csvspan.length - 1;
			if(csvspan.length > 1)csvdata.push(csvspan);
		}
		processData(csvdata);
	})
};


var numToPer = function (numerator, denominator) {
	var step1 = numerator * 100 / denominator;
	var step2 = step1.toFixed(2);
	var per = String(step2) + "%";
	return per;
};

var processData = function (csvdata) {
	var i;
	var firstDate,secondDate;
	var tabledata = new Array();
	if (csvdata[0][0] == 'Report') {
		var temp;
		temp = csvdata[0][1].split(' ');
		firstDate = temp[6] + ' ' + temp[7];
		secondDate = temp[9] + ' ' + temp[10];
		tabledata.push([firstDate,secondDate]);
	}
	for(i = 1; i <= csvdata.length - 1; i += 1) {
		if (csvdata[i][0] == 'VIEW' || csvdata[i][1] == firstDate) {
			continue;
		}else if (csvdata[i][0].indexOf('(%)') !== -1) {
			var na = false,j,percentResult,numerator = 0,denominator = 0;
			for(j = 1; j <= csvdata[i].length - 1; j += 1) {
				if((csvdata[i+1][j] == 'N/A') || (csvdata[i+2][j] == 'N/A')){
					na = true;
					break;
				} else {
					numerator += parseInt(csvdata[i+1][j]);
					denominator += parseInt(csvdata[i+2][j]);
				}
			}
			if (na){
				tabledata.push([csvdata[i][0],'N/A']);
				continue;
			} else if ((numerator  == 0) || (denominator == 0)) {
				percentResult = "0%";
				tabledata.push([csvdata[i][0],percentResult]);
				i += 2;
				continue;
			};
			percentResult = numToPer (numerator, denominator);
			tabledata.push([csvdata[i][0],percentResult]);
			i += 2;
		} else if (csvdata[i][0].indexOf('_avg)') !== -1) {
			var na = false,j,tofix = 0, averageResult = 0;
			for(j = 1; j <= csvdata[i].length - 1; j += 1) {
				if(csvdata[i][j] == 'N/A') {
					na = true;
					break;
				} else if (csvdata[i][j].indexOf('.') !== -1){
					if(tofix < csvdata[i][j].split('.')[1].length){
						tofix = csvdata[i][j].split('.')[1].length;
					}
				}
				averageResult += parseFloat(csvdata[i][j]);
			}
			if (na){
				tabledata.push([csvdata[i][0],'N/A']);
				continue;
			} else {
				averageResult = averageResult / (csvdata[i].length - 1);
				averageResult = averageResult.toFixed(tofix);
				tabledata.push([csvdata[i][0],averageResult]);
			}
		} else {
			var na = false,j,result = 0;
			for(j = 1; j <= csvdata[i].length - 1; j += 1) {
				if(csvdata[i][j] == 'N/A') {
					na = true;
					break;
				} else {
					result += parseFloat(csvdata[i][j]);
				}
			}
			if (na){
				tabledata.push([csvdata[i][0],'N/A']);
				continue;
			} else {
				tabledata.push([csvdata[i][0],result]);
			}
		}
	}
	console.log("tabledata:");
	console.log(tabledata);
	rule.queryTemplateByName('temp1', tabledata);
};


exports.run_cmd = function (reporttemplate,type,eids,firstdate,seconddate){
	var timestamp = getNowFormatDate() + getNowFormatTime();
	var cmd = "sh " + config.cmd.scriptFile + " " + config.cmd.serverIP +" report -u '" + config.cmd.username + ":" + config.cmd.password + "' -o " + config.csvFile.path + timestamp + ".csv reporttemplatename=" + reporttemplate + " otype=" + type + " eids=" + eids + " periodicity=h firstdate=" + firstdate + " seconddate=" + seconddate + " tz=" + config.cmd.timeZone + " format=csv";
	child_process.exec(cmd, function (error, stderr, stdout) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
    	if (error !== null) {
    		console.log('exec error: ' + error);
		}
		readCSV(config.csvFile.path, timestamp + ".csv ");
	});
}