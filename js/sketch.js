var res = 48;
var color = 'rgb(0, 0, 0)';
var fieldClick = 0;

$(document).ready(function() {
  changeOp();
  drawGrid();
});

function drawGrid() {
  $(".wrapper").width($("#field").height() + 20);
  for (var i = 0; i < Math.pow(res,2); i++) {
    $('#field').append('<div></div>');
  }

  $("#field > div").width($("#field").width()/res);
  $("#field > div").height($("#field > div").width());

  $("#hint").width($("#field").height() - 100);

  putColor();
}

$("#field").click(function() {
  if (fieldClick === 1) {
    fieldClick = 0;
  } else {
    fieldClick = 1;
  }
});

$("#field").dblclick(function() {
  var r = Math.floor(Math.random()*255);
  var g = Math.floor(Math.random()*255);
  var b = Math.floor(Math.random()*255);
  color = 'rgb(' + r + ", " + g + ", " + b + ")";
  $("#palette > div").removeClass('chosen');
  fieldClick = 1;
});

$("#palette > div").click(function() {
  $("#palette > div").removeClass('chosen');
  $(this).addClass('chosen');
  color = ($(this).css('background-color'));
});

function changeBg() {
  $('#field').css('background-color', color);
}

function clearSlate() {
  $("#field > div").css('background-color', "");
  $("#field > div").css('opacity', "")
}

function changeRes() {
  var chekRes = prompt('Enter a number of pixels in each row');
  if (isNaN(chekRes) === false & chekRes !== null) {
    res = chekRes;
    $("#field").empty();
    drawGrid();
    $('#resolution a').html(res + "x" + res);
  } else if (isNaN(chekRes)) {
    alert('You must enter a valid number.');
    changeRes();
  }
}

function changeOp() {
  opac = parseFloat($('#opacity :selected').text()) / 100.0;
}

function putColor() {
    $("#field > div").mouseenter(function() {
      if (fieldClick === 0) {
        return;
      }
      if (opac === 1) {
        if (Number($(this).css('opacity')) === 1) {
          $(this).css('background-color', color);
        } else {
          $(this).css('background-color', color);
          $(this).css('opacity', 1);
        }
      }
      else {
        if ($(this).css('background-color') === color) {
          var newOp = Number($(this).css('opacity')) + opac;
          $(this).css('opacity', newOp);
        } else {
          $(this).css('background-color', color);
          $(this).css('opacity', opac);
        }
      }
    });
}

$('a').mousedown(function() {
  $(this).css("background", "#3d7ae1");
});
$('a').mouseup(function() {
  $(this).css({"background" : ""});
});

function toggleHint() {
  $('#hint').toggle();
  $('#erase span').toggle();
  $("#hint > ol").css({"margin-top":($("#hint").height() - $("#hint > ol").height())/2});
}
