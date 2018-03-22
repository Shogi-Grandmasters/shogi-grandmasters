import React, { Component } from "react";
import axios from "axios";

// import "./FriendChallenge.css";

class FriendChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      selectedFriend: ""
    };
  }

  componentDidMount() {
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
  }

  async fetchFriendChallenge() {}

  async handleMatchSelect(e) {
    await this.setState({ selectedFriend: JSON.parse(e.target.value) });
    console.log(this.state.selectedFriend);
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

  renderFriends() {
    let friends = [];
    let users = this.state.users;
    for (let id in users) {
      if (id !== localStorage.getItem("id") && users[id].loggedOn)
      friends.push(
        <option key={id} value={JSON.stringify(users[id])}>
          {users[id].username}
        </option>
      );
    }
    return friends;
  }

  render() {
    return (
      <div className="Prev-matches">
        <div>
          <div>Pending Matches</div>
          <br />
          <select onChange={e => this.handleMatchSelect(e)}>
            <option>Challenge A Friend!</option>
            {this.renderFriends()}
          </select>
        </div>
        <button onClick={() => this.handleJoinMatchClick()}>
          Challenge Friend
        </button>
      </div>
    );
  }
}

export default FriendChallenge;
