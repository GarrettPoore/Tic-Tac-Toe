//Board is as follows:
// 7 | 8 | 9
// 4 | 5 | 6
// 1 | 2 | 3
//Or as indexed in data.board
// 6 | 7 | 8
// 3 | 4 | 5
// 0 | 1 | 2
var data = initData();

function initData() {
  var d = {};
  d.board = ["","","","","","","","",""];
  d.currentTurn = ""; //X or O for current turn
  d.player1 = ""; //X or O for player
  d.player2 = ""; //Mainly so the AI can track what it is
  d.score = {
    X: 0,
    O: 0
  }
  d.pause = false;
  d.versusAI = false;
  return d;
}

function pickFirstTurn() {
    if (Math.random() > 0.5) {
      updateCurrentTurn("X");
    } else {
      updateCurrentTurn("O");
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
    data.pause = true;
    adjustScore(data.currentTurn);
    $("#end_game").text(data.currentTurn + " wins!").fadeIn(500);
    $("#main").animate({opacity: "0.2"}, {
      duration: 500,
      queue: false,
      complete: function() {
        setTimeout(resetBoard, 3000);
      }
    });
  } else if (checkForDraw()) {
    data.pause = true;
    $("#end_game").text("Draw!").fadeIn(500);
    $("#main").animate({opacity: "0.2"}, {
      duration: 500,
      queue: false,
      complete: function() {
        setTimeout(resetBoard, 3000);
      }
    });
  }

  changeTurn();
}

function adjustScore(winner) {
  data.score[winner] += 1;
  if (winner ==  "X") {
    $("#X_score").text("X: " + data.score.X)
  } else {
    $("#O_score").text("O: " + data.score.O)
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
  aiPlay();
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
  getSpace(space).text(data.currentTurn);
  data.board[space-1] = data.currentTurn;
}

function placeMoveByIndex(index) {
  placeMove(index + 1);
}

function resetBoard() {
  $("#end_game").fadeOut(500, function(){
    data.pause = false;
    aiPlay();
  });
  $("#main").animate({opacity: "1"}, 500)
  $(".space").each(function(){
    $(this).text(null);
  });
  data.board = ["","","","","","","","",""];
}
