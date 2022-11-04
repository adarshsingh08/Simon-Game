var buttoncolor=['red','blue','green','yellow'];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("sucess");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function () {
                next();
              }, 1000);
        }
    }
        else{
            console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },100);
            $("#level-title").text("Game Over, Press any key to start");
            startOver();
        }
    
}
function next(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var n=Math.floor(Math.random()*4);
    gamePattern.push(buttoncolor[n]);
    $("#"+buttoncolor[n]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(buttoncolor[n]);
    console.log(gamePattern);
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
$(document).keydown(function(){
    if(!started){
        next();
        $("#level-title").text("Level "+level);
        started=true;
    }
});
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern);
});
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}