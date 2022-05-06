import React from 'react'
import {
  useLocalStorageState,
  calculateNextValue,
  calculateWinner,
  calculateStatus,
} from './utils'

const Board = () => {
  const [squares, setSquares] = useLocalStorageState(
    'squares',
    Array(9).fill(null),
  )
  const [history, setHistory] = useLocalStorageState('history', [])

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    }
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setSquares(squaresCopy)
    setHistory([...history, squaresCopy])
  }

  function restart() {
    setSquares(Array(9).fill(null))
    setHistory([])
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  function renderHistory() {
    console.log('history.length', history.length)
    const shouldRenderHistory = history.length > 0

    if (!shouldRenderHistory) {
      return
    }

    const histories = history.map((squares, index) => {
      return (
        <div key={index} style={{ margin: '10px 10px' }}>
          <div className="board-row">
            {renderHistorySquare(index, 0)}
            {renderHistorySquare(index, 1)}
            {renderHistorySquare(index, 2)}
          </div>
          <div className="board-row">
            {renderHistorySquare(index, 3)}
            {renderHistorySquare(index, 4)}
            {renderHistorySquare(index, 5)}
          </div>
          <div className="board-row">
            {renderHistorySquare(index, 6)}
            {renderHistorySquare(index, 7)}
            {renderHistorySquare(index, 8)}
          </div>
        </div>
      )
    })

    return histories
  }

  function renderHistorySquare(i, j) {
    return <button className="square">{history[i][j]}</button>
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
      <div className="history-container">{renderHistory()}</div>
    </div>
  )
}

export { Board }
