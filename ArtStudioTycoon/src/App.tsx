import { PlayerId } from "dusk-games-sdk/multiplayer";
import { useEffect, useState } from "react";
import MoneyDisplay from "./components/MoneyDisplay";
import PaintButton from "./components/PaintButton";
import Editor from "./components/Editor";
import selectSoundAudio from "./assets/select.wav";
import { GameState } from "./logic";

// Create an audio object for the select sound
const selectSound = new Audio(selectSoundAudio);

function App() {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  const [money, setMoney] = useState<number>(100); // Initial money
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
    setShowEditor(true);
  };

  const handleSave = () => {
    setShowEditor(false);
  };

  return (
    <div className="main">
      <header className="App-header">
        <MoneyDisplay money={money} />
      </header>
      <main className="App-main">
        {!showEditor && <PaintButton onClick={handlePaintButtonClick} />}
        {showEditor && <Editor onSave={handleSave} />}
      </main>
    </div>
  );
}

export default App;
