import React, { Component } from "react";
import axios from "axios";
import randomstring from "randomstring";
import io from "socket.io-client/dist/socket.io.js";

<<<<<<< HEAD
import HomeChat from "./Chat/index.jsx";
import OpenMatches from "./OpenMatches/index.jsx";
import Nav from "../Global/Nav/Nav.jsx"
=======
import OpenMatches from "./OpenMatches/index.jsx";
import HomeChat from "./Chat/index.jsx";
>>>>>>> Added chat to home page.

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
    this.socket = io("http://localhost:4155", {
      query: {
        roomId: "home",
        username: localStorage.getItem("username")
      }
    });
  }

  async componentDidMount() {
    this.fetchOpenMatches();
    this.socket.on("updateOpenMatches", () => {
      this.fetchOpenMatches();
    });
  }

  async fetchOpenMatches() {
    let { data } = await axios.get("http://localhost:3396/api/openmatches");
    this.setState({ openMatches: data });
  }

  logout = () => {
    window.localStorage.clear();
    this.props.history.push("/login");
  };

  matchId = randomstring.generate();

  async handleInitiateMatchClick() {
    let player1 = localStorage.getItem("username");
    await axios.post("http://localhost:3396/api/openmatches", {
      matchId: this.matchId,
      player1
    });
    this.props.history.push({
      pathname: `/${this.matchId}`,
      state: {
        match: this.matchId,
        black: localStorage.getItem("username"),
        opponent: false
      },
      history: this.props.history
    });
    this.socket.emit("client.listOpenGames");
  }

  async handleMatchSelect(match) {
    await this.setState({ selectedMatch: JSON.parse(match) });
  }

<<<<<<< HEAD
  async handleJoinMatchClick() {
    if (this.state.selectedMatch) {
      let { data } = await axios.delete("http://localhost:3396/api/openmatches", {
        data: { matchId: this.state.selectedMatch.id }
      });
      let black = data.username;
      this.props.history.push({
        pathname: `/${this.state.selectedMatch.id}`,
        state: {
          matchId: this.state.selectedMatch.id,
          black,
          white: localStorage.getItem("username")
        },
        history: this.props.history
      });
    }
=======
  async handleJoinMatchClick(match) {
    let { data } = await axios.delete("http://localhost:3396/api/openmatches", {
      data: { matchId: this.state.selectedMatch.id }
    });
    let black = data.username;
    // await axios.post("http://localhost:3396/api/matches", {
    //   matchId: this.state.selectedMatch.id,
    //   board: this.board,
    //   black,
    //   white: localStorage.getItem("username")
    // });
    this.props.history.push({
      pathname: `/${this.state.selectedMatch.id}`,
      state: {
        matchId: this.state.selectedMatch.id,
        black,
        white: localStorage.getItem("username")
      },
      history: this.props.history
    });
>>>>>>> Added chat to home page.
  }

  render() {
    return (
      <div>
        <Nav />
        <br />
        <button onClick={() => this.handleInitiateMatchClick()}>
          Initiate Match
        </button>
        <OpenMatches
          openMatches={this.state.openMatches}
          handleMatchSelect={this.handleMatchSelect}
        />
        <button onClick={() => this.handleJoinMatchClick()}>Join Match</button>
        <br />
        <HomeChat socket={this.socket}/>
      </div>
    );
  }
}

export default Home;
