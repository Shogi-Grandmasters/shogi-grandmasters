import React from 'react';
import { boardIds } from '../../../lib/constants';
import { pieceNameFromBoardId } from '../../../lib/boardHelpers';
import GameTile from '../../../lib/GameTile';
import ShogiPiece from '../GameBoard/ShogiPiece.jsx';

const PlayerHandTile = ({ player, local, piece, count, selected = null, activate }) => {
  let tile = new GameTile(pieceNameFromBoardId(piece), player.color, [10, 10]);
  // set active hover for owned pieces
  let tileStyles = ['player__hand-tile', player.facing];
  local && tileStyles.push('active');

  // determine if it's selected
  if (selected && selected.location === 'hand') {
    let [playerColor, selectedPiece] = selected.target.split(':');
    pieceNameFromBoardId(selectedPiece) === tile.name && playerColor === tile.color && tileStyles.push('selected');
  }

  return (
    <div className={tileStyles.join(' ')}>
      <ShogiPiece
        key={`${piece}x${count}`}
        location="hand"
        target={`${player.color}:${piece}`}
        tile={new GameTile(pieceNameFromBoardId(piece), player.color, [10, 10])}
        player={player}
        local={local}
        activate={activate}
      />
      <div className="player__hand-count">{count}</div>
    </div>
  )
}

const PlayerHand = ({ player, hand, local, selected, activate }) => {
  hand = hand.reduce((counts, piece) => {
    counts[piece] = counts[piece] + 1 || 1;
    return counts;
  }, {})

  return (
    <div className="player__hand">
      {Object.entries(hand).map(([piece, count]) =>
        <PlayerHandTile
          key={`${player.color}:hand:${piece}`}
          local={local}
          player={player}
          piece={piece}
          count={count}
          selected={selected}
          activate={activate}
        />
      )}
    </div>
  )
}

export default PlayerHand;