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
//Or as indexed in data.board
// 6 | 7 | 8
// 3 | 4 | 5
// 0 | 1 | 2
var data = {};
data.lastWin = null;
data.board = ["","","","","","","","",""];
data.currentTurn = ""; //X or O for current turn
data.player1 = ""; //X or O for player
data.player2 = ""; //Mainly so the AI can track what it is
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

function notCharacter(c) {
  if (c == "X") {
    return "O";
  } else {
    return "X";
  }
}

function endTurn() {
  if (checkForWinner(data.board, data.currentTurn)) {
    //TODO - winner stuff
    console.log("We have a winner: " + data.currentTurn);
    resetBoard();
  } else if (checkForDraw()) {
    //TODO - draw game properly
    resetBoard();
  } else {
    console.log("Passing turn");
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

//This method will check each combination of wins for given board and letter
//and return true or false
// 6 | 7 | 8
// 3 | 4 | 5
// 0 | 1 | 2
function checkForWinner(bo, le) {
  return (bo[0] == le && bo[1] == le && bo[2] == le) || //Bottom Row
    (bo[3] == le && bo[4] == le && bo[5] == le) || //Middle Row
    (bo[6] == le && bo[7] == le && bo[8] == le) || //Top Row
    (bo[0] == le && bo[3] == le && bo[6] == le) || //Left Column
    (bo[1] == le && bo[4] == le && bo[7] == le) || //Middle Column
    (bo[2] == le && bo[5] == le && bo[8] == le) || //Right Column
    (bo[0] == le && bo[4] == le && bo[8] == le) || //Diagonal Bottom-Left to Top-Right
    (bo[2] == le && bo[4] == le && bo[6] == le) //Diagonal Top-Left to Bottom-Right
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

function getBoardCopy(board) {
  return board.slice();
}

function getAvailableSpaces() {
  var available = [];
  data.board.forEach(function(space, i){
    if (space === "") {
      available.push(i);
    }
  });
  return available;
}

function placeMove(space) {
  console.log("Placing move " + data.currentTurn + " on " + space);
  getSpace(space).text(data.currentTurn);
  data.board[space-1] = data.currentTurn;
}

function placeMoveByIndex(index) {
  placeMove(index + 1);
}

function resetBoard() {
  $(".space").each(function(){
    $(this).text(null);
  });
  data.board = ["","","","","","","","",""];
  changeTurn();
}
