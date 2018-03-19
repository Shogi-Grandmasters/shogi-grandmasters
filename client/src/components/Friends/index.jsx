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
    const { username } = this.state;
    console.log(username)
    const { data } = await axios.post(`http://localhost:3396/api/users/find/`, { username });
    const fid = data.id + "";
    console.log(fid)
    const body = {
      u_id: id,
      f_id: fid,
    }
    const added = await axios.post(`http://localhost:3396/api/friends/add`, body);
    // this.fetchFriends();
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <input name="username" type="text" placeholder="Search by username" onChange={this.handleInput} />
        <input type="submit" onClick={() => this.addFriend()} />
      </div>
    )
  }
}

export default Friends;
