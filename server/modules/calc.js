function calc(in1,in2,op){
  var result;
  switch(op){
    case '+':
      result = add(in1,in2);
      break;
    case '-':
      result = subtract(in1,in2);
      break;
    case '*':
      result = multiply(in1,in2);
      break;
    case '/':
      result = divide(in1,in2);
      break;
  }
  return result;
}

function add(in1,in2){
  return in1+in2;
}

function subtract(in1,in2){
  return (in1-in2);
}

function multiply(in1,in2){
  return (in1*in2);
}

function divide(in1,in2){
  var result;
  if (in2 !== 0){
    result = in1/in2;
  } else {
    result = 'Divide by 0 is undefined';
  }
  return result;
}

module.exports = calc;