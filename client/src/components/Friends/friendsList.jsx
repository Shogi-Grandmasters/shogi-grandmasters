import React from "react";

export const FriendsList = (props) => {
  return (
    <div className="current-friend-container">
      <img width="50px" className="friend-avi" src={`https://res.cloudinary.com/shogigrandmasters/image/upload/${props.user.avatar}`} />
      <b className="friend-username">{props.user.username}</b>
      <a className="inline-button-friend" onClick={() => props.deleteFriend(props.user)}>Remove</a>
      <hr />
    </div>
  );
};
