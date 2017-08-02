$(document).ready(function() {
  $(".player_select").click(function(event) {
    var val = event.target.value;

    if (val == 2) {
      $("#ask_character").prepend("Player 1 - ");
      data.versusAI = false;
    } else {
      data.versusAI = true;
    }

    $("#ask_players").hide();
    $("#player_select_container").hide();
    $("#ask_character").show();
    $("#character_select_container").show();
  });

  $(".character_select").click(function(event) {
    var val = event.target.value;
    data.player1 = val;

    pickFirstTurn();

    $("#ask_character").hide();
    $("#character_select_container").hide();
    $("#current_turn").show();
    $("#board").show();
  });

  $(".space").click(function(event) {
    var val = event.target.value;

    if (this.text == null) {
      if (isPlayerTurn()) {
        placeMove(val);
        if (data.versusAI) {
          aiPlay();
        }
      }
    }
  });
});
