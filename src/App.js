import { useEffect, useState } from "react";


const width = 8;
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
];

const App = () => {
  
  const [currentColorArrangment, setCurrentColorArrengment] = useState([]);

  const checkForColumnOfThree = () => {
    for(let i=0; i<47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const dedicatedColor = currentColorArrangment[i];
      if (columnOfThree.every(block => currentColorArrangment[block] === dedicatedColor)) {
        columnOfThree.forEach(block => currentColorArrangment[block] = '');
      }
    }
  }

  const checkForColumnOfFour = () => {
    for(let i=0; i<39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const dedicatedColor = currentColorArrangment[i];
      if (columnOfFour.every(block => currentColorArrangment[block] === dedicatedColor)) {
        columnOfFour.forEach(block => currentColorArrangment[block] = '');
      }
    }
  }

  const checkForRowOfThree = () => {
    for(let i=0; i<47; i++) {
      const rowOfThree = [i, i + 1, i + 2 ];
      const dedicatedColor = currentColorArrangment[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      if(notValid.includes(i)) continue;
      if (rowOfThree.every(block => currentColorArrangment[block] === dedicatedColor)) {
        rowOfThree.forEach(block => currentColorArrangment[block] = '');
      }
    }
  }

  const checkForRowOfFour = () => {
    for(let i=0; i<47; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const dedicatedColor = currentColorArrangment[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      if(notValid.includes(i)) continue;
      if (rowOfFour.every(block => currentColorArrangment[block] === dedicatedColor)) {
        rowOfFour.forEach(block => currentColorArrangment[block] = '');
      }
    }
  }
  

  const createBoard = () => {
    const randomeColorArrangment = [];
    for (let i=0; i < width*width; i++) {
      const randomeColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomeColorArrangment.push(randomeColor);
    }
    setCurrentColorArrengment(randomeColorArrangment);
  }

  
  useEffect(() => {
    
    createBoard();

  }, []);

  useEffect(() => {

    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      checkForRowOfFour();
      setCurrentColorArrengment([...currentColorArrangment]);
    },100)
    return () => clearInterval(timer);
    
  },[checkForColumnOfThree, checkForRowOfFour, checkForRowOfThree, checkForColumnOfFour, currentColorArrangment]);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangment.map((candyColor, index) => {
          return <img key={index} style={{backgroundColor: candyColor}} alt={candyColor}/>
          }
        )}
      </div>
    </div>
  )
  }

export default App;