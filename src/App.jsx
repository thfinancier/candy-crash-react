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

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColour = currentColourArrangement[i]

      if (columnOfThree.every(square => currentColourArrangement[square] === decidedColour)) {
        columnOfThree.forEach(square => currentColourArrangement[square] = '')
      }
    }
  }

  useEffect(() => {
    createBoard()
  }, [])

  checkForColumnOfThree()

//   useEffect(() => {
//     const timer = setInterval(() => {
//         checkForColumnOfThree()
//         setCurrentColourArrangement([...currentColourArrangement])
//     }, 100)
//     return () => clearInterval(timer)
// }, [checkForColumnOfThree, currentColourArrangement])

  console.log(currentColourArrangement)
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
