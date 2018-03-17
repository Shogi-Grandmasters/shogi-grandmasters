import {boardIds, oppositeBoardSide, oppositeColor, includesLoc} from './constants.js';
import GameTile from './GameTile.js';

export const validDropLocations = (tile, board, kings, color) => {
  let validDrops = [];
  let pawnLocs = [];

  // find where current player has pawns, save column index
  board.forEach((row, r) => row.forEach((col ,c) => {
    if (tile.color === 'white'){
      if (board[r][c] === 'p') {
        pawnLocs.push(c);
      }
    } else {
      if (board[r][c] === 'P') {
        pawnLocs.push(c);
      }
    }
  }));

  board.forEach((row, r) => row.forEach((col, c) => {
    if (board[r][c] === ' ') {
      if (r > 0 || (tile.name !== 'Lance' && tile.name !== 'Pawn')) {
        if (r > 1 || tile.name !== 'Knight') {
          if (tile.name !== 'Pawn' || !pawnLocs.includes(c)) {
            let reverseKings = {
              white: [oppositeBoardSide(kings['white'][0]), oppositeBoardSide(kings['white'][1])],
              black: [oppositeBoardSide(kings['black'][0]), oppositeBoardSide(kings['black'][1])]
            };
            if(tile.name === 'Pawn' && !isCheckOrMate(copyMatrix(board), reverseKings, color, new GameTile('Pawn', color, [r, c]))[0]) {
              validDrops.push([r, c]);
            }
          }
        }
      }
    }
  }));

  return validDrops;
}

export const isCheckOrMate = (board, kings, color, tile) => {
  let check = false;
  let checkmate = false;
  let moveSet = tile.findMoves(board);
  if (includesLoc(moveSet, [kings[oppositeColor(color)][0], kings[oppositeColor(color)][1]])) {
    check = true;
    const boardCopy = reverseBoard(board);
    let king = new GameTile('King', oppositeColor(color), [oppositeBoardSide(kings[oppositeColor(color)][0]), oppositeBoardSide(kings[oppositeColor(color)][1])]);
    let kingsMoves = king.findMoves(boardCopy);
    if (kingsMoves.length === 0) {
      if (tile.name !== 'Knight') {
        // find squares between king and tile
        //   determine difference between two squares
        let spaceBetween = [];
        const difference = [Math.abs(kings[oppositeColor(color)][0] - tile.loc[0]), Math.abs(kings[oppositeColor(color)][1] - tile.loc[1])];
        //   determine direction
        const horizontalDirection = kings[oppositeColor(color)][1] < tile.loc[1] ? -1 : 1;
        const verticalDirection = kings[oppositeColor(color)][0] < tile.loc[0] ? -1 : 1;
        //   iterate saving each square from tile to king
        if (difference[0] > 0) {
          if (difference[1] > 0) {
            for (let i = 1; i < difference[1]; i++) {
              spaceBetween.push([tile.loc[0] + (i * verticalDirection), tile.loc[1] + (i * horizontalDirection)]);
            }
          } else {
            for (let i = 1; i < difference[0]; i++) {
              spaceBetween.push([tile.loc[0] + (i * verticalDirection), tile.loc[1]]);
            }
          }
        } else {
          for (let i = 1; i < difference[1]; i++) {
            spaceBetween.push([tile.loc[0], tile.loc[1] + (i * horizontalDirection)]);
          }
        }
        // find king's team's moveSet
        //   getCombinedMoves
        let teamMoves = getCombinedMoveSet(boardCopy, oppositeColor(color));
        let tempMoves = king.findMoves(boardCopy, true);
        let adjustedMoves = [];

        for (let i = 0; i < teamMoves.length; i++) {
          if (!includesLoc(tempMoves, teamMoves[i])) {
            adjustedMoves.push(teamMoves[i]);
          }
          tempMoves.shift();
          if (tempMoves.length === 0) {
            break;
          }
        }

        // reverse squares locations
        spaceBetween = spaceBetween.map(move => [
          oppositeBoardSide(move[0]),
          oppositeBoardSide(move[1])
        ]);

        // check combined moves for any squares
        if (!spaceBetween.some(move => includesLoc(adjustedMoves, move))){
          checkmate = true;
        }
      } else {
        checkmate = true;
      }
    }
  }
  return [checkmate, check];
}

const copyMatrix = (matrix) => {
  return matrix.slice().map(row => row.slice());
}

export const reverseBoard = (board) => {
  let boardCopy = copyMatrix(board);
  boardCopy = boardCopy.reverse().map(row => row.reverse());
  return boardCopy;
}

// the board as the team's owner sees it and that player's color
export const getCombinedMoveSet = (board, color) => {
  let teamMoves = [];
  board.forEach((row, r) => row.forEach((col, c) => {
    if (board[r][c] !== ' ') {
      let p;
      if (color === 'white' && board[r][c].charCodeAt(0) > 90) {
        p = new GameTile(boardIds[board[r][c].charAt(0).toLowerCase()], color, [r, c], board[r][c].charAt(1) === "+" ? true : false);
      } else if (color === 'black' && board[r][c].charCodeAt(0) < 91) {
        p = new GameTile(boardIds[board[r][c].charAt(0).toLowerCase()], color, [r, c], board[r][c].charAt(1) === "+" ? true : false);
      }
      if (p) {
        teamMoves = teamMoves.concat(p.findMoves(board, true));
      }
    }
  }));
  return teamMoves;
}

export const isValidMove = (board, tile, loc) => {
  let moveSet = tile.findMoves(board);
  return includesLoc(moveSet, loc);
}

export default {
  isValidMove,
  isCheckOrMate,
  reverseBoard,
  validDropLocations,
  getCombinedMoveSet,
  includesLoc
}

// TESTING
// const testBoard = [
//   ["L", " ", " ", " ", "K", " ", "S", "H", "L"],
//   [" ", " ", " ", " ", " ", " ", " ", "B", " "],
//   ["P", " ", " ", " ", " ", "r", " ", "P", "P"],
//   [" ", "b", " ", " ", "s", " ", "P", " ", " "],
//   [" ", " ", "r", " ", " ", " ", " ", " ", " "],
//   [" ", " ", " ", "l", " ", " ", " ", " ", " "],
//   ["p", "p", "p", "p", "p", " ", "p", "p", "p"],
//   [" ", "b", " ", " ", " ", " ", " ", " ", " "],
//   [" ", " ", "s", "g", "k", " ", "s", "h", "l"]
// ];

// const testKings = {
//   white: [8, 4],
//   black: [0, 4]
// };

// const testColor = 'white';

// const testTile = new GameTile('Silver', testColor, [3, 4]);

// console.log(isValidMove(testBoard, testTile, [7, 5]));

