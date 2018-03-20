import React from "react";

export const PendingList = (props) => {
  return (
    <div>
      <div><b>{props.user.username}</b></div>
      <a onClick={() => props.acceptFriend(props.user)}>Accept</a>
      <a onClick={() => props.rejectFriend(props.user)}>Reject</a>
    </div>
  );
};
