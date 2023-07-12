import { useState, useEffect } from 'react'

const width = 8
const candyColours = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
]

function App() {

  const [currentColourArrangement, setCurrentColourArrangement] = useState([])

  const createBoard = () => {
    const randomColourArrangement = []
    for (let i = 0; i < 8 * 8; i++) {
      const randomColour = candyColours[Math.floor(Math.random() * candyColours.length)]
      randomColourArrangement.push(randomColour)
    }

    setCurrentColourArrangement(randomColourArrangement)
    console.log(randomColourArrangement)
  }

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColour = currentColourArrangement[i]

      if (columnOfFour.every(square => currentColourArrangement[square] === decidedColour)) {
        columnOfFour.forEach(square => currentColourArrangement[square] = '')
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
        rowOfFour.forEach(square => currentColourArrangement[square] = '')
      }
    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColour = currentColourArrangement[i]

      if (columnOfThree.every(square => currentColourArrangement[square] === decidedColour)) {
        columnOfThree.forEach(square => currentColourArrangement[square] = '')
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
        rowOfThree.forEach(square => currentColourArrangement[square] = '')
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isInFirstRow = firstRow.includes(i)

      if (currentColourArrangement[i + width] === '') {
        currentColourArrangement[i + width] = currentColourArrangement[i]
        currentColourArrangement[i] = ''
      }

      if (isInFirstRow && currentColourArrangement[i] === '') {
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

console.log(currentColourArrangement)
  
  return (
    <div className='app'>
      <div className='game-board'>
        {currentColourArrangement.map((candyColour, index) => (
            <img 
            key={index}
            style={{backgroundColor: candyColour}}
            />
        ))}
      </div>
    </div>
  )
}

export default App
