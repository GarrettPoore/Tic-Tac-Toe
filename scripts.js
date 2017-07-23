$(document).ready(function() {
  console.log("test");
  $(".player_select").click(function(event) {
    var val = event.target.value;
    console.log("Clicked player " + val);

    //TODO - do stuff

    $("#player_select_container").hide();
    $("#character_select_container").show();
  });

  $(".character_select").click(function(event) {
    var val = event.target.value;
    console.log("Clicked character " + val);

    //TODO - do stuff

    $("#character_select_container").hide();
    $("#board").show();
  });

  $(".space").click(function(event) {
    var val = event.target.value;

    if (isPlayerTurn()) {
      makeMove(val);
    }
  });
});
