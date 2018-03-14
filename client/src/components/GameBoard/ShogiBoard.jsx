import React from 'react';
import { Component } from 'react';

import './ShogiBoard.css';

const copyMatrix = (matrix) => {
  return matrix.slice().map(row => row.slice());
}

const GridSpace = ({ coords, selected = false, owned = false, piece = null, activate}) => {
  let classNames = ['space'];
  let [x, y] = coords;
  let promotes = x < 3 ? 'white' : x > 5 ? 'black' : null;
  if (promotes) classNames.push(`promote-${promotes}`);
  if (piece && owned) classNames.push('active');
  if (selected) classNames.push('selected'); // and remove active

  return (
    <td id={`${x}-${y}`} className={classNames.join(' ')} onClick={() => piece && owned && activate(coords)}>{piece || ' '}</td>
  );
}

const PlayerPanel = (props) => {

  return(
    <div></div>
  )
}

const

class ShogiBoard extends Component {
  // shogi board instances are initialized for only one player at a time

  constructor(props) {
    super(props);
    this.state = {
      board: props.board || [
        ['L', 'K', 'S', 'G', 'K', 'G', 'S', 'K', 'L'],
        [' ', 'R', ' ', ' ', ' ', ' ', ' ', 'B', ' '],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        [' ', 'b', ' ', ' ', ' ', ' ', ' ', 'r', ' '],
        ['l', 'k', 's', 'g', 'k', 'g', 's', 'k', 'l']
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
      isTurn: true,
    }
    this.togglePiece = this.togglePiece.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.reverseBoard = this.reverseBoard.bind(this);
  }

  componentDidMount() {
    if (this.state.player.color === 'black') {
      this.reverseBoard();
    }
  }

  reverseBoard() {
    let boardCopy = copyMatrix(this.state.board);
    boardCopy = boardCopy.reverse().map(row => row.reverse());
    this.setState({
      board: boardCopy,
    })
  }

  click(coords) {
    // has to be current player turn to care
    // is there a piece there?
      // is it mine?
        // no, treat as generic click
        // yes
          // active?  deselect
          //
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
        selected: null,
        isTurn: false,
      })
    }
  }

  togglePiece(coords) {
    let [incomingX, incomingY] = coords;
    let current = this.state.selected;
    let updateSelected = current ? incomingX === current[0] && incomingY === current[1] ? null : coords : coords;
    this.setState({
      selected: updateSelected,
    })
  }

  render() {
    const [selectedX, selectedY] = this.state.selected || [-1, -1];
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
                    owned={cell.trim() && cell.charCodeAt(0) > 90 ? playerColor === 'white' : playerColor === 'black'}
                    coords={[ri, ci]} piece={cell.trim() ? cell : null}
                    activate={this.togglePiece}
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

