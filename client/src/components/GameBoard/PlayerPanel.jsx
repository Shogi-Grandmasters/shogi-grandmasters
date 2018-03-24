import React from 'react';

import './PlayerPanel.css';

const PlayerPanel = ({ player }) => {
  return (
    <div className={`player__profile-${player.facing}`}>
      <div className="player__name">{player.user.name}</div>
      <div className={`player__avatar player__avatar-${player.color}`}></div>
    </div>
  )
}

export default PlayerPanel;