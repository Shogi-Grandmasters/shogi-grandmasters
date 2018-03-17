import {boardIds, oppositeBoardSide, oppositeColor} from './constants.js';
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
  if (moveSet.some((tuple) => (tuple[0] === kings[oppositeColor[color]][0] && tuple[1] === kings[oppositeColor[color]][1]))) {
    check = true;
    boardCopy = reverseBoard(board);
    let king = new GameTile('King', oppositeColor[color], [oppositeBoardSide(kings[oppositeColor[color]][0]), oppositeBoardSide(kings[oppositeColor[color]][0])]);
    if (king.findMoves(boardCopy).length === 0) {
      checkmate = true;
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
  return moveSet.some(tuple => tuple[0] === loc[0] && tuple[1] === loc[1]);
}

export default {
  isValidMove,
  isCheckOrMate,
  reverseBoard,
  validDropLocations,
  getCombinedMoveSet,
}

