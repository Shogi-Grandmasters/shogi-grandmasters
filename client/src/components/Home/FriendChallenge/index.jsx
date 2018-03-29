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
    this.id = +localStorage.getItem("id");
    this.username = localStorage.getItem("username");
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
      (this.id === data.player1 || this.id === data.player2) &&
        this.setState({ openChallenges: [...this.state.openChallenges, data] });
    });

    this.props.socket.on(
      "server.challengeAccepted",
      ({ matchId, black, white }) => {
        (this.id === black || this.id === white) &&
          this.props.history.push({
            pathname: `/match/${matchId}`,
            state: { matchId, black, white },
            history: this.props.history
          });
      }
    );

    this.props.socket.on("server.challengeRejected", ({ player1, player2 }) => {
      (this.id === player1 || this.id === player2) && this.fetchOpenChallenges();
    });
  }

  fetchFriends = async () => {
    const { data } = await axios.get(
      `${REST_SERVER_URL}/api/friends/fetchFriends/${this.id}`
    );
    this.setState({ friends: data.filter(friend => friend.id !== this.id) });
  };

  fetchOpenChallenges = async () => {
    let { data } = await axios.get(`http://localhost:3396/api/openMatches`, { params: { id: this.id } });
    data.forEach(match => {
      for (let friend of this.state.friends) {
        match.player1Name =
          match.player1 === friend.id
            ? friend.username
            : this.username;
        match.player2Name =
          match.player2 === friend.id
            ? friend.username
            : this.username;
      }
    });
    this.setState({ openChallenges: data });
  };

  async handleFriendSelect(e) {
    await this.setState({ selectedFriend: JSON.parse(e.target.value) });
  }

  async handleChallengeFriendClick() {
    if (this.state.selectedFriend) {
      const player1 = this.id;
      const player2 = this.state.selectedFriend.id;
      const player1Name = this.username;
      const player2Name = this.state.selectedFriend.username;
      this.props.socket.emit("client.challengeFriend", {
        player1,
        player2,
        player1Name,
        player2Name
      });
    }
  }

  async handleAcceptChallengeClick(e) {
    const matchId = randomstring.generate();
    const { id, player1, player2 } = JSON.parse(e.target.value);
    await axios.delete("http://localhost:3396/api/openmatches", {
      data: { id }
    });
    this.props.socket.emit("client.acceptChallenge", {
      matchId,
      black: player1,
      white: player2
    });
  }

  async handleRejectChallengeClick(e) {
    const { id, player1, player2 } = JSON.parse(e.target.value);
    await axios.delete("http://localhost:3396/api/openmatches", {
      data: { id }
    });
    this.props.socket.emit("client.rejectChallenge", { player1, player2 });
  }

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
      return challenge.player2 === this.id ? (
        <div key={challenge.id} className="challenge_items">
          <div>from: {challenge.player1Name}</div>
          <button
            value={JSON.stringify(challenge)}
            onClick={e => this.handleAcceptChallengeClick(e)}
            className="challenge_button"
          >
            &#10004;
          </button>
          <button
            value={JSON.stringify(challenge)}
            onClick={e => this.handleRejectChallengeClick(e)}
            className="challenge_button"
          >
            X
          </button>
        </div>
      ) : (
        <div
          key={challenge.id}
          value={JSON.stringify(challenge)}
          className="challenge_items"
        >
          to: {challenge.player2Name}
        </div>
      );
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
        {!!this.state.openChallenges.length && this.renderOpenChallenges()}
      </div>
    );
  }
}

export default FriendChallenge;
