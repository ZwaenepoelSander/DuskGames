// DrawingPanel.tsx
import React, { useRef, useEffect, useState } from "react";
import "../styles/drawingPanel.scss";
import Row from "./Row";
import { exportComponentAsPNG } from "react-component-export-image";

interface DrawingPanelProps {
  width: number;
  height: number;
  selectedColor: string;
  onSave: () => void;
  imageColors: string[];
  imageUrl: string;
}

const DrawingPanel: React.FC<DrawingPanelProps> = ({ width, height, selectedColor, onSave, imageColors, imageUrl}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (width === 16 && height === 16 && imageColors.length > 0) {
      loadImagePixels();
    } else {
      createEmptyGrid();
    }
  }, [width, height, imageColors]);

    const loadImagePixels = () => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      const imageData = ctx?.getImageData(0, 0, img.width, img.height);
      if (imageData) {
        const colors: string[][] = [];
        for (let y = 0; y < img.height; y++) {
          const row: string[] = [];
          for (let x = 0; x < img.width; x++) {
            const index = (y * img.width + x) * 4;
            const color = `rgba(${imageData.data[index]}, ${imageData.data[index + 1]}, ${imageData.data[index + 2]}, ${imageData.data[index + 3] / 255})`;
            row.push(color);
          }
          colors.push(row);
        }
        setRows(colors.map((row, i) => <Row key={i} width={width} selectedColor={selectedColor} initialColors={row} />));
      }
    };
  };

  const createEmptyGrid = () => {
    setRows(Array(height).fill(null).map((_, i) => <Row key={i} width={width} selectedColor={selectedColor} initialColors={Array(width).fill("#fff")} />));
  };

  return (
    <div id="drawingPanel">
      <div id="pixels" ref={panelRef}>
        {rows}
      </div>
      <button onClick={onSave} className="button">
        Save
      </button>
    </div>
  );
};

export default DrawingPanel;
