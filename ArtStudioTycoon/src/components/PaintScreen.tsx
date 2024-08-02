/* eslint-disable prettier/prettier */
// PaintScreen.tsx
import React, { useEffect, useState } from "react"
// eslint-disable-next-line prettier/prettier
import { useNavigate } from 'react-router-dom'

const randomPaintings = [
  Array(4).fill(Array(4).fill("#FFFFFF")), // Dummy paintings
  Array(4).fill(Array(4).fill("#FF0000")),
  // Add more random paintings
]

function PaintScreen() {
  const navigate = useNavigate()
  const [painting, setPainting] = useState<string[][]>(
    randomPaintings[Math.floor(Math.random() * randomPaintings.length)]
  )
  const [selectedColor, setSelectedColor] = useState<string>("#000000")
  const [completedPainting, setCompletedPainting] = useState<boolean>(false)

  const handleCellClick = (row: number, col: number) => {
    const newPainting = painting.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? selectedColor : cell
      )
    )
    setPainting(newPainting)
  }

  const handleCheckPainting = () => {
    // Implement your painting validation logic here
    const isPaintingCorrect = true // Replace with real validation logic

    if (isPaintingCorrect) {
      // Example of awarding money on correct painting
      // Assume a way to update money in the parent component or store
      alert("Painting completed correctly! You earned money.")
      navigate("/")
    } else {
      alert("Painting is incorrect. Try again.")
    }
  }

  return (
    <div className="paint-screen">
      <div className="painting-grid">
        {painting.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="painting-cell"
              style={{ backgroundColor: color }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <div className="color-buttons">
        {/* Render color picker or hardcoded color buttons */}
        {/* Assume color picker is available */}
      </div>
      <button onClick={handleCheckPainting}>Check Painting</button>
    </div>
  )
}

export default PaintScreen
