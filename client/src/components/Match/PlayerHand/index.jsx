import React from 'react';
import { boardIds } from '../../../../lib/constants';
import { pieceNameFromBoardId } from '../../../../lib/boardHelpers';
import GameTile from '../../../../lib/GameTile';
import ShogiPiece from '../../GameBoard/ShogiPiece.jsx';

import './PlayerHand.css';

const PlayerHandTile = ({ player, local, piece, set, count, selected = null, animate, activate }) => {
  let tile = new GameTile(pieceNameFromBoardId(piece), player.color, [10, 10]);
  // set active hover for owned pieces
  let tileStyles = ['player__hand-tile', player.facing];
  local && tileStyles.push('active');

  // determine if it's selected
  if (selected && selected.location === 'hand') {
    let [playerColor, selectedPiece] = selected.target.split(':');
    pieceNameFromBoardId(selectedPiece) === tile.name && playerColor === tile.color && tileStyles.push('selected');
  }

  if (animate && animate.type === 'drop') {
    let [playerColor, piece] = animate.from.split(':');
    if (playerColor === player.color && piece === piece) {
      tileStyles.push('blink__from');
    }
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
        set={set}
      />
      <div className="player__hand-count">{count}</div>
    </div>
  )
}

const PlayerHand = ({ player, hand, set, local, selected, activate, visibility, toggle }) => {
  hand = hand.reduce((counts, piece) => {
    counts[piece] = counts[piece] + 1 || 1;
    return counts;
  }, {})

  let playerHandStyles = ['player__hand-selection'];
  visibility ? playerHandStyles.push('shown') : playerHandStyles.push('hidden');
  local ? playerHandStyles.push('south') : playerHandStyles.push('north');

  return (
    <div className={`player__hand ${local ? 'south' : 'north'}`}>
      <div className="player__hand-menu">
        <a onClick={() => toggle(player.color)} className={`button__tab ${local ? 'south' : 'north' }`}>{local ? 'Your Hand' : 'Opponent\'s Hand'}</a>
      </div>
      <div className={playerHandStyles.join(' ')}>
        {Object.entries(hand).map(([piece, count]) =>
          <PlayerHandTile
            key={`${player.color}:hand:${piece}`}
            local={local}
            player={player}
            piece={piece}
            count={count}
            selected={selected}
            activate={activate}
            set={set}
          />
        )}
      </div>
    </div>
  )
}

export default PlayerHand;