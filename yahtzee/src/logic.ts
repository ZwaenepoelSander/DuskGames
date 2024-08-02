import { DuskClient, PlayerId } from "dusk-games-sdk"

export type Dice = number[]
export type Scores = {
  ones: number | null
  twos: number | null
  threes: number | null
  fours: number | null
  fives: number | null
  sixes: number | null
  threeOfAKind: number | null
  fourOfAKind: number | null
  fullHouse: number | null
  smallStraight: number | null
  largeStraight: number | null
  yahtzee: number | null
  chance: number | null
}

export interface PlayerScores {
  [playerId: string]: Scores
}

export interface GameState {
  dice: Dice
  currentRoll: number
  playerIds: PlayerId[]
  currentPlayerId: PlayerId
  scores: PlayerScores
}

type GameActions = {
  rollDice: (params: { selectedDice: boolean[] }) => void
  selectScore: (category: keyof Scores) => void
}

declare global {
  const Dusk: DuskClient<GameState, GameActions>
}

function rollNewDice(currentDice: Dice, selectedDice: boolean[]): Dice {
  return currentDice.map((die, index) =>
    selectedDice[index] ? die : Math.ceil(Math.random() * 6)
  )
}

Dusk.initLogic({
  minPlayers: 2,
  maxPlayers: 4, // Adjust based on your game's max players
  setup: (allPlayerIds) => ({
    dice: rollNewDice([0, 0, 0, 0, 0], [false, false, false, false, false]),
    currentRoll: 1,
    playerIds: allPlayerIds,
    currentPlayerId: allPlayerIds[0],
    scores: allPlayerIds.reduce((acc, playerId) => {
      acc[playerId] = {
        ones: null,
        twos: null,
        threes: null,
        fours: null,
        fives: null,
        sixes: null,
        threeOfAKind: null,
        fourOfAKind: null,
        fullHouse: null,
        smallStraight: null,
        largeStraight: null,
        yahtzee: null,
        chance: null,
      }
      return acc
    }, {} as PlayerScores),
  }),
  actions: {
    rollDice: ({ selectedDice }, { game, playerId }) => {
      if (playerId !== game.currentPlayerId || game.currentRoll >= 3) {
        throw Dusk.invalidAction()
      }
      game.dice = rollNewDice(game.dice, selectedDice)
      game.currentRoll += 1
    },
    selectScore: (category, { game, playerId }) => {
      if (playerId !== game.currentPlayerId) {
        throw Dusk.invalidAction()
      }
      if (game.scores[playerId][category] !== null) {
        throw Dusk.invalidAction()
      }

      // Calculate the score based on the category and current dice
      const score = calculateScore(category, game.dice)
      game.scores[playerId][category] = score

      // Advance to the next player
      const currentIndex = game.playerIds.indexOf(game.currentPlayerId)
      game.currentPlayerId =
        game.playerIds[(currentIndex + 1) % game.playerIds.length]
      game.currentRoll = 1
      game.dice = rollNewDice(game.dice, [false, false, false, false, false])
    },
  },
})

export function calculateScore(category: keyof Scores, dice: Dice): number {
  switch (category) {
    case "ones":
    case "twos":
    case "threes":
    case "fours":
    case "fives":
    case "sixes": {
      const faceValue = parseInt(category[0], 10)
      return dice
        .filter((die) => die === faceValue)
        .reduce((sum, die) => sum + die, 0)
    }
    case "threeOfAKind":
      return hasNOfAKind(dice, 3) ? dice.reduce((sum, die) => sum + die, 0) : 0
    case "fourOfAKind":
      return hasNOfAKind(dice, 4) ? dice.reduce((sum, die) => sum + die, 0) : 0
    case "fullHouse":
      return isFullHouse(dice) ? 25 : 0
    case "smallStraight":
      return isSmallStraight(dice) ? 30 : 0
    case "largeStraight":
      return isLargeStraight(dice) ? 40 : 0
    case "yahtzee":
      return hasNOfAKind(dice, 5) ? 50 : 0
    case "chance":
      return dice.reduce((sum, die) => sum + die, 0)
    default:
      return 0
  }
}

function hasNOfAKind(dice: Dice, n: number): boolean {
  const counts = dice.reduce(
    (acc, die) => {
      acc[die] = (acc[die] || 0) + 1
      return acc
    },
    {} as { [key: number]: number }
  )
  return Object.values(counts).some((count) => count >= n)
}

function isFullHouse(dice: Dice): boolean {
  const counts = dice.reduce(
    (acc, die) => {
      acc[die] = (acc[die] || 0) + 1
      return acc
    },
    {} as { [key: number]: number }
  )
  const values = Object.values(counts)
  return values.includes(3) && values.includes(2)
}

function isSmallStraight(dice: Dice): boolean {
  const uniqueDice = Array.from(new Set(dice)).sort((a, b) => a - b)
  const straights = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
  ]
  return straights.some((straight) =>
    straight.every((num) => uniqueDice.includes(num))
  )
}

function isLargeStraight(dice: Dice): boolean {
  const uniqueDice = Array.from(new Set(dice)).sort((a, b) => a - b)
  const straight = [1, 2, 3, 4, 5, 6]
  return straight.every((num) => uniqueDice.includes(num))
}
