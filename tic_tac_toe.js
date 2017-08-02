//TODO:
// user chooses 1 or 2 players
// if 1 player:
//   choose X or O
// if 2 player:
//  player 1: choose X or O
// randomly determine first



//Board is as follows:
// 7 | 8 | 9
// 4 | 5 | 6
// 1 | 2 | 3
var data = {};
data.lastWin = null;
data.board = ["","","","","","","","","",""];
data.currentTurn = ""; //X or O for current turn
data.player1 = ""; //X or O for player (uneeded in 2 player game)
data.versusAI = false;

function pickFirstTurn() {
  if (data.lastWin == null) {
    if (Math.random() > 0.5) {
      updateCurrentTurn("X");
    } else {
      updateCurrentTurn("O");
    }
  } else if (data.lastWin == "X") {
    updateCurrentTurn("O");
  } else {
    updateCurrentTurn("X");
  }

  if (!isPlayerTurn()) {
    aiPlay();
  }
}

function updateCurrentTurn(player) {
  data.currentTurn = player;
  $("#current_turn").text("Current Turn: " + player);
}

function isPlayerTurn() {
  return (!data.versusAI || data.player1 == data.currentTurn);
}

function checkForWinner() {
  console.log("Checking for winner");
}

function changeTurn() {
  if (data.currentTurn == "X") {
    updateCurrentTurn("O");
  } else {
    updateCurrentTurn("X");
  }
}

//Board Functions
function placeMove(space) {
  $('.space[value="' + space + '"]').text(data.currentTurn);
  checkForWinner();
  changeTurn();
}

function resetBoard() {
  $(".space").each(function(){
    $(this).text(null);
  });
}

//AI Functions
function aiPlay() {
  console.log("AI is playing");
  changeTurn()
}
