var express = require('express');
var bodyParser = require('body-parser');
var calcRouter = require('./routes/calc_router.js');
var app = express();

// calc takes input 1, input 2 , operation('+','-','*','/') and returns
// a number as a result

app.use(bodyParser.urlencoded({extended: true}));
var port = process.env.PORT || 5000;


app.use('/calc',calcRouter);
app.use(express.static('server/public'));

app.listen(port,function(){
  console.log('Listening on port',port);
});