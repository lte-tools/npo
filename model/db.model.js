'use strict';
var mongoose = require('mongoose'),
  config = require('../config'),
  connection = mongoose.createConnection(config.db.url);

connection.on('error', function (err) {
  console.log(err);
});

exports.connection = connection;
