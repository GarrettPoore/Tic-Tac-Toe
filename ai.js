var CORNERS = [0, 2, 6, 8]

//AI Functions
function aiPlay() {
  //Order of possible plays taken from Wikipedia:
  //https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
  if (aiWin()) {}
  else if (aiBlock()) {}
  else if (aiFork()) {}
  else if (aiBlockFork()) {}
  else if (aiCenter()) {}
  else if (aiOpposingCorner()) {}
  else if (aiCorner()) {}
  else {aiDefault();}
  endTurn();
}

//All of the below functions will try to complete an action for the ai
//and return true if they did, or false if they did nothing

//Win the game
function aiWin() {
  var moves = getWinningMoves(data.board, data.player2);
  if (moves.length > 0) {
    var move = pickRandomSpace(moves);
    console.log("Winning at index " + move);
    placeMoveByIndex(move);
    return true;
  }
  return false;
}

//Block the enemy from winning
function aiBlock() {
  var moves = getWinningMoves(data.board, data.player1);
  if (moves.length > 0) {
    var move = pickRandomSpace(moves);
    console.log("Blocking at index " + move);
    placeMoveByIndex(move);
    return true;
  }
  return false;
}

//Create a fork
//A fork is a situation where you can get 2 winning moves
function aiFork() {
  var forks = getForkMoves(data.board, data.player2);
  if (forks.length > 0) {
    var move = pickRandomSpace(forks);
    console.log("Fork at index " + move)
    placeMoveByIndex(move);
    return true;
  }
  return false;
}

//Block a fork
function aiBlockFork() {
  var forks = getForkMoves(data.board, data.player1);
  if (forks.length == 1) {
    var move = forks[0];
    console.log("Blocking the only fork at " + move);
    placeMoveByIndex(move);
    return true;
  } else if (forks.length > 1) {
    //If there are multiple forks, then a threatening winning move must be found
    //that does not let the enemy place a fork at the same time
    var moves = [];
    for (var i = 0; i < forks.length; i++) {
      var copyBoard = getBoardCopy(data.board);
      var space = forks[i];

      copyBoard[space] = data.player2;
      var wins = getWinningMoves(copyBoard, data.player2)
      if (wins.length > 0) {
        moves.push(space);
      }
    }

    var move = pickRandomSpace(moves);
    console.log("Blocking fork by threatening win at index " + move);
    placeMoveByIndex(move);
    return true;
  }
  return false;
}

//Place in the center, if available
function aiCenter() {
  var spaces = getAvailableSpaces();
  var CENTER = 4;

  if (spaces.includes(CENTER)) {
    console.log("Center at index " + CENTER);
    placeMoveByIndex(CENTER);
    return true;
  }
  return false;
}

//Place in a corner that is opposite the enemy
function aiOpposingCorner() {
  var spaces = getAvailableSpaces();
  var enemyCorners = [];
  data.board.forEach(function(move, space){
    if (CORNERS.includes(space) && move == data.player1) {
      enemyCorners.push(space);
    }
  });

  for (var i = 0; i < enemyCorners.length; i++) {
    var copyBoard = getBoardCopy(data.board);
    var enemyCorner = enemyCorners[i];
    var oppositeCorner = null;

    switch(enemyCorner) {
      case 0:
        oppositeCorner = 8;
        break;
      case 2:
        oppositeCorner = 6;
        break;
      case 6:
        oppositeCorner = 2;
        break;
      case 8:
        oppositeCorner = 0;
    }
    if (spaces.includes(oppositeCorner)) {
      console.log("Blocking corner at index " + oppositeCorner);
      placeMoveByIndex(oppositeCorner);
      return true;
    }
  }
  return false;
}

//Take any open corner
function aiCorner() {
  var corners = getAvailableSpaces().filter(function(space){
    return CORNERS.includes(space);
  });

  if (corners.length > 0) {
    var space = pickRandomSpace(corners);

    console.log("Corner at index " + space);
    placeMoveByIndex(space);
    return true;
  }
  return false;
}

//Default to any open space
function aiDefault() {
  var space = pickRandomSpace(getAvailableSpaces());
  console.log("Defaulting at index " + space);
  placeMoveByIndex(space);
  return true;
}

//Other Functions

//Get all the winning moves for a specific player and board state
function getWinningMoves(board, player) {
  var spaces = getAvailableSpaces();
  var moves = [];
  for (var i = 0; i < spaces.length; i++) {
    var copyBoard = getBoardCopy(board);
    var space = spaces[i];

    copyBoard[space] = player;
    if (checkForWinner(copyBoard, player)) {
      moves.push(space);
    }
  }
  return moves;
}

//Get all possible forks for a specific player and board state
function getForkMoves(board, player) {
  var spaces = getAvailableSpaces();
  var forks = [];
  for (var i = 0; i < spaces.length; i++) {
    var copyBoard = getBoardCopy(data.board);
    var space = spaces[i];

    copyBoard[space] = player;
    var moves = getWinningMoves(copyBoard, player);
    if (moves.length > 1) {
      forks.push(space);
    }
  }
  return forks;
}

//Returns a random spaces from an array of spaces
function pickRandomSpace(spaces) {
  return spaces[Math.floor(Math.random() * spaces.length)]
}
