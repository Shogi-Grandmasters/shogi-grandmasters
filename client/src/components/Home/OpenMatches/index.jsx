import React, { Component } from "react";
import axios from "axios";
import randomstring from "randomstring";

import "./OpenMatches.css";

class OpenMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMatches: [],
      selectedMatch: ""
    };
  }

  componentDidMount() {
    this.fetchOpenMatches();
    this.props.socket.on("updateOpenMatches", () => {
      this.fetchOpenMatches();
    });
  }

  async fetchOpenMatches() {
    let { data } = await axios.get("http://localhost:3396/api/openmatches");
    this.setState({ openMatches: data });
  }

  async handleInitiateMatchClick() {
    let player1 = localStorage.getItem("username");
    await axios.post("http://localhost:3396/api/openmatches", {
      matchId: this.matchId,
      player1
    });
    this.props.history.push({
      pathname: `/match/${this.matchId}`,
      state: {
        matchId: this.matchId,
        black: localStorage.getItem("username"),
        opponent: false
      },
      history: this.props.history
    });
    this.props.socket.emit("client.listOpenGames");
  }

  async handleMatchSelect(e) {
    await this.setState({ selectedMatch: JSON.parse(e.target.value) });
  }

  matchId = randomstring.generate();

  async handleJoinMatchClick() {
    if (this.state.selectedMatch) {
      let { data } = await axios.delete(
        "http://localhost:3396/api/openmatches",
        {
          data: { matchId: this.state.selectedMatch.id }
        }
      );
      let black = data.username;
      this.props.history.push({
        pathname: `/match/${this.state.selectedMatch.id}`,
        state: {
          matchId: this.state.selectedMatch.id,
          black,
          white: localStorage.getItem("username")
        },
        history: this.props.history
      });
    }
  }

  async handlePlayMatchClick() {
    let player1 = localStorage.getItem("username");
    this.props.history.push({
      pathname: `/match/${this.matchId}`,
      state: {
        matchId: this.matchId,
        black: localStorage.getItem("username"),
        opponent: false
      },
      history: this.props.history
    });
    this.props.socket.emit("client.playMatch", {
      matchId: this.matchId,
      username: localStorage.getItem("username")
    });
  }

  render() {
    return (
      <div className="open_matches">
        <div className="match_actions">
          <h3>Open Matches</h3>
          <button onClick={() => this.handlePlayMatchClick()}>Play Now</button>
          <button onClick={() => this.handleInitiateMatchClick()}>
            Initiate Match
          </button>
        </div>
        <div className="match_select">
          <select onChange={e => this.handleMatchSelect(e)} size="20">
            <option className="match__items">Select a Match</option>
            {this.state.openMatches &&
              this.state.openMatches.map(match => {
                return (
                  <option key={match.id} value={JSON.stringify(match)}>
                    {match.username}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="match_actions">
          <button onClick={() => this.handleJoinMatchClick()}>
            Join Match
          </button>
        </div>
      </div>
    );
  }
}

export default OpenMatches;
