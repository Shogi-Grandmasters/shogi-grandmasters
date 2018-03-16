import React from 'react';

const getTokenImage = (tile, player) => {
  const prefix = tile.color === player.color ? 'N-' : 'S-';
  const suffix = tile.isPromoted ? '-P' : '';
  return './tokens/' + prefix + tile.name + suffix + '.svg';
}

const ShogiPiece = ({ location, target, tile, player, activate }) => {
  let tileStyle = {
    backgroundImage: `url(${getTokenImage(tile, player)})`,
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