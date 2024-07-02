import "./styles.css"

import selectSoundAudio from "./assets/select.wav"

const board = document.getElementById("board")
const playersSection = document.getElementById("playersSection")
const selectSound = new Audio(selectSoundAudio)

let cellButtons, playerContainers, game

function initUI(cells, playerIds, players, yourPlayerId) {
  // Add column buttons
  for (let i = 0; i < 8; i++) {
    const button = document.createElement("button")
    button.innerText = "▼"
    button.addEventListener("click", () => dropPiece(i))
    board.appendChild(button)
  }

  // Add cells
  cellButtons = cells.map((_, cellIndex) => {
    const button = document.createElement("button")
    button.classList.add("cell")
    button.setAttribute("data-cell-index", cellIndex)
    board.appendChild(button)
    return button
  })

  // Add player information
  playerContainers = playerIds.map((playerId, index) => {
    const li = document.createElement("li")
    li.setAttribute("player", index)
    li.innerHTML = `<img src="${players[playerId].avatarUrl}" />
           <span>${players[playerId].displayName +
      (players[playerId].playerId === yourPlayerId ? "<br>(You)" : "")
      }</span>`
    playersSection.appendChild(li)
    return li
  })
}

function onChange({ game: newGame, players, yourPlayerId, action }) {
  game = newGame
  const { cells, playerIds, winCombo, lastMovePlayerId, freeCells } = game

  if (!cellButtons) initUI(cells, playerIds, players, yourPlayerId)
  if (lastMovePlayerId) board.classList.remove("initial")

  cellButtons.forEach((button, i) => {
    button.setAttribute("player", playerIds.indexOf(cells[i]))
    button.setAttribute(
      "dim",
      (winCombo && !winCombo.includes(i)) || (!freeCells && !winCombo)
    )

    if (cells[i] || lastMovePlayerId === yourPlayerId || winCombo) {
      button.setAttribute("disabled", "")
    } else {
      button.removeAttribute("disabled")
    }
  })

  playerContainers.forEach((container, i) => {
    container.setAttribute(
      "your-turn",
      playerIds[i] !== lastMovePlayerId && !winCombo && freeCells
    )
  })

  if (action && action.name === "claimCell") selectSound.play()
}

function dropPiece(column) {
  const columnCells = []
  for (let row = 5; row >= 0; row--) {
    columnCells.push(game.cells[row * 8 + column])
  }
  const emptyCellIndex = columnCells.indexOf(null)
  if (emptyCellIndex !== -1) {
    const cellIndex = (5 - emptyCellIndex) * 8 + column
    Dusk.actions.claimCell(cellIndex)
  }
}

Dusk.initClient({ onChange })
