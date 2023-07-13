import { useState, useEffect } from 'react'
import redCandy from './images/red-candy.png'
import orangeCandy from './images/orange-candy.png'
import yellowCandy from './images/yellow-candy.png'
import greenCandy from './images/green-candy.png'
import blueCandy from './images/blue-candy.png'
import purpleCandy from './images/purple-candy.png'
import blank from './images/blank.png'

const width = 8
const candyColours = [
  redCandy,
  orangeCandy,
  yellowCandy,
  greenCandy,
  blueCandy,
  purpleCandy
]

function App() {

  const [currentColourArrangement, setCurrentColourArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)

  const createBoard = () => {
    const randomColourArrangement = []
    for (let i = 0; i < 8 * 8; i++) {
      const randomColour = candyColours[Math.floor(Math.random() * candyColours.length)]
      randomColourArrangement.push(randomColour)
    }

    setCurrentColourArrangement(randomColourArrangement)
    // console.log(randomColourArrangement)
  }

  const dragStart = (e) => {
    setSquareBeingDragged(e.target)
  }

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
  }

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))


    const validMoves = [
        squareBeingDraggedId - 1,
        squareBeingDraggedId - width,
        squareBeingDraggedId + 1,
        squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)
    
    // the code below could be simplified
    if (validMove) {
      currentColourArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
      currentColourArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')
    } 

    if (checkForColumnOfFour() || checkForRowOfFour() || checkForColumnOfThree() || checkForRowOfThree()) {
        setSquareBeingDragged(null)
        setSquareBeingReplaced(null)
        console.log(checkForColumnOfFour(), checkForColumnOfThree(), checkForRowOfFour(), checkForRowOfThree(), 'ok')
    } else {
        currentColourArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
        currentColourArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
        console.log(checkForColumnOfFour(), checkForColumnOfThree(), checkForRowOfFour(), checkForRowOfThree(), 'not ok`')
    }
}

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColour = currentColourArrangement[i]

      if (columnOfFour.every(square => currentColourArrangement[square] === decidedColour)) {
        columnOfFour.forEach(square => currentColourArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColour = currentColourArrangement[i]
      const isNotValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]

      if (isNotValid.includes(i)) continue

      if (rowOfFour.every(square => currentColourArrangement[square] === decidedColour)) {
        rowOfFour.forEach(square => currentColourArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColour = currentColourArrangement[i]

      if (columnOfThree.every(square => currentColourArrangement[square] === decidedColour)) {
        columnOfThree.forEach(square => currentColourArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColour = currentColourArrangement[i]
      const isNotValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]

      if (isNotValid.includes(i)) continue

      if (rowOfThree.every(square => currentColourArrangement[square] === decidedColour)) {
        rowOfThree.forEach(square => currentColourArrangement[square] = blank)
        return true
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isInFirstRow = firstRow.includes(i)

      if (currentColourArrangement[i + width] === blank) {
        currentColourArrangement[i + width] = currentColourArrangement[i]
        currentColourArrangement[i] = blank
      }

      if (isInFirstRow && currentColourArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColours.length)
        currentColourArrangement[i] = candyColours[randomNumber]
      }
    }
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
        checkForColumnOfFour()
        checkForRowOfFour()
        checkForColumnOfThree()
        checkForRowOfThree()
        moveIntoSquareBelow()

        setCurrentColourArrangement([...currentColourArrangement])
    }, 100)
    return () => clearInterval(timer)
}, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColourArrangement])
  
  return (
    <div className='app'>
      <div className='game-board'>
        {currentColourArrangement.map((candyColour, index) => (
            <img 
            key={index}
            src={candyColour}
            alt={candyColour}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            />
        ))}
      </div>
    </div>
  )
}

export default App