import { useState } from "react";

export default function App() {
  const style = {
    height: "250px",
    width: "250px",
    display: "grid",
    gridTemplate: "repeat(3,1fr)/repeat(3,1fr)"
  };

  const [board, setBoard] = useState(Array(9).fill(null));
  const winner = calwin(board);
  const [isNext, setisNext] = useState(true);
  const Square = ({ value, onClick }) => (
    <button onClick={onClick}>{value}</button>
  );

  function calwin(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const Board = ({ squares, onClick }) => (
    <div style={style}>
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)}></Square>
      ))}
    </div>
  );

  const handle = (i) => {
    const copy = [...board];
    if (winner || copy[i]) return;
    copy[i] = isNext ? "X" : "O";
    setBoard(copy);
    setisNext(!isNext);
  };
  return (
    <>
      <h1>Tic Tac Toe</h1>
      <h2>Let's Play</h2>
      <Board className="board" squares={board} onClick={handle} />
      <p>
        {winner ? "Winner: " + winner : "Next Player: " + (isNext ? "X" : "O")}
      </p>
    </>
  );
}
