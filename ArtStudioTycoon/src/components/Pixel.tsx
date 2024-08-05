import React, { useState } from "react";
import "../styles/pixel.scss";
import { hexToRgba } from "../utils";

interface PixelProps {
  initialColor: string;
  selectedColor: string;
}

const Pixel: React.FC<PixelProps> = ({ initialColor, selectedColor }) => {
  const [color, setColor] = useState<string>(initialColor);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const handleClick = () => {
    const selectedRgba = hexToRgba(selectedColor);
    console.log(selectedRgba)
    console.log(initialColor)
    if (!isLocked && selectedRgba === initialColor) {
      setColor(selectedColor);
      setIsLocked(true);
    }
  };

  return (
    <div
      className="pixel"
      style={{
        backgroundColor: color,
        opacity: isLocked ? 1 : 0.2,
      }}
      onClick={handleClick}
    />
  );
};

export default Pixel;
