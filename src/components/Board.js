import React from 'react';

const Board = ({
  selectedSquares,
  showGraySquares,
  hitSquares,
  missShot,
  handleClick,
  squares,

  //counts how many ships the player has hit 
}) => {
  const countRedSquares = () => {
    let count = 0;
    selectedSquares.forEach((square) => {
      if (hitSquares.includes(square)) {
        count++;
      }
    });
    return count;
  };

  const currentRedSquareCount = countRedSquares();

  //checks if the square is selected or not (has a ship or not) and then stores it in the respective array to
  //turn it red if it does or yellow if not
  const renderSquareColor = (square) => {
    if (selectedSquares.includes(square) && showGraySquares) {
      return 'selected';
    } else if (hitSquares.includes(square)) {
      return 'hit';
    } else if (missShot.includes(square)) {
      return 'miss';
    } else {
      return '';
    }
  };

  //this stops me from clicking an already hit/missed square(ship)
  const handleSquareClick = (square) => {
    if (!hitSquares.includes(square) && !missShot.includes(square)) {
      handleClick(square);
    }
  };

  return (
    <div className="board">
      {squares.map((square) => (
        <div
          key={square}
          className={`square ${renderSquareColor(square)}`}
          onClick={() => handleSquareClick(square)}
        ></div>
      ))}
      <div className="red-square-count"><strong>P1: {currentRedSquareCount}</strong></div>
    </div>
  );
};


export default Board;