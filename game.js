const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$("body").on("keypress", (e) => {
  console.log(e);
  var levelCount = 0;

  nextSequence();
  $("body").off("keypress");
  $("h1").text(`Level ${++levelCount}`);

  $(".btn").on("click", (e) => {
    var userChosenColour = e.target.id;
    new Audio(`${userChosenColour}.mp3`).play();

    $(`.${userChosenColour}`)
      .animate({ opacity: 0.2 }, 180)
      .animate({ opacity: 1 }, 180);

    userClickedPattern.push(userChosenColour);
    //console.log("ucl: ", userClickedPattern);

    if (compareArrays(gamePattern, userClickedPattern)) {
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(nextSequence.bind(this), 1500);
        userClickedPattern = [];
        $("h1").text(`Level ${++levelCount}`);
      }
    } else {
      new Audio("wrong.mp3").play();
      setTimeout(() => {
        $("body").css("background-color", "#011f3f");
      }, 200);
      $("body").css("background-color", "red");
      userClickedPattern = [];
      gamePattern = [];
      $("h1").text("Press any key to restart");

      $("body").on("keypress", () => {
        $(document).ready(function () {
          location.reload(true);
        });
      });
    }
  });
});

// FUNCTIONS
const nextSequence = function () {
  var randomNumber = Math.trunc(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  //console.log("gp:", gamePattern);

  $(`.${randomChosenColour}`)
    .animate({ opacity: 0.2 }, 180)
    .animate({ opacity: 1 }, 180);

  new Audio(`${randomChosenColour}.mp3`).play();

  //   $(`.${randomChosenColour}`).animate({ opacity: 1 });
};

var compareArrays = (a, b) => {
  if (
    (a.length === b.length &&
      a.every((element, index) => element === b[index])) ||
    (a.length > b.length && b.every((element, index) => element === a[index]))
  )
    return true;
  else return false;
};
