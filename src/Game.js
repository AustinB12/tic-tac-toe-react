import React from 'react'
import { Board } from './Board'
import {
  useLocalStorageState,
  calculateNextValue,
  calculateWinner,
  calculateStatus,
} from './utils'

export const Game = () => {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [history, setHistory] = useLocalStorageState('history', [
    Array(9).fill(null),
  ])
  const currentSquares = history[currentStep]

  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return
    }
    const newHistory = history.slice(0, currentStep + 1)
    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue
    setHistory([...newHistory, squaresCopy])
    setCurrentStep(newHistory.length)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  let moves = history.map((stepSquares, step) => {
    const description = step === 0 ? 'Go to game start' : `Go to move #${step}`
    const isCurrentStep = step === currentStep
    return (
      <li key={step}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
          {description} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={() => restart()}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
