import {
  moveSets,
  boardSize,
  oppositeColor,
  includesLoc,
  reverseLoc,
} from "./constants.js";
import {
  reverseBoard,
  getCombinedMoveSet,
  onBoard,
  squareContains
} from "./boardHelpers.js";

class GameTile {
  constructor(name, color, loc, isPromoted = false) {
    this.name = name;
    this.color = color;
    this.isPromoted = isPromoted;
    this.canPromote = false;
    this.loc = loc;
    this.moves = [];

    if (name === "Rook" || name === "Bishop") {
      this.promotedMoves = moveSets[name];
    } else {
      if (this.name !== "Lance") {
        this.moves = moveSets[name];
      }
      if (name !== "King" && name !== "Gold") {
        this.promotedMoves = moveSets.Gold;
      }
    }
  }

  findMoves(board, _test = false) {
    let moveSet = this.isPromoted ? this.promotedMoves : this.moves || [];

    if (_test) {
      moveSet = moveSet.reduce((set, move) => {
        let position = [this.loc[0] + move[0], this.loc[1] + move[1]];
        if (onBoard(position)) {
          return set.concat([move]);
        }
        return set;
      }, []);
    } else {
      moveSet = moveSet.reduce((set, move) => {
        let position = [this.loc[0] + move[0], this.loc[1] + move[1]];
        if (onBoard(position)) {
          if (squareContains(board, position) === ' ' || !this._hitFriendly(board, position, _test)) {
            return set.concat([move]);
          }
        }
        return set;
      }, []);
    }

    if (this.name === "Rook") {
      moveSet = moveSet.concat(this._rookMoves(board, _test));
    } else if (this.name === "Bishop") {
      moveSet = moveSet.concat(this._bishopMoves(board, _test));
    } else if (this.name === "Lance" && !this.isPromoted) {
      moveSet = this._lanceMoves(board, _test);
    }

    moveSet = moveSet.map(move => [
      this.loc[0] + move[0],
      this.loc[1] + move[1]
    ]);

    if (this.name === "King" && !_test) {
      moveSet = this._kingMoves(reverseBoard(board), moveSet);
    }

    return moveSet;
  }

  setLocation(loc) {
    this.loc = loc;
    if (this.name === "King" || this.name === "Gold") {
      return;
    }
    if (
      (loc[0] < 3 && this.color === "white") ||
      (loc[0] > boardSize - 4 && this.color === "black")
    ) {
      this.canPromote = true;
    }
  }

  promote() {
    this.isPromoted = true;
  }
}

GameTile.prototype._rookMoves = function (board, _test) {
  let result = [];
  let upLoc, downLoc, leftLoc, rightLoc;
  let up, down, left, right;
  up = down = left = right = true;

  for (let i = 1; i < boardSize; i++) {
    [upLoc, downLoc, leftLoc, rightLoc] = [
      [this.loc[0] - i, this.loc[1]],
      [this.loc[0] + i, this.loc[1]],
      [this.loc[0], this.loc[1] - i],
      [this.loc[0], this.loc[1] + i]
    ];

    if (up && (!onBoard(upLoc) || (squareContains(board, upLoc) !== " " && this._hitFriendly(board, upLoc, _test)))) up = false;
    if (down && (!onBoard(downLoc) || (squareContains(board, downLoc) !== " " && this._hitFriendly(board, downLoc, _test)))) down = false;
    if (left && (!onBoard(leftLoc) || (squareContains(board, leftLoc) !== " " && this._hitFriendly(board, leftLoc, _test)))) left = false;
    if (right && (!onBoard(rightLoc) || (squareContains(board, rightLoc) !== " " && this._hitFriendly(board, rightLoc, _test)))) right = false;
    if (up) result.push([-i, 0]);
    if (down) result.push([i, 0]);
    if (left) result.push([0, -i]);
    if (right) result.push([0, i]);
    if (up && squareContains(board, upLoc) !== " " && this._hitEnemy(board, upLoc, _test)) up = false;
    if (down && squareContains(board, downLoc) !== " " && this._hitEnemy(board, downLoc, _test)) down = false;
    if (left && squareContains(board, leftLoc) !== " " && this._hitEnemy(board, leftLoc, _test)) left = false;
    if (right && squareContains(board, rightLoc) !== " " && this._hitEnemy(board, rightLoc, _test)) right = false;
  }
  return result;
}

