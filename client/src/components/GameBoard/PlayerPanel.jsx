import React from 'react';
import { boardIds } from '../../../lib/constants';
import GameTile from '../../../lib/GameTile';
import ShogiPiece from './ShogiPiece.jsx';

const PlayerHand = ({ player, local, selected, activate }) => {
  let hand = player.hand.reduce((counts, piece) => {
    counts[piece] = counts[piece] + 1 || 1;
    return counts;
  }, {})
  let tileStyles = ['player__hand-tile'];
  if (local) tileStyles.push('active');
  return (
    <div className="player__hand">
      {Object.entries(hand).map(([piece, count]) =>
        <div className={tileStyles.join(' ')}>
          <ShogiPiece
            key={piece}
            coords={`${player.color}:${piece}`}
            tile={new GameTile(boardIds[piece], player.color, [10,10])}
            player={player}
            activate={activate}
          />
          <div className="player__hand-count">{count}</div>
        </div>
      )}
    </div>
  )
}

const PlayerPanel = ({ player, local, turn, selected, activate }) => (
  <div className="match__player">
    <div className="player__profile">
      <h2>{player.user.name}</h2>
    </div>
    <PlayerHand
      player={player}
      local={local}
      selected={selected}
      activate={activate}
    />
  </div>
);

export default PlayerPanel;