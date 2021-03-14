var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}







function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        // console.log("wrong");

        playSound("wrong");

        $(document.body).addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $(document.body).removeClass("game-over");
        }, 200);



        startOver();
    }



}



$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    playSound(randomChosenColour);



};



function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}


function animatePress(currentColour) {


    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}





$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    // audio.play();

    checkAnswer(userClickedPattern.length - 1);
});

// THIS WAS MY CODE THAT I TRIED TO JOIN THE IDS TOGETHER BY THE HASHTAG THEN USING THE JOIN() METHOD AND DIDNT REALIZE I COULD TARGET THE CLASSES WITH .btn
// $("#" + buttonColours.join(",#")).click(function () {
//     var userChosenColour = ($(this).attr("id"));
//     userClickedPattern.push(userChosenColour);
// }); 