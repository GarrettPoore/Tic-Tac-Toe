$(document).ready(function() {
  $(".player_select").click(function(event) {
    var val = event.target.value;

    if (val == 2) {
      $("#ask_character").prepend("Player 1 - ");
      data.versusAI = false;
    } else {
      data.versusAI = true;
    }

    $("#ask_players").fadeOut(200, function(){
      $("#ask_character").fadeIn(200);
    });
    $("#player_select_container").fadeOut(200, function(){
      $("#character_select_container").fadeIn(200);
    });
  });

  $(".character_select").click(function(event) {
    var val = event.target.value;
    data.player1 = val;
    data.player2 = notCharacter(val);

    pickFirstTurn();

    $("#ask_character").fadeOut(400, function(){
      $("#current_turn").css("display", "inline-block");
      $(".score").css("display", "inline-block");
    });
    $("#character_select_container").fadeOut(200, function(){
      $("#board").show().animate({height: "8.2em"}, {
        duration: 600,
        complete: function(){
          $("#reset").fadeIn();
        }
      });
    });
  });

  $(".space").click(function(event) {
    var val = event.target.value;
    tryToPlay(val);
  });

  $(document).keypress(function(event){
    //1-9 are 49-57
    var key = event.which;
    var num = key - 48;
    if (num >= 1 && num <= 9) {
      tryToPlay(num);
    }
  });

  function tryToPlay(space) {
    if (data.pause) {return null;}
    if (data.board[space-1] === "") {
      if (isPlayerTurn()) {
        placeMove(space);
        endTurn();
        if (data.versusAI && !data.pause) {
          aiPlay();
        }
      }
    }
  }

  $("#reset").click(function(){
    resetBoard();
    data = initData();
    $("#reset").fadeOut(400, function(){
      $("#board").animate({height: "0"},{
        duration: 600,
        complete: function() {
          $("#board").hide();
          $(".score").fadeOut(400, function(){
            $("#X_score").text("X: 0");
            $("#O_score").text("O: 0");
          });
          $("#current_turn").fadeOut(400, function(){
            $("#ask_players").fadeIn();
            $("#player_select_container").fadeIn();
          });
        }
      })
    });
  });
});
