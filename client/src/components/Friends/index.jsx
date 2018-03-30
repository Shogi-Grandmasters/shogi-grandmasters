import React, { Component } from "react";
import axios from "axios";
import { FriendsList } from "./FriendsList.jsx";
import { PendingList } from "./PendingList.jsx";
import { AwaitingList } from "./AwaitingList.jsx";

import "./Friends.css";

const {REST_SERVER_URL} = process.env;

class Friends extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      pending: [],
      awaiting: [],
    };
  }

  componentDidMount() {
    this.fetchFriends();
  }

  // searchUser = async () => {
  //   const id = localStorage.getItem("id");
  //   const { username } = this.state;
  //   const { data } = await axios.post(`${REST_SERVER_URL}/api/users/`, { username });
  //   const fid = data.id + "";
  //   await this.addFriend(fid);
  // }

  // addFriend = async () => {
  //   try{
  //     const { username } = this.state;
  //     const id = localStorage.getItem("id")
  //     console.log(username)
  //     const { data } = await axios.post(`${REST_SERVER_URL}/api/users/`, {username})
  //     const fid = await data.id
  //     console.log('1st post data', data)
  //     const body = {
  //       u_id: id,
  //       f_id: data.id,
  //     }
  //     console.log('our body', body)
  //     const user = await axios.post(`${REST_SERVER_URL}/api/friends/add`, body);
  //     console.log('2nd post data', user)
  //   } catch(err){
  //     console.log(err)
  //     console.log('inside our catch')
  //   }
  //   console.log('supah fail')
  // }
  
  addFriend = (e) => {
    e.preventDefault();
    const { username } = this.state;
    const id = localStorage.getItem("id")
    axios.post(`${REST_SERVER_URL}/api/users/`, {username})
      .then(res => {
        console.log('1st promise data', res.data)
        const body = {
          u_id: id,
          f_id: res.data.id.toString(),
        }
        axios.post(`${REST_SERVER_URL}/api/friends/add`, body)
          .then(data => {
            console.log('2nd promise data', data.data)
            this.fetchFriends();
          })
          .catch(err => {
            console.log('2nd promise error');
          });
      })
      .catch(err => {
        console.log('1st promise error');
      });
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
    const {data} = await axios.get(`${REST_SERVER_URL}/api/friends/fetchFriends/${id}`);
    for(let friend of data) {
      const fid = friend.u_id;
      const user = await axios.get(`${REST_SERVER_URL}/api/users/${fid}`);
      friend.permId = user.data[0].id
      friend.name = user.data[0].username
      if(friend.status == 0 && friend.u_id == id) awaiting.push(friend)
      if(friend.status == 0 && friend.u_id != id) pending.push(friend)
      if(friend.status == 1 && friend.id != id) flist.push(friend)
      if(friend.status == 2) this.deleteFriend(friend)
    }
    this.setState({ friends: flist });
    this.setState({ pending: pending });
    this.setState({ awaiting: awaiting });
  }

  deleteFriend = async (e) => {
    const id = localStorage.getItem("id");
    const fid = e.id;
    const { data } = await axios.delete(
      `${REST_SERVER_URL}/api/friends/deleteFriend/${id}/${fid}`
    );
    this.fetchFriends();
  }

  acceptFriend = async (e) => {
    const id = localStorage.getItem("id");
    const fid = e.permId;
    const { data } = await axios.put(
      `${REST_SERVER_URL}/api/friends/${id}/${fid}/1`
    );
    const body = {
      u_id: id,
      f_id: fid,
      status: 1
    }
    const added = await axios.post(`${REST_SERVER_URL}/api/friends/add`, body);
    this.fetchFriends();
  }

  rejectFriend = async (e) => {
    const id = localStorage.getItem("id");
    const fid = e.permId;
    const { data } = await axios.put(
      `${REST_SERVER_URL}/api/friends/${id}/${fid}/2`
    );
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
