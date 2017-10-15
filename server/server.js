var express = require('express');
var bodyParser = require('body-parser');
// calc takes input 1, input 2 , operation('+','-','*','/') and returns
// a number as a result
var calc = require('./modules/calc.js');
var port = 5000;
var app = express();

var history = [];

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/clear',function(req,res){
  history = [];
  res.send({
    history: history,
    message: 'History cleared.'
  });
});

app.get('/history',function(req,res){
  res.send(history);
});

app.post('/calc',function(req,res){
  // data: {in1:string,in2:string,op:string}
  var in1 = parseFloat(req.body.in1);
  var in2 = parseFloat(req.body.in2);
  var op = req.body.op;
  console.log('calc POST:',req.body);
  var result = {
    result: calc(in1,in2,op)
  };
  history.push(in1 + ' ' + op + ' ' + in2 + ' = ' + result.result);
  result.history = history;
  res.send(result);
});

app.listen(port,function(){
  console.log('Listening on port',port);
});