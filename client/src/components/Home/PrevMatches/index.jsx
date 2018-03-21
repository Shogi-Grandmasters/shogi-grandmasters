import React, { Component } from "react";
import axios from "axios";

// import "./PrevMatches.css";

class PrevMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      prevMatches: [],
      selectedMatch: "",
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("id")
=======
      PrevMatches: [],
      selectedMatch: ""
>>>>>>> Added prev matches to home page and updated fetch match query helper.
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
<<<<<<< HEAD
      params: { userId: this.state.userId }
    });
    const opponents = {};
    data.opponents && data.opponents.forEach(opponent => opponents[opponent.id] = opponent.username);
    const prevMatches = data.matches.map(match => {
      match.black = opponents[match.black] ? opponents[match.black] : this.state.username;
      match.white = opponents[match.white] ? opponents[match.white] : this.state.username;
      return match;
    });
    this.setState({ prevMatches });
=======
      params: { username: localStorage.getItem("username")}
    });
    console.log(data);
    this.setState({ prevMatches: data });
>>>>>>> Added prev matches to home page and updated fetch match query helper.
  }

  async handleMatchSelect(e) {
    await this.setState({ selectedMatch: JSON.parse(e.target.value) });
  }

  async handleJoinMatchClick() {
    if (this.state.selectedMatch) {
<<<<<<< HEAD
      let {id, black, white} = this.state.selectedMatch;
      this.props.history.push({
        pathname: `/${id}`,
        state: {
          matchId: id,
          black,
          white,
=======
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
>>>>>>> Added prev matches to home page and updated fetch match query helper.
        },
        history: this.props.history
      });
    }
  }

  render() {
    return (
      <div className="Prev-matches">
<<<<<<< HEAD
        <div>
          <div>Pending Matches</div><br/>
          <select onChange={e => this.handleMatchSelect(e)} size="20">
            <option>Select a Match</option>
            {this.state.prevMatches.map(match => {
                return (
                  <option key={match.id} value={JSON.stringify(match)}>
                    {match.black === this.state.username ? match.white : match.black}
                  </option>
                );
              })}
          </select>
        </div>
        <button onClick={() => this.handleJoinMatchClick()}>Rejoin Match</button>
=======
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
>>>>>>> Added prev matches to home page and updated fetch match query helper.
      </div>
    );
  }
}

export default PrevMatches;
