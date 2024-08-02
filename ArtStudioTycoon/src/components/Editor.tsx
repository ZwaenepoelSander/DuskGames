// Editor.tsx
import React, { useState, useEffect } from "react";
import "../styles/editor.scss";
import { CirclePicker } from "react-color";
import DrawingPanel from "./DrawingPanel";
import { extractColors } from 'extract-colors';
import image from "../assets/16x16/necklace_01c.png";

interface EditorProps {
  onSave: () => void;
}

export default function Editor({ onSave }: EditorProps) {
  const [panelSize, setPanelSize] = useState<number>(4);
  const [hideOptions, setHideOptions] = useState(false);
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
  const [buttonText, setButtonText] = useState("Start Drawing");
  const [selectedColor, setColor] = useState("#f44336");
  const [imageColors, setImageColors] = useState<string[]>([]);

  useEffect(() => {
    if (panelSize === 16) {
      loadSpriteColors(image);
    }
  }, [panelSize]);

  const loadSpriteColors = async (imageSrc: string) => {
    try {
      const colors = await extractColors(imageSrc);
      const hexColors = colors.map(color => color.hex);
      setImageColors(hexColors);
    } catch (error) {
      console.error("Error extracting colors:", error);
    }
  };

  function initializeDrawingPanel() {
    setHideOptions(!hideOptions);
    setHideDrawingPanel(!hideDrawingPanel);

    buttonText === "Start Drawing"
      ? setButtonText("Reset")
      : setButtonText("Start Drawing");
  }

  function changeColor(color: any) {
    setColor(color.hex);
  }

  return (
    <div id="editor">
      <h1>Pixel Editor</h1>
      {hideDrawingPanel && <h2>Select Panel Size</h2>}
      {hideDrawingPanel && (
        <div id="options">
          <div className="option">
            <select
              value={panelSize}
              onChange={(e) => setPanelSize(Number(e.target.value))}
              className="panelSelect"
            >
              <option value={4}>4x4</option>
              <option value={8}>8x8</option>
              <option value={16}>16x16</option>
            </select>
            <span>Size</span>
          </div>
        </div>
      )}

      <button onClick={initializeDrawingPanel} className="button">
        {buttonText}
      </button>

      {hideOptions && (
        <CirclePicker
          color={selectedColor}
          onChangeComplete={changeColor}
          colors={imageColors.length > 0 ? imageColors : undefined}
        />
      )}

      {hideOptions && (
        <DrawingPanel
          width={panelSize}
          height={panelSize}
          selectedColor={selectedColor}
          onSave={onSave}
          imageColors={imageColors}
        />
      )}
    </div>
  );
}
