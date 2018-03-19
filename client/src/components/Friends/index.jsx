import React, { Component } from "react";
import axios from "axios";

class Friends extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
    };
  }

  addFriend = async () => {
    const id = localStorage.getItem("id");
    const username = this.state.friend;
    const {data} = await axios.post(`http://localhost:3396/api/users/find/`, { username });
    const fid = data[0].id + "";
    const body = {
      u_id: id,
      f_id: fid,
    }
    const added = await axios.post(`http://localhost:3396/api/friends/addFriend`, body);
    // this.fetchFriends();
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <input name="friend" type="text" placeholder="Add a friend" onChange={() => this.handleInput()} />
        <input type="submit" onClick={() => this.addFriend()} />
      </div>
    )
  }
}

export default Friends;
