import React from 'react';

const CpuBoard = ({
  cpuSelectedSquares,
  showGraySquares,
  cpuHitSquares,
  cpuMissShots,
  squares,
}) => {
  const countRedSquares = () => {
    let count = 0;
    cpuSelectedSquares.forEach((square) => {
      if (cpuHitSquares.includes(square)) {
        count++;
      }
    });
    return count;
  };

  const currentRedSquareCount = countRedSquares();

  const renderSquareColor = (square) => {
    if (cpuSelectedSquares.includes(square) && showGraySquares) {
      return 'selected';
    } else if (cpuHitSquares.includes(square)) {
      return 'hit';
    } else if (cpuMissShots.includes(square)) {
      return 'miss';
    } else {
      return '';
    }
  };

  return (
    <div className="board">
      {squares.map((square) => (
        <div
          key={square}
          className={`square ${renderSquareColor(square)}`}
          onClick={() => {}}
        ></div>
      ))}
      <div className="red-square-count"><strong>CPU: {currentRedSquareCount}</strong></div>
    </div>
  );
};


export default CpuBoard;

