console.log("hello world");

const createPlayer = function (name, symbol) {
  const movesMade = [];

  const makeMove = (postition) => movesMade.push(postition);

  const getMovesMade = () => movesMade;

  return { name, symbol, makeMove, getMovesMade };
};

function createGameBoard() {
  const board = [null, null, null, null, null, null, null, null, null];

  const placeMarker = (postition, symbol) => {
    if (board[postition] == null) {
      board[postition] = symbol;
      return true;
    } else {
      console.log("Invalid move");
      return false;
    }
  };

  const getBoard = () => board;

  return { getBoard, placeMarker };
}

function createGame(playerOne, playerTwo, gameBoard) {
  const WINNING_LINES = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "9"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];

  let gameFinished = false;

  let currentPlayer = playerOne;

  const checkWinner = (player) => {
    const playerMovesMade = player.getMovesMade();

    WINNING_LINES.forEach((line) => {
      if (line.every((value) => playerMovesMade.includes(value))) {
        alert("congratulations you win " + player.name);
        return true;
      }
    });
    return false;
  };

  const takeTurn = (blockSelected) => {
    const { name, symbol } = currentPlayer;
    if (gameBoard.placeMarker(blockSelected, symbol)) {
      currentPlayer.makeMove(blockSelected);
      gameFinished = checkWinner(currentPlayer);
      currentPlayer = symbol == "X" ? playerTwo : playerOne;
    }
    console.log(symbol == "X");

    console.log(gameBoard.getBoard());
    console.log(
      `${currentPlayer.name} (${currentPlayer.symbol}) select a block to make a move in`
    );
  };

  return { takeTurn };
}

const playerOne = createPlayer("Murray", "X");
const playerTwo = createPlayer("Conne", "O");

const gameBoard = createGameBoard();

const newGame = createGame(playerOne, playerTwo, gameBoard);

console.log(
  `${playerOne.name} (${playerOne.symbol}) select a block to make a move in`
);
