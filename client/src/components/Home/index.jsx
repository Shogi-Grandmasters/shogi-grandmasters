import React, { Component } from "react";
import axios from "axios";
import randomstring from "randomstring";
import io from "socket.io-client/dist/socket.io.js";

import HomeChat from "./Chat/index.jsx";
import OpenMatches from "./OpenMatches/index.jsx";
import PrevMatches from "./PrevMatches/index.jsx";
import FriendChallenge from "./FriendChallenge/index.jsx";
import Leaderboard from "./Leaderboard/index.jsx";
import Nav from "../Global/Nav/Nav.jsx";
import ChatPopup from "./Chat/popup.jsx";

import "./Home.css";

const { SOCKET_SERVER_URL } = process.env;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      activePopups: []
    };
    this.showActivePopups = this.showActivePopups.bind(this);
    this.removeActivePopup = this.removeActivePopup.bind(this);
    this.minimizePopup = this.minimizePopup.bind(this);
  }

  componentWillMount() {
    this.socket = io(SOCKET_SERVER_URL, {
      query: {
        roomId: "home",
        username: localStorage.getItem("username"),
        userId: +localStorage.getItem("id")
      }
    });
  }

  async componentDidMount() {}

  componentWillUnmount() {
    this.socket.close();
  }

  logout = () => {
    window.localStorage.clear();
    // this.socket.close();
    this.props.history.push("/login");
  };

  showActivePopups(user) {
    if (
      !this.state.activePopups.filter(friend => friend.id === user.id).length
    ) {
      user.minimized = false;
      this.setState({ activePopups: [...this.state.activePopups, user] });
    }
  }

  removeActivePopup(id) {
    this.setState({
      activePopups: this.state.activePopups.filter(friend => friend.id !== id)
    });
  }

  minimizePopup(id) {
    const { activePopups } = this.state;
    for (let friend of activePopups) {
      friend.id === id && (friend.minimized = !friend.minimized);
    }
    this.setState({ activePopups });
    console.log(this.state.activePopups);
  }

  render() {
    return (
      <div className="home-container">
        <Nav socket={this.socket} />
        <div className="home-components">
          <div className="match_lists">
            <OpenMatches history={this.props.history} socket={this.socket} />
            <PrevMatches history={this.props.history} socket={this.socket} />
          </div>
          <div>
            <FriendChallenge
              history={this.props.history}
              socket={this.socket}
              showActivePopups={this.showActivePopups}
            />
            <Leaderboard history={this.props.history} socket={this.socket} />
          </div>
          <div className="chat">
            <HomeChat socket={this.socket} />
          </div>
        </div>
        <ChatPopup
          socket={this.socket}
          activePopups={this.state.activePopups}
          removeActivePopup={this.removeActivePopup}
          minimizePopup={this.minimizePopup}
        />
      </div>
    );
  }
}

export default Home;
