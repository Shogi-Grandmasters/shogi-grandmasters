import {
  boardSize,
  boardIds,
  oppositeColor,
  oppositeBoardSide,
  includesLoc,
  reverseLoc,
} from "./constants.js";
import { test } from "./tests.js"
import GameTile from "./GameTile.js";

export const pieceNameFromBoardId = (id) => {
  id = id.length > 1 ? id[0].toLowerCase() : id.toLowerCase();
  return boardIds[id];
}

export const validDropLocations = (board, tile) => {
  board = copyMatrix(board);
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

  board.forEach((row, r) =>
    row.forEach((col, c) => {
      let boardCopy = copyMatrix(board);
      if (col === " ") {
        if (r > 0 || (tile.name !== "Lance" && tile.name !== "Pawn")) {
          if (r > 1 || tile.name !== "Knight") {
            if (tile.name !== "Pawn" || !pawnLocs.includes(c)) {
              boardCopy[r][c] = tile.color === 'white' ? 'p' : 'P';
              let pt = new GameTile("Pawn", tile.color, [r, c]);
              if (
                tile.name !== "Pawn" ||
                !isCheckOrMate(
                  {
                    board: boardCopy,
                    white: [],
                    black: []
                  },
                  tile.color
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

export const isCheckOrMate = (gameState, playerColor) => {
  let check = false;
  let checkmate = false;
  let lock = false;
  let kings = findKings(gameState.board);

  // find and collect pieces threatening the king along with their movesets
  const threats = {};
  gameState.board.forEach((row, r) => row.forEach((col, c) => {
    if (col !== ' ') {
      if (playerColor === 'white') {
        if (col.charCodeAt(0) > 90) {
          let p = new GameTile(pieceNameFromBoardId(col), 'white', [r, c], col.length > 1);
          let moveSet = p.findMoves(gameState.board);
          if (includesLoc(moveSet, kings[oppositeColor(playerColor)])) {
            threats[r * 10 + c] = { piece: p, moves: moveSet };
          }
        }
      } else {
        if (col.charCodeAt(0) < 91) {
          let p = new GameTile(pieceNameFromBoardId(col), 'black', [r, c], col.length > 1);
          let moveSet = p.findMoves(gameState.board);
          if (includesLoc(moveSet, kings[oppositeColor(playerColor)])) {
            threats[r * 10 + c] = { piece: p, moves: moveSet };
          }
        }
      }
    }
  }));
  const threatCount = Object.keys(threats).length;

  // find opponent's team's moveSet
  const boardCopy = reverseBoard(gameState.board);
  let teamMoves = getCombinedMoveSet(boardCopy, oppositeColor(playerColor), true).map(move => reverseLoc(move));

  // add all valid drop locations for pieces in that player's hand
  gameState[oppositeColor(playerColor)] &&
    gameState[oppositeColor(playerColor)].forEach(p => {
      let temp = validDropLocations(copyMatrix(gameState.board), new GameTile(
        pieceNameFromBoardId(p),
        oppositeColor(playerColor),
        [10, 10]
      ));
      teamMoves = teamMoves.concat(temp);
    });

  let kingsMoves = [];
  // if a threat is found 'check'
  if (threatCount > 0) {
    check = true;

    // get available moves for king that is now in check
    let king = new GameTile(
      "King",
      oppositeColor(playerColor),
      reverseLoc(kings[oppositeColor(playerColor)])
    );
    kingsMoves = king.findMoves(reverseBoard(gameState.board))//.map(move => reverseLoc(move));

    // if king has no available moves continue looking for paths out
    if (kingsMoves.length === 0) {
      // if there is two or more threatening pieces it is checkmate
      if (threatCount > 1) {
        checkmate = true;
      } else {
        const tile = Object.entries(threats)[0][1];

        // check if the tile that put the king in check can be captured by
        //   another of the king's pieces
        // otherwise check to see if a piece can be placed blocking the king from
        //   the tile that put him in check
        if (!includesLoc(teamMoves, tile.piece.loc)) {
          // the Knight jumps and therefore cannot be blocked
          if (tile.piece.name === "Knight") {
            checkmate = true;
          } else {
            // find spaces between king and threat
            tile.spaceBetween = findSpaceFrom(
              kings[oppositeColor(playerColor)],
              tile.piece.loc);

            // check combined moves for any squares that could protect the king
            if (!tile.spaceBetween.some(move => includesLoc(teamMoves, move))) {
              checkmate = true;
            }
          }
        }
      }
    }
  }
  if (!checkmate && teamMoves.length === 0 && kingsMoves.length === 0) {
    lock = true;
  }
  return [check, checkmate, lock];
};

export const copyMatrix = matrix => {
  return matrix.slice().map(row => row.slice());
};

export const reverseBoard = board => {
  let boardCopy = copyMatrix(board);
  boardCopy = boardCopy.reverse().map(row => row.reverse());
  return boardCopy;
};

// the board as the team's owner sees it and that player's color
export const getCombinedMoveSet = (board, color, _test = false) => {
  let teamMoves = [];
  board.forEach((row, r) =>
    row.forEach((col, c) => {
      if (col !== " " && !(col.toLowerCase() === 'k' && _test)) {
        let p;
        if (color === "white" && col.charCodeAt(0) > 90) {
          p = new GameTile(
            pieceNameFromBoardId(col),
            color,
            [r, c],
            col.length > 1 ? true : false
          );
        } else if (color === "black" && col.charCodeAt(0) < 91) {
          p = new GameTile(
            pieceNameFromBoardId(col),
            color,
            [r, c],
            col.length > 1 ? true : false
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

export const isValidMove = (gameStateBefore, gameStateAfter, tile, loc) => {
  if (isCheckOrMate(gameStateAfter, oppositeColor(tile.color))[0]) {
    return [false, 'Move would put you in Check'];
  }

  let moveSet;
  if (includesLoc([tile.loc], [10, 10])) {
    moveSet = validDropLocations(
      gameStateBefore.board,
      tile
    );
  } else {
    moveSet = tile.findMoves(gameStateBefore.board);
  }

  let canMoveThere = includesLoc(moveSet, loc);
  return [canMoveThere, 'Invalid destination.  Piece cannot move there'];
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

const findSpaceFrom = (kingLoc, tileLoc) => {
  let spaceBetween = [];
  const difference = [
    Math.abs(
      kingLoc[0] - tileLoc[0]
    ),
    Math.abs(
      kingLoc[1] - tileLoc[1]
    )
  ];
  // determine direction
  const horizontalDirection =
    kingLoc[1] < tileLoc[1]
      ? -1
      : 1;
  const verticalDirection =
    kingLoc[0] < tileLoc[0]
      ? -1
      : 1;
  // iterate saving each square from tile to king
  if (difference[0] > 0) {
    if (difference[1] > 0) {
      for (let i = 1; i < difference[1]; i++) {
        spaceBetween.push([
          tileLoc[0] + i * verticalDirection,
          tileLoc[1] + i * horizontalDirection
        ]);
      }
    } else {
      for (let i = 1; i < difference[0]; i++) {
        spaceBetween.push([
          tileLoc[0] + i * verticalDirection,
          tileLoc[1]
        ]);
      }
    }
  } else {
    for (let i = 1; i < difference[1]; i++) {
      spaceBetween.push([
        tileLoc[0],
        tileLoc[1] + i * horizontalDirection
      ]);
    }
  }
  return spaceBetween;
}

export const playerColorFromId = (id) => {
  return id.charCodeAt(0) > 90 ? 'white' : 'black';
}

export const gameTileAtCoords = (board, [x, y]) => {
  let pieceAtCoords = board[x][y];
  if (pieceAtCoords.trim()) {
    return new GameTile(pieceNameFromBoardId(pieceAtCoords), playerColorFromId(pieceAtCoords), [x, y], pieceAtCoords.length > 1);
  }
  return null;
}

export const findKings = (board) => {
  let white, black;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 'k') white = [i, j];
      if (board[i][j] === 'K') black = [i, j];
    }
  }
  return { white, black };
}

export const onBoard = ([r, c]) => r < boardSize && r >= 0 && c < boardSize && c >= 0;

export const squareContains = (board, [r, c]) => board[r][c];

export default {
  isValidMove,
  isCheckOrMate,
  reverseBoard,
  validDropLocations,
  getCombinedMoveSet,
  includesLoc,
  calcImpasse,
  playerColorFromId,
  pieceNameFromBoardId,
  gameTileAtCoords,
  findKings,
  copyMatrix,
  onBoard,
  squareContains
};

// TESTING
// test();
