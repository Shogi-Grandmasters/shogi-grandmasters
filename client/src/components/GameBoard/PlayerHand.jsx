import React from 'react';
import { boardIds } from '../../../lib/constants';
import GameTile from '../../../lib/GameTile';
import ShogiPiece from './ShogiPiece.jsx';

const PlayerHandTile = ({ player, local, piece, count, selected, activate }) => {
  let tile = new GameTile(boardIds[piece.toLowerCase()], player.color, [10, 10]);
  // set active hover for owned pieces
  let tileStyles = ['player__hand-tile'];
  local && tileStyles.push('active');

  // determine if it's selected
  if (selected && selected.location === 'hand') {
    let [playerColor, selectedPiece] = selected.target.split(':');
    boardIds[selectedPiece] === tile.name && tileStyles.push('selected');
  }

  return (
    <div className={tileStyles.join(' ')}>
      <ShogiPiece
        key={`${piece}x${count}`}
        location="hand"
        target={`${player.color}:${piece}`}
        tile={new GameTile(boardIds[piece.toLowerCase()], player.color, [10, 10])}
        player={player}
        local={local}
        activate={activate}
      />
      <div className="player__hand-count">{count}</div>
    </div>
  )
}

const PlayerHand = ({ player, local, selected, activate }) => {
  let hand = player.hand.reduce((counts, piece) => {
    counts[piece] = counts[piece] + 1 || 1;
    return counts;
  }, {})

  let handStyles = ['player__hand'];
  local ? handStyles.push('north') : handStyles.push('south');
  return (
    <div className={handStyles.join(' ')}>
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