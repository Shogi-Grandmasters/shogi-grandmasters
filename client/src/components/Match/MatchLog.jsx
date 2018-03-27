import React from 'react';
import ShogiPiece from './ShogiPiece.jsx';
import { boardIds } from '../../../lib/constants';
import GameTile from '../../../lib/GameTile';
import { FadeInGroup } from '../Global/Animation/TransitionGroups.jsx';

import './MatchLog.css';

const LogCapture = ({ color, capturedPiece }) => (
  <div className="match__log-item">
    <div className={`match__log-color ${color}`}></div>
    <div className="match__log-event">
      <h3>Captured</h3>
    </div>
    <div className="match__log-piece">
      <ShogiPiece
        inPlay={false}
        tile={capturedPiece}
      />
    </div>
  </div>
);

const LogPromote = ({ color, piece }) => {
  let before = new GameTile(boardIds[piece.toLowerCase()], color, [10,10], false);
  let after = new GameTile(boardIds[piece.toLowerCase()], color, [10,10], true);
  return (
    <div className="match__log-item">
      <div className={`match__log-color ${color}`}></div>
      <div className="match__log-piece">
        <ShogiPiece
          inPlay={false}
          tile={before}
        />
      </div>
      <div className="match__log-event">
        <span>to</span>
      </div>
      <div className="match__log-piece">
        <ShogiPiece
          inPlay={false}
          tile={after}
        />
      </div>
    </div>
  );
}

const LogMove = ({ color, moveType, notation }) => (
  <div className="match__log-item">
    <div className={`match__log-color ${color}`}></div>
    <div className="match__log-event">
      <h3>{moveType}</h3>
      <span>{notation}</span>
    </div>
  </div>
);

const MatchLog = ({ events }) => {
  return (
    <div className="match__log">
      <div></div>
      <div className="match__log-list">
        <div className="match__log-list-inner">
            {events.map((event, ei) => {
              let moveType = event.notation.indexOf('*') >= 0 ? 'Drop' : event.notation.indexOf('x') >= 0 ? 'Capture' : 'Move';
              let eventBreakout = [];
              eventBreakout.push(<LogMove key={`${ei}:${event.moveNumber}:movement`} color={event.move.color} moveType={moveType === 'Capture' ? 'Move' : moveType} notation={event.notation} />);
              moveType === 'Capture' && eventBreakout.push(<LogCapture key={`${ei}:${event.moveNumber}:capture`}color={event.move.color} capturedPiece={event.move.capturedPiece} />)
              event.move.didPromote && eventBreakout.push(<LogPromote key={`${ei}:${event.moveNumber}:promote`} color={event.move.color} piece={event.move.piece} />);
              return [...eventBreakout];
            })}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default MatchLog;