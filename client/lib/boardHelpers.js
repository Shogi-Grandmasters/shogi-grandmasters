import {boardIds} from './constants.js';

export const validDropLocations = (tile, board) => {
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
      if (c > 0 || (tile.name !== 'Lance' && tile.name !== 'Pawn')) {
        if (c > 1 && tile.name !== 'Knight') {
          if (tile.name === 'Pawn' && !pawnLocs.includes(c)) {
            validDrops.push([r, c]);
          }
        }
      }
    }
  }));

  return validDrops;
}

export default {
  validDropLocations,
}