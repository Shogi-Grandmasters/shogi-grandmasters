import React from 'react';
import { Component } from 'react';

import { boardIds } from '../../../lib/constants';
import helpers from '../../../lib/boardHelpers';

import GameTile from '../../../lib/GameTile';
import ShogiPiece from './ShogiPiece.jsx';
import PlayerPanel from './PlayerPanel.jsx';
import PlayerHand from './PlayerHand.jsx';
import ModalPrompt from '../Global/ModalPrompt.jsx';
import TurnIndicator from './TurnIndicator.jsx';

import './ShogiBoard.css';

const copyMatrix = (matrix) => {
  return matrix.slice().map(row => row.slice());
}

const findKings = (board) => {
  let white, black;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 'k') white = [i, j];
      if (board[i][j] === 'K') black = [i, j];
    }
  }
  return { white, black };
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
          name: 'Ocheyo',
        },
        color: 'white',
        hand: [],
      },
      opponent: {
        user: {
          name: 'rgonewildplus'
        },
        color: 'black',
        hand: [],
      },
      kings: null,
      pendingDecision: false, // if true, cannot transition turn (doesn't do this yet)
      showModal: false,
      modalContent: null,
      selected: null,
      hints: [],
      isTurn: true,
    }
    this.togglePiece = this.togglePiece.bind(this);
    this.toggleHints = this.toggleHints.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.updateKings = this.updateKings.bind(this);
    this.checkPromotion = this.checkPromotion.bind(this);
    this.promptForPromote = this.promptForPromote.bind(this);
    this.promotePiece = this.promotePiece.bind(this);
    this.removeFromHand = this.removeFromHand.bind(this);
    this.reverseBoard = this.reverseBoard.bind(this);
  }

  componentDidMount() {
    // roll this into an init()
    //   set players
    //   render board
    //   find kings
    if (this.state.player.color === 'black') {
      this.reverseBoard();
    }
    let kingPositions = findKings(this.state.board);
    this.setState({
      kings: kingPositions,
    });
  }

  toggleModal(content = null) {
    this.setState(prevState => ({
      pendingDecision: !prevState.pendingDecision,
      showModal: !prevState.showModal,
      modalContent: content,
    }))
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

  updateKings(color, coords) {
    let updateKings = {...this.state.kings};
    updateKings[color] = coords;
    this.setState({
      kings: updateKings,
    })
  }

  getPiece([x, y]) {
    let pieceAtCoords = this.state.board[x][y];
    if (pieceAtCoords.trim()) {
      let isPromoted = false;
      if (pieceAtCoords.length > 1) { isPromoted = true; pieceAtCoords = pieceAtCoords[0]; }
      return new GameTile(boardIds[pieceAtCoords], this.playerColorFromId(pieceAtCoords), [x, y], isPromoted);
    }
    return null;
  }

  capture([x, y]) {
    let pieceToCapture = this.state.board[x][y];
    let updatePlayer = {...this.state.player};
    pieceToCapture = pieceToCapture[0]; // removes promoted state, if present
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

  promotePiece([x, y], fromPrompt = false) {
    let updateBoard = copyMatrix(this.state.board);
    let pieceId = updateBoard[x][y];
    pieceId = pieceId.trim() && pieceId.length === 1 ? pieceId + '+' : pieceId;
    updateBoard[x][y] = pieceId;
    if (fromPrompt) {
      this.toggleModal();
    }
    this.setState({
      board: updateBoard,
    });
  }

  promptForPromote(coords) {
    let choices = [
      {
        cta: 'Yes',
        action: this.promotePiece,
        args: [coords, true],
      },
      {
        cta: 'No',
        action: this.toggleModal,
        args: [null],
      }
    ];
    let content = <ModalPrompt message="Promote?" choices={choices} />;
    this.toggleModal(content);
  }

  checkPromotion(coords, pieceId) {
    let [x, y] = coords;
    if (x < 3 && pieceId.length === 1) {
      let willPromote = false;
      // if it has no available moves, it has to promote
      let destination = new GameTile(boardIds[pieceId], this.playerColorFromId(pieceId), [x, y]);
      if (!destination.findMoves(this.state.board).length) willPromote = true;

      if (!willPromote && !['King', 'Gold'].includes(boardIds[pieceId])) {
        // prompt user for choice
        this.promptForPromote(coords);
      }
      pieceId = willPromote ? pieceId + '+' : pieceId;
    }
    return pieceId;
  }

  movePiece([x, y]) {
    if (this.state.selected) {
      let updateBoard = copyMatrix(this.state.board);
      let { location, target } = this.state.selected;

      if (location === 'board') {
        let [fromX, fromY] = target;
        // movement on the board may result in a capture
        if (this.getPiece([x, y])) {
          this.capture([x, y]);
        }
        let pieceToMove = this.state.board[fromX][fromY];
        pieceToMove = this.checkPromotion([x, y], pieceToMove);
        updateBoard[fromX][fromY] = ' ';
        updateBoard[x][y] = pieceToMove;
        // update kings in state
        if (['k', 'K'].includes(pieceToMove)) this.updateKings(this.playerColorFromId(pieceToMove), [x, y]);
      } else {
        let [playerColor, pieceToPlace] = target.split(':');
        // spot can be trusted to be empty based on hints logic
        updateBoard[x][y] = pieceToPlace;
        this.removeFromHand(pieceToPlace);
      }
      // send move
      // check for OK, compare updateBoard to board returned from socket as a double check
      // animate, then transition turn
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
    if (this.state.selected) {
      if (this.state.selected.location === 'board') {
        let selectedPiece = this.getPiece(this.state.selected.target);
        this.setState({
          hints: selectedPiece.findMoves(this.state.board),
        })
      } else {
        let [playerColor, piece] = this.state.selected.target.split(':');
        let gameTile = new GameTile(boardIds[piece], playerColor, [10,10]);
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

    const modal = this.state.showModal ? this.state.modalContent : null;

    return(
      <div className="match">
        <div className="match__timer">
          <PlayerPanel
            player={this.state.opponent}
          />
          <TurnIndicator isTurn={this.state.isTurn} />
          <PlayerPanel
            player={this.state.player}
          />
        </div>
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
                      piece={cell.trim() ? new GameTile(boardIds[cell[0].toLowerCase()], this.playerColorFromId(cell), [ri, ci], cell.length > 1) : null}
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
        <div className="match__hands">
          <PlayerHand
            id={'opponent'}
            local={false}
            selected={this.state.selected}
            player={this.state.opponent}
            turn={!this.state.isTurn}
            activate={this.togglePiece}
          />
          <PlayerHand
            id={'player'}
            local={true}
            selected={this.state.selected}
            player={this.state.player}
            turn={this.state.isTurn}
            activate={this.togglePiece}
          />
        </div>
        { modal }
      </div>
    )
  }
}

export default ShogiBoard;

