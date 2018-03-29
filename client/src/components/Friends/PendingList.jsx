import React, { Component } from "react";
import axios from "axios"

const {AVATAR_URL} = process.env;

export const PendingList = (props) => {

    return (
      <div className="current-friend-container">
        <img width="50px" className="friend-avi" src={`${AVATAR_URL}${props.user.avatar}`} />
        <b className="friend-username">{props.user.name}</b>
        <a className="inline-button-friend" onClick={() => props.acceptFriend(props.user)}>Accept</a>
        <a className="inline-button-friend" onClick={() => props.rejectFriend(props.user)}>Reject</a>
        <hr /><br />
      </div>
    );

};

