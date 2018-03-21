import React from 'react';
import ShogiPiece from './ShogiPiece.jsx';

import './MatchLog.css';

const MatchLog = ({ events }) => {

  return (
    <div className="match__log">
      <div className="match__log-list">
        <div className="match__log-item">
          <div className="player__color black"></div>
          <div>Piece</div>
          <div>Move</div>
        </div>
      </div>
      <div className="match__actions">
        <button>Concede</button>
        <button>Quit</button>
      </div>
    </div>
  );
}

export default MatchLog;