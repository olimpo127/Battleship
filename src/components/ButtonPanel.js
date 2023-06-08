import React from 'react';

//button panel to start the game, show/hide the position of ships and reset the game
const ButtonPanel = ({
  assignRandomSquares,
  toggleGraySquares,
  showGraySquares,
  reset,
}) => {
  return (
    <div className="button-panel">
      <button onClick={assignRandomSquares}>Assign Ships</button>
      <button onClick={toggleGraySquares}>
        {showGraySquares ? 'Hide Ships' : 'Show Ships'}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default ButtonPanel;