GameTile.prototype._bishopMoves = function (board, _test) {
  let result = [];
  let upLoc, downLoc, leftLoc, rightLoc;
  let up, down, left, right;
  up = down = left = right = true;

  for (let i = 1; i < boardSize; i++) {
    [upLoc, downLoc, leftLoc, rightLoc] = [
      [this.loc[0] - i, this.loc[1] - i],
      [this.loc[0] + i, this.loc[1] + i],
      [this.loc[0] - i, this.loc[1] + i],
      [this.loc[0] + i, this.loc[1] - i]
    ];

    if (up && (!onBoard(upLoc) || (squareContains(board, upLoc) !== " " && this._hitFriendly(board, upLoc, _test)))) up = false;
    if (down && (!onBoard(downLoc) || (squareContains(board, downLoc) !== " " && this._hitFriendly(board, downLoc, _test)))) down = false;
    if (left && (!onBoard(leftLoc) || (squareContains(board, leftLoc) !== " " && this._hitFriendly(board, leftLoc, _test)))) left = false;
    if (right && (!onBoard(rightLoc) || (squareContains(board, rightLoc) !== " " && this._hitFriendly(board, rightLoc, _test)))) right = false;
    if (up) result.push([-i, -i]);
    if (down) result.push([i, i]);
    if (left) result.push([-i, i]);
    if (right) result.push([i, -i]);
    if (up && squareContains(board, upLoc) !== " " && this._hitEnemy(board, upLoc, _test)) up = false;
    if (down && squareContains(board, downLoc) !== " " && this._hitEnemy(board, downLoc, _test)) down = false;
    if (left && squareContains(board, leftLoc) !== " " && this._hitEnemy(board, leftLoc, _test)) left = false;
    if (right && squareContains(board, rightLoc) !== " " && this._hitEnemy(board, rightLoc, _test)) right = false;
  }
  return result;
}

GameTile.prototype._lanceMoves = function (board, _test) {
  let result = [];
  let clear = true;
  let loc;

  for (let i = 1; i < boardSize; i++) {
    loc = [this.loc[0] - i, this.loc[1]];
    if (clear && (!onBoard(loc) || (squareContains(board, loc) !== " " && this._hitFriendly(board, loc, _test)))) clear = false;
    if (clear) result.push([-i, 0]);
    if (clear && squareContains(board, loc) !== " " && this._hitEnemy(board, loc, _test)) clear = false;
  }
  return result;
};

GameTile.prototype._kingMoves = function (board, moveSet) {
  let oppTeam = getCombinedMoveSet(
    board,
    oppositeColor(this.color)
  ).map(move => reverseLoc(move));
  return moveSet
    .reduce((set, move) => {
      let open = !includesLoc(oppTeam, move);
      if (open) {
        return set.concat([move]);
      }
      return set;
    }, []);
};

GameTile.prototype._hitFriendly = function (board, [r, c], _test) {
  return !_test &&
    (board[r][c].charCodeAt(0) > 90 && this.color === "white") ||
    (board[r][c].charCodeAt(0) < 91 && this.color === "black");
};

GameTile.prototype._hitEnemy = function (board, [r, c], _test) {
  return (board[r][c].charCodeAt(0) > 90 &&
    this.color === "black" &&
    !(_test && board[r][c] === "k")) ||
    (board[r][c].charCodeAt(0) < 91 &&
      this.color === "white" &&
      !(_test && board[r][c] === "K")) ||
    (board[r][c].charCodeAt(0) > 90 &&
      this.color === 'white' &&
      _test) ||
    (board[r][c].charCodeAt(0) < 91 &&
      this.color === 'black' &&
      _test);
};

export default GameTile;
