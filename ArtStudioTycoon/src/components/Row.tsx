import React from "react";
import "../styles/row.scss";
import Pixel from "./Pixel";

interface RowProps {
  width: number;
  selectedColor: string;
  initialColors: string[];
}

const Row: React.FC<RowProps> = ({ width, selectedColor, initialColors }) => {
  return (
    <div className="row">
      {Array(width)
        .fill(null)
        .map((_, i) => (
          <Pixel
            key={i}
            initialColor={initialColors[i]}
            selectedColor={selectedColor}
          />
        ))}
    </div>
  );
};

export default Row;
