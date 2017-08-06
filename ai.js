var CORNERS = [0, 2, 6, 8]

//AI Functions
function aiPlay() {
  var availableSpaces = getAvailableSpaces();

  //Order of possible plays taken from Wikipedia:
  //https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
  if (aiWin(availableSpaces)) {}
  else if (aiBlock(availableSpaces)) {}
  else if (aiFork(availableSpaces)) {}
  else if (aiBlockFork(availableSpaces)) {}
  else if (aiCenter(availableSpaces)) {}
  else if (aiOpposingCorner(availableSpaces)) {}
  else if (aiCorner(availableSpaces)) {}
  else {aiDefault(availableSpaces);}
  endTurn();
}

//All of the below functions will try to complete an action for the ai
//and return true if they did, or false if they did nothing

function aiWin(spaces) {
  for (var i = 0; i < spaces.length; i++) {
    var copyBaord = getBoardCopy();
    var space = spaces[i];

    copyBaord[space] = data.player2;
    if (checkForWinner(copyBaord, data.player2)) {
      console.log("Winning at index " + space);
      placeMoveByIndex(space);
      return true;
    }
  }
  return false;
}

function aiBlock(spaces) {
  for (var i = 0; i < spaces.length; i++) {
    var copyBaord = getBoardCopy();
    var space = spaces[i];

    copyBaord[space] = data.player1;
    if (checkForWinner(copyBaord, data.player1)) {
      console.log("Blocking at index " + space);
      placeMoveByIndex(space);
      return true;
    }
  }
  return false;
}

function aiFork(spaces) {
  for (var i = 0; i < spaces.length; i++) {
    var copyBaord = getBoardCopy();
    var space = spaces[i];

    //TODO
  }
  return false;
}

function aiBlockFork(spaces) {
  for (var i = 0; i < spaces.length; i++) {
    var copyBaord = getBoardCopy();
    var space = spaces[i];

    //TODO
  }
  return false;
}

//Place in the center, if available
function aiCenter(spaces) {
  var CENTER = 4;
  
  if (spaces.includes(CENTER)) {
    console.log("Center at index " + CENTER);
    placeMoveByIndex(CENTER);
    return true;
  }
  return false;
}

//Place in a corner that is opposite the enemy
function aiOpposingCorner(spaces) {
  var enemyCorners = [];
  data.board.forEach(function(move, space){
    if (CORNERS.includes(space) && move == data.player1) {
      enemyCorners.push(space);
    }
  });

  for (var i = 0; i < enemyCorners.length; i++) {
    var copyBaord = getBoardCopy();
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
function aiCorner(spaces) {
  var corners = spaces.filter(function(space){
    return CORNERS.includes(space);
  });

  if (corners.length > 0) {
    var space = corners[Math.floor(Math.random() * corners.length)];

    console.log("Corner at index " + space);
    placeMoveByIndex(space);
    return true;
  }
  return false;
}

//Default to any open space
function aiDefault(spaces) {
  var space = spaces[Math.floor(Math.random() * spaces.length)];
  console.log("Defaulting at index " + space);
  placeMoveByIndex(space);
  return true;
}
