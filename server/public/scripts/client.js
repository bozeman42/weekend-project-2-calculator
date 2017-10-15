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
  $('#clear').on('click',reset)
  $('#numPad').on('click','.numberKeys',numberKeyPress);
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
  $('#display').text('');
  $.ajax({
    method: 'GET',
    url: '/clear'
  })
  .done(function(response){
    console.log(response.message);
    appendHistory(response.history);
  })
  .fail(function(error){
    console.log(error);
  })
}

function appendHistory(history){
  var $historyDiv = $('#history');
  $historyDiv.empty();
  for (var i = 0; i < history.length; i += 1){
    $historyDiv.prepend('<p>'+ history[i] + '</p>');
  }
}

function createNumPad(){
  var $numPad = $('#numPad');
  var $row;
  var $button;
  for (var j = 0; j < 3; j += 1){
    $row = $('<div></div>');
    for (var i = 1+(3*j); i < 4+(3*j); i += 1){
      $button = $('<button class="numberKeys" id="' + i + '">' + i + '</button>');
      $button.data('key',i);
      $row.append($button);
    }
    $numPad.append($row);
  }
  $row = $('<div></div>');
  $button = $('<button id="decimal">.</button>');
  $button.data('key','.');
  $row.append($button);
  $button = $('<button class="numberKeys" id="0">0</button>');
  $button.data('key',0);
  $row.append($button);
  $button = $('<button id="equals">=</button>');
  $button.data('key','=');
  $row.append($button);
  $numPad.append($row);
}

function numberKeyPress(){
  console.log('number key presed');
  var $this = $(this);
  var digit = $this.data('key');
  $disp = $('#display');
  $disp.text($disp.text() + digit);
}