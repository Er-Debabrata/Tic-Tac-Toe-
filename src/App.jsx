import { useState } from "react";
import "./App.css";

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const [scores, setScores] = useState({
    X: 0,
    O: 0,
  });

  const [gamesPlayed, setGamesPlayed] = useState(0);

  const getWinningPattern = (currentBoard) => {
    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;

      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return pattern;
      }
    }

    return null;
  };

  const winningPattern = getWinningPattern(board);
  const winner = winningPattern
    ? board[winningPattern[0]]
    : null;

  const isDraw =
    !winner && board.every((cell) => cell !== null);

  const gameFinished = winner || isDraw;

  const handleClick = (index) => {
    if (board[index] || gameFinished) return;

    const newBoard = [...board];

    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);

    const newWinningPattern =
      getWinningPattern(newBoard);

    if (newWinningPattern) {
      const winningPlayer =
        newBoard[newWinningPattern[0]];

      setScores((prev) => ({
        ...prev,
        [winningPlayer]: prev[winningPlayer] + 1,
      }));

      setGamesPlayed((prev) => prev + 1);

      return;
    }

    const newIsDraw =
      newBoard.every((cell) => cell !== null);

    if (newIsDraw) {
      setGamesPlayed((prev) => prev + 1);
      return;
    }

    setIsXTurn((prev) => !prev);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  const resetScore = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);

    setScores({
      X: 0,
      O: 0,
    });

    setGamesPlayed(0);
  };

  return (
    <div className="app">
      <div className="game-container">

        {/* Header */}

        <div className="header">
          <p className="game-label">
            GAME ARENA
          </p>

          <h1>Tic Tac Toe</h1>

          <p className="subtitle">
            Classic game • Modern experience
          </p>
        </div>

        {/* Scoreboard */}

        <div className="scoreboard">

          <div
            className={`score-card score-x ${isXTurn && !gameFinished
              ? "active-player"
              : ""
              }`}
          >
            <span>PLAYER X</span>
            <strong>{scores.X}</strong>

            {isXTurn && !gameFinished && (
              <small>YOUR TURN</small>
            )}
          </div>

          <div className="score-divider">
            VS
          </div>

          <div
            className={`score-card score-o ${!isXTurn && !gameFinished
              ? "active-player"
              : ""
              }`}
          >
            <span>PLAYER O</span>
            <strong>{scores.O}</strong>

            {!isXTurn && !gameFinished && (
              <small>YOUR TURN</small>
            )}
          </div>

        </div>

        {/* Games Played */}

        <div className="game-stats">
          <span>GAMES PLAYED</span>
          <strong>{gamesPlayed}</strong>
        </div>

        {/* Status */}

        <div
          className={`status ${winner
            ? "winner-status"
            : isDraw
              ? "draw-status"
              : ""
            }`}
        >
          {winner
            ? `🏆 Player ${winner} wins!`
            : isDraw
              ? "🤝 It's a draw!"
              : `Player ${isXTurn ? "X" : "O"}'s turn`}
        </div>

        {/* Board */}

        <div className="board">

          {board.map((cell, index) => (
            <button
              key={index}
              className={`cell ${cell
                ? `cell-${cell.toLowerCase()}`
                : ""
                } ${winningPattern?.includes(index)
                  ? "winning-cell"
                  : ""
                }`}
              onClick={() =>
                handleClick(index)
              }
            >
              {cell}
            </button>
          ))}

        </div>

        {/* Buttons */}

        <div className="buttons">

          <button
            className="reset-btn"
            onClick={resetGame}
          >
            {gameFinished
              ? "Play Again"
              : "New Game"}
          </button>

          <button
            className="score-reset-btn"
            onClick={resetScore}
          >
            Reset Score
          </button>

        </div>

        <footer className="footer">
          <span>TIC TAC TOE</span>
          <p>Built with React by <strong>Debabrata</strong>  • © 2026</p>
          <p><b>Enjoy your Game!!</b></p>
        </footer>

      </div>
    </div>
  );
}

export default App;