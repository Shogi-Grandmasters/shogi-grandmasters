import React, { Component } from "react";
import axios from "axios";

// import "./PrevMatches.css";

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
    let { data } = await axios.get("http://localhost:3396/api/matches", {
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
  }

  async handleMatchSelect(e) {
    await this.setState({ selectedMatch: JSON.parse(e.target.value) });
  }

  async handleJoinMatchClick() {
    if (this.state.selectedMatch) {
      let {id, black, white} = this.state.selectedMatch;
      this.props.history.push({
        pathname: `/${id}`,
        state: {
          matchId: id,
          black,
          white,
        },
        history: this.props.history
      });
    }
  }

  render() {
    return (
      <div className="Prev-matches">
        <div>
          <div>Pending Matches</div>
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
      </div>
    );
  }
}

export default PrevMatches;
