import React from 'react';
import ShogiPiece from '../../GameBoard/ShogiPiece.jsx';
import { boardIds } from '../../../../lib/constants';
import { pieceNameFromBoardId } from '../../../../lib/boardHelpers';
import GameTile from '../../../../lib/GameTile';
import { FadeInGroup } from '../../Global/Animation/TransitionGroups.jsx';

import './MatchLog.css';

const LogCheck = ({ color, check, checkmate }) => (
  <div className={`match__log-item ${checkmate ? 'alert' : 'warning'}`}>
    <div className={`match__log-color ${color}`}></div>
    <div className="match__log-event">
      <h3>{checkmate ? 'CHECKMATE' : `${color === 'white' ? 'BLACK' : 'WHITE'} IS IN CHECK`}</h3>
    </div>
  </div>
);

const LogCapture = ({ set, color, capturedPiece }) => (
  <div className="match__log-item">
    <div className={`match__log-color ${color}`}></div>
    <div className="match__log-piece">
      <ShogiPiece
        inPlay={false}
        tile={capturedPiece}
        set={set}
      />
    </div>
    <div className="match__log-event">
      <h3>Captured</h3>
      <span>{capturedPiece.isPromoted ? capturedPiece.name + '+' : capturedPiece.name}</span>
    </div>
  </div>
);

const LogPromote = ({ set, color, piece }) => {
  let before = new GameTile(pieceNameFromBoardId(piece), color, [10,10], false);
  let after = new GameTile(pieceNameFromBoardId(piece), color, [10,10], true);
  return (
    <div className="match__log-item">
      <div className={`match__log-color ${color}`}></div>
      <div className="match__log-piece">
        <ShogiPiece
          inPlay={false}
          tile={after}
          set={set}
        />
      </div>
      <div className="match__log-event">
        <h3>Promoted</h3>
        <span>{pieceNameFromBoardId(piece)}</span>
      </div>
    </div>
  );
}

const LogMove = ({ set, color, piece, moveType, notation }) => (
  <div className="match__log-item">
    <div className={`match__log-color ${color}`}></div>
    <div className="match__log-piece">
      <ShogiPiece
        inPlay={false}
        tile={new GameTile(pieceNameFromBoardId(piece), color, [10, 10], piece.length > 1)}
        set={set}
      />
    </div>
    <div className="match__log-event">
      <h3>{moveType}</h3>
      <span>{notation}</span>
    </div>
  </div>
);

const MatchLog = ({ set, events, visibility, toggle }) => {
  let logStyles = ['match__log'];
  visibility ? logStyles.push('shown') : logStyles.push('hidden');
  return (
    <div className={logStyles.join(' ')}>
      <div className="match__log-list">
        <div className="match__log-list-inner">
            {events.map((event, ei) => {
              let moveType = event.notation.indexOf('*') >= 0 ? 'Drop' : event.notation.indexOf('x') >= 0 ? 'Capture' : 'Move';
              let eventBreakout = [];
              (event.check || event.checkmate) && eventBreakout.push(<LogCheck key={`${ei}:${event.moveNumber}:check`} color={event.move.color} check={event.check} checkmate={event.checkmate} set={set} />);
              event.move.didPromote && eventBreakout.push(<LogPromote key={`${ei}:${event.moveNumber}:promote`} color={event.move.color} piece={event.move.piece} set={set} />);
              moveType === 'Capture' && eventBreakout.push(<LogCapture key={`${ei}:${event.moveNumber}:capture`} color={event.move.color} capturedPiece={event.move.capturedPiece} set={set} />)
              eventBreakout.push(<LogMove key={`${ei}:${event.moveNumber}:movement`} color={event.move.color} piece={event.move.piece} moveType={moveType === 'Capture' ? 'Move' : moveType} notation={event.notation} set={set} />);
              return [...eventBreakout];
            })}
        </div>
      </div>
      <div className="match__log-actions"><button className="match__log-control" onClick={() => toggle('log')}>Close</button></div>
    </div>
  );
}

export default MatchLog;
