import {boardIds, oppositeBoardSide} from './constants.js';
import GameTile from './GameTile.js';

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
      if (r > 0 || (tile.name !== 'Lance' && tile.name !== 'Pawn')) {
        if (r > 1 || tile.name !== 'Knight') {
          if (tile.name !== 'Pawn' || !pawnLocs.includes(c)) {
            validDrops.push([r, c]);
          }
        }
      }
    }
  }));

  return validDrops;
}

const copyMatrix = (matrix) => {
  return matrix.slice().map(row => row.slice());
}

export const reverseBoard = (board) => {
    let boardCopy = copyMatrix(this.state.board);
    boardCopy = boardCopy.reverse().map(row => row.reverse());
    this.setState({
      board: boardCopy,
    })
  }

// the board as the team's owner sees it and that player's color
export const getCombinedMoveSet = (board, color) => {
  let teamMoves = [];
  board.forEach((row, r) => row.forEach((col, c) => {
    if (board[r][c] !== ' ') {
      if (color === 'white' && board[r][c].charCodeAt(0) > 90) {
        teamMoves = teamMoves.concat(
          new GameTile(
            boardIds[board[r][c][0]],
            'white',
            [r, c],
            (board[r][c][1] === '+') ? true : false)
          .findMoves()
        );
      }
    } else if (color === 'black' && board[r][c].charCodeAt(0) < 91) {
      teamMoves = teamMoves.concat(
        new GameTile(
          boardIds[board[r][c][0]],
          'black',
          [r, c],
          board[r][c][1] === "+" ? true : false)
        .findMoves()
      );
    }
  }));
}

export default {
  reverseBoard,
  validDropLocations,
  getCombinedMoveSet,
}

