import React, { useState } from "react";
import "../styles/editor.scss";
import { CirclePicker } from "react-color";
import DrawingPanel from "./DrawingPanel";

export default function Editor() {
  const [panelWidth, setPanelWidth] = useState(4); // Change default size to 4
  const [panelHeight, setPanelHeight] = useState(4); // Change default size to 4
  const [hideOptions, setHideOptions] = useState(false);
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
  const [buttonText, setButtonText] = useState("Start Drawing");
  const [selectedColor, setColor] = useState("#f44336");

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
      {hideDrawingPanel && <h2>Enter Panel Dimensions</h2>}
      {hideDrawingPanel && (
        <div id="options">
          <div className="option">
            <input
              type="number"
              className="panelInput"
              value={panelWidth}
              onChange={(e) => setPanelWidth(Number(e.target.value))}
            />
            <span>Width</span>
          </div>
          <div className="option">
            <input
              type="number"
              className="panelInput"
              value={panelHeight}
              onChange={(e) => setPanelHeight(Number(e.target.value))}
            />
            <span>Height</span>
          </div>
        </div>
      )}

      <button onClick={initializeDrawingPanel} className="button">
        {buttonText}
      </button>

      {hideOptions && (
        <CirclePicker color={selectedColor} onChangeComplete={changeColor} />
      )}

      {hideOptions && (
        <DrawingPanel
          width={panelWidth}
          height={panelHeight}
          selectedColor={selectedColor}
        />
      )}
    </div>
  );
}
