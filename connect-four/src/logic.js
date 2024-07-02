function setup(allPlayerIds) {
  const game = {
    cells: new Array(42).fill(null), // 7 columns * 7 rows = 48 cells
    winCombo: null,
    lastMovePlayerId: null,
    playerIds: allPlayerIds,
  }

  return game
}

function claimCell(cellIndex, { game, playerId }) {
  if (game.cells[cellIndex] !== null || playerId === game.lastMovePlayerId) {
    throw Dusk.invalidAction()
  }

  game.cells[cellIndex] = playerId
  game.lastMovePlayerId = playerId
  game.winCombo = findWinningCombo(game.cells)

  if (game.winCombo) {
    Dusk.gameOver({
      players: {
        [game.lastMovePlayerId]: "WON",
        [game.playerIds.find((id) => id !== game.lastMovePlayerId)]: "LOST",
      },
    })
  }

  game.freeCells = game.cells.findIndex((cell) => cell === null) !== -1

  if (!game.freeCells) {
    Dusk.gameOver({
      players: {
        [game.playerIds[0]]: "LOST",
        [game.playerIds[1]]: "LOST",
      },
    })
  }
}

function findWinningCombo(cells) {
  // const columns = 8;
  // const rows = 6;

  // for (let row = 0; row < rows; row++) {
  //   for (let col = 0; col <= columns - 4; col++) {
      
  //   }


  return (
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ].find((combo) =>
      combo.every((i) => cells[i] && cells[i] === cells[combo[0]])
    ) || null
  )
}

Dusk.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup,
  actions: { claimCell },
})
