console.log('client.js sourced');
$(document).ready(main);

function main(){
  console.log('jQ sourced');
  createNumPad();
  clickHandlers();
  addOpData();
  getHistory();
}

// adds data to each button that contains the operation it will represent
function addOpData(){
  $('#add').data('operation','+');
  $('#sub').data('operation','-');
  $('#mul').data('operation','&times;');
  $('#div').data('operation','&divide;');
}

function clickHandlers(){
  $('.op').on('click',selectOp);
  $('#clear').on('click',reset);
  $('#clearEntry').on('click',clearEntry);
  $('#numPad').on('click','.numberKeys',numberKeyPress);
  $('#equals').on('click',sendCalc);
}

function sendCalc(){
  var operation = $('#displayOp').data('operation');
  var input1 = $('#displayStore').text();
  var input2 = $('#displayIn').text();
  var $out = $('#output');
  var $history = $('#history');
  // only send info if both inputs are full
  // which should only be possible if an operation
  // has been selected as well
  if ((input1 !== '') && (input2 !== '' && input2 !== '.')){
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
      $('.disp').text('');
      var outStr = message.result.toString();
      var decimalPlace = outStr.indexOf('.');
      if (outStr.length > 15 && decimalPlace !== -1 && decimalPlace < 15) {
        outStr = outStr.substring(0,15);
      }
      $out.text(outStr);
      getHistory();
      console.log(message);
    })
    .fail(function(message){
      console.log(message);
    });
}
}

function clearEntry(){
  $('.disp').text('');
  $('#output').text('0');
}

function reset(){
  console.log($('#display').text());
  $('.disp').text('');
  $('#output').text('0');
  console.log($('#output').text());
  $.ajax({
    method: 'GET',
    url: '/calc/clear'
  })
  .done(function(response){
    console.log(response.message);
    appendHistory(response.history);
  })
  .fail(function(error){
    console.log(error);
  })
}

function getHistory(){
  $.ajax({
    method: 'GET',
    url: '/calc'
  })
  .done(function(response){
    appendHistory(response);
  })
  .fail(function(message){
    console.log('Get history failed');
  });
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
  
  var $addButton = $('<button class="op" id="add">+</button>');
  var $subButton = $('<button class="op" id="sub">-</button>');
  var $divButton = $('<button class="op" id="div">&divide;</button>');
  var $mulButton = $('<button class="op" id="mul">&times;</button>');
  var opButtons = [$divButton, $mulButton, $subButton];
  console.log(opButtons);
  for (var j = 0; j < 3; j += 1){
    $row = $('<div></div>');
    for (var i = 1+(3*j); i < 4+(3*j); i += 1){
      $button = $('<button class="numberKeys" id="' + i + '">' + i + '</button>');
      $button.data('key',i);
      $row.append($button);
    }
    console.log(opButtons[j]);
    $row.append(opButtons[j]);
    $numPad.append($row);
  }
  $row = $('<div></div>');
  $button = $('<button class="numberKeys keyPad" id="decimal">.</button>');
  $button.data('key','.');
  $row.append($button);
  $button = $('<button class="numberKeys keyPad" id="0">0</button>');
  $button.data('key',0);
  $row.append($button);
  $button = $('<button class="keyPad" id="equals">=</button>');
  $button.data('key','=');
  $row.append($button);
  $row.append($addButton);
  $numPad.append($row);
}

function numberKeyPress(){
  console.log('number key presed');
  var $this = $(this);
  var digit = $this.data('key');
  $('#output').text('');
  $disp = $('#displayIn');
  if ($this.data('key') === '.') {
    if ($disp.text().indexOf('.') !== -1){
      digit = '';
    }
  }
  $disp.text($disp.text() + digit);
}

function selectOp(){
  var operation = $(this).text();
  var opData = $(this).data('operation');
  var $in = $('#displayIn');
  // var operation = $(this).data('operation');
  if ($in.text() !== ''  &&  $in.text() !== '.'){
    if ($('#displayOp').text() === ''){
      var $store = $('#displayStore');
      $store.text($in.text());
      $in.text('');
    }
    $('#displayOp').text(operation).data('operation',opData);
  }
}