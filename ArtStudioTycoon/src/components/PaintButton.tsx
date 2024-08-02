/* eslint-disable prettier/prettier */
import React from "react"

interface PaintButtonProps {
  onClick: () => void
}

const PaintButton: React.FC<PaintButtonProps> = ({ onClick }) => {
  return (
    <button className="paint-button" onClick={onClick}>
      Paint
    </button>
  )
}

export default PaintButton
