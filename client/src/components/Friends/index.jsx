import React, { Component } from "react";
import axios from "axios";
import { FriendsList } from "./friendsList.jsx";
import { PendingList } from "./pendingList.jsx";


class Friends extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      pending: [],
    };
  }

  componentWillMount() {
    this.fetchFriends();
  }


  addFriend = async () => {
    const id = localStorage.getItem("id");
    const { username } = this.state;
    const { data } = await axios.post(`http://localhost:3396/api/users/find/`, { username });
    const fid = data.id + "";
    const body = {
      u_id: id,
      f_id: fid,
    }
    const added = await axios.post(`http://localhost:3396/api/friends/add`, body);
    this.fetchFriends();
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  fetchFriends = async () => {
    const id = localStorage.getItem("id");
    const flist = [];
    const pending = [];
    const {data} = await axios.get(`http://localhost:3396/api/friends/fetchFriends/${id}`);
    data.forEach(friend => {
      if(friend.status === 0 && friend.f_id != localStorage.getItem("id")) pending.push(friend)
      if(friend.status === 1 && friend.f_id != localStorage.getItem("id")) flist.push(friend)
      if(friend.status === 2) this.deleteFriend(e.id = friend.id)
    })
    this.setState({ friends: flist });
    this.setState({ pending: pending });
  }

  deleteFriend = async (e) => {
    const id = localStorage.getItem("id");
    const fid = e.id;
    const { data } = await axios.delete(
      `http://localhost:3396/api/friends/deleteFriend/${id}/${fid}`
    );
    this.fetchFriends();
  }

  acceptFriend = async (e) => {
    const id = localStorage.getItem("id");
    const fid = e.id;
    const { data } = await axios.put(
      `http://localhost:3396/api/friends/${id}/${fid}/1`
    );
    const body = {
      u_id: id,
      f_id: fid,
      status: 1
    }
    const added = await axios.post(`http://localhost:3396/api/friends/add`, body);
    this.fetchFriends();
  }

  rejectFriend = async (e) => {
    const id = localStorage.getItem("id");
    const fid = e.id;
    const { data } = await axios.put(
      `http://localhost:3396/api/friends/${id}/${fid}/2`
    );
    this.fetchFriends();
  }

  render() {
    const pending = this.state.pending.length ? (
      <div>
        <h5>Pending Requests:</h5>
        <div>
        {this.state.pending.map((user, index) => (
          <PendingList
            key={index}
            user={user}
            acceptFriend={this.acceptFriend.bind(this)}
            rejectFriend={this.rejectFriend.bind(this)}
          />
        ))}
        </div>
        </div>
    ) : ( 
      <div />
    )
    return (
      <div>
        <input name="username" type="text" placeholder="Search by username" onChange={this.handleInput} />
        <input type="submit" onClick={() => this.addFriend()} />
        <div>
        <h5>Friends:</h5>
        {this.state.friends.map((user, index) => (
          <FriendsList
            key={index}
            user={user}
            deleteFriend={this.deleteFriend.bind(this)}
          />
        ))}
        </div>
        {pending}
      </div>
    )
  }
}

export default Friends;
