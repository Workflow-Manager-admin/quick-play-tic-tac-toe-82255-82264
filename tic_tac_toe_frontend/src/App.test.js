import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test('renders Tic Tac Toe title', () => {
  render(<App />);
  expect(screen.getByText(/tic tac toe/i)).toBeInTheDocument();
});

test('players can take turns and board updates', () => {
  render(<App />);
  const squares = screen.getAllByRole("button", { name: /place/i });
  fireEvent.click(squares[0]);
  expect(squares[0].textContent).toBe("X");
  fireEvent.click(squares[1]);
  expect(squares[1].textContent).toBe("O");
});

test('win detection works', () => {
  render(<App />);
  const squares = screen.getAllByRole("button", { name: /place/i });
  // X plays 0, O plays 3, X plays 1, O plays 4, X plays 2 (win)
  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[1]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[2]); // X wins
  expect(screen.getByText(/winner: x/i)).toBeInTheDocument();
});

test('tie detection works', () => {
  render(<App />);
  const squares = screen.getAllByRole("button", { name: /place/i });
  // X O X
  // X O O
  // O X X (full, tie)
  const moves = [0,1,2,4,3,5,7,6,8];
  const players = ["X","O","X","O","X","O","X","O","X"];
  moves.forEach(idx => fireEvent.click(squares[idx]));
  expect(screen.getByText(/tie/i)).toBeInTheDocument();
});

test('reset button resets the game', () => {
  render(<App />);
  const squares = screen.getAllByRole("button", { name: /place/i });
  fireEvent.click(squares[0]);
  expect(squares[0].textContent).toBe("X");
  fireEvent.click(screen.getByRole("button", { name: /restart/i }));
  expect(squares[0].textContent).toBe("");
});
