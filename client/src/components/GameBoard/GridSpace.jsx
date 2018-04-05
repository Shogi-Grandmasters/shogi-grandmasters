import React from 'react';
import ShogiPiece from './ShogiPiece.jsx';

const GridSpace = ({ coords, hints = [], selected = null, owned = false, piece = null, set, player, turn, activate, movePiece, animate}) => {
  let classNames = ['space'];
  let [x, y] = coords;
  let promotes = x < 3 ? 'white' : x > 5 ? 'black' : null;
  if ((y + 1) % 3 === 0 && y < 8) classNames.push('right-border');
  if ((x + 1) % 3 === 0 && x < 8) classNames.push('lower-border');
  if (piece && owned) classNames.push('active');
  if (selected && selected.location === 'board' && selected.target[0] === x && selected.target[1] === y) {
    classNames.push('selected');
  }
  // flashes from first, to second for move replay
  if (animate) {
    if (animate.type === 'board' && animate.from[0] === x && animate.from[1] === y) {
      classNames.push('blink__from');
    } else if ( animate.to[0] === x && animate.to[1] === y) {
      classNames.push('blink__to');
    }
  }

  let isHint = false;
  if (hints.length) {
    isHint = hints.some(([hintX, hintY]) => x === hintX && y === hintY);
    if (isHint) classNames.push('hinted');
  }

  return (
    <div
      id={`${x}-${y}`}
      className={classNames.join(' ')}
      onClick={() => isHint && turn && movePiece([x, y])}
    >
      {piece ?
        <ShogiPiece
          location="board"
          target={coords}
          tile={piece}
          player={player}
          activate={activate}
          set={set}
        /> : ' '}
    </div>
  );
}

export default GridSpace;