import React, { useState, useEffect } from "react";
import "../styles/editor.scss";
import { CirclePicker } from "react-color";
import DrawingPanel from "./DrawingPanel";
import { extractColors } from 'extract-colors';
import image from "../assets/16x16/necklace_01c.png";
import { hexToRgba } from "../utils";

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
  const [imageUrl, setImageUrl] = useState<string>(image); // State to store the image URL

  useEffect(() => {
    if (panelSize === 16) {
      loadSpriteColors(image);
    }
  }, [panelSize]);

const loadSpriteColors = (imageSrc: string) => {
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);
    const imageData = ctx?.getImageData(0, 0, img.width, img.height);
    if (imageData) {
      const uniqueColors = new Set<string>();
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3] / 255;
        uniqueColors.add(`rgba(${r}, ${g}, ${b}, ${a})`);
      }
      const hexColors = Array.from(uniqueColors);
      setImageColors(hexColors);
      console.log(hexColors);
    }
  };
  img.onerror = (error) => {
    console.error("Error loading image:", error);
  };
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
      <h1>Paint Canvas</h1>
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
          selectedColor={selectedColor}  // Pass the hex color directly
          onSave={onSave}
          imageColors={imageColors.map(color => hexToRgba(color))}
          imageUrl={imageUrl} // Pass the image URL to DrawingPanel
        />
      )}
    </div>
  );
}
