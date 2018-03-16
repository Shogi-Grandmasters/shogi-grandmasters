import React, { Component } from "react";
import axios from "axios";
import randomstring from "randomstring";

import OpenMatches from "../OpenMatches/index.jsx";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      openMatches: [],
      selectedMatch: ""
    };
    this.fetchOpenMatches = this.fetchOpenMatches.bind(this);
  }

  componentDidMount() {
    this.fetchOpenMatches();
  }
  
  async fetchOpenMatches() {
    axios
    .get("http://localhost:3396/api/openmatches")
    .then(({ data }) => {
      this.setState({ openMatches: data })
      });
  }

  logout = () => {
    window.localStorage.clear();
    this.props.history.push("/login");
  };

  board = JSON.stringify([
    ["L", "H", "S", "G", "K", "G", "S", "H", "L"],
    [" ", "R", " ", " ", " ", " ", " ", "B", " "],
    ["P", "P", "P", "P", "P", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", "b", " ", " ", " ", " ", " ", "r", " "],
    ["l", "h", "s", "g", "k", "g", "s", "h", "l"]
  ]);

  handleInitiateMatchClick() {
    const matchId = randomstring.generate();
    const player1 = localStorage.getItem("username");
    axios
      .post("http://localhost:3396/api/openmatches", { matchId, player1 })
      .then(() => this.fetchOpenMatches());
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
        <OpenMatches openMatches={this.state.openMatches} fetchOpenMatches={this.fetchOpenMatches} />
        <button onClick={() => this.logout()}>Join Match</button>
      </div>
    );
  }
}

export default Home;
