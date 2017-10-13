var express = require('express');
var bodyParser = require('body-parser');
var port = 5000;
var app = express();

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port,function(){
  console.log('Listening on port',port);
});