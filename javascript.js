var isOn = false;
var strictMode = false;
var score = 0;
var comboArr = [];
var playerArr = [];
var playerTurn = false;
var audioGreen = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var audioRed = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var audioYellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var audioBlue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

//click on the buttons
$(".color").on("click", function() {

  if (isOn){
    
    showMove(this.id);

  }  
    
  if (playerTurn) {

    playerInput(this.id);

  }

});

//turn the game on
$(".onOff").on("click", function() {

 //fix this!!!!
  if (isOn) {

    isOn = false;
    document.getElementById("score").innerHTML = "";
    score = 0;
    comboArr = [];
    $("button").css("background-color","#420d0d");
    strictMode = false;

  } else {

    isOn = true;
    document.getElementById("score").innerHTML = "--";
    comboArr = [];
    $(this).css("background-color","green");

  }

});

$(".start").on("click", function() {

  if (isOn) {
    
    $(this).css("background-color","green");
    score = 0;
    document.getElementById("score").innerHTML = score;
    playerArr = [];
    comboArr = [];
    generateNextMove();

  }

});

$(".strict").on("click", function() {

  if (strictMode && isOn) {

    $(this).css("background-color","#420d0d");
    strictMode = false;

  } else if (isOn) {
    
    $(this).css("background-color","green");
    strictMode = true;

  }

});

//play the next move and store it in an array, then initiate playback
function generateNextMove() {

 if (score >= 20){
   
   document.getElementById("message").innerHTML = "You Win! </br></br>Press start to play again!";  
   
   playerTurn = false;
   
   return;
  
 }
   
  compTurn = true;
  var nextMove = Math.floor(Math.random() * 4 + 1);
  comboArr.push(nextMove);
  playback();

} //end generateNextMove

//play the move sequence
function playback() {

  var i = 0;
  //play the array back as a combo
  var playback = setInterval(function() {

    showMove(comboArr[i]);

    i++;

    if (i == comboArr.length) {

      clearInterval(playback);
      playerTurn = true;

    }

  }, 1500);

}

function showMove(colorID) {

  if (colorID == 1) {

    $("#1").css("background-color", "#3DFF4F");
    audioGreen.play();

    setTimeout(function() {

      $("#1").css("background-color", "#5ADA8D");

    }, 1000);

  } else if (colorID == 2) {

    $("#2").css("background-color", "red");
    audioRed.play();

    setTimeout(function() {

      $("#2").css("background-color", "#F5364E");

    }, 1000);

  } else if (colorID == 3) {

    $("#3").css("background-color", "yellow");
    audioYellow.play();

    setTimeout(function() {

      $("#3").css("background-color", "#E9EE74");

    }, 1000);

  } else if (colorID == 4) {

    $("#4").css("background-color", "#3BDAFC");
    audioBlue.play();

    setTimeout(function() {

      $("#4").css("background-color", "#0078DA");

    }, 1000);

  }

} //end showMove

function playerInput(buttonID) {

  playerArr.push(buttonID);

  var index = playerArr.length - 1;
  
  if (playerArr[index] != comboArr[index] || playerArr.length > comboArr.length) {

    document.getElementById("score").innerHTML = "!!";
    playerArr = [];
    playerTurn = false;
    setTimeout(function() {

      if (strictMode) {

        comboArr = [];
        score = 0;
        document.getElementById("score").innerHTML = score;
        generateNextMove();

      } else {
        
        document.getElementById("score").innerHTML = score;
        playback();

      }

    }, 1500);

  } else if (index === comboArr.length - 1) {
      
    score++;
    document.getElementById("score").innerHTML = score;
    playerArr = [];
    generateNextMove();  
      
  }

}