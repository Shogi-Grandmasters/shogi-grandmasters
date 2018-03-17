export const intialBoard = [
  ["L", "H", "S", "G", "K", "G", "S", "H", "L"],
  [" ", "R", " ", " ", " ", " ", " ", "B", " "],
  ["P", "P", "P", "P", "P", "P", "P", "P", "P"],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
  [" ", "b", " ", " ", " ", " ", " ", "r", " "],
  ["l", "h", "s", "g", "k", "g", "s", "h", "l"]
];

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
  King: [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]],
  Gold: [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 0], [0, -1]],
  Silver: [[-1, -1], [-1, 0], [-1, 1], [1, 1], [1, -1]],
  Knight: [[-2, -1], [-2, 1]],
  Pawn: [[-1, 0]],
  Rook: [[-1, -1], [-1, 1], [1, 1], [1, -1]],
  Bishop: [[-1, 0], [0, 1], [1, 0], [0, -1]]
};

export const boardSize = 9;

export const oppositeBoardSide = x => Math.abs(x - 8);

export const oppositeColor = color => (color === "white" ? "black" : "white");

export const includesLoc = (set, loc) =>
  set.some(tuple => tuple[0] === loc[0] && tuple[1] === loc[1]);

export default {
  moveSets,
  boardIds,
  boardSize,
  oppositeBoardSide,
  oppositeColor,
  includesLoc
};