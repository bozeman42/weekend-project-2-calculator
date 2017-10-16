var express = require('express');
var calcRouter = require('./routes/calc_router.js');

// calc takes input 1, input 2 , operation('+','-','*','/') and returns
// a number as a result

var port = process.env.PORT || 5000;
var app = express();


app.use('/calc',calcRouter);
app.use(express.static('server/public'));

app.listen(port,function(){
  console.log('Listening on port',port);
});