import React from 'react';
import ShogiPiece from './ShogiPiece.jsx';

import './MatchLog.css';

const MatchLog = ({ events }) => {
  return (
    <div className="match__log">
      <div className="match__log-list">
      {events.reverse().map(event => (
        <div className="match__log-item">
          <div className={`player__color ${event.move.color}`}></div>
          <div>{event.moveNumber}</div>
          <div>{event.notation}</div>
        </div>
      ))}
      </div>
      <div className="match__actions">
        <button>Concede</button>
        <button>Quit</button>
      </div>
    </div>
  );
}

export default MatchLog;