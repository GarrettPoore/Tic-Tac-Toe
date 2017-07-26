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
data.noOfPlayers = 0;
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
}

function updateCurrentTurn(player) {
  data.currentTurn = player;
  $("#current_turn").text("Current Turn: " + player);
}

function isPlayerTurn() {

}

function checkForWinner() {

}

function makeMove(space) {

}
