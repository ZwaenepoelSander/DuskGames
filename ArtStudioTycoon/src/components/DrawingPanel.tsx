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
}

const DrawingPanel: React.FC<DrawingPanelProps> = ({ width, height, selectedColor, onSave, imageColors }) => {
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
    const colors = imageColors.slice(0, width * height);
    const pixelRows: string[][] = [];

    for (let y = 0; y < height; y++) {
      const row: string[] = [];
      for (let x = 0; x < width; x++) {
        row.push(colors[y * width + x] || "rgba(0,0,0,0)");
      }
      pixelRows.push(row);
    }

    setRows(pixelRows.map((row, i) => <Row key={i} width={width} selectedColor={selectedColor} initialColors={row} />));
  };

  const createEmptyGrid = () => {
    setRows(Array(height).fill(null).map((_, i) => <Row key={i} width={width} selectedColor={selectedColor} initialColors={Array(width).fill("#fff")} />));
  };

  return (
    <div id="drawingPanel">
      <div id="pixels" ref={panelRef}>
        {rows}
      </div>
      <button onClick={() => exportComponentAsPNG(panelRef)} className="button">
        Export as PNG
      </button>
      <button onClick={onSave} className="button">
        Save
      </button>
    </div>
  );
};

export default DrawingPanel;
