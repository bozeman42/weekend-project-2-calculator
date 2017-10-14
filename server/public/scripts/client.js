console.log('client.js sourced');
$(document).ready(main);

function main(){
  console.log('jQ sourced');
  createNumPad();
  addOpData();
  clickHandlers();
}

// adds data to each button that contains the operation it will represent
function addOpData(){
  $('#add').data('operation','+');
  $('#sub').data('operation','-');
  $('#mul').data('operation','&times;');
  $('#div').data('operation','&divide;');
}

function clickHandlers(){
  $('#op').on('click','button',selectOp);
  $('#clear').on('click',reset) // ADD CLEARING FUNCTION
}

// get operation data from button and 
// submit operation and input to server for processing
function selectOp(){
  var operation = $(this).data('operation');
  var input1 = $('#input1').val();
  var input2 = $('#input2').val();
  var $out = $('#output');
  var $history = $('#history');
  $out.empty();
  $.ajax({
    method: 'POST',
    url: '/calc',
    data: {
      in1: input1,
      in2: input2,
      op: operation
    }
  })
  .done(function(message){
    $out.text(message.result);
    appendHistory(message.history);
    console.log(message);
  })
  .fail(function(message){
    console.log(message);
  });
}

function reset(){
  $('input').val('');
  $('#output').text('0');
}

function appendHistory(history){
  var $historyDiv = $('#history');
  $historyDiv.empty();
  for (var i = 0; i < history.length; i += 1){
    $historyDiv.prepend('<p>'+ history[i] + '</p>');
  }
}

function createNumPad(){
  for (var i = 0; i < 10; i += 1){
    
  }
}