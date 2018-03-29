import React, { Component } from "react";
import axios from "axios";

import "./PrevMatches.css";

const {REST_SERVER_URL} = process.env;

class PrevMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevMatches: [],
      selectedMatch: "",
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("id")
    };
  }

  componentDidMount() {
    this.fetchPrevMatches();
    this.props.socket.on("updatePrevMatches", () => {
      this.fetchPrevMatches();
    });
  }

  async fetchPrevMatches() {
    let { data } = await axios.get(`${REST_SERVER_URL}/api/matches`, {
      params: { userId: this.state.userId }
    },
    {
        headers: { 'Content-Type': 'application/json' }
      });
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
      return match;
    });
    this.setState({ prevMatches });
  }

  async handleMatchSelect(e) {
    await this.setState({ selectedMatch: JSON.parse(e.target.id) });
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

  render() {
    return (
      <div className="prev_matches">
        <h3>Rejoin Match</h3>
        <div className="match_select">
          {this.state.prevMatches.map(match => {
            return (
              <div onClick={e => this.handleMatchSelect(e)} id={JSON.stringify(match)} key={match.id} className="match_items">
                {`vs. ${
                  match.blackName === this.state.username
                    ? match.whiteName
                    : match.blackName
                }`}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PrevMatches;
