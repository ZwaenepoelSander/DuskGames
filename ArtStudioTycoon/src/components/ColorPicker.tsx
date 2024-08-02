/* eslint-disable prettier/prettier */
import React from "react"

interface ColorPickerProps {
  colors: string[]
  selectedColor: string
  onColorSelect: (color: string) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  selectedColor,
  onColorSelect,
}) => {
  return (
    <div className="color-buttons">
      {colors.map((color) => (
        <button
          key={color}
          className="color-button"
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  )
}

export default ColorPicker
