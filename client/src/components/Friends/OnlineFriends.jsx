import React, { Component } from "react";
import axios from "axios";
import duel from "../../../public/5fb83b603cb5c95c8cbdffb9cb379888.png"

import "./Friends.css";

class OnlineFriends extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
    };
  }

  componentWillMount = () => {
    this.fetchOnlineFriends();
  }

  fetchOnlineFriends = async () => {
    const flist = [];
    const id = localStorage.getItem("id");
    const {data} = await axios.get(`http://localhost:3396/api/friends/fetchFriends/${id}`); 
    for (let friend of data) {
      friend.status == 1 && friend.id != id && flist.push(friend);
    }
    this.setState({friends: flist});
  }

  challengeFriend = async () => {

  }

  render() {
    return (
      <div className="online-container"> 
        <div className="online-head">Friends Online:
          <div className="online-head-right">Challenge</div>
        </div>
        <div className="online-list-container">
        {this.state.friends.map((user, index) => (
          <div className="online-friend-container" key={index} >
            <img width="50px" className="friend-avi" src={`https://res.cloudinary.com/shogigrandmasters/image/upload/${user.avatar}`} />
            <b className="online-username">{user.username}</b>
            <a onClick={() => this.challengeFriend(user)}><img className="online-challenge-icon" src={duel} /></a>
            <hr />
          </div>
        ))}
        </div>
      </div>
    );
  }
}

export default OnlineFriends;
