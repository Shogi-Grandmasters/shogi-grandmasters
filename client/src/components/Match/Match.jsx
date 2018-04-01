import React from 'react';
import { Component } from 'react';

import { boardIds, oppositeBoardSide } from '../../../lib/constants';
import {
  validDropLocations,
  copyMatrix,
  reverseBoard,
  findKings,
  gameTileAtCoords,
  playerColorFromId,
  pieceNameFromBoardId
} from '../../../lib/boardHelpers';
import GameTile from '../../../lib/GameTile';

import ShogiBoard from '../GameBoard/ShogiBoard.jsx';
import PlayerPanel from './PlayerPanel/index.jsx';
import PlayerHand from './PlayerHand/index.jsx';
import MatchLog from './MatchLog/index.jsx';
import TurnIndicator from './TurnIndicator/index.jsx';
import GameChat from './Chat/index.jsx';
import ModalPrompt from '../Global/Modals/Prompt/ModalPrompt.jsx';
import ModalMenu from '../Global/Modals/Menu/ModalMenu.jsx';

import './Match.css';

const isLocalPlayer = (player) => {
  return Number(localStorage.getItem('id')) === player.id;
}

class Match extends Component {
  constructor(props) {
    super(props);
    let { match } = props;
    this.state = {
      matchId: match.matchId,
      matchType: match.type,
      board: match.board || [
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
      players: {
        white: {
          user: match.white,
          facing: isLocalPlayer(match.white) ? 'north' : 'south',
          color: 'white' //holdover, todo: remediate player.color use
        },
        black: {
          user: match.black,
          facing: isLocalPlayer(match.black) ? 'north' : 'south',
          color: 'black'
        }
      },
      hands: {
        white: match.hand_white,
        black: match.hand_black,
      },
      localColor: isLocalPlayer(match.white) ? 'white' : 'black',
      opponentColor: isLocalPlayer(match.white) ? 'black' : 'white',
      kings: null,
      pendingMove: null,
      pendingDecision: false, // if true, cannot transition turn (doesn't do this yet)
      showModal: false,
      modalContent: null,
      selected: null,
      hints: [],
      isTurn: true,
      log: match.event_log || [],
      showMobileSidebar: null,
      showHandWhite: false,
      showHandBlack: false,
    }
    this.socket = props.socket;

    this.initializeMatch = this.initializeMatch.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.togglePiece = this.togglePiece.bind(this);
    this.toggleHints = this.toggleHints.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleMobile = this.toggleMobile.bind(this);
    this.toggleHand = this.toggleHand.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.commitMove = this.commitMove.bind(this);
    this.submitMove = this.submitMove.bind(this);
    this.receiveMove = this.receiveMove.bind(this);
    this.updateKings = this.updateKings.bind(this);
    this.moveWillPromote = this.moveWillPromote.bind(this);
    this.promptForPromote = this.promptForPromote.bind(this);
    this.confirmPromoteChoice = this.confirmPromoteChoice.bind(this);
    this.promptToConcede = this.promptToConcede.bind(this);
    this.confirmConcedeChoice = this.confirmConcedeChoice.bind(this);
    this.concludeMatch = this.concludeMatch.bind(this);
    this.quit = this.quit.bind(this);
    this.removeFromHand = this.removeFromHand.bind(this);
  }

  componentDidMount() {
    this.initializeMatch();
    this.socket.on("server.playerMove", this.receiveMove);
    this.socket.on("server.concludeMatch", this.concludeMatch);
  }

  initializeMatch() {
    let updateBoard = this.state.localColor === 'black' ? reverseBoard(this.state.board) : copyMatrix(this.state.board);
    let kingPositions = findKings(this.state.board, this.state.localColor);
    let isTurn = this.props.match.turn ? this.state.localColor === 'black' : this.state.localColor === 'white';

    this.setState({
      board: updateBoard,
      kings: kingPositions,
      isTurn,
    });
  }

  getPlayer(which = 'local') {
    return which === 'opponent' ? this.state.players[this.state.opponentColor] : this.state.players[this.state.localColor];
  }

  toggleMenu() {
    let choices = [
      {
        cta: 'Concede',
        action: this.promptToConcede,
        args: [],
      },
      {
        cta: 'Quit Match',
        action: this.quit,
        args: [],
      }
    ];
    let content = <ModalMenu headline="Game Menu" choices={choices} close={this.toggleModal} />;
    this.toggleModal(content)
  }

  toggleModal(content = null) {
    this.setState(prevState => ({
      pendingDecision: content ? prevState.pendingDecision : false,
      showModal: content ? true : false,
      modalContent: content,
    }))
  }

  updateKings(color, coords) {
    let updateKings = { ...this.state.kings };
    updateKings[color] = coords;
    this.setState({
      kings: updateKings,
    })
  }

  capture([x, y]) {
    let pieceToCapture = this.state.board[x][y];
    pieceToCapture = pieceToCapture[0];
    return this.state.localColor === 'white' ? pieceToCapture.toLowerCase() : pieceToCapture.toUpperCase();
  }

  removeFromHand(piece, hand) {
    let removePoint = hand.indexOf(piece);
    hand.splice(removePoint, 1);
    return hand;
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
    let content = <ModalPrompt headline="Promote?" choices={choices} />;
    this.toggleModal(content);
  }

  confirmPromoteChoice(choice) {
    if (this.state.pendingMove) {
      let updateMove = { ...this.state.pendingMove };
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

  promptToConcede() {
    let choices = [
      {
        cta: 'Yes',
        action: this.confirmConcedeChoice,
        args: [true],
      },
      {
        cta: 'No',
        action: this.confirmConcedeChoice,
        args: [false],
      }
    ];
    let content = <ModalPrompt headline="Are you sure you want to concede?" choices={choices} />;
    this.toggleModal(content);
  }

  confirmConcedeChoice(choice) {
    if (choice) {
      let winner = this.getPlayer('opponent').user;
      let loser = this.getPlayer('local').user;
      this.socket.emit("client.endGame", {
        matchId: this.state.matchId,
        winner,
        loser,
        status: 2,
        type: this.state.matchType,
      });
    }
    this.toggleModal();
  }

  moveWillPromote([fromX, fromY], [toX, toY], pieceId) {
    let willPromote = false;
    let pendingInput = false;
    // if moving to the promotion zone, or moving from the promotion zone
    if (toX < 3 && pieceId.length === 1 || fromX < 3 && pieceId.length === 1) {
      // if it has no available moves, it has to promote
      let destination = new GameTile(pieceNameFromBoardId(pieceId), playerColorFromId(pieceId), [toX, toY]);
      if (!destination.findMoves(this.state.board).length) willPromote = true;
      // if it wasn't forced to promote, and it's not a King or GG, which never promote
      // prompt user for choice.  with pending input, move will not be submitted until after
      // the prompt return functions are called
      if (!willPromote && !['King', 'Gold'].includes(pieceNameFromBoardId(pieceId))) {
        pendingInput = true;
        this.promptForPromote([toX, toY]);
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
          white: [...this.state.hands.white],
          black: [...this.state.hands.black],
          kings: { ...this.state.kings },
        },
        after: {
          board: copyMatrix(this.state.board),
          white: [...this.state.hands.white],
          black: [...this.state.hands.black],
          kings: { ...this.state.kings },
        },
        move: {
          color: this.state.localColor,
          from: location === 'board' ? [...target] : [10, 10],
          to: [x, y],
          didCapture: false,
        },
      };

      if (location === 'board') {
        let [fromX, fromY] = action.move.from;
        if (gameTileAtCoords(this.state.board, [x, y])) {
          action.move.didCapture = true;
          action.move.capturedPiece = gameTileAtCoords(this.state.board, [x, y]);
          action.after[this.state.localColor].push(this.capture([x, y]));
        }
        let pieceToMove = this.state.board[fromX][fromY];
        // some moves force promotion, if the piece has no valid moves remaining
        // the user is prompted if they have the choice, which sets a Pending state until that choice is made
        // the move is not submitted to the server until Pending is resolved
        let [willPromote, pendingChoice] = this.moveWillPromote([fromX, fromY], [x, y], pieceToMove);
        action.move.isPending = pendingChoice;
        action.move.piece = pieceToMove;
        action.move.didPromote = willPromote && !pendingChoice ? true : false;
        // when moving a king, the king's movement is reflected to the opposite-side coords to consider the opponent's moves
        // kings may not be moved into check or checkmate conditions
        if (['k', 'K'].includes(pieceToMove)) action.after.kings[this.state.localColor] = [oppositeBoardSide(x), oppositeBoardSide(y)];
        action.after.board[fromX][fromY] = ' ';
        action.after.board[x][y] = willPromote && !pendingChoice ? pieceToMove + '+' : pieceToMove;
      } else {
        // a "drop" move comes from the player's hand and cannot promote or capture
        // "drop" moves use a coordinate outside the board's bounds [10,10]
        let [playerColor, pieceToDrop] = target.split(':');
        action.move.piece = pieceToDrop;
        action.move.isPending = false;
        action.after.board[x][y] = pieceToDrop;
        action.after[this.state.localColor] = this.removeFromHand(pieceToDrop, action.after[this.state.localColor]);
      }

      this.setState({
        pendingDecision: action.move.isPending,
        pendingMove: action,
      }, () => !this.state.pendingDecision && this.commitMove());
    }
  }

  receiveMove({ log, status, before, after, move }) {
    if (status.checkmate) {
      let winner = move.color === this.state.localColor ? this.getPlayer('local').user : this.getPlayer('opponent').user;
      let loser = move.color === this.state.localColor ?  this.getPlayer('opponent').user : this.getPlayer('local').user;
      if (winner.id === this.getPlayer('local').user.id) {
        this.socket.emit("client.endGame", {
          matchId: this.state.matchId,
          winner,
          loser,
          status: 1,
          type: this.state.matchType,
        });
      }
    } else if (status.check) {
      let message = move.color === this.state.localColor ? 'Your Opponent is in Check' : 'You are in Check';
      this.announce(message);
    }
    let { board, white, black, kings } = after;
    // boards are sent around from the perspective of each player, so
    // the board must be flipped around when the move received comes from the other player
    board = move.color === this.state.localColor ? board : reverseBoard(board);
    let hands = {
      white,
      black
    }

    this.setState(prevState => ({
      board,
      hands,
      kings,
      isTurn: !prevState.isTurn,
      hints: [],
      pendingMove: false,
      pendingDecision: false,
      selected: null,
      log
    }));
  }

  announce(message) {
    let choices = [{
      cta: 'OK',
      action: this.toggleModal,
      args: [null]
    }]
    let content = <ModalPrompt headline={message} choices={choices} />;
    this.toggleModal(content);
  }

  concludeMatch({ winner, loser, status }) {
    let headline = winner.id === this.getPlayer('local').user.id ? 'YOU WIN' : 'YOU LOSE';
    let subheadline = status === 1 ? 'Checkmate' : winner.id === this.getPlayer('local').user.id ? 'Your opponent conceded the match' : 'You gave up. Quitter.';
    let choices = [{
      cta: 'EXIT',
      action: this.quit,
      args: [true],
    }];
    let content = <ModalPrompt headline={headline} subheadline={subheadline} choices={choices} />
    this.toggleModal(content);
  }

  submitMove(matchId, before, after, move) {
    this.socket.emit("client.submitMove", {
      matchId,
      before,
      after,
      move,
      previous: this.state.log[this.state.log.length - 1]
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
      let piece = gameTileAtCoords(this.state.board, target);
      if (current && current.location === location) {
        let [currentX, currentY] = current.target;
        updateSelected = incomingX === currentX && incomingY === currentY ? null : { location, target, piece };
      } else {
        updateSelected = { location, target, piece };
      }
      // clicks on hand sends {color}:{piece} as ref, like 'white:b'
    } else {
      let [playerColor, selectedPiece] = target.split(':');
      let piece = new GameTile(pieceNameFromBoardId(selectedPiece), playerColor, [10, 10], false);
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
        let selectedPiece = gameTileAtCoords(this.state.board, this.state.selected.target);
        this.setState({
          hints: selectedPiece.findMoves(this.state.board),
        });
      } else {
        let [playerColor, piece] = this.state.selected.target.split(':');
        let gameTile = new GameTile(pieceNameFromBoardId(piece), playerColor, [10, 10]);
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

  toggleMobile(target) {
    let updateVisible = target === this.state.showMobileSidebar ? null : target;
    this.setState({
      showMobileSidebar: updateVisible,
    })
  }

  toggleHand(color) {
    if (color === 'white') {
      let updateHandVisiblity = !this.state.showHandWhite;
      this.setState({
        showHandWhite: updateHandVisiblity,
      })
    } else if (color === 'black') {
      let updateHandVisiblity = !this.state.showHandBlack;
      this.setState({
        showHandBlack: updateHandVisiblity,
      })
    }
  }

  quit() {
    this.socket.close();
    this.props.history.replace({
      pathname: `/home`,
      history: this.props.history
    });
  }

  render() {
    const modal = this.state.showModal ? this.state.modalContent : null;

    return (
      <div className="match">
        <MatchLog events={this.state.log} visibility={this.state.showMobileSidebar === 'log'} toggle={this.toggleMobile}/>
        <GameChat socket={this.socket} visibility={this.state.showMobileSidebar === 'chat'} toggle={this.toggleMobile} />
        <div className="match__play">
          <div className="match__turn">
            <PlayerPanel player={this.getPlayer('opponent')} />
            <TurnIndicator isTurn={this.state.isTurn} />
            <PlayerPanel player={this.getPlayer('local')} />
          </div>
          <div className="match__board">
            <div className="match__hand north">
              <PlayerHand
                id={'opponent'}
                local={false}
                selected={this.state.selected}
                player={this.getPlayer('opponent')}
                hand={this.state.hands[this.state.opponentColor]}
                turn={!this.state.isTurn}
                activate={this.togglePiece}
                visibility={this.getPlayer('opponent').color === 'black' ? this.state.showHandBlack : this.state.showHandWhite}
                toggle={this.toggleHand}
              />
            </div>
            <ShogiBoard
              board={this.state.board}
              selected={this.state.selected}
              hints={this.state.hints}
              player={this.getPlayer('local')}
              isTurn={this.state.isTurn}
              togglePiece={this.togglePiece}
              movePiece={this.movePiece}
            />
            <div className="match__hand south">
              <PlayerHand
                id={'player'}
                local={true}
                selected={this.state.selected}
                player={this.getPlayer('local')}
                hand={this.state.hands[this.state.localColor]}
                turn={this.state.isTurn}
                activate={this.togglePiece}
                visibility={this.getPlayer('local').color === 'black' ? this.state.showHandBlack : this.state.showHandWhite}
                toggle={this.toggleHand}
              />
            </div>
          </div>
          <div className="match__actions">
            <a className="match__action-left mobile"onClick={() => this.toggleMobile('log')}>Log</a>
            <a className="match__action-menu mobile" onClick={() => this.toggleMenu()}>Menu</a>
            <a className="match__action-right mobile" onClick={() => this.toggleMobile('chat')}>Chat</a>
            <a className="match__action-menu desktop" onClick={() => this.promptToConcede()}>Concede</a>
            <a className="match__action-menu desktop" onClick={() => this.quit()}>Quit</a>
          </div>
        </div>
        {modal}
      </div>
    )
  }
}

export default Match;

