var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = []
var hasStarted = false;
var gameLevel = 0;

function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

}


function handleClick(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
  $("#" + color).toggleClass("pressed");
  setTimeout(function(){
    $("#" + color).toggleClass("pressed");
  }, 100);
  userClickedPattern.push(color);
}

function checkAnswer(){
    var gameColor = gamePattern[userClickedPattern.length - 1];
    var userColor = userClickedPattern[userClickedPattern.length - 1];
    if(gameColor == userColor){
       if(userClickedPattern.length == gamePattern.length){
         userClickedPattern = [];
         setTimeout(function(){
           nextSequence();
           $("#level-title").html("Level " + ++gameLevel);
         }, 1000);
       }
    }
    else{
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("#level-title").html("Game Over");
      setTimeout(function(){
        location.reload();
      }, 1500);
    }
}

$(".btn").click(function(){
    var userChosenColor = this.id;
    handleClick(userChosenColor);
    checkAnswer();
});

$("body").keydown(function(){
  if(!hasStarted){
      nextSequence();
      hasStarted = true;
      $("#level-title").html("Level " + ++gameLevel);
  }
});
