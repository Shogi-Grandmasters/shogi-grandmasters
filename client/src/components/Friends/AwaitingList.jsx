import React from "react";

const {AVATAR_URL} = process.env;

export const AwaitingList = (props) => {
  return (
    <div className="current-friend-container">
      <img width="50px" className="friend-avi" src={`${AVATAR_URL}${props.user.avatar}`} />
      <b className="friend-username">{props.user.username}</b>
      <hr /><br />
    </div>
  );
};
