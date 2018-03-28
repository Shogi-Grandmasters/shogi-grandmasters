import React, { Component } from 'react';
import {
  findKings,
  copyMatrix,
  reverseBoard } from '../../../lib/boardHelpers';

const isLocalUser = (player) => {
  let localId = localStorage.getItem('id');
  return localId === player.id;
}

export const MatchContext = React.createContext();

export class MatchProvider extends Component {
  constructor(props) {
    this.state = {
      matchId: this.props.match.matchId,
      board: this.props.match.board,
      players: {
        white: {
          user: this.props.match.white,
          facing: isLocalUser(this.props.match.white) ? 'north' : 'south',
        },
        black: {
          user: this.props.match.black,
          facing: isLocalUser(this.props.match.black) ? 'north' : 'south',
        }
      },
      local: isLocalUser(this.props.match.white) ? 'white' : 'black',
      hands: {
        white: this.props.match.hand_white,
        black: this.props.match.hand_black
      },
      kings: null,
      selected: null,
      moveHints: [],
      isTurn,
    }
    this.socket = this.props.socket;
    this.initialize();
  }

  initialize() {
    let updateBoard = this.state.local === 'black' ? reverseBoard(this.state.board) : copyMatrix(this.state.board);
    let kingPositions = findKings(this.state.board, this.state.local);
    let isTurn = this.props.match.turn ? this.state.local === 'black' : this.state.local === 'white';
    this.setState({
      board: updateBoard,
      kings: kingPositions,
      isTurn,
    }, () => console.log(`Match Context Initialized, ${this.state.players.white.user.name} vs. ${this.state.players.black.user.name}`))
  }

  render() {
    return (
      <MatchContext.Provider value={{ state: this.state }} >
        {this.props.children}
      </MatchContext.Provider>
    )
  }
}