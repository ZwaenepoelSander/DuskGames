// Pixel.tsx
import React, { useState } from "react";
import "../styles/pixel.scss";

interface PixelProps {
  initialColor: string;
  selectedColor: string;
}

const Pixel: React.FC<PixelProps> = ({ initialColor, selectedColor }) => {
  const [color, setColor] = useState<string>(initialColor);

  const handleClick = () => {
    setColor(selectedColor);
  };

  return (
    <div
      className="pixel"
      style={{ backgroundColor: color }}
      onClick={handleClick}
    />
  );
};

export default Pixel;
