import React from 'react';

import './PlayerPanel.css';

const {AVATAR_URL} = process.env;

const PlayerPanel = ({ player }) => {
  let avatarStyles = {
    backgroundImage: `url(${AVATAR_URL}/${player.user.avatar})`,
  }
  return (
    <div className={`player__profile-${player.facing}`}>
      <div className="player__name">{player.user.username}</div>
      <div className={`player__avatar player__avatar-${player.color}`} style={avatarStyles}></div>
    </div>
  )
}

export default PlayerPanel;
