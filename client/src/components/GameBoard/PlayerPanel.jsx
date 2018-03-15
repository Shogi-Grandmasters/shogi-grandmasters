import React from 'react';
import { boardIds } from '../../../lib/constants';
import GameTile from '../../../lib/GameTile';
import ShogiPiece from './ShogiPiece.jsx';

const PlayerHand = ({ player, selected, activate }) => {
  let hand = player.hand.reduce((counts, piece) => {
    counts[piece] = counts[piece] + 1 || 1;
    return counts;
  }, {})
  return (
    <div className="player__hand">
      {Object.entries(hand).map(([piece, count]) =>
        <div className="player__hand-tile">
          <ShogiPiece
            key={piece}
            coords={`${player.color}:${piece}`}
            tile={new GameTile(boardIds[piece], player.color, [10,10])}
            player={player}
            activate={activate}
          />
          <span className="player__hand-count">{count}</span>
        </div>
      )}
    </div>
  )
}

const PlayerPanel = ({ player, turn, selected, activate }) => (
  <div className="match__player">
    <h2>{player.user.name}</h2>
    <h4>{turn ? 'ACTIVE' : ''}</h4>
    <PlayerHand
      player={player}
      activate={activate}
    />
  </div>
);

export default PlayerPanel;