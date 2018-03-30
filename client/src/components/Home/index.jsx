import React, { Component } from "react";
import axios from "axios";
import randomstring from "randomstring";
import io from "socket.io-client/dist/socket.io.js";

import HomeChat from "./Chat/index.jsx";
import OpenMatches from "./OpenMatches/index.jsx";
import PrevMatches from "./PrevMatches/index.jsx";
import FriendChallenge from "./FriendChallenge/index.jsx";
import Nav from "../Global/Nav/Nav.jsx";

import "./Home.css";

const { SOCKET_SERVER_URL } = process.env;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      users: {}
    };
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

  async componentDidMount() {
  }

  logout = () => {
    window.localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <Nav />
        <div className="home">
          <div className="match_lists">
              <OpenMatches history={this.props.history} socket={this.socket} />
              <PrevMatches history={this.props.history} socket={this.socket} />
          </div>
            <FriendChallenge history={this.props.history} socket={this.socket} />
          <div className="chat">
            <HomeChat socket={this.socket} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
