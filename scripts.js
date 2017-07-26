$(document).ready(function() {
  console.log("test");
  $(".player_select").click(function(event) {
    var val = event.target.value;
    data.noOfPlayers = val;

    if (val == 2) {
      $("#ask_character").prepend("Player 1 - ");
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

    if (isPlayerTurn()) {
      makeMove(val);
    }
  });
});
