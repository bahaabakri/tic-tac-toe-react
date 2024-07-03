import PlayerInfo from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
// to get the current player depend on the gameTurn state
const getCurrentPlayer = (turns) => {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player.symbol === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

// derive game board from gameTurn state
const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((el) => [...el])];
  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player.symbol;
  }
  return gameBoard;
};

// derive game winner
const deriveGameWinner = (gameBoard, playersName) => {
  let winner = null;
  for (let combination of WINNING_COMBINATIONS) {
    // console.log(gameBoard[el[0].row][el[0].column]);
    const firstSquareCombination =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareCombination =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareCombination =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareCombination &&
      firstSquareCombination === secondSquareCombination &&
      firstSquareCombination === thirdSquareCombination
    ) {
      console.log("here");
      winner = playersName[firstSquareCombination];
      break;
    }
  }
  return winner;
};
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playersName, setPlayersName] = useState(PLAYERS);
  const activePlayer = getCurrentPlayer(gameTurns);
  // calculate the board
  let gameBoard = deriveGameBoard(gameTurns);
  // calculate the winner
  let winner = deriveGameWinner(gameBoard, playersName);
  // no winner and all square are full => draw
  let isDraw;
  if (gameTurns.length === 9 && !winner) {
    isDraw = true;
  }

  // methods
  const handleChangeActivePlayer = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const updatedTurns = [
        {
          square: {
            rowIndex: rowIndex,
            colIndex: colIndex,
          },
          player: {
            symbol: getCurrentPlayer(prevTurns),
            name: playersName[getCurrentPlayer(prevTurns)],
          },
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };
  const handleRematchTheGame = () => {
    setGameTurns([]);
    winner = null;
    isDraw = false;
  };

  const handleChangePlayerName = (symbol, newName) => {
    setPlayersName((prevPlayersName) => {
      return {
        ...prevPlayersName,
        [symbol]: newName,
      };
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo
            intialName={PLAYERS.X}
            symbol="X"
            handleChangePlayerName={handleChangePlayerName}
            active={activePlayer === "X"}
          />
          <PlayerInfo
            intialName={PLAYERS.O}
            symbol="O"
            handleChangePlayerName={handleChangePlayerName}
            active={activePlayer === "O"}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRematchTheGame={handleRematchTheGame} />
        )}
        <GameBoard
          board={gameBoard}
          onChangeActivePlayer={handleChangeActivePlayer}
        />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
