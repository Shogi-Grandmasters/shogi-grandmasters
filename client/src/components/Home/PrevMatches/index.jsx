import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import "./PrevMatches.css";

const { REST_SERVER_URL } = process.env;

class PrevMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevMatches: [],
      selectedMatch: "",
      username: localStorage.getItem("username"),
      userId: +localStorage.getItem("id")
    };
  }

  componentDidMount() {
    this.fetchPrevMatches();
    this.props.socket.on("updatePrevMatches", () => {
      this.fetchPrevMatches();
    });
  }

  componentWillUnmount() {
    this.props.socket.close();
  }

  async fetchPrevMatches() {
    let { data } = await axios.get(
      `${REST_SERVER_URL}/api/matches`,
      {
        params: { userId: this.state.userId }
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    const opponents = {};
    data.opponents &&
      data.opponents.forEach(
        opponent => (opponents[opponent.id] = opponent.username)
      );
    const prevMatches = data.matches.map(match => {
      match.blackName = opponents[match.black]
        ? opponents[match.black]
        : this.state.username;
      match.whiteName = opponents[match.white]
        ? opponents[match.white]
        : this.state.username;
      match.modified = new Date(match.modified);
      return match;
    });
    prevMatches.sort((a, b) => b.modified - a.modified);
    const sortedMatches = [];
    prevMatches.forEach(match => {
      if (match.white === this.state.userId && match.turn === 0) {
        match.turn = "YOUR MOVE";
        sortedMatches.unshift(match);
      } else if (match.black === this.state.userId && match.turn === 1) {
        match.turn = "YOUR MOVE";
        sortedMatches.unshift(match);
      } else {
        match.turn = "OPPONENTS MOVE";
        sortedMatches.push(match);
      }
    });
    this.setState({ prevMatches: sortedMatches });
  }

  async handleMatchSelect(selectedMatch) {
    await this.setState({ selectedMatch });
    this.handleJoinMatchClick();
  }

  async handleJoinMatchClick() {
    if (this.state.selectedMatch) {
      let { id, black, white } = this.state.selectedMatch;
      this.props.history.push({
        pathname: `/match/${id}`,
        state: {
          matchId: id,
          black,
          white
        },
        history: this.props.history
      });
    }
  }
  timeSince = date => {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  render() {
    return (
      <div className="prev_match_container">
        <div className="prev_match_head">REJOIN MATCH</div>
        <div className="prev_match_select">
          {this.state.prevMatches.map(match => {
            return (
              <div
                onClick={() => this.handleMatchSelect(match)}
                key={match.id}
                className={`prev_match_items  ${
                  match.turn === "YOUR MOVE" ? "prev_match_move" : "awaiting"
                }`}
              >
                <div className="prev_match_vs">Opponent: </div>
                <div className="prev_match_opponent">
                  {`${
                    match.blackName === this.state.username
                      ? match.whiteName
                      : match.blackName
                  }`}
                </div>

                <div className="prev_match_time">
                  {moment(match.modified).fromNow()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PrevMatches;

// <div className="prev_match_turn">
//   {match.turn === "YOUR MOVE" ? "YOUR MOVE" : null}
// </div>
