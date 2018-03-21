import React, { Component } from "react";
import axios from "axios"

export const PendingList = (props) => {
  
    return (
      <div>
        <div><b>{props.user.name}</b></div>
        <a onClick={() => props.acceptFriend(props.user)}>Accept</a>
        <a onClick={() => props.rejectFriend(props.user)}>Reject</a>
      </div>
    );
    
};

