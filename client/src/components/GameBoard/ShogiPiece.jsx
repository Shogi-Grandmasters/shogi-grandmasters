import React from 'react';

const getTokenImage = (tile, location, player) => {
  const prefix = location === 'board' ? tile.color === player.color ? 'N-' : 'S-' : player.facing === 'north' ? 'N-' : 'S-';
  const suffix = tile.isPromoted ? '-P' : '';
  return './tokens/' + prefix + tile.name + suffix + '.svg';
}

const ShogiPiece = ({ location, target, tile, player, activate }) => {
  let tileStyle = {
    backgroundImage: `url(${getTokenImage(tile, location, player)})`,
  };
  return (
    <div
      className="shogi__token"
      style={tileStyle}
      onClick={() => player.color === tile.color && activate(location, target)}
    >
      {tile.name}
    </div>
  )
}

export default ShogiPiece;