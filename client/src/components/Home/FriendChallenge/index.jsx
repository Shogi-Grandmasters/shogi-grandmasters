import React, { Component } from 'react';
import axios from 'axios';
import ChatPopup from '../Chat/popup.jsx';
import randomstring from 'randomstring';

import './FriendChallenge.css';
import duel from '../../../../5fb83b603cb5c95c8cbdffb9cb379888.png';
import scroll from '../../../../58df55f617483f263a3c2880d16ce947.png';
import awaitingDuel from '../../../../public/6277b9a543e1dc34eb2e3e99b42af758.png';

const { REST_SERVER_URL, AVATAR_URL } = process.env;

const MessageAction = ({ user, click }) => {
  return (
    <div className="friends__list-action" onClick={() => click(user)}>
      <svg id="Messages" viewBox="0 0 373.73 373.73" className="friends__list-message">
        <path d="M497.57,475.87V218c1.67-2.62,3-5.58,5.07-7.8,3.24-3.45,7.79-3.43,12.23-3.43l338.36,0c1.58,0,3.16,0,4.73.16,4.43.32,8.18,2.36,10.11,6.19a22.92,22.92,0,0,1,2.4,10q.19,123.46.1,246.94c0,1.09,0,2.19-.06,3.28a13.79,13.79,0,0,1-12.24,12.85,46.9,46.9,0,0,1-5.81.28q-83.78,0-167.54.11a12.12,12.12,0,0,0-6.86,2.35c-15.37,11.86-30.59,23.93-45.85,35.93s-30.5,24.05-45.81,36c-5.8,4.53-12.75,4.48-18,.07-4-3.31-5.09-7.79-5.1-12.71q-.06-28.77-.14-57.54v-4.21h-4.42c-14.2,0-28.41-.27-42.61.11C507.41,486.84,501,484.21,497.57,475.87ZM842.46,235H525.77v223.5H530c15.06,0,30.11,0,45.16,0,10.23,0,15.73,5.49,15.82,15.72.13,14.2.21,28.41.32,42.61,0,1.26.12,2.52.21,4.31,1.72-1.28,3-2.18,4.18-3.13q34.78-27.33,69.54-54.68a21.61,21.61,0,0,1,14-4.91q79.38.17,158.77.07h4.4Z" transform="translate(-497.57 -198.3)" />
      </svg>
    </div>
  );
}

