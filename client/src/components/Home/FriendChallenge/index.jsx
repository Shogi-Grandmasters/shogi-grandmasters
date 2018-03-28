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
      selectedFriend: "",
      openChallenges: []
    };
  }

  async componentDidMount() {
    // this.props.socket.on("server.sendUsers", users => {
    //   this.setState({ users });
    // });

    // this.props.socket.on("server.userConnected", user => {
    //   let users = this.state.users;
    //   users[user.userId] = user;
    //   this.setState({ users });
    // });

    // this.props.socket.on("server.userDisconnected", user => {
    //   let users = this.state.users;
    //   users[user.userId] = user;
    //   this.setState({ users });
    // });
    await this.fetchFriends();
    await this.fetchOpenChallenges();

    this.props.socket.on("server.challengeSent", data => {
      this.setState({ openChallenges: [...this.state.openChallenges, data] });
    });
  }

  async fetchFriendChallenge() {}

  async handleFriendSelect(e) {
    await this.setState({ selectedFriend: JSON.parse(e.target.value) });
  }

  async handleChallengeFriendClick() {
    if (this.state.selectedFriend) {
      let player1 = localStorage.getItem("id");
      let player2 = this.state.selectedFriend.id;
      this.props.socket.emit("client.challengeFriend", { player1, player2 });
    }
  }

  fetchFriends = async () => {
    const id = +localStorage.getItem("id");
    const { data } = await axios.get(
      `${REST_SERVER_URL}/api/friends/fetchFriends/${id}`
    );

    this.setState({ friends: data.filter(friend => friend.id !== id) });
  };

  fetchOpenChallenges = async () => {
    const { data } = await axios.get(`http://localhost:3396/api/openMatches`);
    data.forEach(match => {
      for (let friend of this.state.friends) {
        match.player1Name = match.player1 === friend.id ? friend.username : localStorage.getItem("username");
        match.player2Name = match.player2 === friend.id ? friend.username : localStorage.getItem("username");
      }
    });
    this.setState({ openChallenges: data });
  };

  renderLoggedOnFriends() {
    return this.state.friends.map(friend => {
      // if (this.state.friends.length && this.state.users[friend.id].loggedOn) {
      return (
        <option key={friend.id} value={JSON.stringify(friend)}>
          {friend.username}
        </option>
      );
      // }
    });
  }

  renderOpenChallenges() {
    return this.state.openChallenges.map(challenge => {
      return challenge.player2 === +localStorage.getItem("id") ?
        <div key={challenge.id} value={JSON.stringify(challenge)} className="challenge_items">
          <div>from: {challenge.player1Name}</div>
          <button onClick={() => this.handleAcceptChallengeClick()} className="challenge_button">
            &#10004;
          </button>
          <button onClick={() => this.handleRejectChallengeClick()} className="challenge_button">
            X
          </button>
        </div> :
        <div key={challenge.id} value={JSON.stringify(challenge)} className="challenge_items">
          to: {challenge.player2Name}
        </div>
    });
  }

  render() {
    return (
      <div className="friend-challenge">
        <div>
          <button onClick={() => this.handleChallengeFriendClick()}>
            Challenge Friend
          </button>
          <select onChange={e => this.handleFriendSelect(e)}>
            <option hidden>Challenge A Friend!</option>
            {this.renderLoggedOnFriends()}
          </select>
        </div>
        {this.state.openChallenges.length && this.renderOpenChallenges()}
      </div>
    );
  }
}

export default FriendChallenge;
