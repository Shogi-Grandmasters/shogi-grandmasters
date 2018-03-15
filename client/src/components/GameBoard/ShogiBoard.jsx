import React from 'react';
import { Component } from 'react';
import constants from '../../../lib/constants';
import GameTile from '../../../lib/GameTile';

import './ShogiBoard.css';

const copyMatrix = (matrix) => {
  return matrix.slice().map(row => row.slice());
}

const GridSpace = ({ coords, hints = [], selected = false, owned = false, piece = null, activate, movePiece }) => {
  let classNames = ['space'];
  let [x, y] = coords;
  let promotes = x < 3 ? 'white' : x > 5 ? 'black' : null;
  if (promotes) classNames.push(`promote-${promotes}`);
  if (piece && owned) classNames.push('active');
  if (selected) classNames.push('selected'); // and remove active

  let isHint = false;
  if (hints.length) {
    isHint = hints.some(([hintX, hintY]) => x === hintX && y === hintY);
    if (isHint) classNames.push('hinted');
  }

  return (
    <td
      id={`${x}-${y}`}
      className={classNames.join(' ')}
      onClick={() => {
        if (isHint) {
          movePiece([x, y]);
        } else if (piece && owned) {
          piece && owned && activate(coords);
        }
      }}
    >
      {piece.name || ' '}
    </td>
  );
}

class ShogiBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: props.board || [
        ['P', 'H', 'S', 'G', 'K', 'G', 'S', 'H', 'P'],
        [' ', 'R', ' ', ' ', ' ', ' ', ' ', 'B', ' '],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [' ', 'b', ' ', ' ', ' ', ' ', ' ', 'r', ' '],
        ['p', 'h', 's', 'g', 'k', 'g', 's', 'h', 'p']
      ],
      player: {
        user: {
          name: 'Player One',
        },
        color: 'white',
        hand: [],
      },
      opponent: {
        user: {
          name: 'Player Two'
        },
        color: 'black',
        hand: [],
      },
      selected: null,
      hints: [],
      isTurn: true,
    }
    this.togglePiece = this.togglePiece.bind(this);
    this.toggleHints = this.toggleHints.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.reverseBoard = this.reverseBoard.bind(this);
  }

  componentDidMount() {
    if (this.state.player.color === 'black') {
      this.reverseBoard();
    }
  }

  playerColorFromId(id) {
    return id.charCodeAt(0) > 90 ? 'white' : 'black';
  }

  reverseBoard() {
    let boardCopy = copyMatrix(this.state.board);
    boardCopy = boardCopy.reverse().map(row => row.reverse());
    this.setState({
      board: boardCopy,
    })
  }

  getPiece([x, y]) {
    // PLACEHOLDER
    let tempPiece = this.state.board[x][y];
    if (tempPiece.trim()) {
      let relativeMoves = [[-1, -1], [-1, 0], [-1, 1]];
      let possibleMoves = relativeMoves.map(([moveX, moveY]) => [x + moveX, y + moveY]);
      return {
        color: this.playerColorFromId(tempPiece),
        possibleMoves,
      }
    }
  }

  movePiece(coords) {
    // requires a selected piece

    // matches available moves based on moveset
    // cannot have other pieces blocking, unless piece movement == hop
    // initiates capture if destination is occupied by other team

    // get piece from selected in state
    if (this.state.selected) {
      // change this to a get / set
      let [fromX, fromY] = this.state.selected;
      let [toX, toY] = coords;
      let pieceToMove = this.state.board[fromX][fromY];
      let updateBoard = this.state.board.slice().map(row => row.slice());
      updateBoard[fromX][fromY] = ' ';
      updateBoard[toX][toY] = pieceToMove;
      // update board
      // deselect
      // transition turn
      this.setState({
        board: updateBoard,
        hints: [],
        selected: null,
        isTurn: false,
      })
    }
  }

  togglePiece(coords) {
    let [incomingX, incomingY] = coords;
    let current = this.state.selected;
    let updateSelected = current ? incomingX === current[0] && incomingY === current[1] ? null : coords : coords;

    // set or unset move hints
    this.setState({
      selected: updateSelected,
    }, () => this.toggleHints());
  }

  toggleHints() {
    if (this.state.selected) {
      let selectedPiece = this.getPiece(this.state.selected);
      // prune impossible moves
      let updateHints = selectedPiece.possibleMoves.reduce((moves, [x, y]) => {
        let inBounds = x >= 0 && x <= 8 && y >= 0 && y <= 8;
        if (inBounds) moves.push([x, y]);
        return moves;
      }, [])
      this.setState({
        hints: updateHints,
      })
    } else {
      this.setState({
        hints: [],
      })
    }
  }

  render() {
    const [selectedX, selectedY] = this.state.selected || [-1, -1];
    const hints = this.state.hints;
    const playerColor = this.state.player.color;

    return(
      <table>
        <tbody>
          {this.state.board.map((row, ri) => {
            return (
              <tr key={ri}>
                {row.map((cell, ci) =>
                  <GridSpace
                    key={`${ri}x${ci}`}
                    selected={ri === selectedX && ci === selectedY }
                    hints={hints}
                    owned={cell.trim() && this.state.player.color === this.playerColorFromId(cell)}
                    coords={[ri, ci]}
                    piece={cell.trim() ? new GameTile(constants.boardIds[cell.toLowerCase()], this.playerColorFromId(cell), [ri, ci], 'Sir Bae') : null}
                    activate={this.togglePiece}
                    movePiece={this.movePiece}
                  />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  }
}

export default ShogiBoard;

