import { PlayerId } from "dusk-games-sdk/multiplayer"
import { useEffect, useState } from "react"

import selectSoundAudio from "./assets/select.wav"
import { GameState, Scores, calculateScore } from "./logic.ts"

const selectSound = new Audio(selectSoundAudio)

function App() {
  const [game, setGame] = useState<GameState>()
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>()
  const [selectedDice, setSelectedDice] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ])

  useEffect(() => {
    Dusk.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId)

        if (
          action &&
          (action.name === "rollDice" || action.name === "selectScore")
        ) {
          selectSound.play()
        }

        if (action && action.name === "selectScore") {
          // Reset selected dice only when a score is selected
          setSelectedDice([false, false, false, false, false])
        }
      },
    })
  }, [])

  if (!game) {
    // Dusk only shows your game after an onChange() so no need for loading screen
    return null
  }

  const { playerIds, dice, currentPlayerId, currentRoll } = game
  const isYourTurn = yourPlayerId === currentPlayerId

  const rollDice = () => {
    Dusk.actions.rollDice({ selectedDice })
  }

  const toggleDieSelection = (index: number) => {
    const newSelectedDice = [...selectedDice]
    newSelectedDice[index] = !newSelectedDice[index]
    setSelectedDice(newSelectedDice)
  }

  const potentialScores = (playerId: PlayerId) => {
    if (playerId !== currentPlayerId) {
      return {}
    }
    const scores: Partial<Scores> = {}
    for (const scoreType of Object.keys(game.scores[playerId])) {
      if (game.scores[playerId][scoreType as keyof Scores] === null) {
        scores[scoreType as keyof Scores] = calculateScore(
          scoreType as keyof Scores,
          dice
        )
      }
    }
    return scores
  }

  const selectScore = (category: keyof Scores) => {
    Dusk.actions.selectScore(category)
  }

  return (
    <div className="game-container">
      <div className="score-sheet">
        <table className="scorecard">
          <thead>
            <tr>
              <th>Scoring Options</th>
              {playerIds.map((playerId) => {
                const player = Dusk.getPlayerInfo(playerId)
                return (
                  <th key={playerId}>
                    {player.displayName}{" "}
                    {player.playerId === yourPlayerId && "(You)"}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {[
              "ones",
              "twos",
              "threes",
              "fours",
              "fives",
              "sixes",
              "threeOfAKind",
              "fourOfAKind",
              "fullHouse",
              "smallStraight",
              "largeStraight",
              "yahtzee",
              "chance",
            ].map((scoreType) => (
              <tr key={scoreType}>
                <th>
                  {scoreType
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </th>
                {playerIds.map((playerId) => (
                  <td
                    key={playerId}
                    onClick={() => {
                      if (
                        playerId === yourPlayerId &&
                        game.scores[playerId][scoreType as keyof Scores] ===
                          null
                      ) {
                        selectScore(scoreType as keyof Scores)
                      }
                    }}
                  >
                    {game.scores[playerId][scoreType as keyof Scores] ??
                      potentialScores(playerId)[scoreType as keyof Scores] ??
                      0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dice-container">
        {dice.map((die, index) => (
          <img
            key={index}
            src={`/src/assets/tag_d6_${die}.svg`}
            alt={`Die ${die}`}
            className={selectedDice[index] ? "selected" : ""}
            onClick={() => toggleDieSelection(index)}
            style={{
              cursor: "pointer",
              border: selectedDice[index] ? "2px solid #fff" : "none",
            }}
          />
        ))}
        <br />
        {isYourTurn && currentRoll < 3 && (
          <button onClick={rollDice}>Roll Dice ({3 - currentRoll} left)</button>
        )}
      </div>
    </div>
  )
}

export default App
