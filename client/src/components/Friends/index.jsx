import React, { Component } from "react";
import axios from "axios";
import { FriendsList } from "./FriendsList.jsx";
import { PendingList } from "./PendingList.jsx";
import { AwaitingList } from "./AwaitingList.jsx";

import "./Friends.css";

class Friends extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      pending: [],
      awaiting: [],
    };
  }

  componentWillMount() {
    this.fetchFriends();
  }


  addFriend = async () => {
    const id = localStorage.getItem("id");
    const { username } = this.state;
    const { data } = await axios.post(`http://localhost:3396/api/users/`, { username });
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
  const awaiting = [];
  const {data} = await axios.get(`http://localhost:3396/api/friends/fetchFriends/${id}`);
  for(let friend of data) {
    if(friend.status === 0 && friend.u_id == id) awaiting.push(friend)
    if(friend.status === 0 && friend.u_id != id) pending.push(friend)
    if(friend.status == 1 && friend.id != id) flist.push(friend)
    if(friend.status === 2) this.deleteFriend(friend)
  }
  this.setState({ friends: flist });
  this.setState({ pending: pending });
  this.setState({ awaiting: awaiting });
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
    const fid = e.permId;
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
    const fid = e.permId;
    console.log('inside reject', e)
    const { data } = await axios.put(
      `http://localhost:3396/api/friends/${id}/${fid}/2`
    );
    console.log('data', data)
    this.fetchFriends();
  }

  render() {
    const awaiting = this.state.awaiting.length > 0 && (
      <div className="awaiting-container">
        <h3 className="friend-title">Awaiting Response</h3>
        <div>
        {this.state.awaiting.map((user, index) => (
          <AwaitingList
            key={index}
            user={user}
          />
        ))}
        </div>
        </div>
    )
    const pending = this.state.pending.length > 0 && (
      <div className="pending-container">
        <h3 className="friend-title">Pending Requests</h3>
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
    ) 
    return (
      <div className="friend-container"> 
        <div className="friend-top">
          <h2 className="friend-head">Friends List</h2>
          <form className="friend-search">
            <input name="username" type="text" placeholder="Search by username" className="friend-form" onChange={this.handleInput} />
            <input type="submit" className="friend-button" onClick={(e) => this.addFriend(e)} />
          </form>
        </div>
        <div className="friend-list-container">
        <h3 className="friend-title">Current</h3>
        {this.state.friends.map((user, index) => (
          <FriendsList
            key={index}
            user={user}
            deleteFriend={this.deleteFriend.bind(this)}
          />
        ))}
        {pending}
        {awaiting}
        </div>
      </div>
    )
  }
}

export default Friends;

// fetchFriends = async () => {
//   const id = localStorage.getItem("id");
//   const flist = [];
//   const pending = [];
//   const awaiting = [];
//   const {data} = await axios.get(`http://localhost:3396/api/friends/fetchFriends/${id}`);
//   console.log('our fetch friends data', data)
//   for(let friend of data) {
//     if(friend.status === 0 && friend.u_id == id)) awaiting.push(friend)
//     if!(friend.u_id === id)pending.push(friend)

//     const fid = friend.u_id;
//     const user = await axios.get(`http://localhost:3396/api/users/${fid}`);
//     friend.permId = user.data[0].id
//     friend.name = user.data[0].username
//     if(friend.status === 0 && friend.u_id === parseInt(localStorage.getItem("id"))) awaiting.push(friend)
//     if(friend.status === 0 && friend.u_id !== parseInt(localStorage.getItem("id"))) pending.push(friend)
//     if(friend.status == 1 && friend.id !== parseInt(localStorage.getItem("id"))) flist.push(friend)
//     if(friend.status === 2) this.deleteFriend(friend)
//   }
//   this.setState({ friends: flist });
//   this.setState({ pending: pending });
//   this.setState({ awaiting: awaiting });
// }