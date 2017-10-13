console.log('client.js sourced');
$(document).ready(main);

function main(){
  console.log('jQ sourced');
  addOpData();
  clickHandlers();
}

// adds data to each button that contains the operation it will represent
function addOpData(){
  $('#add').data('operation','+');
  $('#sub').data('operation','-');
  $('#mul').data('operation','*');
  $('#div').data('operation','/');
}

function clickHandlers(){
  $('#op').on('click','button',selectOp);
}

// get operation data from button and 
// submit operation and input to server for processing
function selectOp(){
  var operation = $(this).data('operation');
  var input1 = parseInt($('#input1').val());
  var input2 = parseInt($('#input2').val());
  $out = $('#output');
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
    console.log(message);
  })
}