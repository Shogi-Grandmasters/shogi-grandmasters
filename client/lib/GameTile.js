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
  hitFriendly,
  hitEnemy,
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
    //if (this.name === 'King') console.log(moveSet)
    if (_test) {
      //console.log('test  is true')
      moveSet = moveSet.reduce((set, move) => {
        let position = [this.loc[0] + move[0], this.loc[1] + move[1]];
        if (onBoard(position)) {
          return set.concat([move]);
        }
        return set;
      }, []);
    } else {
      //console.log('test is false')
      moveSet = moveSet.reduce((set, move) => {
        let position = [this.loc[0] + move[0], this.loc[1] + move[1]];
        if (onBoard(position)) {
          if (board[r][c] === ' ' || !hitFriendly(board, position, _test)) {
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
    //if (this.name === "King") console.log(this.color, 'kings moves from findMoves', JSON.stringify(moveSet))
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
  for (let i = 1; i < boardSize; i++) {
    let position = [this.loc[0] - i, this.loc[1]];
    if (!onBoard(position)) {
      break;
    } else {
      if (board[position[0]][position[1]] !== " ") {
        if (hitFriendly(board, position, _test)) {
          break;
        } else if (hitEnemy(board, position, _test)) {
          result.push([-i, 0]);
          break;
        }
      } else {
        result.push([-i, 0]);
      }
    }
  }
  for (let i = 1; i < boardSize; i++) {
    let position = [this.loc[0] + i, this.loc[1]];
    if (!onBoard(position)) {
      break;
    } else {
      if (board[position[0]][position[1]] !== " ") {
        if (hitFriendly(board, position, _test)) {
          break;
        } else if (hitEnemy(board, position, _test)) {
          result.push([i, 0]);
          break;
        }
      } else {
        result.push([i, 0]);
      }
    }
  }
  for (let i = 1; i < boardSize; i++) {
    let position = [this.loc[0], this.loc[1] - i];
    if (!onBoard(position)) {
      break;
    } else {
      if (board[position[0]][position[1]] !== " ") {
        if (hitFriendly(board, position, _test)) {
          break;
        } else if (hitEnemy(board, position, _test)) {
          result.push([0, -i]);
          break;
        }
      } else {
        result.push([0, -i]);
      }
    }
  }
  for (let i = 1; i < boardSize; i++) {
    let position = [this.loc[0], this.loc[1] + i];
    if (!onBoard(position)) {
      break;
    } else {
      if (board[position[0]][position[1]] !== " ") {
        if (hitFriendly(board, position, _test)) {
          break;
        } else if (hitEnemy(board, position, _test)) {
          result.push([0, i]);
          break;
        }
      } else {
        result.push([0, i]);
      }
    }
  }
  return result;
};

GameTile.prototype._bishopMoves = function (board, _test) {
  let result = [];
  for (let i = 1; i < boardSize; i++) {
    let position = [this.loc[0] - i, this.loc[1] - i];
    if (!onBoard(position)) {
      break;
    } else {
      if (board[position[0]][position[1]] !== " ") {
        if (hitFriendly(board, position, _test)) {
          break;
        } else if (hitEnemy(board, position, _test)) {
          result.push([-i, -i]);
          break;
        }
      } else {
        result.push([-i, -i]);
      }
    }
  }
  for (let i = 1; i < boardSize; i++) {
    let position = [this.loc[0] + i, this.loc[1] + i];
    if (!onBoard(position)) {
      break;
    } else {
      if (board[position[0]][position[1]] !== " ") {
        if (hitFriendly(board, position, _test)) {
          break;
        } else if (hitEnemy(board, position, _test)) {
          result.push([i, i]);
          break;
        }
      } else {
        result.push([i, i]);
      }
    }
  }
  for (let i = 1; i < boardSize; i++) {
    let position = [this.loc[0] - i, this.loc[1] + i];
    if (!onBoard(position)) {
      break;
    } else {
      if (board[position[0]][position[1]] !== " ") {
        if (hitFriendly(board, position, _test)) {
          break;
        } else if (hitEnemy(board, position, _test)) {
          result.push([-i, i]);
          break;
        }
      } else {
        result.push([-i, i]);
      }
    }
  }
  for (let i = 1; i < boardSize; i++) {
    let position = [this.loc[0] + i, this.loc[1] - i];
    if (!onBoard(position)) {
      break;
    } else {
      if (board[position[0]][position[1]] !== " ") {
        if (hitFriendly(board, position, _test)) {
          break;
        } else if (hitEnemy(board, position, _test)) {
          result.push([i, -i]);
          break;
        }
      } else {
        result.push([i, -i]);
      }
    }
  }
  return result;
};

GameTile.prototype._lanceMoves = function (board, _test) {
  let result = [];
  for (let i = 1; i < boardSize; i++) {
    let position = [this.loc[0] - i, this.loc[1]];
    if (!onBoard(position)) {
      break;
    } else {
      if (board[position[0]][position[1]] !== " ") {
        if (hitFriendly(board, position, _test)) {
          break;
        } else if (hitEnemy(board, position, _test)) {
          result.push([-i, 0]);
          break;
        }
      } else {
        result.push([-i, 0]);
      }
    }
  }
  return result;
};

GameTile.prototype._kingMoves = function (board, moveSet) {
  let oppTeam = getCombinedMoveSet(
    board,
    oppositeColor(this.color)
  ).map(move => reverseLoc(move));
  //console.log('move set in kingMoves', this.color,  JSON.stringify(moveSet));
  //console.log(oppositeColor(this.color), 'Opponents moves >>>>>>>>>>>>', JSON.stringify(oppTeam));
  return moveSet
    .reduce((set, move) => {
      let open = !includesLoc(oppTeam, move);
      //console.log(open, move);
      if (open) {
        return set.concat([move]);
      }
      return set;
    }, []);
};

export default GameTile;
