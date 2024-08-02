import React from "react";
import "../styles/row.scss";
import Pixel from "./Pixel";

interface RowProps {
  width: number;
  selectedColor: string;
}

const Row: React.FC<RowProps> = ({ width, selectedColor }) => {
  const pixels = [];
  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel key={i} selectedColor={selectedColor} />);
  }

  return <div className="row">{pixels}</div>;
};

export default Row;
