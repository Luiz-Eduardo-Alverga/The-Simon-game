var buttonColours = ["red","blue","green","yellow"]
var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0

$(document).keypress(function() {
    if (!started) {
      setTimeout(function () {   
        $("#level-title").text("Inciando")
        }, 1000) 
      $("#level-title").text("Level " + level)  
      nextSequence()
      started = true
    }
});
    
$(".btn").click(function(){
    
    var userChosenColours = $(this).attr("id")
    userClickedPattern.push(userChosenColours)
       
    playSound(userChosenColours)
    animatePress(userChosenColours)

    checkAnswer(userClickedPattern.length-1)       
})

function checkAnswer(currentLevel) {

    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

     
      if (userClickedPattern.length === gamePattern.length){

        
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        playSound("wrong")
        
        $("body").addClass("game-over")
            setTimeout(function () {
            $("body").removeClass("game-over")
          }, 200)

        $("#level-title").text("Game Over,Aperte qualquer tecla para reiniciar o jogo")

        startOver()
    }

}
   
function nextSequence(){

    userClickedPattern = [];

    level++
    $("#level-title").text("Level:" + level)



    var randomNumber = Math.floor( Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()

}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed")

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
      }, 100)
}

function startOver(){
    level = 0
    gamePattern = []
    started = false
}
    
