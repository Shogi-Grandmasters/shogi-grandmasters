import React from 'react';
import Piece from './Pieces/Piece.jsx';

const getTokenImage = (tile, facing) => {
  const prefix = facing === 'north' ? 'N-' : 'S-';
  const suffix = tile.isPromoted ? '-P' : '';
  return '../tokens/' + prefix + tile.name + suffix + '.svg';
}

const ShogiPiece = ({ inPlay = true, tile, set, player = null, local = true, location = null, target = null, activate }) => {
  let tileFaces = inPlay ? tile.color === player.color ? player.facing : 'south' : 'north';
  let canActivate = local && player && player.color === tile.color && location && target;
  let tileStyle = {
    backgroundImage: `url(${getTokenImage(tile, tileFaces)})`,
  };
  return (
    <a
      className="shogi__token"
      onClick={() => canActivate && activate(location, target)}
    >
      <Piece setId={set} piece={tile.name} facing={tileFaces} color={tile.color} promoted={tile.isPromoted} />
    </a>
  )
}

export default ShogiPiece;