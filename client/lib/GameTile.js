  import {moveSets, boardSize} from './constants.js';

  class GameTile {
    constructor(name, color, loc, promotedName = null) {
      this.name = name;
      this.promotedName = promotedName;
      this.color = color;
      this.isPromoted = false;
      this.canPromote = false;
      this.loc = loc;
      this.moves = Array(1);

      if (name === "Rook" || name === "Bishop") {
        this.promotedMoves = moveSets[name];
      } else {
        this.moves = moveSets[name];
        if (name !== "King" && name !== "Gold") {
          this.promotedMoves = moveSets.Gold;
        }
      }
    }

    findMoves(board) {
      let moveSet = this.isPromoted ? this.promotedMoves : this.moves || [];

      if (this.color === "black") {
        moveSet = moveSet.map(loc => [-loc[0], -loc[1]]);
      }

      moveSet = moveSet.reduce((set, move) => {
        let position = [this.loc[0] + move[0], this.loc[1] + move[1]];
        if (position[0] < boardSize && position[0] >= 0 && position[1] < boardSize && position[1] >= 0 &&
          !((board[position[0]][position[1]].charCodeAt(0) > 90 && this.color === "white") ||
          (board[position[0]][position[1]].charCodeAt(0) < 91 && this.color === "black"))) {
          return set.concat([move]);
        }
        return set;
      }, []);

      if (this.name === "Rook") {
        moveSet = moveSet.concat(this._rookMoves(board));
      } else if (this.name === "Bishop") {
        moveSet = moveSet.concat(this._bishopMoves(board));
      } else if (this.name === "Lance" && !this.isPromoted) {
        moveSet = this._lanceMoves(board);
      }

      return moveSet.map((move) => [this.loc[0] + move[0], this.loc[1] + move[1]]);
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

  GameTile.prototype._rookMoves = function(board) {
    let result = [];
    for (let i = 1; i < boardSize; i++) {
      let position = [this.loc[0] - i, this.loc[1]];
      if (position[0] < 0) {
        break;
      } else {
        if (board[position[0]][position[1]] !== " ") {
          if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "white") ||
              (board[position[0]][position[1]].charCodeAt(0) < 91 &&
                this.color === "black")
          ) {
            break;
          } else if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "black") ||
            (board[position[0]][position[1]].charCodeAt(0) < 91 &&
              this.color === "white")
          ) {
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
      if (position[0] === boardSize) {
        break;
      } else {
        if (board[position[0]][position[1]] !== " ") {
          if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "white") ||
              (board[position[0]][position[1]].charCodeAt(0) < 91 &&
                this.color === "black")
          ) {
            break;
          } else if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "black") ||
            (board[position[0]][position[1]].charCodeAt(0) < 91 &&
              this.color === "white")
          ) {
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
      if (position[1] < 0) {
        break;
      } else {
        if (board[position[0]][position[1]] !== " ") {
          if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "white") ||
              (board[position[0]][position[1]].charCodeAt(0) < 91 &&
                this.color === "black")
          ) {
            break;
          } else if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "black") ||
            (board[position[0]][position[1]].charCodeAt(0) < 91 &&
              this.color === "white")
          ) {
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
      if (position[1] === boardSize) {
        break;
      } else {
        if (board[position[0]][position[1]] !== " ") {
          if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "white") ||
              (board[position[0]][position[1]].charCodeAt(0) < 91 &&
                this.color === "black")
          ) {
            break;
          } else if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "black") ||
            (board[position[0]][position[1]].charCodeAt(0) < 91 &&
              this.color === "white")
          ) {
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

  GameTile.prototype._bishopMoves = function(board) {
    let result = [];
    for (let i = 1; i < boardSize; i++) {
      let position = [this.loc[0] - i, this.loc[1] - i];
      if ( position[0] < 0 || position[1] < 0) {
        break;
      } else {
        if (board[position[0]][position[1]] !== " ") {
          if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "white") ||
              (board[position[0]][position[1]].charCodeAt(0) < 91 &&
                this.color === "black")
          ) {
            break;
          } else if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "black") ||
            (board[position[0]][position[1]].charCodeAt(0) < 91 &&
              this.color === "white")
          ) {
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
      console.log(position);
      if (position[0] === boardSize || position[1] === boardSize) {
        break;
      } else {
        if (board[position[0]][position[1]] !== " ") {
          if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "white") ||
              (board[position[0]][position[1]].charCodeAt(0) < 91 &&
                this.color === "black")
          ) {
            break;
          } else if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "black") ||
            (board[position[0]][position[1]].charCodeAt(0) < 91 &&
              this.color === "white")
          ) {
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
      if (position[0] < 0 || position[1] === boardSize) {
        break;
      } else {
        if (board[position[0]][position[1]] !== " ") {
          if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "white") ||
              (board[position[0]][position[1]].charCodeAt(0) < 91 &&
                this.color === "black")
          ) {
            break;
          } else if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "black") ||
            (board[position[0]][position[1]].charCodeAt(0) < 91 &&
              this.color === "white")
          ) {
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
      if (position[0] === boardSize || position[1] < 0) {
        break;
      } else {
        if (board[position[0]][position[1]] !== " ") {
          if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "white") ||
              (board[position[0]][position[1]].charCodeAt(0) < 91 &&
                this.color === "black")
          ) {
            break;
          } else if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "black") ||
            (board[position[0]][position[1]].charCodeAt(0) < 91 &&
              this.color === "white")
          ) {
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

  GameTile.prototype._lanceMoves = function(board) {
    let result = [];
    let white = this.color === 'white';
    for (let i = 1; i < boardSize; i++) {
      let position = white ? [this.loc[0] - i, this.loc[1]] : [this.loc[0] + i, this.loc[1]];
      if (position[0] < 0 || position[0] === boardSize) {
        break;
      } else {
        if (board[position[0]][position[1]] !== " ") {
          if (
            position[0] < 0 ||
            ((board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "white") ||
              (board[position[0]][position[1]].charCodeAt(0) < 91 &&
                this.color === "black"))
          ) {
            break;
          } else if (
            (board[position[0]][position[1]].charCodeAt(0) > 90 &&
              this.color === "black") ||
            (board[position[0]][position[1]].charCodeAt(0) < 91 &&
              this.color === "white")
          ) {
            result.push(white ? [-i, 0] : [i, 0]);
            break;
          }
        } else {
          result.push(white ? [-i, 0] : [i, 0]);
        }
      }
    }
    return result;
  };

  export default GameTile;
