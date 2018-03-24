import React from 'react';
import { Component } from 'react';

import { boardIds, oppositeBoardSide } from '../../../lib/constants';
import { validDropLocations, copyMatrix, reverseBoard } from '../../../lib/boardHelpers';
import GameTile from '../../../lib/GameTile';

import ShogiPiece from './ShogiPiece.jsx';
import GridSpace from './ShogiGridSpace.jsx';
import PlayerPanel from './PlayerPanel.jsx';
import PlayerHand from './PlayerHand.jsx';
import MatchLog from './MatchLog.jsx';
import TurnIndicator from './TurnIndicator.jsx';
import GameChat from './GameChat/index.jsx';
import ModalPrompt from '../Global/ModalPrompt.jsx';

import './ShogiBoard.css';

const playerColorFromId = (id) => {
  return id.charCodeAt(0) > 90 ? 'white' : 'black';
}

const getPiece = (board, [x, y]) => {
  let pieceAtCoords = board[x][y];
  if (pieceAtCoords.trim()) {
    let isPromoted = false;
    if (pieceAtCoords.length > 1) { isPromoted = true; pieceAtCoords = pieceAtCoords[0]; }
    return new GameTile(boardIds[pieceAtCoords.toLowerCase()], playerColorFromId(pieceAtCoords), [x, y], isPromoted);
  }
  return null;
}

const findKings = (board, playerColor) => {
  let white, black;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 'k') white = playerColor === 'white' ? [i, j] : [oppositeBoardSide(i), oppositeBoardSide(j)];
      if (board[i][j] === 'K') black = playerColor === 'black' ? [i, j] : [oppositeBoardSide(i), oppositeBoardSide(j)];
    }
  }
  return { white, black };
}

class ShogiBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchId: props.match.matchId,
      board: props.match.board || [
        ['L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L'],
        [' ', 'R', ' ', ' ', ' ', ' ', ' ', 'B', ' '],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', 'p+', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [' ', 'b', ' ', ' ', ' ', ' ', ' ', 'r', ' '],
        ['l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l']
      ],
      player: {
        user: { name: 'Player One' },
        color: 'white',
        facing: 'north',
        hand: [],
      },
      opponent: {
        user: { name: 'Player Two' },
        color: 'black',
        facing: 'south',
        hand: [],
      },
      kings: null,
      pendingMove: null,
      pendingDecision: false, // if true, cannot transition turn (doesn't do this yet)
      showModal: false,
      modalContent: null,
      selected: null,
      hints: [],
      isTurn: true,
      log: props.match.event_log || [],
    }
    this.socket = props.socket;

    this.initializeMatch = this.initializeMatch.bind(this);
    this.togglePiece = this.togglePiece.bind(this);
    this.toggleHints = this.toggleHints.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.commitMove = this.commitMove.bind(this);
    this.submitMove = this.submitMove.bind(this);
    this.receiveMove = this.receiveMove.bind(this);
    this.updateKings = this.updateKings.bind(this);
    this.moveWillPromote = this.moveWillPromote.bind(this);
    this.promptForPromote = this.promptForPromote.bind(this);
    this.confirmPromoteChoice = this.confirmPromoteChoice.bind(this);
    this.removeFromHand = this.removeFromHand.bind(this);
  }

  componentDidMount() {
    this.initializeMatch();
    this.socket.on("server.playerMove", this.receiveMove);
  }

  initializeMatch() {
    let localUser = localStorage.getItem('username');
    let updatePlayer = { ...this.state.player };
    let updateOpponent = { ...this.state.opponent };

    if (localUser === this.props.match.black) {
      updatePlayer = {
        user: {
          name: localUser,
        },
        color: 'black',
        facing: 'north',
        hand: this.props.match.hand_black || [],
      };
      updateOpponent = {
        user: {
          name: this.props.match.white,
        },
        color: 'white',
        facing: 'south',
        hand: this.props.match.hand_white || [],
      }
    } else {
      updatePlayer = {
        user: {
          name: localUser,
        },
        color: 'white',
        facing: 'north',
        hand: this.props.match.hand_white || [],
      };
      updateOpponent = {
        user: {
          name: this.props.match.black,
        },
        color: 'black',
        facing: 'south',
        hand: this.props.match.hand_black || [],
      }
    }
    let updateBoard = updatePlayer.color === 'black' ? reverseBoard(this.state.board) : copyMatrix(this.state.board);
    let kingPositions = findKings(this.state.board, updatePlayer.color);
    let isTurn = this.props.match.turn ? updatePlayer.color === 'black' : updatePlayer.color === 'white';

    this.setState({
      player: updatePlayer,
      opponent: updateOpponent,
      board: updateBoard,
      kings: kingPositions,
      isTurn,
    });
  }

  toggleModal(content = null) {
    this.setState(prevState => ({
      pendingDecision: !prevState.pendingDecision,
      showModal: !prevState.showModal,
      modalContent: content,
    }))
  }

  updateKings(color, coords) {
    let updateKings = {...this.state.kings};
    updateKings[color] = coords;
    this.setState({
      kings: updateKings,
    })
  }

  getPiece(board, [x, y]) {
    let pieceAtCoords = this.state.board[x][y];
    if (pieceAtCoords.trim()) {
      let isPromoted = false;
      if (pieceAtCoords.length > 1) { isPromoted = true; pieceAtCoords = pieceAtCoords[0]; }
      return new GameTile(boardIds[pieceAtCoords.toLowerCase()], playerColorFromId(pieceAtCoords), [x, y], isPromoted);
    }
    return null;
  }

  capture([x, y]) {
    let pieceToCapture = this.state.board[x][y];
    pieceToCapture = pieceToCapture[0];
    return this.state.player.color === 'white' ? pieceToCapture.toLowerCase() : pieceToCapture.toUpperCase();
  }

  removeFromHand(piece, hand) {
    let removePoint = hand.indexOf(piece);
    hand.splice(removePoint, 1);
    return hand;
  }

  confirmPromoteChoice(choice) {
    if (this.state.pendingMove) {
      let updateMove = {...this.state.pendingMove};
      if (choice) {
        let [x, y] = updateMove.move.to;
        updateMove.after.board[x][y] = updateMove.after.board[x][y] + '+';
      }
      updateMove.move.didPromote = choice;
      this.toggleModal();
      this.setState({
        pendingMove: updateMove,
      }, () => this.commitMove());
    }
  }

  promptForPromote(coords) {
    let choices = [
      {
        cta: 'Yes',
        action: this.confirmPromoteChoice,
        args: [true],
      },
      {
        cta: 'No',
        action: this.confirmPromoteChoice,
        args: [false],
      }
    ];
    let content = <ModalPrompt message="Promote?" choices={choices} />;
    this.toggleModal(content);
  }

  moveWillPromote(coords, pieceId) {
    let [x, y] = coords;
    let willPromote = false;
    let pendingInput = false;
    if (x < 3 && pieceId.length === 1) {
      // if it has no available moves, it has to promote
      let destination = new GameTile(boardIds[pieceId.toLowerCase()], playerColorFromId(pieceId), [x, y]);
      if (!destination.findMoves(this.state.board).length) willPromote = true;
      // if it wasn't forced to promote, and it's not a King or GG, which never promote
      // prompt user for choice.  with pending input, move will not be submitted until after
      // the prompt return functions are called
      if (!willPromote && !['King', 'Gold'].includes(boardIds[pieceId.toLowerCase()])) {
        pendingInput = true;
        this.promptForPromote(coords);
      }
    }
    return [willPromote, pendingInput];
  }

  movePiece([x, y]) {
    if (this.state.selected) {
      let { location, target } = this.state.selected;

      let action = {
        before: {
          board: copyMatrix(this.state.board),
          [this.state.player.color]: [...this.state.player.hand],
          [this.state.opponent.color]: [...this.state.opponent.hand],
          kings: {...this.state.kings},
        },
        after: {
          board: copyMatrix(this.state.board),
          [this.state.player.color]: [...this.state.player.hand],
          [this.state.opponent.color]: [...this.state.opponent.hand],
          kings: {...this.state.kings},
        },
        move: {
          color: this.state.player.color,
          from: location === 'board' ? [...target] : [10, 10],
          to: [x, y],
          didCapture: false,
        },
      };

      if (location === 'board') {
        let [fromX, fromY] = action.move.from;
        if (getPiece(this.state.board, [x, y])) {
          action.move.didCapture = true;
          action.move.capturedPiece = getPiece(this.state.board, [x, y]);
          action.after[this.state.player.color].push(this.capture([x, y]));
        }
        let pieceToMove = this.state.board[fromX][fromY];
        // some moves force promotion, if the piece has no valid moves remaining
        // the user is prompted if they have the choice, which sets a Pending state until that choice is made
        // the move is not submitted to the server until Pending is resolved
        let [willPromote, pendingChoice] = this.moveWillPromote([x, y], pieceToMove);
        action.move.isPending = pendingChoice;
        action.move.piece = pieceToMove;
        action.move.didPromote = willPromote && !pendingChoice ? true : false;
        // when moving a king, the king's movement is reflected to the opposite-side coords to consider the opponent's moves
        // kings may not be moved into check or checkmate conditions
        if (['k', 'K'].includes(pieceToMove)) action.after.kings[this.state.player.color] = [oppositeBoardSide(x), oppositBoardSite(y)];
        action.after.board[fromX][fromY] = ' ';
        action.after.board[x][y] = willPromote && !pendingChoice ? pieceToMove + '+' : pieceToMove;
      } else {
        // a "drop" move comes from the player's hand and cannot promote or capture
        // "drop" moves use a coordinate outside the board's bounds [10,10]
        let [playerColor, pieceToDrop] = target.split(':');
        action.move.piece = pieceToDrop;
        action.move.isPending = false;
        action.after.board[x][y] = pieceToDrop;
        action.after[this.state.player.color] = this.removeFromHand(pieceToDrop, action.after[this.state.player.color]);
      }

      this.setState({
        pendingDecision: action.move.isPending,
        pendingMove: action,
      }, () => !this.state.pendingDecision && this.commitMove());
    }
  }

  receiveMove({ log, status, before, after, move }) {
    if (!status.success) {
      console.warn(status.messages);
    }
    let { board, white, black, kings } = after;
    let updatePlayer = { ...this.state.player };
    updatePlayer.hand = updatePlayer.color === 'white' ? [...white] : [...black];
    let updateOpponent = { ...this.state.opponent };
    updateOpponent.hand = updateOpponent.color === 'white' ? [...white] : [...black];
    // boards are sent around from the perspective of each player, so
    // the board must be flipped around when the move received comes from the other player
    board = move.color === this.state.player.color ? board : reverseBoard(board);

    this.setState(prevState => ({
      board,
      player: updatePlayer,
      opponent: updateOpponent,
      kings,
      isTurn: !prevState.isTurn,
      hints: [],
      pendingMove: false,
      pendingDecision: false,
      selected: null,
      log
    }));
  }

  submitMove(matchId, before, after, move) {
    this.socket.emit("client.submitMove", {
      matchId,
      before,
      after,
      move
    })
  }

  commitMove() {
    if (this.state.pendingMove) {
      let { before, after, move } = this.state.pendingMove;
      // state is updated on the way back from the server
      this.submitMove(this.state.matchId, before, after, move);
    }
  }

  togglePiece(location, target) {
    let updateSelected;
    let current = this.state.selected;

    // clicks on board send [x, y]
    if (location === 'board') {
      let [incomingX, incomingY] = target;
      let piece = getPiece(this.state.board, target);
      if (current && current.location === location) {
        let [currentX, currentY] = current.target;
        updateSelected = incomingX === currentX && incomingY === currentY ? null : { location, target, piece };
      } else {
        updateSelected = { location, target, piece };
      }
    // clicks on hand sends {color}:{piece} as ref, like 'white:b'
    } else {
      let [playerColor, selectedPiece] = target.split(':');
      let piece = new GameTile(boardIds[selectedPiece], playerColor, [10,10], false);
      if (current && current.location === location) {
        updateSelected = target === current.target ? null : { location, target, piece };
      } else {
        updateSelected = { location, target, piece };
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
        let selectedPiece = getPiece(this.state.board, this.state.selected.target);
        this.setState({
          hints: selectedPiece.findMoves(this.state.board),
        });
      } else {
        let [playerColor, piece] = this.state.selected.target.split(':');
        let gameTile = new GameTile(boardIds[piece.toLowerCase()], playerColor, [10,10]);
        let validLocations = validDropLocations(this.state.board, this.state.kings, gameTile);
        this.setState({
          hints: validLocations,
        });
      }
    } else {
      this.setState({
        hints: [],
      })
    }
  }

  render() {
    const boardStyle = {
      backgroundImage: `url(${'../textures/wood.jpg'})`
    }
    const modal = this.state.showModal ? this.state.modalContent : null;

    return (
      <div className="match">
        <MatchLog events={this.state.log} />
        <div className="match__turn">
          <PlayerPanel player={this.state.opponent} />
          <TurnIndicator isTurn={this.state.isTurn} />
          <PlayerPanel player={this.state.player} />
        </div>
        <div>
          <div className="match__play">
            <div className="match__hand">
              <PlayerHand
                id={'opponent'}
                local={false}
                selected={this.state.selected}
                player={this.state.opponent}
                turn={!this.state.isTurn}
                activate={this.togglePiece}
              />
            </div>
            <div className="match__board">
              {this.state.board.map((row, ri) =>
                row.map((cell, ci) =>
                  <GridSpace
                    key={`${ri}x${ci}`}
                    selected={this.state.selected}
                    hints={this.state.hints}
                    owned={cell.trim() && this.state.player.color === playerColorFromId(cell)}
                    coords={[ri, ci]}
                    piece={cell.trim() ? new GameTile(boardIds[cell[0].toLowerCase()], playerColorFromId(cell), [ri, ci], cell.length > 1) : null}
                    player={this.state.player}
                    turn={this.state.isTurn}
                    activate={this.togglePiece}
                    movePiece={this.movePiece}
                  />
                ))}
            </div>
            <div className="match__hand">
              <PlayerHand
                id={'player'}
                local={true}
                selected={this.state.selected}
                player={this.state.player}
                turn={this.state.isTurn}
                activate={this.togglePiece}
              />
            </div>
          </div>
        </div>
        <div className="match__chat">
          <div></div>
          <GameChat socket={this.socket} />
          <div class="match__actions">
            <button>Concede</button>
            <button>Quit</button>
          </div>
        </div>
        { modal }
      </div>
    )
  }
}

export default ShogiBoard;

