import { useState, useEffect } from 'react';
import './App.css';

const refreshTime = (prevSquare, setSquare, setPrevSquare) => {
  let i = prevSquare.length - 1;
  const interval = setInterval(() => {
    if (i >= 0) {
      const { row, col } = prevSquare[i];
      setSquare(prevSquare => {
        const updatedSquare = [...prevSquare];
        updatedSquare[row][col] = 1;
        return updatedSquare;
      });
      i--;
    } else {
      clearInterval(interval);
    }
    setPrevSquare([]);
  }, 300);

};

function App() {
  const [Square, setSquare] = useState([
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ]);
  const [prevSquare, setPrevSquare] = useState([]);
  const [start, setStart] = useState(false);

  const handleColor = async (rowIndex, colIndex) => {
    if (Square[rowIndex][colIndex] !== 2) {
      const updatedSquare = [...Square];
      updatedSquare[rowIndex][colIndex] = 2;
      await setPrevSquare([...prevSquare, { row: rowIndex, col: colIndex }]);
      await setSquare(updatedSquare);
      const filledSquares = updatedSquare.flat().filter(value => value === 2).length;
      if (filledSquares === 9) {
        setStart(!start);
      }
    }
  };


  useEffect(() => {
    refreshTime(prevSquare, setSquare, setPrevSquare);
  }, [start])

  return (
    <div className="App">
      <header style={{color:"#fff",fontWeight:"600",fontSize:"22px",letterSpacing:"2px"}}>Grid Lights</header>
      <div className="out-box">
        {Square.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((col, colIndex) => (
              (Square[rowIndex][colIndex] === 2) ? (
                <span key={colIndex} className='box colorBox'></span>
              ) : (
                <span onClick={() => handleColor(rowIndex, colIndex)} key={colIndex} className='box'></span>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
