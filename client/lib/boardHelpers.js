import {
  boardIds,
  oppositeColor,
  includesLoc,
  reverseLoc
} from "./constants.js";
import GameTile from "./GameTile.js";

export const validDropLocations = (board, kings, tile) => {
  let validDrops = [];
  let pawnLocs = [];
  // find where current player has pawns, save column index
  board.forEach((row, r) =>
    row.forEach((col, c) => {
      if (tile.color === "white") {
        if (col === "p") {
          pawnLocs.push(c);
        }
      } else {
        if (col === "P") {
          pawnLocs.push(c);
        }
      }
    })
  );

  let reverseKings;
  board.forEach((row, r) =>
    row.forEach((col, c) => {
      if (col === " ") {
        if (r > 0 || (tile.name !== "Lance" && tile.name !== "Pawn")) {
          if (r > 1 || tile.name !== "Knight") {
            if (tile.name !== "Pawn" || !pawnLocs.includes(c)) {
              reverseKings = {
                white: reverseLoc(kings.white),
                black: reverseLoc(kings.black)
              };
              if (
                tile.name !== "Pawn" ||
                !isCheckOrMate(
                  {
                    board: copyMatrix(board),
                    kings: reverseKings
                  },
                  new GameTile("Pawn", tile.color, [r, c])
                )[1]
              ) {
                validDrops.push([r, c]);
              }
            }
          }
        }
      }
    })
  );

  return validDrops;
};

export const isCheckOrMate = (gameState, tile) => {
  let check = false;
  let checkmate = false;
  let moveSet = tile.findMoves(gameState.board);
  if (
    includesLoc(moveSet, [
      gameState.kings[oppositeColor(tile.color)][0],
      gameState.kings[oppositeColor(tile.color)][1]
    ])
  ) {
    check = true;
    const boardCopy = reverseBoard(gameState.board);
    let king = new GameTile(
      "King",
      oppositeColor(tile.color),
      reverseLoc(gameState.kings[oppositeColor(tile.color)])
    );
    let kingsMoves = king.findMoves(boardCopy);
    if (kingsMoves.length === 0) {
      // find king's team's moveSet
      //   getCombinedMoves
      let teamMoves = getCombinedMoveSet(boardCopy, oppositeColor(tile.color));

      if (!includesLoc(teamMoves, reverseLoc(tile.loc))) {
        if (tile.name === "Knight") {
          checkmate = true;
        } else {
          // find squares between king and tile
          //   determine difference between two squares
          let spaceBetween = [];
          const difference = [
            Math.abs(
              gameState.kings[oppositeColor(tile.color)][0] - tile.loc[0]
            ),
            Math.abs(
              gameState.kings[oppositeColor(tile.color)][1] - tile.loc[1]
            )
          ];
          //   determine direction
          const horizontalDirection =
            gameState.kings[oppositeColor(tile.color)][1] < tile.loc[1]
              ? -1
              : 1;
          const verticalDirection =
            gameState.kings[oppositeColor(tile.color)][0] < tile.loc[0]
              ? -1
              : 1;
          //   iterate saving each square from tile to king
          if (difference[0] > 0) {
            if (difference[1] > 0) {
              for (let i = 1; i < difference[1]; i++) {
                spaceBetween.push([
                  tile.loc[0] + i * verticalDirection,
                  tile.loc[1] + i * horizontalDirection
                ]);
              }
            } else {
              for (let i = 1; i < difference[0]; i++) {
                spaceBetween.push([
                  tile.loc[0] + i * verticalDirection,
                  tile.loc[1]
                ]);
              }
            }
          } else {
            for (let i = 1; i < difference[1]; i++) {
              spaceBetween.push([
                tile.loc[0],
                tile.loc[1] + i * horizontalDirection
              ]);
            }
          }
          // find king's team's moveSet
          //   getCombinedMoves
          let teamMoves = getCombinedMoveSet(
            boardCopy,
            oppositeColor(tile.color)
          );
          let tempMoves = king.findMoves(boardCopy, true);
          let adjustedMoves = [];
          let count = 0;

          while (tempMoves.length > 0) {
            if (!includesLoc(tempMoves, teamMoves[count])) {
              adjustedMoves.push(teamMoves[count]);
            }
            tempMoves.length > 0 && tempMoves.shift();
            count++;
          }

          let reverseKings = {
            white: reverseLoc(gameState.kings.white),
            black: reverseLoc(gameState.kings.black)
          };
          gameState[oppositeColor(tile.color)].forEach(p => {
            let temp = validDropLocations(
              boardCopy,
              gameState.kings,
              new GameTile(
                boardIds[p[0].toLowerCase()],
                oppositeColor(tile.color),
                [10, 10]
              )
            );
            //temp.map(move => reverseLoc(move));
            adjustedMoves = adjustedMoves.concat(temp);
          });

          // reverse squares locations
          spaceBetween = spaceBetween.map(move => reverseLoc(move));

          // check combined moves for any squares
          if (!spaceBetween.some(move => includesLoc(adjustedMoves, move))) {
            checkmate = true;
          }
        }
      }
    }
  }
  return [check, checkmate];
};

