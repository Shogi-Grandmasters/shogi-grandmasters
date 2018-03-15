import React from 'react';
import { Component } from 'react';
import { boardIds } from '../../../lib/constants';
import GameTile from '../../../lib/GameTile';
import ShogiPiece from './ShogiPiece.jsx';
import PlayerPanel from './PlayerPanel.jsx';

import './ShogiBoard.css';

const copyMatrix = (matrix) => {
  return matrix.slice().map(row => row.slice());
}

const GridSpace = ({ coords, hints = [], selected = false, owned = false, piece = null, player, activate, movePiece }) => {
  let classNames = ['space'];
  let [x, y] = coords;
  let promotes = x < 3 ? 'white' : x > 5 ? 'black' : null;
  if ((y + 1) % 3 === 0 && y < 8) classNames.push('right-border');
  if ((x + 1) % 3 === 0 && x < 8) classNames.push('lower-border');
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
      onClick={() => isHint && movePiece([x, y])}
    >
      {piece ?
        <ShogiPiece
          coords={coords}
          tile={piece}
          player={player}
          isActive={selected}
          activate={activate}
        /> : ' ' }
    </td>
  );
}

class ShogiBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: props.board || [
        ['L', 'H', 'S', 'G', 'K', 'G', 'S', 'H', 'L'],
        [' ', 'R', ' ', ' ', ' ', ' ', ' ', 'B', ' '],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [' ', 'b', ' ', ' ', ' ', ' ', ' ', 'r', ' '],
        ['l', 'h', 's', 'g', 'k', 'g', 's', 'h', 'l']
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
    if (id.length > 1) id = id[1];
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
    let pieceAtCoords = this.state.board[x][y];
    if (pieceAtCoords.trim()) {
      return new GameTile(boardIds[pieceAtCoords], this.playerColorFromId(pieceAtCoords), [x, y], 'King Rat');
    }
    return null;
  }

  capture([x, y]) {
    // may need to change depending on socket events
    let pieceToCapture = this.state.board[x][y];
    let updatePlayer = {...this.state.player};

    pieceToCapture = this.state.player.color === 'white' ? pieceToCapture.toLowerCase() : pieceToCapture.toUpperCase();
    updatePlayer.hand = [...updatePlayer.hand, pieceToCapture];
    this.setState({
      player: updatePlayer,
    })
  }

  movePiece(coords) {
    if (this.state.selected) {
      let [fromX, fromY] = this.state.selected;
      let [toX, toY] = coords;
      if (this.getPiece(coords)) {
        this.capture(coords);
      }
      let pieceToMove = this.state.board[fromX][fromY];
      let updateBoard = this.state.board.slice().map(row => row.slice());
      updateBoard[fromX][fromY] = ' ';
      updateBoard[toX][toY] = pieceToMove;
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
    // TODO:  variant for player hand click
    if (this.state.selected) {
      let selectedPiece = this.getPiece(this.state.selected);
      // prune impossible moves
      let updateHints = selectedPiece.findMoves(this.state.board).reduce((moves, [x, y]) => {
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

    const boardStyle = {
      backgroundImage: `url(${'./textures/wood.jpg'})`
    }
    return(
      <div className="match">
        <PlayerPanel id={'opponent'} player={this.state.opponent} turn={!this.state.isTurn} />
        <table className="match__board" style={boardStyle}>
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
                      piece={cell.trim() ? new GameTile(boardIds[cell.toLowerCase()], this.playerColorFromId(cell), [ri, ci], 'Temp') : null}
                      player={this.state.player}
                      activate={this.togglePiece}
                      movePiece={this.movePiece}
                    />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <PlayerPanel id={'player'} player={this.state.player} turn={this.state.isTurn} />
      </div>
    )
  }
}

export default ShogiBoard;

