import { PlayerId } from "dusk-games-sdk/multiplayer";
import { useEffect, useState } from "react";
import PaintingGrid from "./components/PaintingGrid";
import ColorPicker from "./components/ColorPicker";
import MoneyDisplay from "./components/MoneyDisplay";
import PaintButton from "./components/PaintButton";
import Editor from "./components/Editor";
import selectSoundAudio from "./assets/select.wav";
import { GameState } from "./logic";

// Create an audio object for the select sound
const selectSound = new Audio(selectSoundAudio);

const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#000000",
  "#FFFFFF",
];

function App() {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  const [money, setMoney] = useState<number>(100); // Initial money
  const [painting, setPainting] = useState<string[][]>(
    Array(4).fill(Array(4).fill("#FFFFFF"))
  );
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [showEditor, setShowEditor] = useState<boolean>(false);

  useEffect(() => {
    Dusk.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);

        if (action && action.name === "claimCell") selectSound.play();
      },
    });
  }, []);

  if (!game) {
    // Dusk only shows your game after an onChange() so no need for loading screen
    return null;
  }

  const handlePaintButtonClick = () => {
    // Toggle the editor visibility
    setShowEditor(!showEditor);
  };

  const handleCellClick = (row: number, col: number) => {
    const newPainting = painting.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? selectedColor : cell
      )
    );
    setPainting(newPainting);
  };

  return (
    <div className="main">
      <header className="App-header">
        <MoneyDisplay money={money} />
      </header>
      <main className="App-main">
        <PaintButton onClick={handlePaintButtonClick} />
        {showEditor && <Editor />}
      </main>
    </div>
  );
}

export default App;
