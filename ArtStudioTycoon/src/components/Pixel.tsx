import React, { useState } from "react";
import "../styles/pixel.scss";

interface PixelProps {
  selectedColor: string;
}

const Pixel: React.FC<PixelProps> = ({ selectedColor }) => {
  const [pixelColor, setPixelColor] = useState<string>("#fff");
  const [oldColor, setOldColor] = useState<string>(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState<boolean>(true);

  const applyColor = () => {
    setPixelColor(selectedColor);
    setCanChangeColor(false);
  };

  const changeColorOnHover = () => {
    setOldColor(pixelColor);
    setPixelColor(selectedColor);
  };

  const resetColor = () => {
    if (canChangeColor) {
      setPixelColor(oldColor);
    }
    setCanChangeColor(true);
  };

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
