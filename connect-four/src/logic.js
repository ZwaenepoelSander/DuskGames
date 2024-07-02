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
  const columns = 7;
  const rows = 6;

  // horizontal wins
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= columns - 4; col++) {
      const start = row * columns + col;
      if (
        cells[start] &&
        cells[start] === cells[start + 1] &&
        cells[start] === cells[start + 2] &&
        cells[start] === cells[start + 3]
      ){
        return [start, start + 1, start + 2, start + 3];
      }   
    }
  }

  // check for vertical wins
  for (let col = 0; col < columns; col++) {
    for (let row = 0; row <= rows - 4; row++) {
      const start = row * columns + col;
      if (
        cells[start] &&
        cells[start] === cells[start + columns] &&
        cells[start] === cells[start + 2 * columns] &&
        cells[start] === cells[start + 3 * columns]
      ) {
        return [start, start + columns, start + 2 * columns, start + 3 * columns];
      }
    }
  }

  // check for diagonal wins
  for (let row = 0; row <= rows - 4; row++) {
    for (let col = 0; col <= columns - 4; col++) {
      const start = row * columns + col;
      if (
        cells[start] &&
        cells[start] === cells[start + columns + 1] &&
        cells[start] === cells[start + 2 * (columns + 1)] &&
        cells[start] === cells[start + 3 * (columns + 1)]
      ) {
        return [
          start,
          start + columns + 1,
          start + 2 * (columns + 1),
          start + 3 * (columns + 1),
        ];
      }
    }
  }

  // Check for diagonal wins (bottom-left to top-right)
  for (let row = 3; row < rows; row++) {
    for (let col = 0; col <= columns - 4; col++) {
      const start = row * columns + col;
      if (
        cells[start] &&
        cells[start] === cells[start - columns + 1] &&
        cells[start] === cells[start - 2 * (columns - 1)] &&
        cells[start] === cells[start - 3 * (columns - 1)]
      ) {
        return [
          start,
          start - columns + 1,
          start - 2 * (columns - 1),
          start - 3 * (columns - 1),
        ];
      }
    }
  }

  return null;
}

Dusk.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup,
  actions: { claimCell },
});
