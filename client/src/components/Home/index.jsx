import React, { Component } from "react";
import axios from "axios";
import randomstring from "randomstring";
import io from "socket.io-client/dist/socket.io.js";

import HomeChat from "./Chat/index.jsx";
import OpenMatches from "./OpenMatches/index.jsx";
import PrevMatches from "./PrevMatches/index.jsx";
import Nav from "../Global/Nav/Nav.jsx";
<<<<<<< HEAD

import "./Home.css";
=======
>>>>>>> Added prev matches to home page and updated fetch match query helper.

import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.socket = io("http://localhost:4155", {
      query: {
        roomId: "home",
        username: localStorage.getItem("username")
      }
    });
  }

<<<<<<< HEAD
  async componentDidMount() {
  }
=======
  async componentDidMount() {}
>>>>>>> Added prev matches to home page and updated fetch match query helper.

  logout = () => {
    window.localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <Nav />
        <br />
        <div id="home-container">
          <div id="match-new">
            <OpenMatches
              history={this.props.history}
              socket={this.socket}
            />
          </div>
          <div id="match-rejoin">
            <PrevMatches
              history={this.props.history}
              socket={this.socket}
            />
<<<<<<< HEAD
=======
            <button onClick={() => this.handleJoinMatchClick()}>
              Rejoin Match
            </button>
>>>>>>> Added prev matches to home page and updated fetch match query helper.
          </div>
          <div id="chat">
            <HomeChat socket={this.socket} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
