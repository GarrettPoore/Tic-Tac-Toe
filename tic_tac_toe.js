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
data.board = ["","","","","","","","",""];
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

function endTurn() {
  //if (checkForWinner(data.board)) {}
  if (false) {
    //TODO - winner stuff
    console.log("We have a winner");
  } else if (checkForDraw()) {
    //TODO - draw game properly
    resetBoard();
  } else {
    changeTurn();
  }
}

function checkForDraw() {
  for (var i = 0; i < data.board.length; i++) {
    if (data.board[i] === "") {
      return false;
    }
  }
  return true;
}

function checkForWinner(board) {
  //TODO - find winner based on the board given
  //   return the winner?
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
function getSpace(spaceNum) {
  return $('.space[value="' + spaceNum + '"]');
}

function placeMove(space) {
  getSpace(space).text(data.currentTurn);
  data.board[space-1] = data.currentTurn;
  endTurn();
}

function resetBoard() {
  $(".space").each(function(){
    $(this).text(null);
  });
  data.board = ["","","","","","","","",""];
}

//AI Functions
function aiPlay() {
  //TODO - make ai
  console.log("AI is playing");
  endTurn();
}
