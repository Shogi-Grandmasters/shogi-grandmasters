import React, { Component } from 'react';
import axios from 'axios';
import ChatPopup from '../Chat/popup.jsx';
import randomstring from 'randomstring';

import './FriendChallenge.css';
import duel from '../../../../5fb83b603cb5c95c8cbdffb9cb379888.png';
import scroll from '../../../../58df55f617483f263a3c2880d16ce947.png';
import awaitingDuel from '../../../../public/6277b9a543e1dc34eb2e3e99b42af758.png';

const { REST_SERVER_URL, AVATAR_URL } = process.env;

class FriendChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      friends: [],
      selectedFriend: '',
      openChallenges: [],
      activePopups: []
    };
  }

  async componentDidMount() {
    this.id = +localStorage.getItem('id');
    this.username = localStorage.getItem('username');
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
        this.fetchOpenChallenges();
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
      if (this.id === player1 || this.id === player2) {
        const friends = this.state.friends;
        for (let friend of friends) {
          (friend.id === player1 || friend.id === player2) &&
            (friend.challenge = null);
        }
        this.fetchOpenChallenges(friends);
      }
    });

    this.props.socket.on("server.popupChat", message => {
      if (message.friend_id === this.id) {
        for (let friend of this.state.friends) {
          message.user_id === friend.id && this.props.showActivePopups(friend);
        }
      }
    });
  }

  componentWillUnmount() {
    this.props.socket.close();
  }

  fetchFriends = async () => {
    const { data } = await axios.get(
      `${REST_SERVER_URL}/api/friends/fetchFriends/${this.id}`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    this.setState({
      friends: data.filter(
        friend => friend.id !== this.id && friend.status === 1
      )
    });
  };

  fetchOpenChallenges = async (friends = this.state.friends) => {
    let { data } = await axios.get(
      `${REST_SERVER_URL}/api/openMatches`,
      {
        params: { id: this.id }
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    data.forEach(challenge => {
      for (let friend of friends) {
        (challenge.player1 === friend.id || challenge.player2 === friend.id) &&
          (friend.challenge = challenge);
      }
    });
    this.setState({ openChallenges: data, friends });
  };

  async handleFriendSelect(user) {
    !this.state.activePopups.filter(friend => friend.id === user.id).length &&
      (await this.setState({
        selectedFriend: user,
        activePopups: [...this.state.activePopups, user]
      }));
  }

  async handleChallengeFriendClick(user) {
    await this.setState({ selectedFriend: user });
    if (this.state.selectedFriend) {
      const player1 = this.id;
      const player2 = this.state.selectedFriend.id;
      const player1Name = this.username;
      const player2Name = this.state.selectedFriend.username;
      const alreadyChallenged = this.state.friends.filter(
        friend => friend.id === player2 && friend.challenge
      );
      !alreadyChallenged.length &&
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
    await axios.delete(
      `${REST_SERVER_URL}/api/openmatches`,
      {
        data: { id }
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    this.props.socket.emit("client.acceptChallenge", {
      matchId,
      black: player1,
      white: player2,
      type: 2
    });
  }

  async handleRejectChallengeClick(e) {
    const { id, player1, player2 } = JSON.parse(e.target.value);
    await axios.delete(
      `${REST_SERVER_URL}/api/openmatches`,
      {
        data: { id }
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );
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
            onClick={e => this.handleRejectChallengeClick(e)}
          >
            X
          </button>
          <button
            value={JSON.stringify(challenge)}
            onClick={e => this.handleAcceptChallengeClick(e)}
          >
            &#10004;
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

  renderChallengeButton(user) {
    if (user.challenge) {
      if (user.challenge.player1 === this.id) {
        return (
          <img className="online-challenge-icon" src={awaitingDuel} />
        );
      } else {
        return (
          <div>
            <button
              value={JSON.stringify(user.challenge)}
              onClick={e => this.handleAcceptChallengeClick(e)}
              className="online-challenge-button1"
            >
              &#10004;
            </button>
            <button
              value={JSON.stringify(user.challenge)}
              onClick={e => this.handleRejectChallengeClick(e)}
              className="online-challenge-button2"
            >
              X
            </button>
          </div>
        );
      }
    } else {
      return (
        <img
          className="online-challenge-icon"
          src={duel}
          onClick={() => this.handleChallengeFriendClick(user)}
        />
      );
    }
  }

  render() {
    return (
      <div className="online-container">
        <div className="online-head">
          FRIENDS
          <div className="online-head-right">CHALLENGE</div>
        </div>
        <div className="online-list-container">
          {this.state.friends.map((user, index) => (
            <div className="online-friend-container" key={index}>
              <div className="online-friend-wrapper">
                <img
                  className="online-friend-avi"
                  src={`${AVATAR_URL}/${user.avatar}`}
                />
                <b className="online-username">{user.username}</b>
                <img
                  className="online-message-icon"
                  src={scroll}
                  onClick={() => this.props.showActivePopups(user)}
                />
                <a>{this.renderChallengeButton(user)}</a>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FriendChallenge;
