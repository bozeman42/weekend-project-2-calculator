var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var calc = require('../modules/calc.js');
var history = [];

router.use(bodyParser.urlencoded({extended: true}));

router.get('/clear',function(req,res){
  history = [];
  res.send({
    history: history,
    message: 'History cleared.'
  });
});

router.post('/',function(req,res){
  // data: {in1:string,in2:string,op:string}
  var in1 = parseFloat(req.body.in1);
  var in2 = parseFloat(req.body.in2);
  var op = req.body.op;
  console.log('calc POST:',req.body);
  var result = {
    result: calc(in1,in2,op)
  };
  history.push(in1 + ' ' + op + ' ' + in2 + ' = ' + result.result);
  res.send(result);
});

router.get('/',function(req,res){
  res.send(history);
});

module.exports = router;