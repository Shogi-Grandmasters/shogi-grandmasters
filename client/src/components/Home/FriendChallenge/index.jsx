import React, { Component } from "react";
import axios from "axios";
import OnlineFriends from "../../Friends/OnlineFriends.jsx"
// import "./FriendChallenge.css";

const {REST_SERVER_URL} = process.env;

class FriendChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      friends: [],
      selectedFriend: ""
    };
  }

  async componentDidMount() {
    this.props.socket.on("server.sendUsers", users => {
      this.setState({ users });
    });

    this.props.socket.on("server.userConnected", user => {
      let users = this.state.users;
      users[user.userId] = user;
      this.setState({ users });
    });

    this.props.socket.on("server.userDisconnected", user => {
      let users = this.state.users;
      users[user.userId] = user;
      this.setState({ users });
    });

    await this.fetchFriends();
  }

  async fetchFriendChallenge() {}

  async handleMatchSelect(e) {
    await this.setState({ selectedFriend: JSON.parse(e.target.value) });
  }

  async handleChallengeFriendClick() {
    if (this.state.selectedFriend) {
      let { id, black, white } = this.state.selectedMatch;
      this.props.history.push({
        pathname: `/${id}`,
        state: {
          matchId: id,
          black,
          white
        },
        history: this.props.history
      });
    }
  }

  fetchFriends = async () => {
    const id = +localStorage.getItem("id");
    const flist = [];
    const { data } = await axios.get(
      `${REST_SERVER_URL}/api/friends/fetchFriends/${id}`,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    for (let friend of data) {
      const fid = friend.u_id;
      const user = await axios.get(`${REST_SERVER_URL}/api/users/${fid}`,
        {
        headers: { 'Content-Type': 'application/json' }
        }
      );
      friend.status == 1 && friend.id !== id && flist.push(friend);
    }
    this.setState({ friends: flist });
  };

  renderLoggedOnFriends() {
    // return this.state.friends.map(friend => {
    //   if (this.state.friends.length && this.state.users[friend.id].loggedOn) {
    //     return (
    //       <option key={friend.id} value={JSON.stringify(friend)}>
    //         {friend.username}
    //       </option>
    //     )
    //   }
    // });
  }

  render() {
    return (
      <div className="friend-challenge">
        <div>
          <div>Pending Matches</div>
          <select onChange={e => this.handleMatchSelect(e)}>
            <option>Challenge A Friend!</option>
            {this.renderLoggedOnFriends()}
          </select>
        </div>
        <button onClick={() => this.handleJoinMatchClick()}>
          Challenge Friend
        </button>
        <OnlineFriends />
      </div>
    );
  }
}

export default FriendChallenge;
