import React from 'react';

import './PlayerPanel.css';

const PlayerPanel = ({ player }) => {
  let indicatorStyles = ['player__color', player.color];
  return (
    <div className="player__profile">
      <div className={indicatorStyles.join(' ')}></div>
      <div className="player__name">{player.user.name}</div>
      <div className="player__stats">Rank: 42</div>
    </div>
  )
}

export default PlayerPanel;