import React, { Component } from "react";
import axios from "axios";

// import "./PrevMatches.css";

class PrevMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PrevMatches: [],
      selectedMatch: ""
    };
  }

  componentDidMount() {
    this.fetchPrevMatches();
    this.props.socket.on("updatePrevMatches", () => {
      this.fetchPrevMatches();
    });
  }

  async fetchPrevMatches() {
    let { data } = await axios.get("http://localhost:3396/api/matches", {
      params: { username: localStorage.getItem("username")}
    });
    console.log(data);
    this.setState({ prevMatches: data });
  }

  async handleMatchSelect(e) {
    await this.setState({ selectedMatch: JSON.parse(e.target.value) });
  }

  async handleJoinMatchClick() {
    if (this.state.selectedMatch) {
      let { data } = await axios.delete(
        "http://localhost:3396/api/Prevmatches",
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
      <div className="Prev-matches">
        <button onClick={() => this.handleInitiateMatchClick()}>
          Initiate Match
        </button>
        <div>
          <select onChange={e => this.handleMatchSelect(e)} size="20">
            <option>Select a Match</option>
            {/* {this.state.prevMatches &&
              this.state.prevMatches.map(match => {
                return (
                  <option key={match.id} value={JSON.stringify(match)}>
                    {match.username}
                  </option>
                );
              })} */}
          </select>
        </div>
        <button onClick={() => this.handleJoinMatchClick()}>Join Match</button>
      </div>
    );
  }
}

export default PrevMatches;
