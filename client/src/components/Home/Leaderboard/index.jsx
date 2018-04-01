import React, { Component } from "react";
import axios from "axios";

import "./Leaderboard.css";
import duel from "../../../../public/5fb83b603cb5c95c8cbdffb9cb379888.png";

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
        <div className="leaderboard-head">Grandmaster</div>
        <div className="leaderboard-list-container">
          {this.state.rankedLeaderboard.map((leader, index) => (
            <div className="leader-container" key={index}>
              <img
                width="50px"
                className="leader-avi"
                src={`https://res.cloudinary.com/shogigrandmasters/image/upload/${
                  leader.avatar
                }`}
              />
              <b className="leader-username">{leader.username}</b>
              <a><div className="leader-rating">{leader.rating_ranked}</div></a>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
