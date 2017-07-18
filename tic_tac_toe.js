//TODO:
// user chooses 1 or 2 players
// if 1 player:
//   choose X or O
// randomly determine first



//Board is as follows:
// 7 | 8 | 9
// 4 | 5 | 6
// 1 | 2 | 3
var board = ["","","","","","","","","",""];
var currentTurn = ""; //X or O for current turn
var player = ""; //X or O for player (uneeded in 2 player game)
var versusAI = false;

function checkForWinner() {

}

function makeMove(space) {
  if (versusAI && player != currentTurn) {
    return;
  }
}
