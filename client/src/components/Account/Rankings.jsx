import React from "react";
import "./Account.css";

const Rankings = (props) => {
  return (
    <div className="rankings-container">
      <div><b>#1: {localStorage.username}</b></div><br />
    </div>
  );
};

export default Rankings;