export const copyMatrix = (matrix) => {
  return matrix.slice().map(row => row.slice());
};

export const reverseBoard = board => {
  let boardCopy = copyMatrix(board);
  boardCopy = boardCopy.reverse().map(row => row.reverse());
  return boardCopy;
};

// the board as the team's owner sees it and that player's color
export const getCombinedMoveSet = (board, color) => {
  let teamMoves = [];
  board.forEach((row, r) =>
    row.forEach((col, c) => {
      if (col !== " ") {
        let p;
        if (color === "white" && col.charCodeAt(0) > 90) {
          p = new GameTile(
            boardIds[col.charAt(0).toLowerCase()],
            color,
            [r, c],
            col.charAt(1) === "+" ? true : false
          );
        } else if (color === "black" && col.charCodeAt(0) < 91) {
          p = new GameTile(
            boardIds[col.charAt(0).toLowerCase()],
            color,
            [r, c],
            col.charAt(1) === "+" ? true : false
          );
        }
        if (p) {
          teamMoves = teamMoves.concat(p.findMoves(board, true));
        }
      }
    })
  );
  return teamMoves;
};

export const isValidMove = (
  gameStateBefore,
  gameStateAfter,
  tile,
  loc,
  prevGameState
) => {
   if (prevGameState) {
    const lastPieceMoved = new GameTile(boardIds[prevGameState.move.piece[0].toLowerCase()], prevGameState.move.color, prevGameState.move.to, prevGameState.move.piece.length > 1);
    if (isCheckOrMate({
      board: reverseBoard(gameStateBefore.board),
      kings: gameStateBefore.kings
      },
      lastPieceMoved
    )[0] && isCheckOrMate({board: reverseBoard(gameStateAfter.board), kings: gameStateBefore.kings}, lastPieceMoved)[0]) {
      return false;
    }
  }
  let moveSet;
  if (includesLoc([tile.loc], [10, 10])) {
    moveSet = validDropLocations(
      gameStateBefore.board,
      gameStateBefore.kings,
      tile
    );
  } else {
    moveSet = tile.findMoves(gameStateBefore.board);
  }
  return includesLoc(moveSet, loc);
};

export const calcImpasse = board => {
  let white = [];
  let whiteTot = 0;
  let black = [];
  let blackTot = 0;
  board.forEach((row, r) =>
    row.forEach((col, c) => {
      if (col !== " ") {
        if (col.charCodeAt(0) > 90 && col !== "k") {
          white.push(col);
        } else if (col !== "K") {
          black.push(col);
        }
      }
    })
  );
  white.forEach(char => (whiteTot += char === "r" || char === "b" ? 5 : 1));
  black.forEach(char => (blackTot += char === "R" || char === "B" ? 5 : 1));

  return { white: whiteTot, black: blackTot };
};

export default {
  isValidMove,
  isCheckOrMate,
  copyMatrix,
  reverseBoard,
  validDropLocations,
  getCombinedMoveSet,
  includesLoc,
  calcImpasse
};

// TESTING
// const testBoard = [
//   ["L", " ", " ", " ", "K", " ", "S", "N", "L"],
//   [" ", " ", " ", " ", " ", " ", " ", "B", " "],
//   ["P", " ", " ", " ", "p+", "r", " ", "P", "P"],
//   [" ", "b", " ", " ", " ", " ", "P", " ", " "],
//   [" ", " ", "r", " ", " ", " ", " ", " ", " "],
//   [" ", " ", " ", "l", " ", " ", " ", " ", " "],
//   ["p", "p", "p", "p", "p", " ", "p", "p", "p"],
//   [" ", "b", " ", " ", " ", " ", " ", " ", " "],
//   [" ", " ", "s", "g", "k", " ", "s", "n", "l"]
// ];

// const testKings = {
//   white: [0, 4],
//   black: [0, 4]
// };

// const testHands = {
//   white: ["r", "p"],
//   black: ["B", "N"]
// };

// const testTile = new GameTile("Bishop", "white", [3, 1]);

// console.log(
//   isCheckOrMate(
//     {
//       board: testBoard,
//       kings: testKings,
//       white: testHands.white,
//       black: testHands.black
//     },
//     testTile
//   )
// );
