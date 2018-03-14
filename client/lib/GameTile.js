import {moveSets, boardSize} from './constants.js';

class GameTile {
  constructor(name, color, loc, promotedName = null) {
    this.name = name;
    this.promotedName = promotedName;
    this.color = color;
    this.isPromoted = false;
    this.canPromote = false;
    this.loc = loc

    if (name === "Rook" || name === "Bishop") {
      this.moves = [];
      this.promotedMoves = moveSets[name];
    } else {
      this.moves = moveSets[name];
      if (name !== "King" && name !== "Gold") {
        this.promotedMoves = moveSets.Gold;
      }
    }
  }

  findMoves() {
    let moveSet = this.isPromoted ? this.promotedMoves : this.moves;

    if (this.name === "Rook") {
      moveSet = moveSet.concat(this._rookMoves());
    } else if (this.name === "Bishop") {
      moveSet = moveSet.concat(this._bishopMoves());
    }

    if (this.color = 'black') {
      moveSet = moveSet.map((loc) => [-loc[0], -loc[1]]);
    }

    return moveSet.reduce((set, move) => {
      let position = [this.loc[0] + move[0], this.loc[1] + move[1]];
      if (position[0] < boardSize && position[0] >= 0 && position[1] < boardSize && position[1] >= 0 && !(position[0] === this.loc[0] && position[1] === this.loc[1])) {
        return set.concat([position]);
      }
      return set;
    }, []);
  }

  setLocation(loc) {
    this.loc = loc;
    if (loc[0] < 3 && !this.canPromote) {
      this.canPromote = true;
    }
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

export default GameTile;