const ChallengeAction = ({ user, currentUser, click }) => {
  let buttonStyle = 'friends__challenge';
  let iconStyle = 'friends__challenge-icon';
  let pendingMessage = null;

  if (user.challenge && user.challenge.player1 === currentUser) {
    buttonStyle = 'friends__challenge-pending';
    iconStyle = 'friends__challenge-icon-pending';
    pendingMessage = <span>Pending</span>;
  }

  return (
      <div className={buttonStyle} onClick={() => click(user)}>
        {pendingMessage}
        <svg id="challenge" viewBox="0 0 181.22 169.8" className={iconStyle}>
          <g>
            <path d="M200.79,38.24c0,9.46.11,18.31-.12,27.15,0,1.33-1.43,2.8-2.52,3.9q-22.87,23-45.85,45.87c-1.23,1.23-2.64,2.28-4.55,3.92,7.23,6.4,13.93,12.31,20.63,18.23l-.91,1.27,6.1-5.76c7.68,6,8.47,13.75,2.25,24.85,6.71,6.53,13.61,13.19,20.44,19.92,2.52,2.47,4.45,5.29,9,3.44,1.54-.63,5.23,1.33,6.35,3.11s1.31,5.69.1,7.14a153,153,0,0,1-14.91,15.22c-2.43,2.2-5.69,1.81-8.28-.37s-3.54-5-1.92-8c1.23-2.28.54-3.5-1.06-5.1-7.49-7.49-14.88-15.11-22.44-22.82-5,3.46-9.88,5.87-15.41,4.08-3.42-1.1-6.49-3.29-10-5.16l3-3.71-18.9-18.74c-5.68,5.75-11.87,12-18.18,18.4l2.5,3.11c-5.65,7.73-13.58,8.56-24.86,2.09C75.71,176,70,181.91,64.34,187.84c-1,1.08-2.12,2.12-3.17,3.19-2.37,2.39-5.37,4.19-2.89,8.67,1.37,2.46-.51,5.35-3.05,7s-5.52,1.78-7.71-.23C42.46,201.8,37.58,197,33,191.89c-2.24-2.44-2-5.6-.05-8.32s4.78-3.26,8-2.55c1.24.27,3.14.47,3.86-.22,8-7.71,15.82-15.6,23.65-23.4-6.24-9-5.15-18.49,2.61-24.84l4.4,6.18L96.2,119.68c-8.69-8.72-17-17-25.23-25.32s-16.9-16.68-25.15-25.2a9.64,9.64,0,0,1-2.46-5.8c-.29-7.11,0-14.25-.18-21.37-.08-3,1-3.88,3.92-3.8q9.56.27,19.12,0A8,8,0,0,1,72.74,41q23.39,24.32,46.89,48.51a23.35,23.35,0,0,1,2.08,3.1c1.59-1.46,2.52-2.22,3.35-3.08q23.34-24.09,46.63-48.25a8.73,8.73,0,0,1,7.15-3.11C186,38.38,193.06,38.24,200.79,38.24Zm-5,5c-5.51,0-10.38.16-15.23-.06A7.88,7.88,0,0,0,174,46q-31.05,32.25-62.24,64.38l-30.3,31.33,18.29,18.79a12.56,12.56,0,0,0,1.07-.89Q147.47,113,194.09,66.35a4.82,4.82,0,0,0,1.58-2.79C195.81,57,195.74,50.38,195.74,43.25ZM63.19,54.16l47.87,49.13L118.81,96c-1-1.13-1.78-2.06-2.63-2.93-12.62-13-25.84-25.48-37.67-39.17C71.06,45.28,63,41.38,52,43.25a1.21,1.21,0,0,1-.38,0c-2.7-.35-3.44,1-3.37,3.5.13,5-.16,10,.14,15a8.67,8.67,0,0,0,2.2,5.15C60.17,76.72,70,86.32,79.67,96.09c6.48,6.55,12.79,13.27,18.63,19.34l9.55-8.21L59.56,57.56Zm63.36,87L144.44,160l19.21-18.45-19.3-18.07c-2.09,2-4.41,4.21-6.93,6.6,5.37,5.61,10.51,11,15.81,16.52l-3.59,3.28-16.28-15.39ZM98.28,168.55,70.69,140.91c-2.41,4-1.91,8.87,1.91,12.87q6.06,6.38,12.44,12.46A11.25,11.25,0,0,0,98.28,168.55ZM146,168c4.28,2.32,8.36,2.51,11.79-.54a194,194,0,0,0,15.33-15.29c3.12-3.47,2.73-8.88.21-11.49ZM68.23,176l9.9-9.34-6-5.69C66,164.55,68.89,170.42,68.23,176Zm125,26.68a6.4,6.4,0,0,0,1.48-.79c4.27-4.2,8.57-8.37,12.69-12.71.52-.54.06-2,.06-3-1,.16-2.36-.05-3,.53-4.25,4-8.37,8.21-12.44,12.43a2.84,2.84,0,0,0-.41,2.3C191.81,201.88,192.71,202.21,193.26,202.63Zm-139.72-2A4.4,4.4,0,0,0,53,199.4c-4.4-4.41-8.8-8.84-13.3-13.15-.46-.44-2.12-.48-2.3-.17-.43.73-.73,2.2-.32,2.64,4.3,4.51,8.73,8.91,13.22,13.24.42.4,1.61.22,2.34,0C53,201.8,53.26,201,53.54,200.59Zm121.51-25.4c-.34-5,3.15-10.76-2-13.87l-6.6,5.09Zm10.85,10.55c-.69-6.07,2.14-12.22-4.67-15.74C179.54,178.67,180.26,181.43,185.9,185.74Zm-127.76.43c5.71-3.9,6.56-7.25,4.5-15.47C56,174.26,58.92,180.32,58.14,186.17Zm138.6-.3L191,179.4v12l.73.45Zm-143.68,6V181.08l-6,4.4Z" transform="translate(-31.35 -38.17)" />
            <path d="M181.69,53.73l3.18,3.89L94.94,150.1l-3-4.11Z" transform="translate(-31.35 -38.17)" />
          </g>
        </svg>
      </div>
  );
}

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

  renderChallengeButton = (user) => {
    if (user.challenge && user.challenge.player1 !== this.id) {
      return (
        <div className="friends__challenge-accept">
          <span>Accept?</span>
          <div className="friends__challenge-accept-options">
            <button
              value={JSON.stringify(user.challenge)}
              onClick={e => this.handleAcceptChallengeClick(e)}
            >
              &#10004;
            </button>
            <button
              value={JSON.stringify(user.challenge)}
              onClick={e => this.handleRejectChallengeClick(e)}

            >
              X
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <ChallengeAction user={user} currentUser={this.id} click={this.handleChallengeFriendClick.bind(this)} />
      );
    }
  }

  render() {
    return (
      <div className="friends__container">
        <div className="friends__header"><h3>Friends</h3></div>
        <div className="friends__list">
          {this.state.friends.map((user, index) => (
            <div className="friends__list-item" key={index}>
              <div className="friends__list-profile">
                <img
                  className="friends__list-avatar"
                  src={`${AVATAR_URL}/${user.avatar}`}
                />
                <div className="friends__list-username" onClick={() => this.props.showActivePopups(user)}>{user.username}</div>
                <MessageAction user={user} click={this.props.showActivePopups} />
              </div>
              <div className="friends__list-actions">
                <div>{this.renderChallengeButton(user)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="friends__actions">
          <button onClick={() => this.props.history.push('/acct/friends')}>Find A Friend</button>
        </div>
      </div>
    );
  }
}

export default FriendChallenge;
