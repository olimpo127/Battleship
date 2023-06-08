import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import ButtonPanel from './components/ButtonPanel';
import CpuBoard from './components/CpuBoard';
import Instructions from './components/Instructions';

const App = () => {
  //these states store the squares in which the ships are in both boards
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [cpuSelectedSquares, setCpuSelectedSquares] = useState([]);

  //this state allows me to show the squares where the ships are as gray squares, and hide them
  const [showGraySquares, setShowGraySquares] = useState(true);

  //these states store the selectedSquares that have already been hit
  const [hitSquares, setHitSquares] = useState([]);
  const [cpuHitSquares, setCpuHitSquares] = useState([]);

  //these states store the !selectedSquares that have already been hit
  const [missShot, setMissShot] = useState([]);
  const [cpuMissShots, setCpuMissShots] = useState([]);

  //Score counters
  const [redSquareCount, setRedSquareCount] = useState(0);
  const [cpuRedSquareCount, setCpuRedSquareCount] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  //allows me to display a message dependending on who wins
  const [message, setMessage] = useState("");

  //changes the message to display depending on who wins
  const winLoseMessage = () => {
    if (redSquareCount === 18 && cpuRedSquareCount === 18) {
      setMessage("It's a Tie!!");
    } else if (redSquareCount === 18) {
      setMessage("You Win!!");
    } else if (cpuRedSquareCount === 18) {
      setMessage("You Lose..");
    }
  };

  //trigers the function to display the message of win
  useEffect(() => {
    winLoseMessage(); // Calls winLoseMessage when player wins (you win)
    if (redSquareCount === 18) {
      setGameOver(true);
    }
  }, [redSquareCount]);

  //trigers the function to display the message of lose
  useEffect(() => {
    winLoseMessage(); // Calls winLoseMessage when cpu wins (you lose)
    if (cpuRedSquareCount === 18) {
      setGameOver(true);
    }
  }, [cpuRedSquareCount]);

  //used to randomly select where the ships in both boards will be
  const assignRandomSquares = () => {
    const playerRandomSquares = [];
    const cpuRandomSquares = [];

    while (playerRandomSquares.length < 18) {
      const randomSquare = Math.floor(Math.random() * 81);
      if (!playerRandomSquares.includes(randomSquare)) {
        playerRandomSquares.push(randomSquare);
      }
    }

    while (cpuRandomSquares.length < 18) {
      const randomSquareCpu = Math.floor(Math.random() * 81);
      if (!cpuRandomSquares.includes(randomSquareCpu)) {
        cpuRandomSquares.push(randomSquareCpu);
      }
    }

    setSelectedSquares(playerRandomSquares);
    setCpuSelectedSquares(cpuRandomSquares);
  };

  //stores and changes the color of the square depending on if it is containing a ship or not.. it also keeps score count
  const handleClick = (square) => {
    if (selectedSquares.includes(square)) {
      if (!hitSquares.includes(square)) {
        setHitSquares([...hitSquares, square]);
        setRedSquareCount((prevCount) => prevCount + 1);
      }
    } else {
      setMissShot([...missShot, square]);
    }

    let randomSquareCpuBoard = Math.floor(Math.random() * 81);

    while (
      cpuHitSquares.includes(randomSquareCpuBoard) ||
      cpuMissShots.includes(randomSquareCpuBoard)
    ) {
      randomSquareCpuBoard = Math.floor(Math.random() * 81);
    }

    if (cpuSelectedSquares.includes(randomSquareCpuBoard)) {
      setCpuHitSquares([...cpuHitSquares, randomSquareCpuBoard]);
      setCpuRedSquareCount((prevCount) => prevCount + 1);
    } else {
      setCpuMissShots([...cpuMissShots, randomSquareCpuBoard]);
    }
  };

  //sets all my stats back to default value
  const reset = () => {
    setSelectedSquares([]);
    setHitSquares([]);
    setMissShot([]);
    setRedSquareCount(0);
    setCpuSelectedSquares([]);
    setCpuHitSquares([]);
    setCpuMissShots([]);
    setCpuRedSquareCount(0);
    setGameOver(false);
    setMessage(""); // Reset the message as well
  };

  const squares = Array.from(Array(81).keys());

  return (
    <div className="app">
      <h1>Battleship Game</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginRight: '20px' }}>
          <Board
            selectedSquares={selectedSquares}
            showGraySquares={showGraySquares}
            hitSquares={hitSquares}
            missShot={missShot}
            handleClick={handleClick}
            squares={squares}
          />
        </div>
        <div style={{ margin: '0 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '110px' }}>
            <ButtonPanel
              assignRandomSquares={assignRandomSquares}
              toggleGraySquares={() => {
                setShowGraySquares(!showGraySquares);
              }}
              showGraySquares={showGraySquares}
              reset={reset}
            />
          </div>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <CpuBoard
            cpuSelectedSquares={cpuSelectedSquares}
            showGraySquares={showGraySquares}
            cpuHitSquares={cpuHitSquares}
            cpuMissShots={cpuMissShots}
            squares={squares}
            handleClickCpuBoard={(square) => {
              if (cpuSelectedSquares.includes(square)) {
                setCpuHitSquares([...cpuHitSquares, square]);
                setCpuRedSquareCount((prevCount) => prevCount + 1);
              } else {
                setCpuMissShots([...cpuMissShots, square]);
              }
            }}
          />
        </div>
      </div>
      <h1>{message}</h1>
      <Instructions />
    </div>
  );
};

export default App;
