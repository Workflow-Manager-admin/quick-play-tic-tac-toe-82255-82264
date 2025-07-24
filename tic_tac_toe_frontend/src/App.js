import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * Modern, minimalistic Tic Tac Toe React app.
 * - 3x3 responsive board centered
 * - Player X and O turns
 * - Win/tie detection
 * - Restart capability
 * - Uses provided color palette for light theme
 */

// Palette
const COLORS = {
  primary: "#1976D2",
  accent: "#FFC107",
  secondary: "#424242",
  playerX: "#1976D2",
  playerO: "#FFC107",
  boardBg: "#fff",
  boardBorder: "#424242",
  tie: "#9E9E9E",
};

// PUBLIC_INTERFACE
function App() {
  // Board is array(9): "", "X", "O"
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Next: X");
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

  // Check for win/tie after every move
  useEffect(() => {
    const res = calculateWinner(board);
    if (res) {
      setWinner(res);
      setStatus(`Winner: ${res}`);
      setIsTie(false);
    } else if (board.every((cell) => cell !== "")) {
      setIsTie(true);
      setWinner(null);
      setStatus("It's a tie!");
    } else {
      setIsTie(false);
      setStatus(`Next: ${xIsNext ? "X" : "O"}`);
    }
  }, [board, xIsNext]);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || winner || isTie) return;
    const newBoard = [...board];
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(""));
    setXIsNext(true);
    setWinner(null);
    setIsTie(false);
    setStatus("Next: X");
  }

  // PUBLIC_INTERFACE
  function renderSquare(idx) {
    return (
      <button
        className="ttt-square"
        onClick={() => handleSquareClick(idx)}
        aria-label={`Place ${xIsNext ? (board[idx] ? board[idx] : "X") : (board[idx] ? board[idx] : "O")} in square ${idx + 1}`}
        disabled={!!board[idx] || winner || isTie}
        style={{
          color:
            board[idx] === "X"
              ? COLORS.playerX
              : board[idx] === "O"
              ? COLORS.playerO
              : COLORS.secondary,
        }}
      >
        {board[idx]}
      </button>
    );
  }

  // PUBLIC_INTERFACE
  function renderStatus() {
    let statusColor = COLORS.secondary;
    if (winner === "X") statusColor = COLORS.playerX;
    else if (winner === "O") statusColor = COLORS.playerO;
    else if (isTie) statusColor = COLORS.tie;
    else statusColor = xIsNext ? COLORS.playerX : COLORS.playerO;
    return (
      <div className="ttt-status" style={{ color: statusColor }}>
        {status}
      </div>
    );
  }

  return (
    <div className="ttt-root">
      <h1 className="ttt-title">Tic Tac Toe</h1>
      {renderStatus()}
      <div className="ttt-board" role="region" aria-label="Tic Tac Toe Board">
        {[0, 1, 2].map((row) => (
          <div className="ttt-board-row" key={row}>
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <button
        className="ttt-reset"
        onClick={handleReset}
        aria-label="Restart the game"
      >
        Restart
      </button>
      <footer className="ttt-footer">
        <span>
          <strong>X</strong>: Blue &nbsp; <strong>O</strong>: Yellow
        </span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6], // diags
  ];
  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default App;
