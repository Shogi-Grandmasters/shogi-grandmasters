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
      pathname: `/${this.matchId}`,
      state: {
        match: this.matchId,
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
        pathname: `/${this.state.selectedMatch.id}`,
        state: {
          matchId: this.state.selectedMatch.id,
          black,
          white: localStorage.getItem("username")
        },
        history: this.props.history
      });
    }
  }

  render() {
    return (
      <div className="open-matches">
        <div>Open Matches</div>
        <button onClick={() => this.handleInitiateMatchClick()}>
          Initiate Match
        </button>
        <div>
          <select onChange={e => this.handleMatchSelect(e)} size="20">
            <option>Select a Match</option>
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
        <button onClick={() => this.handleJoinMatchClick()}>Join Match</button>
      </div>
    );
  }
}

export default OpenMatches;
