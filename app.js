require('newrelic');
var express = require('express');
var errorhandler = require('errorhandler');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('combined'));

if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
