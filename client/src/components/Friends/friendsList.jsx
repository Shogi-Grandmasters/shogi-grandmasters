import React from "react";

export const FriendsList = (props) => {
  console.log(props.user.avatar)
  return (
    <div>
    <img width="50px" className="avi" src={`https://res.cloudinary.com/shogigrandmasters/image/upload/${props.user.avatar}`} />
      <div><b>{props.user.username}</b></div>
      <a className="remove-friend" onClick={() => props.deleteFriend(props.user)}>Remove</a>
      <hr />
    </div>
  );
};
