exports.cmd = {
  scriptFile: '/mnt/share/eql/eql.sh',
  //scriptFile: '/opt/eql/eql.sh',
  serverIP: '10.9.35.58',
  username: 'npouser1',
  password: 'Alcatel&1',
  timeZone: 'Asia/Shanghai'
};

exports.csvFile = {
	path: '/mnt/share/eql/csvdata/'
	//path: '/opt/eql/csvdata/'
};
exports.db = {
  url: 'mongodb://npoviewer:npoviewer@127.0.0.1:27017/npoviewer'
  //url: 'mongodb://npoviewer:npoviewer@172.24.139.213:27017/npoviewer'
  //url: 'mongodb://npoviewer:npoviewer@172.24.186.156:27017/npoviewer'
};
exports.outDataFile = {
	path: '/mnt/share/npoviewer-1.0.1/public/outdatafile/'
	//path: '/opt/npoviewer/public/outdatafile/'
}

