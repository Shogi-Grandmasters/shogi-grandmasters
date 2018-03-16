import React, { Component } from "react";
import axios from "axios";
import randomstring from "randomstring";
import io from "socket.io-client/dist/socket.io.js";

import OpenMatches from "../OpenMatches/index.jsx";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      openMatches: [],
      selectedMatch: ""
    };
    this.fetchOpenMatches = this.fetchOpenMatches.bind(this);
    this.handleMatchSelect = this.handleMatchSelect.bind(this);
  }

  componentWillMount() {
  }
  
  async componentDidMount() {
    this.fetchOpenMatches();
    this.socket = io("http://localhost:4155", {
      query: {
        roomId: "home"
      }
    });
    this.socket.on("updateOpenMatches", () => {
      this.fetchOpenMatches();
    });
  }

  async fetchOpenMatches() {
    const { data } = await axios.get("http://localhost:3396/api/openmatches");
    this.setState({ openMatches: data });
  }

  logout = () => {
    window.localStorage.clear();
    this.props.history.push("/login");
  };

  matchId = randomstring.generate();

  async handleInitiateMatchClick() {
    const player1 = localStorage.getItem("username");
    await axios.post("http://localhost:3396/api/openmatches", {
      matchId: this.matchId,
      player1
    });
    this.props.history.push({
      pathname: `/${this.matchId}`,
      state: {
        match: this.matchId,
        player1: localStorage.getItem("username"),
        opponent: false
      },
      history: this.props.history
    });
    this.socket.emit("client.listOpenGames");
  }

  async handleMatchSelect(match) {
    await this.setState({ selectedMatch: JSON.parse(match) });
  }

  async handleJoinMatchClick(match) {
    await axios.delete("http://localhost:3396/api/openmatches", {
      data: { matchId: this.state.selectedMatch.id }
    });
    this.props.history.push({
      pathname: `/${this.state.selectedMatch.id}`,
      state: {
        match: this.state.selectedMatch.id,
        player2: localStorage.getItem("username"),
        opponent: true
      },
      history: this.props.history
    });
  }

  render() {
    return (
      <div>
        {localStorage.getItem("username")}
        <button onClick={() => this.logout()}>Logout</button>
        <br />
        <button onClick={() => this.handleInitiateMatchClick()}>
          Initiate Match
        </button>
        <OpenMatches
          openMatches={this.state.openMatches}
          handleMatchSelect={this.handleMatchSelect}
        />
        <button onClick={() => this.handleJoinMatchClick()}>Join Match</button>
      </div>
    );
  }
}

export default Home;
