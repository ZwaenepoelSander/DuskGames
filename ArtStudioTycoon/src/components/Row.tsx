import React from "react";
import "../styles/row.scss";
import Pixel from "./Pixel";

interface RowProps {
  width: number;
  selectedColor: string;
  initialColors: string[]; // Add initialColors prop
}

const Row: React.FC<RowProps> = ({ width, selectedColor, initialColors }) => {
  return (
    <div className="row">
      {initialColors.map((color, i) => (
        <Pixel key={i} selectedColor={selectedColor} initialColor={color} />
      ))}
    </div>
  );
};

export default Row;
