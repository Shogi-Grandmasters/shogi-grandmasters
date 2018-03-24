import React from 'react';

const getTokenImage = (tile, facing) => {
  const prefix = facing === 'north' ? 'N-' : 'S-';
  const suffix = tile.isPromoted ? '-P' : '';
  return '../tokens/' + prefix + tile.name + suffix + '.svg';
}

const ShogiPiece = ({ inPlay = true, tile, player = null, location = null, target = null, activate }) => {
  let tileFaces = inPlay ? tile.color === player.color ? player.facing : 'south' : 'north';
  let canActivate = player && player.color === tile.color && location && target;
  let tileStyle = {
    backgroundImage: `url(${getTokenImage(tile, tileFaces)})`,
  };
  return (
    <div
      className="shogi__token"
      style={tileStyle}
      onClick={() => canActivate && activate(location, target)}
    >
      {tile.name}
    </div>
  )
}

export default ShogiPiece;