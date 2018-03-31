import React from 'react';

import './TurnIndicator.css';

const TurnIndicator = ({ isTurn }) => {
  let northStyles = ['turn__indicator-north'];
  let southStyles = ['turn__indicator-south'];
  isTurn ? southStyles.push('south__active') : northStyles.push('north__active');
  return (
    <div className="turn__indicator">
      <div className={northStyles.join(' ')}></div>
      <div className="turn__timer">VS</div>
      <div className={southStyles.join(' ')}></div>
    </div>
  )
}

export default TurnIndicator;