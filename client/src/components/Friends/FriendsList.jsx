import React from "react";

const {AVATAR_URL} = process.env;

export const FriendsList = (props) => {
  return (
    <div className="current-friend-container">
      <img className="friend-avi" src={`${AVATAR_URL}${props.user.avatar}`} />
      <b className="friend-username">{props.user.username}</b>
      <a className="inline-button-friend" onClick={() => props.deleteFriend(props.user)}>Remove</a>
      <hr />
    </div>
  );
};
