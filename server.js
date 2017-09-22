var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./dbconfig');
var apiController = require('./endpoints/userCtrl');
var poemController = require('./endpoints/poemCtrl');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

mongoose.connect(config.getDbConnect(), { useMongoClient: true });

apiController(app);
poemController(app);

app.listen(port)
