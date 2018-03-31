import React from 'react';
import './Account.css';

const Rankings = (props) => {
  return (
    <div className="rankings-container">
      <b>#1: {localStorage.username}</b><br />
    </div>
  );
};

export default Rankings;