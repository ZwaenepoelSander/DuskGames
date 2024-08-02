import React, { useState } from "react";
import "../styles/pixel.scss";

interface PixelProps {
  selectedColor: string;
  initialColor: string; // Add initialColor prop
}

const Pixel: React.FC<PixelProps> = ({ selectedColor, initialColor }) => {
  const [pixelColor, setPixelColor] = useState(initialColor);
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);

  function applyColor() {
    setPixelColor(selectedColor);
    setCanChangeColor(false);
  }

  function changeColorOnHover() {
    setOldColor(pixelColor);
    setPixelColor(selectedColor);
  }

  function resetColor() {
    if (canChangeColor) {
      setPixelColor(oldColor);
    }
    setCanChangeColor(true);
  }

  return (
    <div
      className="pixel"
      onClick={applyColor}
      onMouseEnter={changeColorOnHover}
      onMouseLeave={resetColor}
      style={{ backgroundColor: pixelColor }}
    ></div>
  );
};

export default Pixel;
