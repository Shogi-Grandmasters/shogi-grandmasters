export const boardIds = {
  k: "King",
  g: "Gold",
  s: "Silver",
  h: "Knight",
  p: "Pawn",
  r: "Rook",
  b: "Bishop",
  l: "Lance"
};

export const moveSets = {
  King: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1]
  ],
  Gold: [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 0], [0, -1]],
  Silver: [[-1, -1], [-1, 0], [-1, 1], [1, 1], [1, -1]],
  Knight: [[-2, -1], [-2, 1]],
  Pawn: [[-1, 0]],
  Rook: [[-1, -1], [-1, 1], [1, 1], [1, -1]],
  Bishop: [[-1, 0], [0, 1], [1, 0], [0, -1]]
};

export const boardSize = 9;

export const oppositeBoardSide = {
  0: 8,
  1: 7,
  2: 6,
  3: 5,
  4: 4,
  5: 3,
  6: 2,
  7: 1,
  8: 0
};

export const oppositeColor = {
  white: 'black',
  black: 'white'
};

export default {
  moveSets,
  boardIds,
  boardSize,
  oppositeBoardSide,
  oppositeColor
};
