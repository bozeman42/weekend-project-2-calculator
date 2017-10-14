var express = require('express');
var bodyParser = require('body-parser');
var calc = require('./modules/calc.js');
var port = 5000;
var app = express();

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/calc',function(req,res){
  var expression = req.body;
  console.log('calc POST:',expression);
  var result = {
    result: calc(parseFloat(expression.in1),parseFloat(expression.in2),expression.op)
  };
  res.send(result);
});

app.listen(port,function(){
  console.log('Listening on port',port);
});