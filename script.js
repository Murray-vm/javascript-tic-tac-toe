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
      return false;
    }
  };

  const isTie = () => {
    return board.every((tile) => tile !== null);
  };

  const getBoard = () => board;

  const setBoard = () => {};

  return { getBoard, placeMarker, isTie, setBoard };
}

function createGame(playerOne, playerTwo, gameBoard) {
  const cells = document.querySelectorAll(".gameBoard div");
  const WINNING_LINES = [
    //rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 9],
    //diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  let currentPlayer = playerOne;

  const checkWinner = (player) => {
    const playerMovesMade = player.getMovesMade();

    WINNING_LINES.forEach((line) => {
      if (line.every((value) => playerMovesMade.includes(value))) {
        alert("congratulations you win " + player.name);
        line.forEach((cell) => {
          cells[cell].classList.add("winningCell");
        });
        return true;
      }
    });
    return false;
  };

  const takeTurn = (blockSelected) => {
    const { name, symbol } = currentPlayer;
    if (gameBoard.placeMarker(blockSelected, symbol)) {
      cells[blockSelected].textContent = symbol;
      currentPlayer.makeMove(blockSelected);
      checkWinner(currentPlayer);
      currentPlayer = symbol == "X" ? playerTwo : playerOne;
    }
    if (gameBoard.isTie()) {
      alert("Game is a tie");
    }
  };

  const startGame = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        takeTurn(index);
      });
    });
  };

  return { takeTurn, currentPlayer, startGame };
}

const playerOne = createPlayer("Murray", "X");
const playerTwo = createPlayer("Connie", "O");

const gameBoard = createGameBoard();

const newGame = createGame(playerOne, playerTwo, gameBoard);
newGame.startGame();
