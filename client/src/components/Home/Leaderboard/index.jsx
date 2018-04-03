import React, { Component } from "react";
import axios from "axios";

import "./Leaderboard.css";

const { REST_SERVER_URL } = process.env;

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unrankedLeaderboard: [],
      rankedLeaderboard: []
    };
  }

  async componentDidMount() {
    const { data } = await axios.get(`${REST_SERVER_URL}/api/leaderboard`);
    this.setState({
      unrankedLeaderboard: JSON.parse(data.unrankedLeaderboard),
      rankedLeaderboard: JSON.parse(data.rankedLeaderboard)
    });
  }

  render() {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-head">Leaderboards</div><hr />
        <div className="leaderboard-list-container">
          {this.state.rankedLeaderboard.map((leader, index) => (
            <div className="leader-container" key={index}>
              <img
                className="leader-avi"
                src={`https://res.cloudinary.com/shogigrandmasters/image/upload/${leader.avatar}`}
              />
              <b className="leader-rank">#{index + 1}</b>
              <b className="leader-username">{leader.username}</b>
              <b className="leader-rating">Rating: {leader.rating_ranked}</b>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
