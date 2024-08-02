/* eslint-disable prettier/prettier */
import React from "react"

interface PaintingGridProps {
  painting: string[][]
  onCellClick: (row: number, col: number) => void
}

const PaintingGrid: React.FC<PaintingGridProps> = ({
  painting,
  onCellClick,
}) => {
  return (
    <div className="painting-grid">
      {painting.map((row, rowIndex) =>
        row.map((color, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="painting-cell"
            style={{ backgroundColor: color }}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  )
}

export default PaintingGrid
