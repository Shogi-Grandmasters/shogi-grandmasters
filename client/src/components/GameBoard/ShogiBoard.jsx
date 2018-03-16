import React from 'react';
import { Component } from 'react';
import { boardIds } from '../../../lib/constants';
import helpers from '../../../lib/boardHelpers';
import GameTile from '../../../lib/GameTile';
import ShogiPiece from './ShogiPiece.jsx';
import PlayerPanel from './PlayerPanel.jsx';

import './ShogiBoard.css';

const copyMatrix = (matrix) => {
  return matrix.slice().map(row => row.slice());
}

const GridSpace = ({ coords, hints = [], selected = null, owned = false, piece = null, player, activate, movePiece }) => {
  let classNames = ['space'];
  let [x, y] = coords;
  let promotes = x < 3 ? 'white' : x > 5 ? 'black' : null;
  if ((y + 1) % 3 === 0 && y < 8) classNames.push('right-border');
  if ((x + 1) % 3 === 0 && x < 8) classNames.push('lower-border');
  if (piece && owned) classNames.push('active');
  if (selected && selected.location === 'board' && selected.target[0] === x && selected.target[1] === y) {
    classNames.push('selected');
  }

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
          location="board"
          target={coords}
          tile={piece}
          player={player}
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
    this.localPlayer = this.localPlayer.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.removeFromHand = this.removeFromHand.bind(this);
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
    let pieceAtCoords = this.state.board[x][y];
    if (pieceAtCoords.trim()) {
      return new GameTile(boardIds[pieceAtCoords], this.playerColorFromId(pieceAtCoords), [x, y]);
    }
    return null;
  }

  // for after player refactor
  localPlayer() {
    return this.state.players.white.active ? this.state.players.white : this.state.players.black;
  }

  capture([x, y]) {
    let pieceToCapture = this.state.board[x][y];
    let updatePlayer = {...this.state.player};

    pieceToCapture = this.state.player.color === 'white' ? pieceToCapture.toLowerCase() : pieceToCapture.toUpperCase();
    updatePlayer.hand = [...updatePlayer.hand, pieceToCapture];
    this.setState({
      player: updatePlayer,
    })
  }

  removeFromHand(piece) {
    let updatePlayer = {...this.state.player};
    let updateHand = [...updatePlayer.hand];
    let removePoint = updateHand.indexOf(piece);
    updateHand.splice(removePoint, 1);
    updatePlayer.hand = updateHand;
    this.setState({
      player: updatePlayer,
    })
  }

  movePiece([x, y]) {
    if (this.state.selected) {
      let updateBoard = copyMatrix(this.state.board);
      let { location, target } = this.state.selected;

      if (location === 'board') {
        // board moves may result in a capture
        let [fromX, fromY] = target;
        if (this.getPiece([x, y])) {
          this.capture([x, y]);
        }
        let pieceToMove = this.state.board[fromX][fromY];
        updateBoard[fromX][fromY] = ' ';
        updateBoard[x][y] = pieceToMove;
      } else {
        let [playerColor, pieceToPlace] = target.split(':');
        // with drops, spot will always be empty
        updateBoard[x][y] = pieceToPlace;
        // decrement piece count in player hand based on target
        this.removeFromHand(pieceToPlace);
      }
      this.setState({
        board: updateBoard,
        hints: [],
        selected: null,
        isTurn: false,
      })
    }
  }

  togglePiece(location, target) {
    let updateSelected;
    let current = this.state.selected;

    // clicks on board sends [x, y]
    if (location === 'board') {
      let [incomingX, incomingY] = target;
      if (current && current.location === location) {
        // check for equality since same type
        let [currentX, currentY] = current.target;
        // unset if clicked on same loc x target
        updateSelected = incomingX === currentX && incomingY === currentY ? null : { location, target };
      } else {
        // overwrite if differing type or null
        updateSelected = { location, target };
      }
    // clicks on hand sends {color}:{piece} as ref
    } else {
      if (current && current.location === location) {
        updateSelected = target === current.target ? null : { location, target };
      } else {
        updateSelected = { location, target };
      }
    }
    // set or unset move hints
    this.setState({
      selected: updateSelected,
    }, () => this.toggleHints());
  }

  toggleHints() {
    console.log(this.state.selected);
    if (this.state.selected) {
      if (this.state.selected.location === 'board') {
        let selectedPiece = this.getPiece(this.state.selected.target);
        this.setState({
          hints: selectedPiece.findMoves(this.state.board),
        })
      } else {
        // placeholder
        let [playerColor, piece] = this.state.selected.target.split(':');
        // set up game tile
        let gameTile = new GameTile(boardIds[piece], playerColor, [10,10]);
        // run the canDrop() function for hints and set state
        let validLocations = helpers.validDropLocations(gameTile, this.state.board);
        this.setState({
          hints: validLocations,
        })
      }
    } else {
      this.setState({
        hints: [],
      })
    }
  }

  render() {
    const hints = this.state.hints;
    const playerColor = this.state.player.color;

    const boardStyle = {
      backgroundImage: `url(${'./textures/wood.jpg'})`
    }
    return(
      <div className="match">
        <PlayerPanel
          id={'opponent'}
          local={false}
          selected={this.state.selected}
          player={this.state.opponent}
          turn={!this.state.isTurn}
          activate={this.togglePiece}
        />
        <table className="match__board" style={boardStyle}>
          <tbody>
            {this.state.board.map((row, ri) => {
              return (
                <tr key={ri}>
                  {row.map((cell, ci) =>
                    <GridSpace
                      key={`${ri}x${ci}`}
                      selected={this.state.selected}
                      hints={hints}
                      owned={cell.trim() && this.state.player.color === this.playerColorFromId(cell)}
                      coords={[ri, ci]}
                      piece={cell.trim() ? new GameTile(boardIds[cell.toLowerCase()], this.playerColorFromId(cell), [ri, ci]) : null}
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
        <PlayerPanel
          id={'player'}
          local={true}
          selected={this.state.selected}
          player={this.state.player}
          turn={this.state.isTurn}
          activate={this.togglePiece}
        />
      </div>
    )
  }
}

export default ShogiBoard;

