import React from 'react';
import { boardIds, playerColorFromId } from '../../../lib/boardHelpers';
import GameTile from '../../../lib/GameTile';
import GridSpace from './GridSpace.jsx';

import './ShogiBoard.css';

const ShogiBoard = ({ board, selected, hints, player, isTurn, togglePiece, movePiece }) => (
  <div className="shogi__board">
    {board.map((row, ri) =>
      row.map((cell, ci) =>
        <GridSpace
          key={`${ri}x${ci}`}
          selected={selected}
          hints={hints}
          owned={cell.trim() && player.color === playerColorFromId(cell)}
          coords={[ri, ci]}
          piece={cell.trim() ? new GameTile(boardIds[cell[0].toLowerCase()], playerColorFromId(cell), [ri, ci], cell.length > 1) : null}
          player={player}
          turn={isTurn}
          activate={togglePiece}
          movePiece={movePiece}
        />
    ))}
  </div>
);

export default ShogiBoard;

