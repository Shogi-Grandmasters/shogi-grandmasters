import {moveSets, boardSize} from './constants.js';

class GameTile {
  constructor(name, color, loc, promotedName = null) {
    this.name = name;
    this.promotedName = promotedName;
    this.color = color;
    this.isPromoted = false;
    this.canPromote = false;
    this.loc = loc
    this.moves = [];

    if (name === "Rook" || name === "Bishop" ) {
      this.promotedMoves = moveSets[name];
    } else {
      this.moves = moveSets[name];
      if (name !== "King" && name !== "Gold") {
        this.promotedMoves = moveSets.Gold;
      }
    }
  }

  findMoves() {
    let moveSet = this.isPromoted ? this.promotedMoves.slice() : this.moves.slice();

    if (this.name === "Rook") {
      moveSet = moveSet.concat(this._rookMoves());
    } else if (this.name === "Bishop") {
      moveSet = moveSet.concat(this._bishopMoves());
    } else if (this.name === "Lance" && !this.isPromoted) {
      moveSet = this._lanceMoves();
    }

    if (this.color === 'black') {
      moveSet = moveSet.map((loc) => [-loc[0], -loc[1]]);
    }

    return (this.name === 'Lance' && !this.isPromoted) ?
      moveSet.reduce((set, move) => {
        let position = [this.loc + move[0], this.loc[1]];
        if (position[0] < boardSize && position[0] >= 0 &&
          ((position[0] < this.loc[0] && this.color === 'white') ||
          (postion[0] > this.loc[0] && this.color === 'black'))) {
            return set.concat([position]);
          }
        return set;
      }) :
      moveSet.reduce((set, move) => {
      let position = [this.loc[0] + move[0], this.loc[1] + move[1]];
      if (position[0] < boardSize && position[0] >= 0 && position[1] < boardSize && position[1] >= 0 && !(position[0] === this.loc[0] && position[1] === this.loc[1])) {
        return set.concat([position]);
      }
      return set;
    }, []);
  }

  setLocation(loc) {
    this.loc = loc;
    if (this.name === 'King' || this.name === 'Gold') {
      return;
    }
    if ((loc[0] < 3 && this.color === 'white') ||
      (loc[0] > boardSize - 4 && this.color === 'black')) {
      this.canPromote = true;
    }
  }

  promote() {
    this.isPromoted = true;
  }
}

GameTile.prototype._rookMoves = () => {
  let result = [];
  for (let i = 0; i < boardSize; i++) {
    result = result.concat([[i, 0], [-i, 0], [0, i], [0, -i]]);
  }
  return result;
};

GameTile.prototype._bishopMoves = () => {
  let result = [];
  for (let i = 0, j = 0; i < boardSize && j < boardSize; [i, j] = [i + 1, j + 1]) {
    result = result.concat([[i, j], [-i, -j], [-i, j], [i, -j]]);
  }
  return result;
};

GameTile.prototype._lanceMoves = () => {
  let result = [];
  for (let i = 1; i < boardSize; i++) {
    result.push([-i, 0]);
  }
  return result;
}

export default GameTile;
