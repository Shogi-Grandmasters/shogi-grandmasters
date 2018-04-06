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
    // this.fetchOpenMatches();
    // this.props.socket.on("updateOpenMatches", () => {
    //   this.fetchOpenMatches();
    // });
  }

  componentWillUnmount() {
    this.props.socket.close();
  }

  // async fetchOpenMatches() {
  //   let { data } = await axios.get("http://localhost:3396/api/openmatches");
  //   this.setState({ openMatches: data });
  // }

  // async handleInitiateMatchClick() {
  //   let player1 = localStorage.getItem("id");
  //   await axios.post("http://localhost:3396/api/openmatches", {
  //     matchId: this.matchId,
  //     player1
  //   });
  //   this.props.history.push({
  //     pathname: `/match/${this.matchId}`,
  //     state: {
  //       matchId: this.matchId,
  //       black: localStorage.getItem("username"),
  //       opponent: false
  //     },
  //     history: this.props.history
  //   });
  //   this.props.socket.emit("client.listOpenGames");
  // }

  // async handleMatchSelect(e) {
  //   await this.setState({ selectedMatch: JSON.parse(e.target.value) });
  // }

  // matchId = randomstring.generate();

  // async handleJoinMatchClick() {
  //   if (this.state.selectedMatch) {
  //     let { data } = await axios.delete(
  //       "http://localhost:3396/api/openmatches",
  //       {
  //         data: { matchId: this.state.selectedMatch.id }
  //       }
  //     );
  //     let black = data.player1;
  //     this.props.history.push({
  //       pathname: `/match/${this.state.selectedMatch.id}`,
  //       state: {
  //         matchId: this.state.selectedMatch.id,
  //         black,
  //         white: localStorage.getItem("id")
  //       },
  //       history: this.props.history
  //     });
  //   }
  // }

  async handlePlayMatchClick(ranked) {
    this.props.history.push({
      pathname: `/match/queue`,
      state: {
        userId: +localStorage.getItem("id"),
        ranked
      },
      history: this.props.history
    });
  }

  render() {
    return (
      <div className="open_matches">
        <div className="match_actions">
          <button onClick={() => this.handlePlayMatchClick(false)}>Quick Play</button>
          <button onClick={() => this.handlePlayMatchClick(true)}>Ranked Play</button>
        </div>
      </div>
    );
  }
}

export default OpenMatches;
