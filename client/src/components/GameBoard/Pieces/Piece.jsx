import React from 'react';
import Sets from './sets';

const Piece = ({ setId, piece, facing = 'north', color = 'white', promoted = false }) => {
  let colorThemes = {
    white: {
      fill: '#eee',
      stroke: '#DDD',
      strokeWidth: '2px',
      text: '#000',
      promoted: '#FF0000',
    },
    black: {
      fill: '#333',
      stroke: '#111',
      strokeWidth: '2px',
      text: '#eee',
      promoted: '#FF0000',
    }
  }
  let palette = colorThemes[color];
  let setPiece = new Sets[setId](palette, piece);
  let rotation = `facing-${facing}`;
  let glyph = promoted ? setPiece.promoted : setPiece.default;

  return (
    <svg viewBox="0 0 47.48 56.47" className={rotation}>
      <g id="Token">
        <polygon points="1.17 54.22 45.88 54.22 38.34 5.04 23.58 1.04 8.74 5.01 1.17 54.22" style={{ fill: palette.fill, stroke: palette.stroke, miterLimit: 10, strokeWidth: palette.strokeWidth }} />
      </g>
      {glyph}
    </svg>
  );
}

export default Piece;