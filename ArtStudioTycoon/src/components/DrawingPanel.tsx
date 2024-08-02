import React, { useRef } from "react";
import "../styles/drawingPanel.scss";
import Row from "./Row";
import { exportComponentAsPNG } from "react-component-export-image";

interface DrawingPanelProps {
  width: number;
  height: number;
  selectedColor: string;
}

const DrawingPanel: React.FC<DrawingPanelProps> = ({ width, height, selectedColor }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const rows = [];
  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} />);
  }

  return (
    <div id="drawingPanel">
      <div id="pixels" ref={panelRef}>
        {rows}
      </div>
      <button onClick={() => exportComponentAsPNG(panelRef)} className="button">
        Export as PNG
      </button>
    </div>
  );
};

export default DrawingPanel;
