const createPlayer = function (name, symbol) {
  let movesMade = [];

  const makeMove = (position) => movesMade.push(position);

  const getMovesMade = () => [...movesMade];

  const reset = () => (movesMade = []);

  return { name, symbol, makeMove, getMovesMade, reset };
};

function createGameBoard() {
  const board = Array(9).fill(null);

  const placeMarker = (position, symbol) => {
    if (board[position] == null) {
      board[position] = symbol;
      return true;
    } else {
      return false;
    }
  };

  const isTie = () => {
    return board.every((tile) => tile !== null);
  };

  const getBoard = () => [...board];

  const reset = () => board.fill(null);

  return { getBoard, placeMarker, isTie, reset };
}

function createGame(playerOne, playerTwo, gameBoard) {
  const cells = document.querySelectorAll(".gameBoard div");
  const statusText = document.querySelector(".status");
  const restartButton = document.querySelector(".restart");
  const WINNING_LINES = [
    //rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  let currentPlayer = playerOne;
  let gameEnded = false;

  const checkWinner = (player) => {
    const playerMovesMade = player.getMovesMade();
    WINNING_LINES.forEach((line) => {
      if (line.every((value) => playerMovesMade.includes(value))) {
        statusText.textContent = `${player.name} wins!`;
        line.forEach((cell) => {
          cells[cell].classList.add("winningCell");
        });
        gameEnded = true;
        return true;
      }
    });
    return false;
  };

  const takeTurn = (blockSelected) => {
    const { name, symbol } = currentPlayer;
    if (gameEnded || !gameBoard.placeMarker(blockSelected, symbol)) return;

    cells[blockSelected].textContent = symbol;
    currentPlayer.makeMove(blockSelected);

    if (checkWinner(currentPlayer)) return;

    if (gameBoard.isTie()) {
      statusText.textContent = "Game is a tie!";
      gameEnded = true;
      return;
    }

    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    if (!gameEnded)
      statusText.textContent = `${currentPlayer.name}'s turn! (${currentPlayer.symbol})`;
  };

  const resetGame = () => {
    gameBoard.reset();
    cells.forEach((cell) => (cell.textContent = ""));
    playerOne.reset();
    playerTwo.reset();
    currentPlayer = playerOne;
    gameEnded = false;
    statusText.textContent = `${currentPlayer.name}'s turn! (${currentPlayer.symbol})`;
    cells.forEach((cell, index) => {
      cell.classList.remove("winningCell");
    });
  };

  const startGame = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        takeTurn(index);
      });
    });
    restartButton.addEventListener("click", resetGame);
    statusText.textContent = `${currentPlayer.name}'s turn! (${currentPlayer.symbol})`;
  };

  return { takeTurn, currentPlayer, startGame };
}

const playerOne = createPlayer("Player 1", "X");
const playerTwo = createPlayer("Player 2", "O");
const gameBoard = createGameBoard();
const newGame = createGame(playerOne, playerTwo, gameBoard);
newGame.startGame();
